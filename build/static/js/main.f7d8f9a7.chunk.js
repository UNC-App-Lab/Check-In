(this["webpackJsonpcheck-in"]=this["webpackJsonpcheck-in"]||[]).push([[0],{15:function(e,t,n){},31:function(e,t,n){e.exports=n.p+"static/media/AppLab.55f63b92.png"},35:function(e,t,n){e.exports=n(64)},40:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(18),o=n.n(l),r=(n(40),n(10)),i=n(11),u=n(13),s=n(12),m=n(14),h=(n(15),n(7)),p=n(6),E=n(31),d=n.n(E),b=function(){return c.a.createElement("div",null,c.a.createElement("div",{class:"row"},c.a.createElement("div",{class:"column"},c.a.createElement("h1",null,"  Welcome to the"),c.a.createElement("img",{src:d.a,className:"App-logo",alt:"logo"})),c.a.createElement("div",{class:"column"},c.a.createElement(h.b,{to:"/check-in"},c.a.createElement("button",{type:"button",class:"home"},"Check In")),c.a.createElement("br",null),c.a.createElement(h.b,{to:"/check-out"},c.a.createElement("button",{type:"button",class:"home"},"Check Out")))))},v=n(16),f=n.n(v),k=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"SubmitCheckIn",value:function(e,t,n){var a=new Date,c={name:e,PID:t,date:a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate(),timeIn:a.getHours()+":"+a.getMinutes(),timeOut:"00:00",reason:n,checkedIn:!0,staff:""};f.a.post("http://127.0.0.1:8000/api/checkins/",c),this.props.history.push("")}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{class:"checkin"},c.a.createElement("h2",null,"Check In"),c.a.createElement("form",null,c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"Name:",c.a.createElement("input",{type:"text",name:"name",id:"name"}))),c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"PID:",c.a.createElement("input",{type:"text",name:"pid",id:"pid"})),c.a.createElement("p",null,"(Scanner can be used to input PID)")),c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"Reason:",c.a.createElement("input",{type:"text",name:"reason",id:"reason"}))),c.a.createElement("input",{class:"submit",type:"submit",value:"Submit",onClick:function(){e.SubmitCheckIn(document.getElementById("name").value,document.getElementById("pid").value,document.getElementById("reason").value)}})))}}]),t}(c.a.Component),y=n(34),g=(n(63),function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,l=new Array(a),o=0;o<a;o++)l[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={visitors:[]},n.submit=function(e){Object(y.confirmAlert)({customUI:function(t){var a=t.onClose;return c.a.createElement("div",{className:"custom-ui",class:"dialogdiv"},c.a.createElement("h1",null,"Are you sure you want to check out?"),c.a.createElement("button",{class:"dialog",onClick:function(){n.checkOut(e),a()}},"Yes"),c.a.createElement("button",{class:"dialog",onClick:a},"No"))}})},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"getVisitors",value:function(){var e=this;f.a.get("http://127.0.0.1:8000/api/checkins/").then((function(t){var n=t.data.filter((function(e){return!0===e.checkedIn}));e.setState({visitors:n})}))}},{key:"componentDidMount",value:function(){this.getVisitors()}},{key:"checkOut",value:function(e){var t=new Date,n=t.getHours()+":"+t.getMinutes(),a={name:e.name,PID:e.PID,date:e.date,timeIn:e.timeIn,timeOut:n,reason:e.reason,checkedIn:!1,staff:e.staff};f.a.put("http://127.0.0.1:8000/api/checkins/".concat(e.id,"/"),a),this.props.history.push("")}},{key:"render",value:function(){var e=this,t=this.state.visitors;return c.a.createElement("div",{class:"checkout"},c.a.createElement("h2",null,"Check Out"),c.a.createElement("p",null,"Select your name to check out"),c.a.createElement("div",null,c.a.createElement("section",null,t.map((function(t,n){return c.a.createElement("button",{key:n,onClick:function(){return e.submit(t)}},c.a.createElement("p",null,t.name),c.a.createElement("p",null,t.PID))})))))}}]),t}(c.a.Component)),O=function(){return c.a.createElement("div",null,c.a.createElement(h.b,{to:"/"},"Home"))},I=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return c.a.createElement(h.a,null,c.a.createElement("div",null,c.a.createElement(O,null),c.a.createElement(p.c,null,c.a.createElement(p.a,{path:"/",component:b,exact:!0}),c.a.createElement(p.a,{path:"/check-in",component:k}),c.a.createElement(p.a,{path:"/check-out",component:g}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[35,1,2]]]);
//# sourceMappingURL=main.f7d8f9a7.chunk.js.map