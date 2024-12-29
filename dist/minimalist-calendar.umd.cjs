(function(r,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(r=typeof globalThis<"u"?globalThis:r||self,s(r.MinimalistCalendar={}))})(this,function(r){"use strict";const s="minimalist-calendar",p={startWeekOn:"mon",inputName:"selected-date",lang:"en-US",activeClass:`${s}--show`,selectedEl:{tagName:"span",className:`${s}__selected`,idName:"date-input",textContent:"Select date"},wrapperEl:{tagName:"div",className:`${s}__wrapper`},monthNavigatorEl:{tagName:"div",className:`${s}__month-navigator`},previousMonthButton:{tagName:"button",className:`${s}__prev-month`,textContent:"←"},nextMonthButton:{tagName:"button",className:`${s}__next-month`,textContent:"→"},currentMonthEl:{tagName:"span",className:`${s}__current-month`},weekdaysEl:{tagName:"ul",className:`${s}__weekdays`},weekdayEl:{tagName:"li",className:`${s}__weekday`},daysEl:{tagName:"ul",className:`${s}__days`},dayEl:{tagName:"li",className:`${s}__day`}};class u{constructor(t="mon"){this.originalWeekdaysList=["sun","mon","tue","wed","thu","fri","sat"],this.setStartWeekOn(t)}setStartWeekOn(t){if(!this.originalWeekdaysList.includes(t))throw new Error(`Invalid day: ${t}`);const e=this.originalWeekdaysList.indexOf(t);this.weekdaysList=this.originalWeekdaysList.slice(e).concat(this.originalWeekdaysList.slice(0,e)),this.startWeekOn=t}}class d{constructor(t,e={}){if(!(t instanceof HTMLElement))throw new Error("Invalid argument: element must be an HTMLElement.");this.options={...p,...e},this.weekManager=new u,this.currentDate=new Date,this.datepickerEl=t,this.selectedEl=this.createElement(this.datepickerEl,this.options.selectedEl),this.wrapperEl=this.createElement(this.datepickerEl,this.options.wrapperEl),this.monthNavigatorEl=this.createElement(this.wrapperEl,this.options.monthNavigatorEl),this.previousMonthButton=this.createElement(this.monthNavigatorEl,this.options.previousMonthButton),this.currentMonthEl=this.createElement(this.monthNavigatorEl,this.options.currentMonthEl),this.nextMonthButton=this.createElement(this.monthNavigatorEl,this.options.nextMonthButton),this.weekdaysEl=this.createElement(this.wrapperEl,this.options.weekdaysEl),this.daysEl=this.createElement(this.wrapperEl,this.options.daysEl),this.hiddenInput=this.createHiddenInput(),this.dayClickHandler=n=>this.handleDayClick(n),this.init()}createElement(t,e){const{tagName:n,className:a,textContent:i,idName:c}=e;if(!t)throw new Error("Parent element not found.");if(!n)throw new Error("Tag name not found.");const o=document.createElement(n);return a&&(o.className=a),i&&(o.textContent=i),c&&(o.id=c),t.appendChild(o),o}createHiddenInput(t=this.datepickerEl,e=this.options.inputName){if(!t)throw new Error("Input container not found.");if(!e)throw new Error("Input name not found.");const n=document.createElement("input");return n.type="hidden",n.name=e,t.appendChild(n),n}toggleDatepicker(){if(this.datepickerEl)this.datepickerEl.classList.toggle(this.options.activeClass),this.datepickerEl.classList.contains(this.options.activeClass)?this.daysEl.addEventListener("click",this.dayClickHandler):this.daysEl.removeEventListener("click",this.dayClickHandler);else throw new Error("Datepicker element not found.")}closeDatepicker(){if(this.datepickerEl)this.datepickerEl.classList.remove(this.options.activeClass),this.daysEl.removeEventListener("click",this.dayClickHandler);else throw new Error("Datepicker element not found.")}setMonth(t=this.currentMonthEl){if(!t)throw new Error("Month element not found.");const e=this.options.lang;t.textContent=this.currentDate.toLocaleString(e,{month:"long",year:"numeric"})}setWeekdays(t=this.weekdaysEl,e=this.options.weekdayEl){const{tagName:n,className:a}=e;if(!t)throw new Error("Weekdays element not found.");if(!a)throw new Error("Weekday class not found.");t.innerHTML="",this.weekManager.weekdaysList.forEach(i=>{this.createElement(t,{tagName:n,className:a,textContent:i})})}setDays(t=this.daysEl,e=this.options.dayEl){const{tagName:n,className:a}=e;t.innerHTML="";const i=this.currentDate.getFullYear(),c=this.currentDate.getMonth(),o=new Date(i,c,1).getDay(),g=new Date(i,c+1,0).getDate(),y=this.weekManager.originalWeekdaysList.indexOf(this.weekManager.startWeekOn),k=(o-y+7)%7;for(let l=0;l<k;l++){const m=document.createElement(n);m.className=`${a} ${a}--empty`,t.appendChild(m)}for(let l=1;l<=g;l++)this.createElement(t,{tagName:n,className:a,textContent:l})}handleDayClick(t){const{className:e}=this.options.dayEl,n=`${e}--empty`,a=t.target;if(a.classList.contains(e)&&!a.classList.contains(n)){const i=parseInt(a.textContent);isNaN(i)||this.selectDate(i),this.selectDate(i)}}selectDate(t){const e=this.options.lang,n=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),t),a=n.toLocaleDateString(e,{year:"numeric",month:"2-digit",day:"2-digit"}),i=n.toISOString().split("T")[0];this.selectedEl.textContent=a,this.hiddenInput.value=i,this.closeDatepicker()}renderCalendar(){this.setMonth(),this.setWeekdays(),this.setDays()}changeMonth(t){let e=this.currentDate.getMonth()+t,n=this.currentDate.getFullYear();e<0?(e=11,n--):e>11&&(e=0,n++),this.currentDate=new Date(n,e,1),this.renderCalendar()}setupNavigationEvents(){if(!this.previousMonthButton||!this.nextMonthButton)throw new Error("Navigation buttons are not initialized");this.previousMonthButton.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this.changeMonth(-1)}),this.nextMonthButton.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this.changeMonth(1)})}setupOutsideClickHandler(){document.addEventListener("click",t=>{!this.datepickerEl.contains(t.target)&&!this.wrapperEl.contains(t.target)&&this.closeDatepicker()})}init(){this.renderCalendar(),this.selectedEl.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this.toggleDatepicker()}),this.setupNavigationEvents(),this.setupOutsideClickHandler()}}const E=`.${s}`;document.querySelectorAll(E).forEach(h=>{new d(h)}),r.MinimalistCalendar=d,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});