(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{429:function(e,t,a){"use strict";a.d(t,"e",function(){return l}),a.d(t,"d",function(){return i}),a.d(t,"a",function(){return d}),a.d(t,"b",function(){return u}),a.d(t,"c",function(){return v});var r=a(421),n=a.n(r),s=a(422),c=a(436),o=a.n(c),l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"m",a=arguments.length>2?arguments[2]:void 0,r=a?o.a.duration(o()(a).diff(o()(e))):o.a.duration(o()().diff(o()(e)));switch(t){case"ms":return r.asMilliseconds();default:return r.asMinutes()}};function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=new Date(e+"z"),r=new Date(a.setFullYear(a.getFullYear()-t)),n=(((new Date).getTime()-r.getTime())/1e3).toFixed(0);return n<3600?n+" seconds":n<86400?Math.round(n/60/60)+" hours":Math.round(n/60/60/24)+" days"}var d=function(e){return!(arguments.length>1&&void 0!==arguments[1])||arguments[1]?o.a.utc(e).format("DD MMM YYYY hh:mm:ss z"):o()(e).format("DD MMM YYYY hh:mm:ss z")},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.toLocaleString(navigator.language,{minimumFractionDigits:t})},m={};function g(e,t){return void 0!==m[e]?m[e]:t.instance().db_api().exec("get_accounts",[[e]]).then(function(t){return m[e]=t[0].name,t[0].name})}function v(e,t){return p.apply(this,arguments)}function p(){return(p=Object(s.a)(n.a.mark(function e(t,a){var r,s,c,o,l,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=t[0],s=t[1],i=!1,e.t0=r,e.next=0===e.t0?6:1===e.t0?9:2===e.t0?11:3===e.t0?13:4===e.t0?15:5===e.t0?17:6===e.t0?20:14===e.t0?22:15===e.t0?25:19===e.t0?27:22===e.t0?29:23===e.t0?31:33===e.t0?33:37===e.t0?35:49===e.t0?37:50===e.t0?39:41;break;case 6:return l=s.from,i=s.to,e.abrupt("break",42);case 9:return l=s.seller,e.abrupt("break",42);case 11:return l=s.fee_paying_account,e.abrupt("break",42);case 13:return l=s.funding_account,e.abrupt("break",42);case 15:return l=s.account_id,e.abrupt("break",42);case 17:return l=s.registrar,i=s.referrer,e.abrupt("break",42);case 20:return l=s.account,e.abrupt("break",42);case 22:return l=s.issuer,i=s.issue_to_account,e.abrupt("break",42);case 25:return l=s.payer,e.abrupt("break",42);case 27:return l=s.publisher,e.abrupt("break",42);case 29:case 31:return l=s.fee_paying_account,e.abrupt("break",42);case 33:return l=s.owner_,e.abrupt("break",42);case 35:return l=s.deposit_to_account,e.abrupt("break",42);case 37:case 39:return l=s.account_id,e.abrupt("break",42);case 41:throw t;case 42:if(!l){e.next=46;break}return e.next=45,g(l,a);case 45:c=e.sent;case 46:if(!i){e.next=50;break}return e.next=49,g(i,a);case 49:o=e.sent;case 50:return e.abrupt("return",{name1:c,name2:o,type:r,data:s});case 51:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}},440:function(e,t,a){e.exports={table:"tables_table__1NkJO",header:"tables_header___7bd5",body:"tables_body__xBiMY",footer:"tables_footer__19pKs",prevButton:"tables_prevButton__t9HoX"}},614:function(e,t,a){e.exports={details:"Ledgers_details__30O2U",content:"Ledgers_content__3uDCg",item:"Ledgers_item__1qISp",value:"Ledgers_value__DJET9",main:"Ledgers_main__1MQYC",history:"Ledgers_history__3Zk1D",created:"Ledgers_created__37nGN",sequence:"Ledgers_sequence__2IcJ2",transactions:"Ledgers_transactions__2_tJy",operations:"Ledgers_operations__A0BV6",description:"Ledgers_description__2LKjI"}},672:function(e,t,a){"use strict";a.r(t);var r=a(123),n=a(23),s=a(68),c=a(88),o=a(63),l=a.n(o),i=a(118),d=a(119),u=a(121),m=a(120),g=a(122),v=a(2),p=a.n(v),f=a(4),_=a.n(f),b=a(436),h=a.n(b),N=a(427),E=a.n(N),L=a(442),k=a(429),y=a(440),O=a.n(y),w=a(614),x=a.n(w),M=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getBlockAverageLatency=function(){var e=a.props.setAverageBlockLatency,t=a.state.ledgers,r=0;t.forEach(function(e,a){a!==t.length-1&&(r+=Object(k.e)(t[a+1].closed_at,"ms",e.closed_at))}),e(Math.round(r/(t.length-1)))},a.onNext=function(){var e=a.props,t=e.allLinks;(0,e.fetchAllLedgers)({url:t.next.href})},a.onPrev=function(){var e=a.props,t=e.allLinks;(0,e.fetchAllLedgers)({url:t.prev.href})},a.renderLedgersRecord=function(e){return p.a.createElement(p.a.Fragment,null,e.map(function(e){return p.a.createElement("div",{key:e.id,className:O.a.body},p.a.createElement("a",{href:"/ledgers/".concat(e.sequence),className:x.a.sequence},e.sequence),p.a.createElement("div",{className:x.a.transactions},e.transaction_count),p.a.createElement("div",{className:x.a.operations},e.operation_count),p.a.createElement("div",{className:x.a.created},"< ".concat(h()(e.closed_at).toNow(!0)," ago")))}))},a.renderLedgerHistory=function(){return p.a.createElement("div",{className:"hidden"},p.a.createElement("div",{className:x.a.header},p.a.createElement("h2",null,"Ledger History")),p.a.createElement("div",{className:O.a.table},p.a.createElement("div",{className:O.a.header},p.a.createElement("div",{className:x.a.sequence},"Sequence"),p.a.createElement("div",{className:x.a.transactions},"Transactions"),p.a.createElement("div",{className:x.a.operations},"Operations"),p.a.createElement("div",{className:x.a.created},"Created")),a.renderLedgersRecord(a.state.ledgers)))},a.renderAllLedgers=function(){var e=a.props,t=e.allLedgers,r=e.allLinks;return p.a.createElement("div",{className:x.a.history},p.a.createElement("h2",null,"Ledger History"),p.a.createElement("div",{className:O.a.table},p.a.createElement("div",{className:O.a.header},p.a.createElement("div",{className:x.a.sequence},"Sequence"),p.a.createElement("div",{className:x.a.transactions},"Transactions"),p.a.createElement("div",{className:x.a.operations},"Operations"),p.a.createElement("div",{className:x.a.created},"Created")),a.renderLedgersRecord(t)),p.a.createElement("div",{className:O.a.footer},p.a.createElement(L.a,{color:"primary",className:E()(O.a.prevButton,"hidden-sm"),onClick:a.onPrev,disabled:!r.prev},"Prev"),p.a.createElement(L.a,{color:"primary",className:E()(O.a.prevButton,"show-sm"),onClick:a.onPrev,disabled:!r.prev,size:"sm"},"Prev"),p.a.createElement(L.a,{color:"primary",className:"hidden-sm",onClick:a.onNext,disabled:!r.next},"Next"),p.a.createElement(L.a,{color:"primary",className:"show-sm",onClick:a.onNext,disabled:!r.next,size:"sm"},"Next")))},a.state={ledgersSource:new EventSource("".concat(l.a.ENVIRONMENT.HORIZON_SERVER,"/ledgers?order=asc&cursor=now")),ledgers:e.ledgers||[]},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,a=t.fetchLedgers,r=t.fetchMetrics,n=t.fetchNodeCount,s=t.fetchAllLedgers;a(),s({limit:15,order:"desc"}),n(),r(),this.state.ledgersSource.addEventListener(["message"],function(t){var a=e.state.ledgers;e.state.ledgers.length>0&&(a.unshift(JSON.parse(t.data)),e.getBlockAverageLatency(),r(),e.setState({ledgers:a.slice(0,l.a.SETTINGS.RECENT_ITEM_LENGTH)}))})}},{key:"componentWillReceiveProps",value:function(e){var t=this;this.props.ledgers!==e.ledgers&&this.setState({ledgers:e.ledgers.sort(function(e,t){return Object(k.e)(e.closed_at,"ms",t.closed_at)})},function(){t.getBlockAverageLatency()})}},{key:"render",value:function(){var e=this.props,t=e.metrics,a=e.averageBlockLatency,r=e.nodeCount;return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",{className:x.a.details},p.a.createElement("div",{className:x.a.content},p.a.createElement("div",{className:x.a.item},"Highest Block",t["history.latest_ledger"]&&p.a.createElement("div",{className:x.a.value},t["history.latest_ledger"].value)),p.a.createElement("div",{className:x.a.item},"Average Block Latency",p.a.createElement("div",{className:x.a.value},"".concat(a,"ms"))),p.a.createElement("div",{className:x.a.item},"Number of Nodes",p.a.createElement("div",{className:x.a.value},r)))),p.a.createElement("div",{className:x.a.main},this.renderAllLedgers(),this.renderLedgerHistory()))}}]),t}(v.Component),j=(_.a.func,_.a.arrayOf,_.a.object,_.a.shape,_.a.number,M);t.default=Object(r.b)(function(e){return{ledgers:e.ledgers.ledgers,allLedgers:e.ledgers.allLedgers.ledgers,allLinks:e.ledgers.allLedgers.links,metrics:e.metrics.metrics,averageBlockLatency:e.global.averageBlockLatency,nodeCount:e.global.nodeCount}},function(e){return{fetchLedgers:function(){e(Object(n.h)({limit:o.SETTINGS.RECENT_ITEM_LENGTH,order:"desc"}))},fetchAllLedgers:function(t){e(Object(n.e)(t))},fetchMetrics:function(){e(Object(s.b)())},setAverageBlockLatency:function(t){e(Object(c.b)(t))},fetchNodeCount:function(){e(Object(c.a)())}}})(j)}}]);
//# sourceMappingURL=12.dc6bc9c5.chunk.js.map