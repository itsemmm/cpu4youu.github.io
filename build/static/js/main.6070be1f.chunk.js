(this.webpackJsonpcpu4youu=this.webpackJsonpcpu4youu||[]).push([[0],{198:function(e,t,n){},199:function(e,t,n){},285:function(e,t){},286:function(e,t){},288:function(e,t){},300:function(e,t){},306:function(e,t){},308:function(e,t){},318:function(e,t){},320:function(e,t){},347:function(e,t){},349:function(e,t){},354:function(e,t){},356:function(e,t){},362:function(e,t){},364:function(e,t){},376:function(e,t){},379:function(e,t){},409:function(e,t,n){"use strict";n.r(t);var c=n(12),r=n.n(c),a=n(103),o=n.n(a),s=(n(198),n(199),n(19)),i=n(59),u=n(6),l=n.n(u),j=n(10),b=n(185),p=n(9),d=new b.JsonRpc("https://testnet.wax.eosdetroit.io",{fetch:fetch}),x=function(e){var t,n=e.ual,r=function(){var e=Object(j.a)(l.a.mark((function e(){var t,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={actions:[{account:"eosio.token",name:"transfer",data:{from:n.activeUser.accountName,to:"cpu4",quantity:E+" WAX",memo:A+""},authorization:[{actor:n.activeUser.accountName,permission:"active"}]}]},e.prev=1,e.next=4,n.activeUser.signTransaction(t,{blocksBehind:5,expireSeconds:300,broadcast:!0,sign:!0});case 4:c=e.sent,console.log(c),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0),console.log(JSON.stringify(e.t0));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),a=function(){var e=Object(j.a)(l.a.mark((function e(){var t,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={actions:[{account:"eosio.token",name:"transfer",data:{from:n.activeUser.accountName,to:"cpu4",quantity:E+" WAX",memo:"USER:"+X+","+A},authorization:[{actor:n.activeUser.accountName,permission:"active"}]}]},e.prev=1,e.next=4,n.activeUser.signTransaction(t,{blocksBehind:5,expireSeconds:300,broadcast:!0,sign:!0});case 4:c=e.sent,console.log(c),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0),console.log(JSON.stringify(e.t0));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(j.a)(l.a.mark((function e(){var t,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={actions:[{account:"eosio.token",name:"transfer",data:{from:n.activeUser.accountName,to:"cpu4",quantity:E+" WAX",memo:"Deposit"},authorization:[{actor:n.activeUser.accountName,permission:"active"}]}]},e.prev=1,e.next=4,n.activeUser.signTransaction(t,{blocksBehind:5,expireSeconds:300,broadcast:!0,sign:!0});case 4:c=e.sent,console.log(c),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0),console.log(JSON.stringify(e.t0));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),u="Request Self Stake",b="Stake To User",x="Deposit And Earn",h=(t={},Object(i.a)(t,u,r),Object(i.a)(t,b,a),Object(i.a)(t,x,o),t),O=Object(c.useState)(),f=Object(s.a)(O,2),v=f[0],g=f[1],m=Object(c.useState)(u),w=Object(s.a)(m,2),y=w[0],k=w[1],S=Object(c.useState)(1),U=Object(s.a)(S,2),A=U[0],N=U[1],_=Object(c.useState)(0),C=Object(s.a)(_,2),E=C[0],J=C[1],L=Object(c.useState)(0),W=Object(s.a)(L,2),q=W[0],T=W[1],B=Object(c.useState)(""),I=Object(s.a)(B,2),X=I[0],D=I[1],F=Object(c.useState)(1),P=Object(s.a)(F,2),R=P[0],z=P[1],M=Object(c.useState)(),G=Object(s.a)(M,2),H=G[0],K=G[1],Q=Object(c.useState)(),V=Object(s.a)(Q,2),Y=V[0],Z=V[1],$=Object(c.useState)(0),ee=Object(s.a)($,2),te=ee[0],ne=ee[1],ce=Object(c.useState)(0),re=Object(s.a)(ce,2),ae=re[0],oe=re[1],se=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.get_table_rows({json:!0,code:"cpu4",scope:"cpu4",table:"config",limit:1,reverse:!1,show_payer:!1});case 3:if(t=e.sent,console.log(t.rows[0]),z(t.rows[0].exponent),K(t.rows[0].total_wax),Z(t.rows[0].current_loaned),ne(t.rows[0].multi_day_fee),E&&E>0&&((n=100*(1-Y/H^R))<10&&(n=10),T(n*(1-te*(A-1))*(E/A))),!v){e.next=15;break}return e.next=13,d.get_table_rows({json:!0,code:"cpu4",scope:"cpu4",table:"deposits",limit:1e3,reverse:!1,show_payer:!1});case 13:for(c=e.sent,r=0;r<c.rows.length;r++)c.rows[r].account===v&&oe(c.rows[r].wax);case 15:e.next=21;break;case 17:e.prev=17,e.t0=e.catch(0),console.error(e.t0),console.log(JSON.stringify(e.t0));case 21:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}(),ie=function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=100*(1-Y/H^R))<10&&(t=10),T(t*(1-te*(A-1))*(E/A));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){var e=function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.activeUser){e.next=12;break}return e.prev=1,e.next=4,d.get_account(n.activeUser.accountName);case 4:t=e.sent,g(t),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0),console.log(JSON.stringify(e.t0));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[n.activeUser]),Object(c.useEffect)((function(){E&&E>0?ie():T(0)}),[E]),Object(c.useEffect)((function(){var e=setInterval((function(){var e=function(){var e=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,se();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),5e3);return function(){return clearInterval(e)}}),[se]);var ue=function(){n.activeUser||n.showModal()},le=function(){return y===u?Object(p.jsx)("table",{style:{margin:"auto",borderSpacing:"12px 12px",textAlign:"left"},children:Object(p.jsxs)("tbody",{children:[pe(),be(),de()]})}):y===b?Object(p.jsx)("table",{style:{margin:"auto",borderSpacing:"12px 12px",textAlign:"left"},children:Object(p.jsxs)("tbody",{children:[pe(),be(),je(),de()]})}):y===x?Object(p.jsx)("table",{style:{margin:"auto",borderSpacing:"12px 12px",textAlign:"left"},children:Object(p.jsx)("tbody",{children:pe()})}):void 0},je=function(){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{style:{textAlign:"right"},children:"User to stake to"}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{style:{width:"120px"},type:"text",value:X,onChange:function(e){return D(e.target.value)}})})]})},be=function(){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{style:{textAlign:"right"},children:"Number of days"}),Object(p.jsx)("td",{children:Object(p.jsxs)("select",{value:A,onChange:function(e){return N(e.target.value)},children:[Object(p.jsx)("option",{value:1,children:"1"}),Object(p.jsx)("option",{value:2,children:"2"}),Object(p.jsx)("option",{value:3,children:"3"}),Object(p.jsx)("option",{value:4,children:"4"}),Object(p.jsx)("option",{value:5,children:"5"}),Object(p.jsx)("option",{value:6,children:"6"}),Object(p.jsx)("option",{value:7,children:"7"}),Object(p.jsx)("option",{value:8,children:"8"}),Object(p.jsx)("option",{value:9,children:"9"}),Object(p.jsx)("option",{value:10,children:"10"}),Object(p.jsx)("option",{value:11,children:"11"}),Object(p.jsx)("option",{value:12,children:"12"}),Object(p.jsx)("option",{value:13,children:"13"}),Object(p.jsx)("option",{value:14,children:"14"})]})})]})},pe=function(){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{style:{textAlign:"right"},children:"Amount to send"}),Object(p.jsxs)("td",{children:[Object(p.jsx)("input",{style:{width:"60px"},type:"number",value:E,onChange:function(e){return J(e.target.value)}})," ","WAX"]})]})},de=function(){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{style:{textAlign:"right"},children:"Amount to be staked"}),Object(p.jsxs)("td",{children:[q.toLocaleString()," WAX"]})]})},xe=function(){return Object(p.jsx)("div",{children:Object(p.jsx)("button",{onClick:function(){return h[y].call()},children:y})})};return Object(p.jsxs)("div",{children:[Object(p.jsx)("h1",{children:"CPU 4 SALE"}),n.activeUser&&n.activeUser&&v?Object(p.jsxs)("div",{children:[n.activeUser.accountName," ",v.core_liquid_balance,Object(p.jsx)("br",{})]}):null,n.activeUser&&n.activeUser&&v?Object(p.jsxs)("div",{children:[ae,Object(p.jsx)("br",{})]}):null,n.activeUser?function(){if(n.activeUser&&n.activeAuthenticator)return Object(p.jsxs)("div",{children:[Object(p.jsx)("br",{}),Object(p.jsx)("button",{onClick:n.logout,children:"Logout"}),Object(p.jsx)("br",{})]})}():Object(p.jsxs)("div",{children:[Object(p.jsx)("button",{onClick:ue,children:"Login"}),Object(p.jsx)("br",{})]}),n.activeUser?Object(p.jsxs)("div",{children:[Object(p.jsx)("br",{}),Object(p.jsxs)("select",{value:y,onChange:function(e){return k(e.target.value)},children:[Object(p.jsx)("option",{value:u,children:u}),Object(p.jsx)("option",{value:b,children:b}),Object(p.jsx)("option",{value:x,children:x})]}),Object(p.jsx)("br",{}),Object(p.jsx)("br",{}),le(),Object(p.jsx)("br",{}),xe()]}):null,Object(p.jsx)("br",{}),Object(p.jsxs)("div",{children:[Object(p.jsx)("h2",{children:"How it works:"}),Object(p.jsx)("h4",{children:"Requesting Wax:"}),Object(p.jsx)("p",{children:"1. Send wax"}),Object(p.jsx)("p",{children:"2. ????????"}),Object(p.jsx)("h4",{children:"Depositing Wax:"}),Object(p.jsx)("p",{children:"3. Get steak"})]})]})};var h=function(e){var t=e.ual;return Object(p.jsx)("div",{className:"App",children:Object(p.jsx)(x,{ual:t})})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,411)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))},f=n(104),v=n(188),g=n(191),m={chainId:"f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12",rpcEndpoints:[{protocol:"https",host:"testnet.wax.eosdetroit.io",port:"443"}]},w=new v.Anchor([m],{appName:"cpu4"}),y=new g.Wax([m],{appName:"cpu4"}),k=Object(f.withUAL)(h);o.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(f.UALProvider,{chains:[m],authenticators:[w,y],appName:"cpu4",children:Object(p.jsx)(k,{})})}),document.getElementById("root")),O()}},[[409,1,2]]]);
//# sourceMappingURL=main.6070be1f.chunk.js.map