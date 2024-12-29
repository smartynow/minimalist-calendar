const defaultClass = "minimalist-calendar";

const defaultOptions = {
    startWeekOn: "mon",
    inputName: "selected-date",
    lang: 'en-US',
    activeClass: `${defaultClass}--show`,
    selectedEl: {
        tagName: "span",
        className: `${defaultClass}__selected`,
        idName: "date-input",
        textContent: "Select date",
    },
    wrapperEl: {
        tagName: "div",
        className: `${defaultClass}__wrapper`,
    },
    monthNavigatorEl: {
        tagName: "div",
        className: `${defaultClass}__month-navigator`,
    },
    previousMonthButton: {
        tagName: "button",
        className: `${defaultClass}__prev-month`,
        textContent: "←",
    },
    nextMonthButton: {
        tagName: "button",
        className: `${defaultClass}__next-month`,
        textContent: "→",
    },
    currentMonthEl: {
        tagName: "span",
        className: `${defaultClass}__current-month`,
    },
    weekdaysEl: {
        tagName: "ul",
        className: `${defaultClass}__weekdays`,
    },
    weekdayEl: {
        tagName: "li",
        className: `${defaultClass}__weekday`,
    },
    daysEl: {
        tagName: "ul",
        className: `${defaultClass}__days`,
    },
    dayEl: {
        tagName: "li",
        className: `${defaultClass}__day`,
    }
};

export {defaultClass, defaultOptions};