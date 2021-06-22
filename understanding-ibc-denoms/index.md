---
parent:
  title: Understanding IBC Denoms with Gaia
order: 0
description: Send tokens with IBC and trace your Denom, understand how Denoms work.
---

# Understanding IBC Denoms with Gaia

In this tutorial you will learn how to use IBC denoms with Gaia, the Cosmos Hub Software.

IBC has been a long time in the making, and only just recently has the necessary bits been implemented so that we can actually start playing with it.

Today we shall explore the low level details of what it really means to identify a token received via IBC to one's account, to find out which chain it came from, contact that chain and verify that it exists and is still running.

Let's say one day you list the status of your account, and you've received a new `ibc/` token:
`1000000ibc/27A6394C3F9FF9C9DCF5DFFADF9BB5FE9A37C7E92B006199894CF1824DF9AC7C,100000000000samoleans,99999977256stake`

Just like `samoleans` or `stake`, `ibc/27A639...` is the denomination of the token received via IBC, but `27A639...` is a hash of the denomination, IBC port and channel.

Why is it a hash? because if the token took multiple hops from other blockchains to get to our account, the path would get unbearably long and Cosmos-SDK has a 64 character limit on the denomination of the token.

The tradeoff, of course, is that one must query the node to find out what the actual path and denomination is. This is called the denomtrace. `gaiad` has a GRPC interface at (in this case) 9090, and I will show you later how to query this interface directly. For now, follow along with the easy to use `gaiad` subcommands.

```
$ gaiad q ibc-transfer denom-trace 27A6394C3F9FF9C9DCF5DFFADF9BB5FE9A37C7E92B006199894CF1824DF9AC7C --node tcp://localhost:26557
denom_trace:
  base_denom: samoleans
  path: transfer/channel-0
```

From this we now know that there is an IBC port `transfer` and channel `channel-0`. But we want to know the IBC light client (why is it called a light client? because it is a light client of the _other_ chain, keeping track of its blockhashes) behind the port and channel, we need to perform another query:

```
$ gaiad q ibc channel client-state transfer channel-0 --node tcp://localhost:26557
client_id: 07-tendermint-0
client_state:
  '@type': /ibc.lightclients.tendermint.v1.ClientState
  allow_update_after_expiry: false
  allow_update_after_misbehaviour: false
  chain_id: ibc-0
  frozen_height:
    revision_height: "0"
    revision_number: "0"
  latest_height:
    revision_height: "43"
    revision_number: "0"
  max_clock_drift: 600s
  proof_specs:
  - inner_spec:
      child_order:
      - 0
      - 1
      child_size: 33
      empty_child: null
      hash: SHA256
      max_prefix_length: 12
      min_prefix_length: 4
    leaf_spec:
      hash: SHA256
      length: VAR_PROTO
      prefix: AA==
      prehash_key: NO_HASH
      prehash_value: SHA256
    max_depth: 0
    min_depth: 0
  - inner_spec:
      child_order:
      - 0
      - 1
      child_size: 32
      empty_child: null
      hash: SHA256
      max_prefix_length: 1
      min_prefix_length: 1
    leaf_spec:
      hash: SHA256
      length: VAR_PROTO
      prefix: AA==
      prehash_key: NO_HASH
      prehash_value: SHA256
    max_depth: 0
    min_depth: 0
  trust_level:
    denomination: "3"
    numerator: "1"
  trusting_period: 1209600s
  unbonding_period: 1814400s
  upgrade_path:
  - upgrade
  - upgradedIBCState
```

That's a lot of information, but it doesn't answer the question: how do you know if this IBC client can be relied upon?

* Note the chain ID and the client ID.
Anybody can start a chain with the same chain ID, but the IBC client ID is generated by the [Cosmos SDK IBC module's Keeper](https://github.com/cosmos/ibc-go/blob/e012a4af5614f8774bcb595962012455667db2cf/modules/core/02-client/keeper/keeper.go#L56) (ICS-02 does not specify a standard for IBC client ids). There is a Chain Name Service and the not-so-decentralized Github chain-registrar repo to verify the combination of the two, both under development.

* Ensure the IBC client isn't expired.
In the event that Tendermint consensus fails (>1/3 of validators produce a conflicting block), _and_ proof of this is submitted on chain, the IBC client will become frozen, and `frozen_height` will be nonzero. In the future, this will become a simple true/false.
`latest_height.revision_height` is the block height when the IBC client was last updated. To ensure that it is still up to date, one would have to query the blockchain itself for the block height 43, and ensure that the timestamp of that block + the `trusting_period` of 1209600s/336h/14d is beyond the current time.
All this is totally different if the blockchain does not use Tendermint consensus.

The good news is there is [an issue for a "Active/Expired/Frozen/" status](https://github.com/cosmos/ibc-go/issues/98) which will automatically check that the IBC client is within the trusting period.

# Reaching the other blockchain
So far we have found the IBC channel, client, and the chain ID of the corresponding blockchain. But we still don't know how to connect to it!

A database of chain IDs and their nodes is still something the Cosmos community is trying to solve. There are currently 2 solutions:
1. Chain Name Service (decentralized)
The [CNS](https://github.com/tendermint/cns) is a Cosmos SDK module that the Cosmos Hub will one day run. As a hub through which cross-chain transactions go through, it only makes sense for the Cosmos Hub to host the critical information on how to reach the other chain IDs. The problem is that it is new and still under development.

2. Semi-automatically updated Github repo (semi-decentralized)
[github.com/cosmos/registry](https://github.com/cosmos/registry) is a stopgap solution. Each chain ID will have a folder describing its genesis and a list of peers. A blockchain operator claims his chain ID by forking this repository, create a branch with his chain ID, and submit a pull request to include it in the official `cosmos/registry` of chain IDs.
Every chain ID is represented by a folder, and within that folder there is a `peers.json` that has a list of nodes that you can connect to.

There is [already a tool](https://github.com/apeunit/cosmos-registrar) started by Jack Zampolin and further developed by Ape Unit to automate claiming and updating a chain ID. Updating in this case means committing a fresh peerlist to the repo - it should be run with a cronjob. Its state is best described as v1.0, so go ahead and report any bugs as Github issues.

# Verifying the other blockchain
Let's assume you are now connected to a node belonging to chain B, and chain A has a IBC light client pointing to chain B, and vice versa.

First, you must verify that the node of 'chain B' is indeed the same 'chain B' that is registered in [github.com/cosmos/registry](https://github.com/cosmos/registry).
Then, you must verify that chain A's IBC light client is pointing to that very same 'chain B'.
Lastly, you must verify that chain B's IBC light client is pointing to chain A.

## that 'chain B' is the one mentioned in github.com/cosmos/registry
Check the `light-roots/latest.json` file under each chain ID folder in [cosmos/registry](https://github.com/cosmos/registry). It is created when a chain ID is first claimed.

```json
$ cat light-roots/latest.json
{
  "trust-height": 70,
  "trust-hash": "78AD39C7DBB0C28AA1DD4DBF909E8FC37522CAB177484871AB3FBD18B2F165B4"
}
```

Connect to one of the peers in `peers.json`. Its block at height 70 should have the hash `78AD39C7DBB0C28AA1DD4DBF909E8FC37522CAB177484871AB3FBD18B2F165B4`.

```sh
$ curl localhost:26657/commit?height=70
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "signed_header": {
      "header": {
        "version": {
          "block": "11"
        },
        "chain_id": "wasmdlocal",
        "height": "70",
        "time": "2021-05-22T17:06:24.945921498Z",
        "last_block_id": {
          "hash": "BFD79481181393C07624680CB2FFCF98FC0CA13A810EAEDAF99EEE117530E2C3",
          "parts": {
            "total": 1,
            "hash": "BF7E0BC1DCC70D6F88522F5E941E8CE0A9F8FFF2623CB346E0DBA8419F13D8CF"
          }
        },
        "last_commit_hash": "0871E3E26E359B8C86E72D205A8A609EA9E369DDEAF348ADC94B1AE1F78E2309",
        "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "validators_hash": "B27189A358F6D20965B1BC2CF47564EF2A9B5D6A2C0D6CB7BE1F922BE39110E9",
        "next_validators_hash": "B27189A358F6D20965B1BC2CF47564EF2A9B5D6A2C0D6CB7BE1F922BE39110E9",
        "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
        "app_hash": "2AD963954E56AD5055D66D1D92D19CBEA6FF65A1DF246F13293C5548B6974691",
        "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "proposer_address": "2A4AEFBCD5934C1C7D80540822CC978DDE7BBF89"
      },
      "commit": {
        "height": "70",
        "round": 0,
        "block_id": {
>>>>>>>>> "hash": "78AD39C7DBB0C28AA1DD4DBF909E8FC37522CAB177484871AB3FBD18B2F165B4", <<<<<<<<<<<<<<<<
          "parts": {
            "total": 1,
            "hash": "0292B8FC1A1FC2862699AD0CC33AEB5719DC183EA04705C1D4C8F01C0ABAD3E2"
          }
        },
        "signatures": [
          {
            "block_id_flag": 2,
            "validator_address": "2A4AEFBCD5934C1C7D80540822CC978DDE7BBF89",
            "timestamp": "2021-05-22T17:06:29.957359812Z",
            "signature": "RsbFvAANBPXdeGYHwBZsHUeHU/uJzWNWrbQ5UZa1lsUTpKALUPdTTnBwRjvnpbX44z3oH1RefHup+ZPjOf2UDQ=="
          }
        ]
      }
    },
    "canonical": true
  }
```

## that chain A's IBC client is pointing to 'chain B' (and vice versa)
As of 25 May 2021, official `gaiad` releases will not output the hashes in the same format and you must compile `gaiad` with `ibc-go` at commit [4570955](https://github.com/cosmos/ibc-go/commit/457095517b7832c42ecf13571fee1e550fec02d0).
IBC won't tell you where to find a node from chain B, but once you've found one, you can get chain B's app hashes at certain block heights and compare them with what the chain B IBC light client on chain A tells you.

Querying chain A's IBC light client for chain B:
```sh
$ gaiad q ibc client consensus-states 07-tendermint-0 --node tcp://localhost:27000
consensus_states:
- consensus_state:
    '@type': /ibc.lightclients.tendermint.v1.ConsensusState
    next_validators_hash: A19419B856881CD94A27E0ED7EC6ADAD9FA749C5543D601E39AC6C4FB95CD8E0
    root:
      hash: IbhPNTZYeUYdk3pfZHHWP8VG/gefxGxkkvUuTrmVKkA=
    timestamp: "2021-05-20T13:49:41.169759553Z"
  height:
    revision_height: "906"
    revision_number: "0"
```

Now compare with chain B:
```sh
$ gaiad q ibc client node-state --node tcp://localhost:27010 --height 906
next_validators_hash: A19419B856881CD94A27E0ED7EC6ADAD9FA749C5543D601E39AC6C4FB95CD8E0
root:
  hash: IbhPNTZYeUYdk3pfZHHWP8VG/gefxGxkkvUuTrmVKkA=
timestamp: "2021-05-20T13:49:41.169759553Z"
```


# Getting lower level: querying IBC via gaiad's GRPC endpoints
So far we understand on a high level what needs to be done. But what is actually going on under the hood? How is `gaiad` getting all that data, and how can you access it from another SDK or programming language, for example CosmJS?

At a low level, the `gaiad` instance invoked from my shell is contacting another `gaiad` instance that is running a blockchain node using its GRPC endpoint. SDKs make it easier to query these GRPC endpoints, but as of the time of writing, only the `main` branch of CosmJS have methods for accessing these IBC queries, not 0.24.1, which is the latest available from NPM.

You may be familiar with `curl` when developing HTTP REST APIs. The equivalent for GRPC is `grpcurl`. Install it and follow these steps.

## Start two chains connnected via IBC

Install gaiad v4.2.1
```
git clone git@github.com:cosmos/gaia.git
cd gaia && git checkout v4.2.1
make build && cp build/gaiad $GOPATH/bin/gaiad
```

Use cosmos-sdk v0.42.4
```
cd cosmos-sdk && git checkout v0.42.4 && make proto-all # you need docker
```

Download the relayer, tell it to use gaiad v4.2.1, start two chains
```
git clone https://github.com/iqlusioninc/relayer
cd relayer
nano Makefile

...
SDKCOMMIT := $(shell go list -m -u -f '{{.Version}}' github.com/cosmos/cosmos-s>
GAIA_VERSION := v4.2.1
AKASH_VERSION := v0.10.2
...


$ ./scripts/two-chainz
...
Creating gaiad instance: home=./data | chain-id=ibc-0 | p2p=:26656 | rpc=:26657 | profiling=:6060 | grpc=:9090
Change settings in config.toml file...
Creating gaiad instance: home=./data | chain-id=ibc-1 | p2p=:26556 | rpc=:26557 | profiling=:6061 | grpc=:9091
...
```
The relayer Makefile actually rebuilds gaiad based on the version we set in the Makefile, but we built the same version before, just for safety's sake.

Create a shell script called connect.sh:
```
#!/bin/bash
rly tx link demo -d -o 3s

rly q balance ibc-0
rly q balance ibc-1

rly tx transfer ibc-0 ibc-1 1000000samoleans $(rly chains address ibc-1)
echo "waiting for 2 seconds for the tx to confirm"
sleep 2

rly tx relay-packets demo -d
sleep 2
rly tx relay-acknowledgements demo -d

rly q balance ibc-0
echo "Balance of $(rly chains address ibc-1) on ibc-1:"
rly q balance ibc-1
```

```
$ ./connect.sh
I[2021-04-23|15:12:33.406] - [ibc-0] -> creating client on ibc-0 for ibc-1 header-height{5} trust-period(336h0m0s)
...
I[2021-04-23|15:12:55.023] ★ Channel created: [ibc-0]chan{channel-0}port{transfer} -> [ibc-1]chan{channel-0}port{transfer}
100000000000samoleans,99999982786stake
100000000000samoleans,99999982081stake
I[2021-04-23|15:12:55.507] ✔ [ibc-0]@{35} - msg(0:transfer) hash(F3729C01856C3FFE52C363DEBB3A5ECBC1453F8DCCD2417EF46A73595BE98A1A)
waiting for 2 seconds for the tx to confirm
I[2021-04-23|15:12:58.081] ✔ [ibc-1]@{30} - msg(0:update_client,1:recv_packet) hash(930A743A0481B40F10E617C5F79D9D45FB0836BE00F7CBF242E449C258B7F7F5)
I[2021-04-23|15:12:58.081] ★ Relayed 1 packets: [ibc-0]port{transfer}->[ibc-1]port{transfer}
I[2021-04-23|15:13:00.627] ✔ [ibc-0]@{40} - msg(0:update_client,1:acknowledge_packet) hash(6D00EA314F3F4B1496491553C56BE901BDFF554CE759D9C61F368B3DF343F50A)
I[2021-04-23|15:13:00.627] ★ Relayed 1 packets: [ibc-1]port{transfer}->[ibc-0]port{transfer}
99999000000samoleans,99999976647stake
Balance of cosmos1957r6c38kc6gy94w0k9t7ear8xdg4j8xvm80xq on ibc-1:
1000000transfer/channel-0/samoleans,100000000000samoleans,99999977240stake
```
From the last line, one can see that `rly` unwraps IBC denomtrace so that you can see it is `1000000transfer/channel-0/samoleans`. As we saw in the first section, `gaiad q ibc-transfer denom-trace` also unwraps the denomtrace for you, but `gaiad q bank` will not:
```
$ gaiad q bank balances cosmos1957r6c38kc6gy94w0k9t7ear8xdg4j8xvm80xq --node tcp://localhost:26557
balances:
- amount: "1000000"
  denom: ibc/27A6394C3F9FF9C9DCF5DFFADF9BB5FE9A37C7E92B006199894CF1824DF9AC7C
- amount: "100000000000"
  denom: samoleans
- amount: "99999977240"
  denom: stake
pagination:
  next_key: null
  total: "0"
```

## Performing the low level GRPC queries using grpcurl
Now that we have a private IBC testnet setup, we can query the IBC endpoints:
```
$ grpcurl -plaintext -import-path ./third_party/proto -import-path ./proto \
-proto ./proto/ibc/applications/transfer/v1/query.proto \
localhost:9091 ibc.applications.transfer.v1.Query/DenomTraces
{
  "denomTraces": [
    {
      "path": "transfer/channel-0",
      "baseDenom": "samoleans"
    }
  ],
  "pagination": {
    "total": "1"
  }
}

$ grpcurl -plaintext -import-path ./third_party/proto -import-path ./proto \
-proto ./proto/ibc/core/channel/v1/query.proto \
-d '{"port_id": "transfer", "channel_id": "channel-0"}' \
localhost:9091 ibc.core.channel.v1.Query/ChannelClientState
{
  "identifiedClientState": {
    "clientId": "07-tendermint-0",
    "clientState": {
      "@error": "ibc.lightclients.tendermint.v1.ClientState is not recognized; see @value for raw binary message data",
      "@type": "/ibc.lightclients.tendermint.v1.ClientState",
      "@value": "CgVpYmMtMBIECAEQAxoECIDqSSIECIDfbioDCNgEMgA6AhAlQhkKCQgBGAEgASoBABIMCgIAARAhGAQgDDABQhkKCQgBGAEgASoBABIMCgIAARAgGAEgATABSgd1cGdyYWRlShB1cGdyYWRlZElCQ1N0YXRlUAFYAQ=="
    }
  },
  "proofHeight": {
    "revisionNumber": "1",
    "revisionHeight": "751"
  }
}
```
The ClientState is a raw binary blob (in Protobuf parlance, an `Any` or "any type") that grpcurl cannot parse, hence the error. However, as you remember from the above ClientState querying example using `gaiad`, `gaiad` can of course parse the ClientState binary data.

# tl;dr
Many parts are still under development, but the gist is that once you:

1. Look up the IBC client ID and chain ID of the chain that sent you the IBC asset
2. get the canonical app hashes of particular block heights of the counterparty chain ID from a database like the [Chain Name Service](https://github.com/tendermint/cns) or the [github.com/cosmos/registry](https://github.com/cosmos/registry)
3. Ensure that the consensus state information from IBC light clients on both chains match what the nodes of both chains say

then you can be sure that you are talking to the right chain.