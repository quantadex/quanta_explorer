(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{426:function(t,e){},651:function(t,e,n){t.exports={container:"Object_container__1a8fo"}},682:function(t,e,n){"use strict";n.r(e);var r=n(421),a=n.n(r),i=n(422),c=n(118),o=n(119),s=n(121),u=n(120),p=n(122),l=n(2),f=n.n(l),h=n(123),b=n(651),d=n.n(b),j=n(419),m=n(63),_=n.n(m),v=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(s.a)(this,Object(u.a)(e).call(this,t))).state={object:""},n}return Object(p.a)(e,t),Object(o.a)(e,[{key:"getObject",value:function(t){var e=this;j.Apis.instance().db_api().exec("get_objects",[[t]]).then(function(){var e=Object(i.a)(a.a.mark(function e(n){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("null"!==(r=JSON.stringify(n[0],null,4))){e.next=5;break}return e.next=4,fetch(_.a.getEnv().API_PATH+"account?filter_field=operation_history__op_object__order_id&filter_value=".concat(t)).then(function(t){return t.json()}).then(function(t){return t[0]&&JSON.stringify(t[0].operation_history.op_object,null,4)||"null"});case 4:r=e.sent;case 5:return e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).then(function(n){e.setState({object:n,id:t})})}},{key:"componentDidMount",value:function(){var t=this,e=this.props.match.params.id;j.Apis.instance(_.a.getEnv().WEBSOCKET_PATH,!0,3e3,{enableOrders:!1}).init_promise.then(function(n){t.getObject(e)})}},{key:"componentWillReceiveProps",value:function(t){t.match.params.id!==this.state.id&&this.getObject(t.match.params.id)}},{key:"render",value:function(){return f.a.createElement("div",{className:d.a.container},f.a.createElement("h4",null,"Object - ",this.props.match.params.id),f.a.createElement("pre",null,this.state.object))}}]),e}(l.Component),O=Object(h.b)(function(t){return{environmentType:t.header.environmentType}})(v);n.d(e,"default",function(){return O})}}]);
//# sourceMappingURL=23.1399330f.chunk.js.map