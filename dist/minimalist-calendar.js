const i = "minimalist-calendar", E = {
  startWeekOn: "mon",
  inputName: "selected-date",
  lang: "en-US",
  activeClass: `${i}--show`,
  selectedEl: {
    tagName: "span",
    className: `${i}__selected`,
    idName: "date-input",
    textContent: "Select date"
  },
  wrapperEl: {
    tagName: "div",
    className: `${i}__wrapper`
  },
  monthNavigatorEl: {
    tagName: "div",
    className: `${i}__month-navigator`
  },
  previousMonthButton: {
    tagName: "button",
    className: `${i}__prev-month`,
    textContent: "←"
  },
  nextMonthButton: {
    tagName: "button",
    className: `${i}__next-month`,
    textContent: "→"
  },
  currentMonthEl: {
    tagName: "span",
    className: `${i}__current-month`
  },
  weekdaysEl: {
    tagName: "ul",
    className: `${i}__weekdays`
  },
  weekdayEl: {
    tagName: "li",
    className: `${i}__weekday`
  },
  daysEl: {
    tagName: "ul",
    className: `${i}__days`
  },
  dayEl: {
    tagName: "li",
    className: `${i}__day`
  }
};
class u {
  constructor(t = "mon") {
    this.originalWeekdaysList = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], this.setStartWeekOn(t);
  }
  setStartWeekOn(t) {
    if (!this.originalWeekdaysList.includes(t))
      throw new Error(`Invalid day: ${t}`);
    const e = this.originalWeekdaysList.indexOf(t);
    this.weekdaysList = this.originalWeekdaysList.slice(e).concat(this.originalWeekdaysList.slice(0, e)), this.startWeekOn = t;
  }
}
class g {
  constructor(t, e = {}) {
    if (!(t instanceof HTMLElement))
      throw new Error("Invalid argument: element must be an HTMLElement.");
    this.options = { ...E, ...e }, this.weekManager = new u(), this.currentDate = /* @__PURE__ */ new Date(), this.datepickerEl = t, this.selectedEl = this.createElement(this.datepickerEl, this.options.selectedEl), this.wrapperEl = this.createElement(this.datepickerEl, this.options.wrapperEl), this.monthNavigatorEl = this.createElement(this.wrapperEl, this.options.monthNavigatorEl), this.previousMonthButton = this.createElement(this.monthNavigatorEl, this.options.previousMonthButton), this.currentMonthEl = this.createElement(this.monthNavigatorEl, this.options.currentMonthEl), this.nextMonthButton = this.createElement(this.monthNavigatorEl, this.options.nextMonthButton), this.weekdaysEl = this.createElement(this.wrapperEl, this.options.weekdaysEl), this.daysEl = this.createElement(this.wrapperEl, this.options.daysEl), this.hiddenInput = this.createHiddenInput(), this.dayClickHandler = (n) => this.handleDayClick(n), this.init();
  }
  createElement(t, e) {
    const { tagName: n, className: s, textContent: a, idName: l } = e;
    if (!t)
      throw new Error("Parent element not found.");
    if (!n)
      throw new Error("Tag name not found.");
    const o = document.createElement(n);
    return s && (o.className = s), a && (o.textContent = a), l && (o.id = l), t.appendChild(o), o;
  }
  createHiddenInput(t = this.datepickerEl, e = this.options.inputName) {
    if (!t)
      throw new Error("Input container not found.");
    if (!e)
      throw new Error("Input name not found.");
    const n = document.createElement("input");
    return n.type = "hidden", n.name = e, t.appendChild(n), n;
  }
  toggleDatepicker() {
    if (this.datepickerEl)
      this.datepickerEl.classList.toggle(this.options.activeClass), this.datepickerEl.classList.contains(this.options.activeClass) ? this.daysEl.addEventListener("click", this.dayClickHandler) : this.daysEl.removeEventListener("click", this.dayClickHandler);
    else
      throw new Error("Datepicker element not found.");
  }
  closeDatepicker() {
    if (this.datepickerEl)
      this.datepickerEl.classList.remove(this.options.activeClass), this.daysEl.removeEventListener("click", this.dayClickHandler);
    else
      throw new Error("Datepicker element not found.");
  }
  setMonth(t = this.currentMonthEl) {
    if (!t)
      throw new Error("Month element not found.");
    const e = this.options.lang;
    t.textContent = this.currentDate.toLocaleString(e, {
      month: "long",
      year: "numeric"
    });
  }
  setWeekdays(t = this.weekdaysEl, e = this.options.weekdayEl) {
    const { tagName: n, className: s } = e;
    if (!t)
      throw new Error("Weekdays element not found.");
    if (!s)
      throw new Error("Weekday class not found.");
    t.innerHTML = "", this.weekManager.weekdaysList.forEach((a) => {
      this.createElement(t, {
        tagName: n,
        className: s,
        textContent: a
      });
    });
  }
  setDays(t = this.daysEl, e = this.options.dayEl) {
    const { tagName: n, className: s } = e;
    t.innerHTML = "";
    const a = this.currentDate.getFullYear(), l = this.currentDate.getMonth(), o = new Date(a, l, 1).getDay(), d = new Date(a, l + 1, 0).getDate(), m = this.weekManager.originalWeekdaysList.indexOf(this.weekManager.startWeekOn), p = (o - m + 7) % 7;
    for (let r = 0; r < p; r++) {
      const c = document.createElement(n);
      c.className = `${s} ${s}--empty`, t.appendChild(c);
    }
    for (let r = 1; r <= d; r++)
      this.createElement(t, {
        tagName: n,
        className: s,
        textContent: r
      });
  }
  handleDayClick(t) {
    const { className: e } = this.options.dayEl, n = `${e}--empty`, s = t.target;
    if (s.classList.contains(e) && !s.classList.contains(n)) {
      const a = parseInt(s.textContent);
      isNaN(a) || this.selectDate(a), this.selectDate(a);
    }
  }
  selectDate(t) {
    const e = this.options.lang, n = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      t
    ), s = n.toLocaleDateString(e, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }), a = n.toISOString().split("T")[0];
    this.selectedEl.textContent = s, this.hiddenInput.value = a, this.closeDatepicker();
  }
  renderCalendar() {
    this.setMonth(), this.setWeekdays(), this.setDays();
  }
  changeMonth(t) {
    let e = this.currentDate.getMonth() + t, n = this.currentDate.getFullYear();
    e < 0 ? (e = 11, n--) : e > 11 && (e = 0, n++), this.currentDate = new Date(n, e, 1), this.renderCalendar();
  }
  setupNavigationEvents() {
    if (!this.previousMonthButton || !this.nextMonthButton)
      throw new Error("Navigation buttons are not initialized");
    this.previousMonthButton.addEventListener("click", (t) => {
      t.preventDefault(), t.stopPropagation(), this.changeMonth(-1);
    }), this.nextMonthButton.addEventListener("click", (t) => {
      t.preventDefault(), t.stopPropagation(), this.changeMonth(1);
    });
  }
  setupOutsideClickHandler() {
    document.addEventListener("click", (t) => {
      !this.datepickerEl.contains(t.target) && !this.wrapperEl.contains(t.target) && this.closeDatepicker();
    });
  }
  init() {
    this.renderCalendar(), this.selectedEl.addEventListener("click", (t) => {
      t.preventDefault(), t.stopPropagation(), this.toggleDatepicker();
    }), this.setupNavigationEvents(), this.setupOutsideClickHandler();
  }
}
const k = `.${i}`, y = document.querySelectorAll(k);
y.forEach((h) => {
  new g(h);
});
export {
  g as MinimalistCalendar
};
