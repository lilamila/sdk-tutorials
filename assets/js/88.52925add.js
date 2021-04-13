(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{672:function(l,c,C){"use strict";C.r(c);var g=C(0),t=Object(g.a)({},(function(){var l=this,c=l.$createElement,C=l._self._c||c;return C("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[C("h1",{attrs:{id:"create-the-buy-order-ibc-packet"}},[C("a",{staticClass:"header-anchor",attrs:{href:"#create-the-buy-order-ibc-packet"}},[l._v("#")]),l._v(" Create the Buy Order IBC packet")]),l._v(" "),C("p",[l._v("In this chapter you want to modify the IBC logic to create buy orders on the IBC exchange.\nThe logic is very similar to the previous sell order chapter.")]),l._v(" "),C("h2",{attrs:{id:"modify-the-proto-definition"}},[C("a",{staticClass:"header-anchor",attrs:{href:"#modify-the-proto-definition"}},[l._v("#")]),l._v(" Modify the Proto Definition")]),l._v(" "),C("p",[l._v("Add the buyer to the proto file definition")]),l._v(" "),C("tm-code-block",{staticClass:"codeblock",attrs:{language:"proto",base64:"Ly8gcHJvdG8vcGFja2V0LnByb3RvCm1lc3NhZ2UgQnV5T3JkZXJQYWNrZXREYXRhIHsKICBzdHJpbmcgYW1vdW50RGVub20gPSAxOwogIGludDMyIGFtb3VudCA9IDI7CiAgc3RyaW5nIHByaWNlRGVub20gPSAzOwogIGludDMyIHByaWNlID0gNDsKICBzdHJpbmcgYnV5ZXIgPSA1Owp9Cg=="}}),l._v(" "),C("h2",{attrs:{id:"about-the-ibc-packet"}},[C("a",{staticClass:"header-anchor",attrs:{href:"#about-the-ibc-packet"}},[l._v("#")]),l._v(" About the IBC Packet")]),l._v(" "),C("p",[l._v("The IBC packet has four different stages you need to consider:")]),l._v(" "),C("ol",[C("li",[l._v("Before transmitting the packet")]),l._v(" "),C("li",[l._v("On Receipt of a packet")]),l._v(" "),C("li",[l._v("On Acknowledgment of a packet")]),l._v(" "),C("li",[l._v("On Timeout of a packet")])]),l._v(" "),C("h3",{attrs:{id:"pre-transmit"}},[C("a",{staticClass:"header-anchor",attrs:{href:"#pre-transmit"}},[l._v("#")]),l._v(" Pre-transmit")]),l._v(" "),C("p",[l._v("Before a sell order will be submitted, make sure it contains the following logic:")]),l._v(" "),C("ul",[C("li",[l._v("Check if the pair exists on the orderbook")]),l._v(" "),C("li",[l._v("If the token is an IBC token, burn the tokens")]),l._v(" "),C("li",[l._v("If the token is a native token, lock the tokens")]),l._v(" "),C("li",[l._v("Save the voucher received on the target chain to later resolve a denom")])]),l._v(" "),C("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8geC9pYmNkZXgva2VlcGVyLy9tc2dfc2VydmVyX2J1eU9yZGVyLmdvCmZ1bmMgKGsgbXNnU2VydmVyKSBTZW5kQnV5T3JkZXIoZ29DdHggY29udGV4dC5Db250ZXh0LCBtc2cgKnR5cGVzLk1zZ1NlbmRCdXlPcmRlcikgKCp0eXBlcy5Nc2dTZW5kQnV5T3JkZXJSZXNwb25zZSwgZXJyb3IpIHsKCWN0eCA6PSBzZGsuVW53cmFwU0RLQ29udGV4dChnb0N0eCkKCgkvLyBDYW5ub3Qgc2VuZCBhIG9yZGVyIGlmIHRoZSBwYWlyIGRvZXNuJ3QgZXhpc3QKCXBhaXJJbmRleCA6PSB0eXBlcy5PcmRlckJvb2tJbmRleChtc2cuUG9ydCwgbXNnLkNoYW5uZWxJRCwgbXNnLkFtb3VudERlbm9tLCBtc2cuUHJpY2VEZW5vbSkKCV8sIGZvdW5kIDo9IGsuR2V0QnV5T3JkZXJCb29rKGN0eCwgcGFpckluZGV4KQoJaWYgIWZvdW5kIHsKCQlyZXR1cm4gJmFtcDt0eXBlcy5Nc2dTZW5kQnV5T3JkZXJSZXNwb25zZXt9LCBlcnJvcnMuTmV3KCZxdW90O3RoZSBwYWlyIGRvZXNuJ3QgZXhpc3QmcXVvdDspCgl9CgoJLy8gTG9jayB0aGUgdG9rZW4gdG8gc2VuZAoJc2VuZGVyLCBlcnIgOj0gc2RrLkFjY0FkZHJlc3NGcm9tQmVjaDMyKG1zZy5TZW5kZXIpCglpZiBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gJmFtcDt0eXBlcy5Nc2dTZW5kQnV5T3JkZXJSZXNwb25zZXt9LCBlcnIKCX0KCQogICAgLy8gVXNlIFNhZmVCdXJuIHRvIGVuc3VyZSBubyBuZXcgbmF0aXZlIHRva2VucyBhcmUgbWludGVkCglpZiBlcnIgOj0gay5TYWZlQnVybigKCQljdHgsCgkJbXNnLlBvcnQsCgkJbXNnLkNoYW5uZWxJRCwKCQlzZW5kZXIsCgkJbXNnLlByaWNlRGVub20sCgkJbXNnLkFtb3VudCptc2cuUHJpY2UsCgkpOyBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gJmFtcDt0eXBlcy5Nc2dTZW5kQnV5T3JkZXJSZXNwb25zZXt9LCBlcnIKCX0KCgkvLyBTYXZlIHRoZSB2b3VjaGVyIHJlY2VpdmVkIG9uIHRoZSBvdGhlciBjaGFpbiwgdG8gaGF2ZSB0aGUgYWJpbGl0eSB0byByZXNvbHZlIGl0IGludG8gdGhlIG9yaWdpbmFsIGRlbm9tCglrLlNhdmVWb3VjaGVyRGVub20oY3R4LCBtc2cuUG9ydCwgbXNnLkNoYW5uZWxJRCwgbXNnLlByaWNlRGVub20pCgoJLy8gQ29uc3RydWN0IHRoZSBwYWNrZXQKCXZhciBwYWNrZXQgdHlwZXMuQnV5T3JkZXJQYWNrZXREYXRhCgoJcGFja2V0LkJ1eWVyID0gbXNnLlNlbmRlciAgICAgICAgICAgICAgLy8gJmx0Oy0gTWFudWFsbHkgc3BlY2lmeSB0aGUgYnV5ZXIgaGVyZQoJcGFja2V0LkFtb3VudERlbm9tID0gbXNnLkFtb3VudERlbm9tCglwYWNrZXQuQW1vdW50ID0gbXNnLkFtb3VudAoJcGFja2V0LlByaWNlRGVub20gPSBtc2cuUHJpY2VEZW5vbQoJcGFja2V0LlByaWNlID0gbXNnLlByaWNlCgoJLy8gVHJhbnNtaXQgdGhlIHBhY2tldAoJZXJyID0gay5UcmFuc21pdEJ1eU9yZGVyUGFja2V0KAoJCWN0eCwKCQlwYWNrZXQsCgkJbXNnLlBvcnQsCgkJbXNnLkNoYW5uZWxJRCwKCQljbGllbnR0eXBlcy5aZXJvSGVpZ2h0KCksCgkJbXNnLlRpbWVvdXRUaW1lc3RhbXAsCgkpCglpZiBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gbmlsLCBlcnIKCX0KCglyZXR1cm4gJmFtcDt0eXBlcy5Nc2dTZW5kQnV5T3JkZXJSZXNwb25zZXt9LCBuaWwKfQo="}}),l._v(" "),C("h2",{attrs:{id:"create-the-onrecv-function"}},[C("a",{staticClass:"header-anchor",attrs:{href:"#create-the-onrecv-function"}},[l._v("#")]),l._v(" Create the OnRecv Function")]),l._v(" "),C("ul",[C("li",[l._v("Update sell order book")]),l._v(" "),C("li",[l._v("Distribute gains to sellers")]),l._v(" "),C("li",[l._v("Send to chain B the buy order after the fill attempt")])]),l._v(" "),C("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8geC9pYmNkZXgva2VlcGVyL2J1eU9yZGVyLmdvCmZ1bmMgKGsgS2VlcGVyKSBPblJlY3ZCdXlPcmRlclBhY2tldChjdHggc2RrLkNvbnRleHQsIHBhY2tldCBjaGFubmVsdHlwZXMuUGFja2V0LCBkYXRhIHR5cGVzLkJ1eU9yZGVyUGFja2V0RGF0YSkgKHBhY2tldEFjayB0eXBlcy5CdXlPcmRlclBhY2tldEFjaywgZXJyIGVycm9yKSB7CgkvLyB2YWxpZGF0ZSBwYWNrZXQgZGF0YSB1cG9uIHJlY2VpdmluZwoJaWYgZXJyIDo9IGRhdGEuVmFsaWRhdGVCYXNpYygpOyBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gcGFja2V0QWNrLCBlcnIKCX0KCgkvLyBDaGVjayBpZiB0aGUgc2VsbCBvcmRlciBib29rIGV4aXN0cwoJcGFpckluZGV4IDo9IHR5cGVzLk9yZGVyQm9va0luZGV4KHBhY2tldC5Tb3VyY2VQb3J0LCBwYWNrZXQuU291cmNlQ2hhbm5lbCwgZGF0YS5BbW91bnREZW5vbSwgZGF0YS5QcmljZURlbm9tKQoJYm9vaywgZm91bmQgOj0gay5HZXRTZWxsT3JkZXJCb29rKGN0eCwgcGFpckluZGV4KQoJaWYgIWZvdW5kIHsKCQlyZXR1cm4gcGFja2V0QWNrLCBlcnJvcnMuTmV3KCZxdW90O3RoZSBwYWlyIGRvZXNuJ3QgZXhpc3QmcXVvdDspCgl9CgoJLy8gRmlsbCBidXkgb3JkZXIKCWJvb2ssIHJlbWFpbmluZywgbGlxdWlkYXRlZCwgcHVyY2hhc2UsIF8gOj0gdHlwZXMuRmlsbEJ1eU9yZGVyKGJvb2ssIHR5cGVzLk9yZGVyewoJCUFtb3VudDogZGF0YS5BbW91bnQsCgkJUHJpY2U6IGRhdGEuUHJpY2UsCgl9KQoKCS8vIFJldHVybiByZW1haW5pbmcgYW1vdW50IGFuZCBnYWlucwoJcGFja2V0QWNrLlJlbWFpbmluZ0Ftb3VudCA9IHJlbWFpbmluZy5BbW91bnQKCXBhY2tldEFjay5QdXJjaGFzZSA9IHB1cmNoYXNlCgoJLy8gQmVmb3JlIGRpc3RyaWJ1dGluZyBnYWlucywgd2UgcmVzb2x2ZSB0aGUgZGVub20KCS8vIEZpcnN0IHdlIGNoZWNrIGlmIHRoZSBkZW5vbSByZWNlaXZlZCBjb21lcyBmcm9tIHRoaXMgY2hhaW4gb3JpZ2luYWxseQoJZmluYWxQcmljZURlbm9tLCBzYXZlZCA6PSBrLk9yaWdpbmFsRGVub20oY3R4LCBwYWNrZXQuRGVzdGluYXRpb25Qb3J0LCBwYWNrZXQuRGVzdGluYXRpb25DaGFubmVsLCBkYXRhLlByaWNlRGVub20pCglpZiAhc2F2ZWQgewoJCS8vIElmIGl0IHdhcyBub3QgZnJvbSB0aGlzIGNoYWluIHdlIHVzZSB2b3VjaGVyIGFzIGRlbm9tCgkJZmluYWxQcmljZURlbm9tID0gVm91Y2hlckRlbm9tKHBhY2tldC5Tb3VyY2VQb3J0LCBwYWNrZXQuU291cmNlQ2hhbm5lbCwgZGF0YS5QcmljZURlbm9tKQoJfQoKCS8vIERpc3BhdGNoIGxpcXVpZGF0ZWQgYnV5IG9yZGVyCglmb3IgXywgbGlxdWlkYXRpb24gOj0gcmFuZ2UgbGlxdWlkYXRlZCB7CgkJbGlxdWlkYXRpb24gOj0gbGlxdWlkYXRpb24KCgkJYWRkciwgZXJyIDo9IHNkay5BY2NBZGRyZXNzRnJvbUJlY2gzMihsaXF1aWRhdGlvbi5DcmVhdG9yKQoJCWlmIGVyciAhPSBuaWwgewoJCQlyZXR1cm4gcGFja2V0QWNrLCBlcnIKCQl9CgoJCWlmIGVyciA6PSBrLlNhZmVNaW50KAoJCQljdHgsCgkJCXBhY2tldC5EZXN0aW5hdGlvblBvcnQsCgkJCXBhY2tldC5EZXN0aW5hdGlvbkNoYW5uZWwsCgkJCWFkZHIsCgkJCWZpbmFsUHJpY2VEZW5vbSwKCQkJbGlxdWlkYXRpb24uQW1vdW50KmxpcXVpZGF0aW9uLlByaWNlLAoJCSk7IGVyciAhPSBuaWwgewoJCQlyZXR1cm4gcGFja2V0QWNrLCBlcnIKCQl9Cgl9CgoJLy8gU2F2ZSB0aGUgbmV3IG9yZGVyIGJvb2sKCWsuU2V0U2VsbE9yZGVyQm9vayhjdHgsIGJvb2spCgoJcmV0dXJuIHBhY2tldEFjaywgbmlsCn0K"}}),l._v(" "),C("h2",{attrs:{id:"create-the-onacknowledgement-function"}},[C("a",{staticClass:"header-anchor",attrs:{href:"#create-the-onacknowledgement-function"}},[l._v("#")]),l._v(" Create the OnAcknowledgement Function")]),l._v(" "),C("ul",[C("li",[l._v("Chain "),C("code",[l._v("Mars")]),l._v(" will store the remaining buy order in the buy orderbook and will distribute sold "),C("code",[l._v("MCX")]),l._v(" to the sellers and will mint the voucher token to the buyer the price of the amount bought")]),l._v(" "),C("li",[l._v("On error we mint back the burned tokens")])]),l._v(" "),C("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8geC9pYmNkZXgva2VlcGVyL2J1eU9yZGVyLmdvCmZ1bmMgKGsgS2VlcGVyKSBPbkFja25vd2xlZGdlbWVudEJ1eU9yZGVyUGFja2V0KGN0eCBzZGsuQ29udGV4dCwgcGFja2V0IGNoYW5uZWx0eXBlcy5QYWNrZXQsIGRhdGEgdHlwZXMuQnV5T3JkZXJQYWNrZXREYXRhLCBhY2sgY2hhbm5lbHR5cGVzLkFja25vd2xlZGdlbWVudCkgZXJyb3IgewoJc3dpdGNoIGRpc3BhdGNoZWRBY2sgOj0gYWNrLlJlc3BvbnNlLih0eXBlKSB7CgljYXNlICpjaGFubmVsdHlwZXMuQWNrbm93bGVkZ2VtZW50X0Vycm9yOgoJCS8vIEluIGNhc2Ugb2YgZXJyb3Igd2UgbWludCBiYWNrIHRoZSBuYXRpdmUgdG9rZW4KCQlyZWNlaXZlciwgZXJyIDo9IHNkay5BY2NBZGRyZXNzRnJvbUJlY2gzMihkYXRhLkJ1eWVyKQoJCWlmIGVyciAhPSBuaWwgewoJCQlyZXR1cm4gZXJyCgkJfQoKCQlpZiBlcnIgOj0gay5TYWZlTWludCgKCQkJY3R4LAoJCQlwYWNrZXQuU291cmNlUG9ydCwKCQkJcGFja2V0LlNvdXJjZUNoYW5uZWwsCgkJCXJlY2VpdmVyLAoJCQlkYXRhLlByaWNlRGVub20sCgkJCWRhdGEuQW1vdW50KmRhdGEuUHJpY2UsCgkJKTsgZXJyICE9IG5pbCB7CgkJCXJldHVybiBlcnIKCQl9CgoJCXJldHVybiBuaWwKCWNhc2UgKmNoYW5uZWx0eXBlcy5BY2tub3dsZWRnZW1lbnRfUmVzdWx0OgoJCS8vIERlY29kZSB0aGUgcGFja2V0IGFja25vd2xlZGdtZW50CgkJdmFyIHBhY2tldEFjayB0eXBlcy5CdXlPcmRlclBhY2tldEFjawoJCWVyciA6PSBwYWNrZXRBY2suVW5tYXJzaGFsKGRpc3BhdGNoZWRBY2suUmVzdWx0KQoJCWlmIGVyciAhPSBuaWwgewoJCQkvLyBUaGUgY291bnRlci1wYXJ0eSBtb2R1bGUgZG9lc24ndCBpbXBsZW1lbnQgdGhlIGNvcnJlY3QgYWNrbm93bGVkZ21lbnQgZm9ybWF0CgkJCXJldHVybiBlcnJvcnMuTmV3KCZxdW90O2Nhbm5vdCB1bm1hcnNoYWwgYWNrbm93bGVkZ21lbnQmcXVvdDspCgkJfQoKCQkvLyBHZXQgdGhlIHNlbGwgb3JkZXIgYm9vawoJCXBhaXJJbmRleCA6PSB0eXBlcy5PcmRlckJvb2tJbmRleChwYWNrZXQuU291cmNlUG9ydCwgcGFja2V0LlNvdXJjZUNoYW5uZWwsIGRhdGEuQW1vdW50RGVub20sIGRhdGEuUHJpY2VEZW5vbSkKCQlib29rLCBmb3VuZCA6PSBrLkdldEJ1eU9yZGVyQm9vayhjdHgsIHBhaXJJbmRleCkKCQlpZiAhZm91bmQgewoJCQlwYW5pYygmcXVvdDtidXkgb3JkZXIgYm9vayBtdXN0IGV4aXN0JnF1b3Q7KQoJCX0KCgkJLy8gQXBwZW5kIHRoZSByZW1haW5pbmcgYW1vdW50IG9mIHRoZSBvcmRlcgoJCWlmIHBhY2tldEFjay5SZW1haW5pbmdBbW91bnQgJmd0OyAwIHsKCQkJbmV3Qm9vaywgXywgZXJyIDo9IHR5cGVzLkFwcGVuZE9yZGVyKAoJCQkJYm9vaywKCQkJCWRhdGEuQnV5ZXIsCgkJCQlwYWNrZXRBY2suUmVtYWluaW5nQW1vdW50LAoJCQkJZGF0YS5QcmljZSwKCQkJKQoJCQlpZiBlcnIgIT0gbmlsIHsKCQkJCXJldHVybiBlcnIKCQkJfQoJCQlib29rID0gbmV3Qm9vay4odHlwZXMuQnV5T3JkZXJCb29rKQoKCQkJLy8gU2F2ZSB0aGUgbmV3IG9yZGVyIGJvb2sKCQkJay5TZXRCdXlPcmRlckJvb2soY3R4LCBib29rKQoJCX0KCgkJLy8gTWludCB0aGUgcHVyY2hhc2UKCQlpZiBwYWNrZXRBY2suUHVyY2hhc2UgJmd0OyAwIHsKCQkJcmVjZWl2ZXIsIGVyciA6PSBzZGsuQWNjQWRkcmVzc0Zyb21CZWNoMzIoZGF0YS5CdXllcikKCQkJaWYgZXJyICE9IG5pbCB7CgkJCQlyZXR1cm4gZXJyCgkJCX0KCgkJCWZpbmFsQW1vdW50RGVub20sIHNhdmVkIDo9IGsuT3JpZ2luYWxEZW5vbShjdHgsIHBhY2tldC5Tb3VyY2VQb3J0LCBwYWNrZXQuU291cmNlQ2hhbm5lbCwgZGF0YS5BbW91bnREZW5vbSkKCQkJaWYgIXNhdmVkIHsKCQkJCS8vIElmIGl0IHdhcyBub3QgZnJvbSB0aGlzIGNoYWluIHdlIHVzZSB2b3VjaGVyIGFzIGRlbm9tCgkJCQlmaW5hbEFtb3VudERlbm9tID0gVm91Y2hlckRlbm9tKHBhY2tldC5EZXN0aW5hdGlvblBvcnQsIHBhY2tldC5EZXN0aW5hdGlvbkNoYW5uZWwsIGRhdGEuQW1vdW50RGVub20pCgkJCX0KCQkJaWYgZXJyIDo9IGsuU2FmZU1pbnQoCgkJCQljdHgsCgkJCQlwYWNrZXQuU291cmNlUG9ydCwKCQkJCXBhY2tldC5Tb3VyY2VDaGFubmVsLAoJCQkJcmVjZWl2ZXIsCgkJCQlmaW5hbEFtb3VudERlbm9tLAoJCQkJcGFja2V0QWNrLlB1cmNoYXNlLAoJCQkpOyBlcnIgIT0gbmlsIHsKCQkJCXJldHVybiBlcnIKCQkJfQoJCX0KCgkJcmV0dXJuIG5pbAoJZGVmYXVsdDoKCQkvLyBUaGUgY291bnRlci1wYXJ0eSBtb2R1bGUgZG9lc24ndCBpbXBsZW1lbnQgdGhlIGNvcnJlY3QgYWNrbm93bGVkZ21lbnQgZm9ybWF0CgkJcmV0dXJuIGVycm9ycy5OZXcoJnF1b3Q7aW52YWxpZCBhY2tub3dsZWRnbWVudCBmb3JtYXQmcXVvdDspCgl9Cn0K"}}),l._v(" "),C("h2",{attrs:{id:"create-the-ontimeout-function"}},[C("a",{staticClass:"header-anchor",attrs:{href:"#create-the-ontimeout-function"}},[l._v("#")]),l._v(" Create the OnTimeout Function")]),l._v(" "),C("p",[l._v("In case the order has a timeout is is necessary to mint back the token for the user.")]),l._v(" "),C("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8geC9pYmNkZXgva2VlcGVyL2J1eU9yZGVyLmdvCmZ1bmMgKGsgS2VlcGVyKSBPblRpbWVvdXRCdXlPcmRlclBhY2tldChjdHggc2RrLkNvbnRleHQsIHBhY2tldCBjaGFubmVsdHlwZXMuUGFja2V0LCBkYXRhIHR5cGVzLkJ1eU9yZGVyUGFja2V0RGF0YSkgZXJyb3IgewoJLy8gSW4gY2FzZSBvZiBlcnJvciB3ZSBtaW50IGJhY2sgdGhlIG5hdGl2ZSB0b2tlbgoJcmVjZWl2ZXIsIGVyciA6PSBzZGsuQWNjQWRkcmVzc0Zyb21CZWNoMzIoZGF0YS5CdXllcikKCWlmIGVyciAhPSBuaWwgewoJCXJldHVybiBlcnIKCX0KCglpZiBlcnIgOj0gay5TYWZlTWludCgKCQljdHgsCgkJcGFja2V0LlNvdXJjZVBvcnQsCgkJcGFja2V0LlNvdXJjZUNoYW5uZWwsCgkJcmVjZWl2ZXIsCgkJZGF0YS5QcmljZURlbm9tLAoJCWRhdGEuQW1vdW50KmRhdGEuUHJpY2UsCgkpOyBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gZXJyCgl9CgoJcmV0dXJuIG5pbAp9Cg=="}})],1)}),[],!1,null,null,null);c.default=t.exports}}]);