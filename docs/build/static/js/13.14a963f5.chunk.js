(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{426:function(e,a){},429:function(e,a,t){"use strict";t.d(a,"e",function(){return m}),t.d(a,"d",function(){return u}),t.d(a,"a",function(){return o}),t.d(a,"b",function(){return i}),t.d(a,"c",function(){return p});var n=t(421),r=t.n(n),s=t(422),c=t(436),l=t.n(c),m=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"m",t=arguments.length>2?arguments[2]:void 0,n=t?l.a.duration(l()(t).diff(l()(e))):l.a.duration(l()().diff(l()(e)));switch(a){case"ms":return n.asMilliseconds();default:return n.asMinutes()}};function u(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=new Date(e+"z"),n=new Date(t.setFullYear(t.getFullYear()-a)),r=(((new Date).getTime()-n.getTime())/1e3).toFixed(0);return r<3600?r+" seconds":r<86400?Math.round(r/60/60)+" hours":Math.round(r/60/60/24)+" days"}var o=function(e){return!(arguments.length>1&&void 0!==arguments[1])||arguments[1]?l.a.utc(e).format("DD MMM YYYY hh:mm:ss z"):l()(e).format("DD MMM YYYY hh:mm:ss z")},i=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.toLocaleString(navigator.language,{minimumFractionDigits:a})},d={};function E(e,a){return void 0!==d[e]?d[e]:a.instance().db_api().exec("get_accounts",[[e]]).then(function(a){return d[e]=a[0].name,a[0].name})}function p(e,a){return _.apply(this,arguments)}function _(){return(_=Object(s.a)(r.a.mark(function e(a,t){var n,s,c,l,m,u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a[0],s=a[1],u=!1,e.t0=n,e.next=0===e.t0?6:1===e.t0?9:2===e.t0?11:3===e.t0?13:4===e.t0?15:5===e.t0?17:6===e.t0?20:14===e.t0?22:15===e.t0?25:19===e.t0?27:22===e.t0?29:23===e.t0?31:33===e.t0?33:37===e.t0?35:49===e.t0?37:50===e.t0?39:41;break;case 6:return m=s.from,u=s.to,e.abrupt("break",42);case 9:return m=s.seller,e.abrupt("break",42);case 11:return m=s.fee_paying_account,e.abrupt("break",42);case 13:return m=s.funding_account,e.abrupt("break",42);case 15:return m=s.account_id,e.abrupt("break",42);case 17:return m=s.registrar,u=s.referrer,e.abrupt("break",42);case 20:return m=s.account,e.abrupt("break",42);case 22:return m=s.issuer,u=s.issue_to_account,e.abrupt("break",42);case 25:return m=s.payer,e.abrupt("break",42);case 27:return m=s.publisher,e.abrupt("break",42);case 29:case 31:return m=s.fee_paying_account,e.abrupt("break",42);case 33:return m=s.owner_,e.abrupt("break",42);case 35:return m=s.deposit_to_account,e.abrupt("break",42);case 37:case 39:return m=s.account_id,e.abrupt("break",42);case 41:throw a;case 42:if(!m){e.next=46;break}return e.next=45,E(m,t);case 45:c=e.sent;case 46:if(!u){e.next=50;break}return e.next=49,E(u,t);case 49:l=e.sent;case 50:return e.abrupt("return",{name1:c,name2:l,type:n,data:s});case 51:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}},434:function(e,a,t){e.exports={details:"template_details__QGRDl",section:"template_section__2wL88",main:"template_main__2drTM",noFound:"template_noFound__yenmG"}},439:function(e,a,t){"use strict";var n=t(2),r=t.n(n),s=t(4);function c(e){return window.assets[e].symbol}function l(e){return window.assets[e].precision}t.n(s).a.shape;a.a=function(e){var a=e.operation,t=e.env;return r.a.createElement(r.a.Fragment,null,function(e,a){switch(e.type){case 0:var t=e.data.amount_||e.data.amount;return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," sent\xa0",t.amount/Math.pow(10,l(t.asset_id))," ",c(t.asset_id)," to\xa0",r.a.createElement("a",{href:a+"/account/"+e.name2},e.name2));case 1:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," wants\xa0",e.data.min_to_receive.amount/Math.pow(10,l(e.data.min_to_receive.asset_id)),"\xa0",c(e.data.min_to_receive.asset_id)," for\xa0",e.data.amount_to_sell.amount/Math.pow(10,l(e.data.amount_to_sell.asset_id)),"\xa0",c(e.data.amount_to_sell.asset_id));case 2:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," cancel order");case 3:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," update debt/collateral for\xa0",c(e.data.delta_collateral.asset_id),"/",c(e.data.delta_debt.asset_id));case 4:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," paid\xa0",e.data.pays.amount/Math.pow(10,l(e.data.pays.asset_id))," ",c(e.data.pays.asset_id)," for\xa0",e.data.receives.amount/Math.pow(10,l(e.data.receives.asset_id))," ",c(e.data.receives.asset_id));case 5:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," register ",r.a.createElement("a",{href:a+"/account/"+e.data.name},e.data.name),e.name1!==e.name2?r.a.createElement(function(){return r.a.createElement(r.a.Fragment,null,"\xa0thanks to ",r.a.createElement("a",{href:a+"/account/"+e.name2},e.name2))},null):"");case 6:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," updated account data");case 7:return r.a.createElement(r.a.Fragment,null,"ACCOUNT WHIELIST");case 8:return r.a.createElement(r.a.Fragment,null,"ACCOUNT UPGRADE");case 9:return r.a.createElement(r.a.Fragment,null,"ACCOUNT TRANSFER");case 10:return r.a.createElement(r.a.Fragment,null,"ASSET CREATE");case 11:return r.a.createElement(r.a.Fragment,null,"ASSET UPDATE");case 12:return r.a.createElement(r.a.Fragment,null,"ASSET UPDATE BITASSET");case 13:return r.a.createElement(r.a.Fragment,null,"ASSET UPDATE FEED PRODUCERS");case 14:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," issued\xa0",e.data.asset_to_issue.amount/Math.pow(10,l(e.data.asset_to_issue.asset_id))," ",c(e.data.asset_to_issue.asset_id)," to\xa0",r.a.createElement("a",{href:a+"/account/"+e.name2},e.name2));case 15:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," burned(reserved)\xa0",e.data.amount_to_reserve.amount/Math.pow(10,l(e.data.amount_to_reserve.asset_id))," ",c(e.data.amount_to_reserve.asset_id));case 16:return r.a.createElement(r.a.Fragment,null,"ASSET FUND FEE POOL");case 17:return r.a.createElement(r.a.Fragment,null,"ASSET SETTLE");case 18:return r.a.createElement(r.a.Fragment,null,"ASSET GLOBAL SETTLE");case 19:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," published feed for ",c(e.data.asset_id));case 20:return r.a.createElement(r.a.Fragment,null,"WITNESS CREATE");case 21:return r.a.createElement(r.a.Fragment,null,"WITNESS UPDATE");case 22:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," created a proposal");case 23:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," updated proposal ",e.data.proposal);case 24:return r.a.createElement(r.a.Fragment,null,"PROPOSAL DELETE");case 25:return r.a.createElement(r.a.Fragment,null,"WITHDRAW PERMISSION CREATE");case 26:return r.a.createElement(r.a.Fragment,null,"WITHDRAW PERMISSION");case 27:return r.a.createElement(r.a.Fragment,null,"WITHDRAW PERMISSION CLAIM");case 28:return r.a.createElement(r.a.Fragment,null,"WITHDRAW PERMISSION DELETE");case 29:return r.a.createElement(r.a.Fragment,null,"COMMITTEE MEMBER CREATE");case 30:return r.a.createElement(r.a.Fragment,null,"COMMITTEE MEMBER UPDATE");case 31:return r.a.createElement(r.a.Fragment,null,"COMMITTEE MEMBER UPDATE GLOBAL PARAMETERS");case 32:return r.a.createElement(r.a.Fragment,null,"VESTING BALANCE CREATE");case 33:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," withdrew vesting balance of\xa0",e.data.amount_.amount/Math.pow(10,l(e.data.amount_.asset_id))," ",c(e.data.amount_.asset_id));case 34:return r.a.createElement(r.a.Fragment,null,"WORKER CREATE");case 35:return r.a.createElement(r.a.Fragment,null,"CUSTOM");case 36:return r.a.createElement(r.a.Fragment,null,"ASSERT");case 37:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," claimed a balance of\xa0",e.data.total_claimed.amount/Math.pow(10,l(e.data.total_claimed.asset_id))," ",c(e.data.total_claimed.asset_id));case 38:return r.a.createElement(r.a.Fragment,null,"OVERRIDE TRANSFER");case 39:return r.a.createElement(r.a.Fragment,null,"TRANSFER TO BLIND");case 40:return r.a.createElement(r.a.Fragment,null,"BLIND TRANSFER");case 41:return r.a.createElement(r.a.Fragment,null,"TRANSFER FROM BLIND");case 42:return r.a.createElement(r.a.Fragment,null,"ASSET SETTLE CANCEL");case 43:return r.a.createElement(r.a.Fragment,null,"ASSET CLAIM FEES");case 44:return r.a.createElement(r.a.Fragment,null,"FBA DISTRIBUTE");case 49:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," bet\xa0",e.data.risk.amount/Math.pow(10,l(e.data.risk.asset_id))," ",c(e.data.risk.asset_id),"\xa0on dice roll ","<"==e.data.bet[0]?"under":"over"," ",e.data.bet.slice(1));case 50:return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:a+"/account/"+e.name1},e.name1)," rolled ",e.data.outcome,"\xa0",e.data.win?"and won "+e.data.payout.amount/Math.pow(10,l(e.data.payout.asset_id))+" "+c(e.data.payout.asset_id):"");default:return r.a.createElement(r.a.Fragment,null)}}(a,t))}},440:function(e,a,t){e.exports={table:"tables_table__1NkJO",header:"tables_header___7bd5",body:"tables_body__xBiMY",footer:"tables_footer__19pKs",prevButton:"tables_prevButton__t9HoX"}},446:function(e,a,t){e.exports={history:"operations_history__3sH8Z",header:"operations_header__QKhK5",id:"operations_id__1mxoV",description:"operations_description__2wdUP",created:"operations_created__27YLf"}},456:function(e,a,t){e.exports={label:"LabelText_label__1pz3z",text:"LabelText_text__LJfvq",isLong:"LabelText_isLong__1RQEw"}},460:function(e,a,t){"use strict";var n=t(3),r=t(2),s=t.n(r),c=t(4),l=t.n(c),m=t(427),u=t.n(m),o=t(456),i=t.n(o),d=function(e){var a=e.label,t=e.text,r=e.isLong;return s.a.createElement("div",null,s.a.createElement("div",{className:i.a.label},a),s.a.createElement("div",{className:u()(i.a.text,Object(n.a)({},i.a.isLong,r))},t))};l.a.string,l.a.bool,l.a.number;d.defaultProps={label:"",text:"",isLong:!1};var E=d;t.d(a,"a",function(){return E})},671:function(e,a,t){"use strict";t.r(a);var n=t(123),r=t(23),s=t(63),c=t.n(s),l=t(421),m=t.n(l),u=t(1),o=t(422),i=t(118),d=t(119),E=t(121),p=t(120),_=t(122),h=t(2),b=t.n(h),f=t(4),g=t.n(f),v=t(427),T=t.n(v),F=t(442),S=t(439),A=t(460),N=t(429),w=t(440),O=t.n(w),R=t(446),x=t.n(R),M=t(434),k=t.n(M),y=t(419),L=t(448),D=t.n(L),I=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(E.a)(this,Object(p.a)(a).call(this,e))).renderDetails=function(){return b.a.createElement("div",{className:k.a.details},b.a.createElement("h2",null,"Ledger"),b.a.createElement(F.i,null,b.a.createElement(F.b,{xs:6,sm:6,md:2,className:k.a.section},b.a.createElement(A.a,{label:"SEQUENCE",text:t.state.sequence})),b.a.createElement(F.b,{md:7,className:T()(k.a.section,"hidden-sm")},b.a.createElement(A.a,{label:"HASH",text:t.state.hash,isLong:!0})),b.a.createElement(F.b,{xs:6,sm:6,md:3,className:k.a.section},b.a.createElement(A.a,{label:"CLOSED AT",text:Object(N.a)(t.state.timestamp)})),b.a.createElement(F.b,{xs:12,sm:12,className:T()(k.a.section,"show-sm")},b.a.createElement(A.a,{label:"HASH",text:t.state.hash,isLong:!0}))),b.a.createElement(F.i,null,b.a.createElement(F.b,{xs:6,sm:6,md:2,className:k.a.section},b.a.createElement(A.a,{label:"TRANSACTIONS",text:t.state.transactions&&t.state.transactions.length})),b.a.createElement(F.b,{xs:6,sm:6,md:2,className:k.a.section},b.a.createElement(A.a,{label:"OPERATIONS",text:t.state.operations&&t.state.operations.length}))))},t.renderOperationsRecord=function(e){return b.a.createElement(b.a.Fragment,null,e.map(function(e,a){return b.a.createElement(b.a.Fragment,{key:a},b.a.createElement("div",{className:T()(O.a.body,"hidden-sm")},b.a.createElement("a",{href:"/"+t.props.match.params.network+"/ledgers/"+e.id.split(".")[0],className:x.a.id},e.id),b.a.createElement("div",{className:x.a.description},b.a.createElement(S.a,{operation:e,env:"/"+t.props.match.params.network})),b.a.createElement("div",{className:x.a.created},Object(N.d)(e.timestamp)," ago")),b.a.createElement("div",{className:T()(O.a.body,"show-sm","flex-column")},b.a.createElement("div",{className:"d-flex justify-content-between w-100"},b.a.createElement("a",{href:"/"+t.props.match.params.network+"/ledgers/"+e.id.split(".")[0],className:x.a.id},e.id),b.a.createElement("div",{className:x.a.created},Object(N.d)(e.timestamp)," ago")),b.a.createElement("div",{className:x.a.description},b.a.createElement(S.a,{operation:e,env:"/"+t.props.match.params.network}))))}))},t.renderOprationsHistory=function(){var e=t.state.operations;return b.a.createElement("div",{className:T()(x.a.history)},b.a.createElement("div",{className:x.a.header},b.a.createElement("h2",null,"Operations History")),b.a.createElement("div",{className:O.a.table},b.a.createElement("div",{className:T()(O.a.header,"hidden-sm")},b.a.createElement("div",{className:x.a.id},"Id"),b.a.createElement("div",{className:x.a.description}),b.a.createElement("div",{className:x.a.created},"Created")),t.renderOperationsRecord(e)))},t.state={operations:[]},t}return Object(_.a)(a,e),Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this,a=this.props.match.params.id;e.setState({sequence:a}),y.Apis.instance(c.a.getEnv().WEBSOCKET_PATH,!0,3e3,{enableOrders:!1}).init_promise.then(function(t){y.Apis.instance().db_api().exec("list_assets",["A",100]).then(function(e){return window.assets=D.a.keyBy(e,"id"),window.assetsBySymbol=D.a.keyBy(e,"symbol"),e}).then(function(t){y.Apis.instance().db_api().exec("get_block",[a]).then(function(){var t=Object(o.a)(m.a.mark(function t(n){var r,s,c,l,o,i,d,E,p,_;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r=[],s=!0,c=!1,l=void 0,t.prev=4,o=n.transactions[Symbol.iterator]();case 6:if(s=(i=o.next()).done){t.next=21;break}d=i.value,E=0;case 9:if(!(E<d.operations.length)){t.next=18;break}return t.next=12,Object(N.c)(d.operations[E],y.Apis);case 12:p=t.sent,_={block:a,timestamp:n.timestamp,id:a+"."+E},r.push(Object(u.a)({},p,_));case 15:E++,t.next=9;break;case 18:s=!0,t.next=6;break;case 21:t.next=27;break;case 23:t.prev=23,t.t0=t.catch(4),c=!0,l=t.t0;case 27:t.prev=27,t.prev=28,s||null==o.return||o.return();case 30:if(t.prev=30,!c){t.next=33;break}throw l;case 33:return t.finish(30);case 34:return t.finish(27);case 35:e.setState({hash:n.transaction_merkle_root,timestamp:n.timestamp,transactions:n.transactions,operations:r});case 36:case"end":return t.stop()}},t,this,[[4,23,27,35],[28,,30,34]])}));return function(e){return t.apply(this,arguments)}}())})})}},{key:"render",value:function(){var e=this.props,a=e.isFetching,t=e.ledger;return a||!t?b.a.createElement(b.a.Fragment,null):b.a.createElement(b.a.Fragment,null,this.renderDetails(),b.a.createElement("div",{className:k.a.main},this.renderOprationsHistory()))}}]),a}(h.Component);g.a.func,g.a.shape,g.a.bool,g.a.arrayOf,g.a.object;I.defaultProps={operations:[]};var C=I;a.default=Object(n.b)(function(e){return{ledger:e.ledgers.ledger.ledger,isFetching:e.ledgers.ledger.isFetching,operations:e.ledgers.ledger.operations}},function(e){return{fetchLedger:function(a){var t=a.id;e(Object(r.f)({id:t}))},fetchLedgerOperations:function(a){var t=a.id;e(Object(r.g)({id:t,searchParams:{limit:s.SETTINGS.RECENT_ITEM_LENGTH,order:"desc"}}))}}})(C)}}]);
//# sourceMappingURL=13.14a963f5.chunk.js.map