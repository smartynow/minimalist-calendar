import './style.css'
import {defaultClass} from "./options.js";
import {MinimalistCalendar} from "./calendar.js";

const calendarSelector = `.${defaultClass}`;
const calendarEls = document.querySelectorAll(calendarSelector);
calendarEls.forEach((calendarEl) => {
    new MinimalistCalendar(calendarEl);
});