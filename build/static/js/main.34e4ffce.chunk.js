(this["webpackJsonpcheck-in"]=this["webpackJsonpcheck-in"]||[]).push([[0],{14:function(e,t,n){},30:function(e,t,n){e.exports=n.p+"static/media/AppLab.55f63b92.png"},33:function(e,t,n){e.exports=n(62)},38:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(17),l=n.n(o),r=(n(38),n(10)),i=n(11),u=n(13),s=n(12),m=(n(14),n(7)),h=n(1),d=n(30),p=n.n(d),E=function(){return c.a.createElement("div",{class:"container"},c.a.createElement("div",{class:"column"},c.a.createElement("h1",null,"  Welcome to the"),c.a.createElement("img",{src:p.a,class:"App-logo",alt:"logo"})),c.a.createElement("div",{class:"column"},c.a.createElement(m.b,{to:"/check-in"},c.a.createElement("button",{class:"home",type:"button"},"Check In")),c.a.createElement("br",null),c.a.createElement(m.b,{to:"/check-out"},c.a.createElement("button",{class:"home",type:"button"},"Check Out"))))},f=n(15),v=n.n(f),b=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"SubmitCheckIn",value:function(e,t,n,a){if(!0!==a||""!==e&&""!==n)if(!1!==a||""!==e&&""!==t&&""!==n){var c=new Date,o=c.getFullYear()+"-"+(c.getMonth()+1)+"-"+c.getDate(),l=c.getHours()+":"+c.getMinutes();v()({method:"POST",url:"/api/checkins/",headers:{authorization:localStorage.token},data:{name:e,PID:t,date:o,timeIn:l,timeOut:"00:00",reason:n,staff:"",checkedIn:!0,hasPID:!a}}),this.props.history.push("")}else alert("Please enter name, PID, and reason for visit");else alert("Please enter name and reason for visit")}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{class:"checkin"},c.a.createElement("h2",null,"Check In"),c.a.createElement("form",{onSubmit:function(){e.SubmitCheckIn(document.getElementById("name").value,document.getElementById("pid").value,document.getElementById("reason").value,document.getElementById("noPID").checked)}},c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"Name:",c.a.createElement("input",{type:"text",name:"name",id:"name"}))),c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"PID:",c.a.createElement("input",{type:"text",name:"pid",id:"pid"})),c.a.createElement("br",null),c.a.createElement("input",{type:"checkbox",id:"noPID",class:"noPID"}),c.a.createElement("label",{id:"noPIDLabel",for:"noPID"}," Check if you are a non-UNC student or do not have a PID")),c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"Reason:",c.a.createElement("input",{type:"text",name:"reason",id:"reason"}))),c.a.createElement("button",{class:"check-in"},"Submit")))}}]),n}(c.a.Component),k=n(32),g=(n(61),function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).state={visitors:[]},e.submit=function(t){Object(k.confirmAlert)({customUI:function(n){var a=n.onClose;return c.a.createElement("div",{className:"custom-ui",class:"dialogdiv"},c.a.createElement("h1",null,"Are you sure you want to check out?"),c.a.createElement("button",{class:"dialog",onClick:function(){e.checkOut(t),a()}},"Yes"),c.a.createElement("button",{class:"dialog",onClick:a},"No"))}})},e}return Object(i.a)(n,[{key:"getVisitors",value:function(){var e=this;v.a.get("/api/checkins/").then((function(t){var n=t.data.filter((function(e){return!0===e.checkedIn}));e.setState({visitors:n})}))}},{key:"componentDidMount",value:function(){this.getVisitors()}},{key:"checkOut",value:function(e){var t=new Date,n=t.getHours()+":"+t.getMinutes();e.name,e.PID,e.date,e.timeIn,e.reason,e.staff;v()({method:"PUT",url:"/api/checkins/".concat(e.id,"/"),headers:{authorization:localStorage.token},data:{name:e.name,PID:e.PID,date:e.date,timeIn:e.timeIn,timeOut:n,reason:e.reason,checkedIn:!1,staff:e.staff}}),this.props.history.push("")}},{key:"render",value:function(){var e=this,t=this.state.visitors;return c.a.createElement("div",{class:"checkout"},c.a.createElement("h2",null,"Check Out"),c.a.createElement("p",null,"Select your name to check out"),c.a.createElement("div",{class:"grid"},c.a.createElement("section",{class:"grid"},t.map((function(t,n){return c.a.createElement("button",{class:"gridEl",key:n,onClick:function(){return e.submit(t)}},c.a.createElement("p",null,t.name),c.a.createElement("p",null,t.PID))})))))}}]),n}(c.a.Component)),I=function(){return c.a.createElement("div",null,c.a.createElement(m.b,{to:"/"},"Home"))},y=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return c.a.createElement(m.a,null,c.a.createElement("div",null,c.a.createElement(I,null),c.a.createElement(h.c,null,c.a.createElement(h.a,{path:"/",component:E,exact:!0}),c.a.createElement(h.a,{path:"/check-in",component:b}),c.a.createElement(h.a,{path:"/check-out",component:g}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,1,2]]]);
//# sourceMappingURL=main.34e4ffce.chunk.js.map