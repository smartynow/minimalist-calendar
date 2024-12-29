import './style.css'
import {defaultClass} from "./options.js";
import {MinimalistCalendar} from "./calendar.js";

const calendarSelector = `.${defaultClass}`;

new MinimalistCalendar(calendarSelector);

export { MinimalistCalendar } from "./calendar.js";
