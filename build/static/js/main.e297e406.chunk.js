(this["webpackJsonpcheck-in"]=this["webpackJsonpcheck-in"]||[]).push([[0],{15:function(e,t,n){},32:function(e,t,n){e.exports=n.p+"static/media/AppLab.55f63b92.png"},36:function(e,t,n){e.exports=n(75)},41:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(19),s=n.n(c),o=(n(41),n(11)),r=n(12),l=n(14),u=n(13),m=(n(15),n(9)),h=n(1),d=n(32),g=n.n(d),b=function(){return i.a.createElement("div",{class:"container"},i.a.createElement("div",{class:"column"},i.a.createElement("h1",null,"  Welcome to the"),i.a.createElement("img",{src:g.a,class:"App-logo",alt:"logo"})),i.a.createElement("div",{class:"column"},i.a.createElement(m.b,{to:"/check-in"},i.a.createElement("button",{class:"home",type:"button"},"Check In")),i.a.createElement("br",null),i.a.createElement(m.b,{to:"/check-out"},i.a.createElement("button",{class:"home",type:"button"},"Check Out"))))},f=n(8),p=n(16),E=n.n(p),k=n(34),v=n.n(k),C=["Flyer","Poster","Sign in CS Building","Friend","Word of Mouth","Class Announcement","Email (Class)","Club Announcement","Email (Club)","Newsletter (Club)","WICS","Email (Department)","CS Newsletter","Newsletter (Department)","Department Announcement","Facebook","Instagram","Slack","App Lab Slack","Website","App Lab Website","Web Search","Google"];function y(e){if(""===e||0===e.trim().length)return C;var t=e.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&");if(""===t)return[];var n=new RegExp("^"+t,"i");return C.filter((function(e){return n.test(e)}))}function I(e){return e}function S(e){return i.a.createElement("span",{class:"suggestion"},e)}function O(e,t){return e.trim().length>0||"suggestions-revealed"===t||"suggestions-updated"===t||"render"===t}var D=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).onChange=function(t,n){var a=n.newValue;n.method;e.setState({value:a})},e.onSuggestionsFetchRequested=function(t){var n=t.value;e.setState({suggestions:y(n)})},e.onSuggestionsClearRequested=function(){e.setState({suggestions:[]})},e.state={isChecked:!1,firstTime:!1,value:"",suggestions:[]},e.handleChecked=e.handleChecked.bind(Object(f.a)(e)),e.handleFirstTimeChecked=e.handleFirstTimeChecked.bind(Object(f.a)(e)),e.onChange=e.onChange.bind(Object(f.a)(e)),e.onSuggestionsFetchRequested=e.onSuggestionsFetchRequested.bind(Object(f.a)(e)),e.onSuggestionsClearRequested=e.onSuggestionsClearRequested.bind(Object(f.a)(e)),e}return Object(r.a)(n,[{key:"SubmitCheckIn",value:function(e,t,n,a,i,c){if(!a||""!==e&&""!==n)if(a||""!==e&&""!==t&&""!==n)if(i&&""===c)alert("Please enter how you heard about the App Lab");else{var s=new Date,o=s.getFullYear()+"-"+(s.getMonth()+1)+"-"+s.getDate(),r=s.getHours()+":"+s.getMinutes();E()({method:"POST",url:"/api/checkins/",headers:{authorization:localStorage.token},data:{name:e,PID:t,date:o,timeIn:r,timeOut:"00:00",reason:n,staff:"",checkedIn:!0,hasPID:!a,firstTime:i,heard_about_al_through:c}}),this.props.history.push("")}else alert("Please enter name, PID, and reason for visit");else alert("Please enter name and reason for visit")}},{key:"handleChecked",value:function(){this.setState({isChecked:!this.state.isChecked})}},{key:"handleFirstTimeChecked",value:function(){this.setState({firstTime:!this.state.firstTime})}},{key:"render",value:function(){var e=this,t=this.state,n=t.value,a=t.suggestions,c={value:n,onChange:this.onChange};return i.a.createElement("div",{class:"checkin"},i.a.createElement("h2",null,"Check In"),i.a.createElement("form",{onSubmit:function(){e.SubmitCheckIn(document.getElementById("name").value,document.getElementById("pid").value,document.getElementById("reason").value,document.getElementById("noPID").checked,document.getElementById("firstTime").checked,e.state.value)}},i.a.createElement("div",{class:"textbox"},i.a.createElement("label",null,"Name:",i.a.createElement("input",{type:"text",name:"name",id:"name"}))),i.a.createElement("div",{class:"textbox"},i.a.createElement("label",null,"PID:",i.a.createElement("input",{type:"text",name:"pid",id:"pid",disabled:this.state.isChecked})),i.a.createElement("br",null),i.a.createElement("input",{type:"checkbox",id:"noPID",class:"noPID",onChange:this.handleChecked}),i.a.createElement("label",{id:"noPIDLabel",for:"noPID"}," Check if you are a non-UNC student or do not have a PID")),i.a.createElement("div",{class:"textbox"},i.a.createElement("label",null,"Reason:",i.a.createElement("input",{type:"text",name:"reason",id:"reason"}))),i.a.createElement("div",null,i.a.createElement("input",{type:"checkbox",id:"firstTime",class:"firstTime",onChange:this.handleFirstTimeChecked}),i.a.createElement("label",{id:"firstTimeLabel",for:"firstTime"}," Check if you are visiting the App Lab for the first time")),i.a.createElement("div",{class:"textbox",style:{display:this.state.firstTime?"block":"none"}},i.a.createElement("label",null,"How did you hear about us?"),i.a.createElement("br",null),i.a.createElement(v.a,{name:"hear",id:"hear",suggestions:a,onSuggestionsFetchRequested:this.onSuggestionsFetchRequested,onSuggestionsClearRequested:this.onSuggestionsClearRequested,getSuggestionValue:I,renderSuggestion:S,shouldRenderSuggestions:O,inputProps:c})),i.a.createElement("button",{class:"check-in"},"Submit")))}}]),n}(i.a.Component),P=n(35),w=(n(74),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={visitors:[]},e.submit=function(t){Object(P.confirmAlert)({customUI:function(n){var a=n.onClose;return i.a.createElement("div",{className:"custom-ui",class:"dialogdiv"},i.a.createElement("h1",null,"Are you sure you want to check out?"),i.a.createElement("button",{class:"dialog",onClick:function(){e.checkOut(t),a()}},"Yes"),i.a.createElement("button",{class:"dialog",onClick:a},"No"))}})},e}return Object(r.a)(n,[{key:"getVisitors",value:function(){var e=this;E.a.get("/api/checkins/").then((function(t){var n=t.data.filter((function(e){return!0===e.checkedIn}));e.setState({visitors:n})}))}},{key:"componentDidMount",value:function(){this.getVisitors()}},{key:"checkOut",value:function(e){var t=new Date,n=t.getHours()+":"+t.getMinutes();e.name,e.PID,e.date,e.timeIn,e.reason,e.staff;E()({method:"PUT",url:"/api/checkins/".concat(e.id,"/"),headers:{authorization:localStorage.token},data:{name:e.name,PID:e.PID,date:e.date,timeIn:e.timeIn,timeOut:n,reason:e.reason,checkedIn:!1,staff:e.staff}}),this.props.history.push("")}},{key:"render",value:function(){var e=this,t=this.state.visitors;return i.a.createElement("div",{class:"checkout"},i.a.createElement("h2",null,"Check Out"),i.a.createElement("p",null,"Select your name to check out"),i.a.createElement("div",{class:"grid"},i.a.createElement("section",{class:"grid"},t.map((function(t,n){return i.a.createElement("button",{class:"gridEl",key:n,onClick:function(){return e.submit(t)}},i.a.createElement("p",null,t.name),i.a.createElement("p",null,t.PID))})))))}}]),n}(i.a.Component)),j=function(){return i.a.createElement("div",null,i.a.createElement(m.b,{to:"/"},"Home"))},x=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return i.a.createElement(m.a,null,i.a.createElement("div",null,i.a.createElement(j,null),i.a.createElement(h.c,null,i.a.createElement(h.a,{path:"/",component:b,exact:!0}),i.a.createElement(h.a,{path:"/check-in",component:D}),i.a.createElement(h.a,{path:"/check-out",component:w}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[36,1,2]]]);
//# sourceMappingURL=main.e297e406.chunk.js.map