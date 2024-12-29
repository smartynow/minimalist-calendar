const o = "minimalist-calendar", u = {
  startWeekOn: "mon",
  inputName: "selected-date",
  lang: "en-US",
  activeClass: `${o}--show`,
  selectedEl: {
    tagName: "span",
    className: `${o}__selected`,
    idName: "date-input",
    textContent: "Select date"
  },
  wrapperEl: {
    tagName: "div",
    className: `${o}__wrapper`
  },
  monthNavigatorEl: {
    tagName: "div",
    className: `${o}__month-navigator`
  },
  previousMonthButton: {
    tagName: "button",
    className: `${o}__prev-month`,
    textContent: "←"
  },
  nextMonthButton: {
    tagName: "button",
    className: `${o}__next-month`,
    textContent: "→"
  },
  currentMonthEl: {
    tagName: "span",
    className: `${o}__current-month`
  },
  weekdaysEl: {
    tagName: "ul",
    className: `${o}__weekdays`
  },
  weekdayEl: {
    tagName: "li",
    className: `${o}__weekday`
  },
  daysEl: {
    tagName: "div",
    className: `${o}__days`
  },
  dayEl: {
    tagName: "button",
    className: `${o}__day`
  }
};
class m {
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
class E {
  constructor(t, e = {}) {
    this.datepickerEls = document.querySelectorAll(t), this.options = { ...u, ...e }, this.instances = /* @__PURE__ */ new Map(), this.datepickerEls.forEach((n) => {
      if (!(n instanceof HTMLElement))
        throw new Error("Invalid argument: element must be an HTMLElement.");
      const a = {
        datepickerEl: n,
        weekManager: new m(),
        currentDate: /* @__PURE__ */ new Date(),
        selectedEl: this.createElement(n, this.options.selectedEl),
        wrapperEl: this.createElement(n, this.options.wrapperEl)
      };
      a.monthNavigatorEl = this.createElement(a.wrapperEl, this.options.monthNavigatorEl), a.previousMonthButton = this.createElement(a.monthNavigatorEl, this.options.previousMonthButton), a.currentMonthEl = this.createElement(a.monthNavigatorEl, this.options.currentMonthEl), a.nextMonthButton = this.createElement(a.monthNavigatorEl, this.options.nextMonthButton), a.weekdaysEl = this.createElement(a.wrapperEl, this.options.weekdaysEl), a.daysEl = this.createElement(a.wrapperEl, this.options.daysEl), a.hiddenInput = this.createHiddenInput(a.datepickerEl), a.dayClickHandler = (s) => this.handleDayClick(s, a), a.toggleDatepicker = () => this.toggleDatepicker(a), a.closeDatepicker = () => this.closeDatepicker(a), this.instances.set(n, a), this.initInstance(a);
    });
  }
  createElement(t, e) {
    const { tagName: n, className: a, textContent: s, idName: i } = e;
    if (!t)
      throw new Error("Parent element not found.");
    if (!n)
      throw new Error("Tag name not found.");
    const r = document.createElement(n);
    return a && (r.className = a), s && (r.textContent = s), i && (r.id = i), n === "button" && r.setAttribute("type", "button"), t.appendChild(r), r;
  }
  createHiddenInput(t, e = this.options.inputName) {
    if (!t)
      throw new Error("Input container not found.");
    if (!e)
      throw new Error("Input name not found.");
    const n = document.createElement("input");
    return n.type = "hidden", n.name = e, t.appendChild(n), n;
  }
  closeAllExcept(t) {
    this.instances.forEach((e) => {
      e !== t && this.closeDatepicker(e);
    });
  }
  toggleDatepicker(t) {
    if (t.datepickerEl)
      !t.datepickerEl.classList.contains(this.options.activeClass) ? (this.closeAllExcept(t), this.openInstance = t) : this.openInstance = null, t.datepickerEl.classList.toggle(this.options.activeClass), t.datepickerEl.classList.contains(this.options.activeClass) ? t.daysEl.addEventListener("click", t.dayClickHandler) : t.daysEl.removeEventListener("click", t.dayClickHandler);
    else
      throw new Error("Datepicker element not found.");
  }
  closeDatepicker(t) {
    if (t.datepickerEl)
      t.datepickerEl.classList.remove(this.options.activeClass), t.daysEl.removeEventListener("click", t.dayClickHandler), this.openInstance === t && (this.openInstance = null);
    else
      throw new Error("Datepicker element not found.");
  }
  setMonth(t) {
    if (!t.currentMonthEl)
      throw new Error("Month element not found.");
    const e = this.options.lang;
    t.currentMonthEl.textContent = t.currentDate.toLocaleString(e, {
      month: "long",
      year: "numeric"
    });
  }
  setWeekdays(t) {
    const { tagName: e, className: n } = this.options.weekdayEl;
    if (!t.weekdaysEl)
      throw new Error("Weekdays element not found.");
    if (!n)
      throw new Error("Weekday class not found.");
    t.weekdaysEl.innerHTML = "", t.weekManager.weekdaysList.forEach((a) => {
      this.createElement(t.weekdaysEl, {
        tagName: e,
        className: n,
        textContent: a
      });
    });
  }
  setDays(t) {
    const { tagName: e, className: n } = this.options.dayEl;
    t.daysEl.innerHTML = "";
    const a = t.currentDate.getFullYear(), s = t.currentDate.getMonth(), i = new Date(a, s, 1).getDay(), r = new Date(a, s + 1, 0).getDate(), h = t.weekManager.originalWeekdaysList.indexOf(t.weekManager.startWeekOn), p = (i - h + 7) % 7;
    for (let l = 0; l < p; l++) {
      const c = document.createElement(e);
      c.className = `${n} ${n}--empty`, t.daysEl.appendChild(c);
    }
    for (let l = 1; l <= r; l++)
      this.createElement(t.daysEl, {
        tagName: e,
        className: n,
        textContent: l
      });
  }
  handleDayClick(t, e) {
    const { className: n } = this.options.dayEl, a = `${n}--empty`, s = t.target;
    if (s.classList.contains(n) && !s.classList.contains(a)) {
      const i = parseInt(s.textContent);
      isNaN(i) || this.selectDate(i, e);
    }
  }
  selectDate(t, e) {
    const n = this.options.lang, a = new Date(
      e.currentDate.getFullYear(),
      e.currentDate.getMonth(),
      t
    ), s = a.toLocaleDateString(n, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }), i = a.toISOString().split("T")[0];
    e.selectedEl.textContent = s, e.hiddenInput.value = i, this.closeDatepicker(e);
  }
  renderCalendar(t) {
    this.setMonth(t), this.setWeekdays(t), this.setDays(t);
  }
  changeMonth(t, e) {
    let n = e.currentDate.getMonth() + t, a = e.currentDate.getFullYear();
    n < 0 ? (n = 11, a--) : n > 11 && (n = 0, a++), e.currentDate = new Date(a, n, 1), this.renderCalendar(e);
  }
  setupNavigationEvents(t) {
    if (!t.previousMonthButton || !t.nextMonthButton)
      throw new Error("Navigation buttons are not initialized");
    t.previousMonthButton.addEventListener("click", (e) => {
      e.preventDefault(), e.stopPropagation(), this.changeMonth(-1, t);
    }), t.nextMonthButton.addEventListener("click", (e) => {
      e.preventDefault(), e.stopPropagation(), this.changeMonth(1, t);
    });
  }
  setupOutsideClickHandler(t) {
    document.addEventListener("click", (e) => {
      Array.from(this.instances.values()).every(
        (a) => !a.datepickerEl.contains(e.target) && !a.wrapperEl.contains(e.target)
      ) && this.closeAllExcept(null);
    });
  }
  initInstance(t) {
    this.renderCalendar(t), t.selectedEl.addEventListener("click", (e) => {
      e.preventDefault(), e.stopPropagation(), t.toggleDatepicker();
    }), this.setupNavigationEvents(t), this.setupOutsideClickHandler(t);
  }
}
const g = `.${o}`;
new E(g);
export {
  E as MinimalistCalendar
};
