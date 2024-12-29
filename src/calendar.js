import {WeekManager} from './weekManager.js';
import {defaultOptions} from "./options.js";

export class MinimalistCalendar {
  constructor(element, options = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new Error("Invalid argument: element must be an HTMLElement.");
    }
    this.options = { ...defaultOptions, ...options };
    this.weekManager = new WeekManager();
    this.currentDate = new Date();
    this.datepickerEl = document.querySelector(selector);
    if (!this.datepickerEl) {
      throw new Error(`Element with selector "${selector}" not found.`);
    }
    this.selectedEl = this.createElement(this.datepickerEl,this.options.selectedEl);
    this.wrapperEl = this.createElement(this.datepickerEl,this.options.wrapperEl);
    this.monthNavigatorEl = this.createElement(this.wrapperEl, this.options.monthNavigatorEl);
    this.previousMonthButton = this.createElement(this.monthNavigatorEl, this.options.previousMonthButton);
    this.currentMonthEl = this.createElement(this.monthNavigatorEl, this.options.currentMonthEl);
    this.nextMonthButton = this.createElement(this.monthNavigatorEl, this.options.nextMonthButton);
    this.weekdaysEl = this.createElement(this.wrapperEl, this.options.weekdaysEl);
    this.daysEl = this.createElement(this.wrapperEl, this.options.daysEl);
    this.hiddenInput = this.createHiddenInput();

    this.dayClickHandler = (event) => this.handleDayClick(event);

    this.init();
  }

  createElement(parent, options) {
    const {tagName, className, textContent, idName} = options;

    if (!parent) {
      throw new Error('Parent element not found.');
    }

    if (!tagName) {
      throw new Error('Tag name not found.');
    }

    const element = document.createElement(tagName);

    className && (element.className = className);
    textContent && (element.textContent = textContent);
    idName && (element.id = idName);

    parent.appendChild(element);

    return element;
  }

  createHiddenInput(parent = this.datepickerEl, inputName = this.options.inputName) {
    if (!parent) {
      throw new Error('Input container not found.');
    }

    if (!inputName) {
      throw new Error('Input name not found.');
    }
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = inputName;
    parent.appendChild(hiddenInput);

    return hiddenInput;
  }

  toggleDatepicker() {
    if (this.datepickerEl) {
      this.datepickerEl.classList.toggle(this.options.activeClass);

      if (this.datepickerEl.classList.contains(this.options.activeClass)) {
        this.daysEl.addEventListener('click', this.dayClickHandler);
      } else {
        this.daysEl.removeEventListener('click', this.dayClickHandler);
      }
    } else {
      throw new Error('Datepicker element not found.');
    }
  }

  closeDatepicker() {
    if (this.datepickerEl) {
      this.datepickerEl.classList.remove(this.options.activeClass);
      this.daysEl.removeEventListener('click', this.dayClickHandler);
    } else {
      throw new Error('Datepicker element not found.');
    }
  }

  setMonth(parent = this.currentMonthEl) {
    if (!parent) {
      throw new Error('Month element not found.');
    }

    const lang = this.options.lang;

    parent.textContent = this.currentDate.toLocaleString(lang, {
      month: 'long',
      year: 'numeric'
    });
  }

  setWeekdays(parent = this.weekdaysEl, options = this.options.weekdayEl) {
    const {tagName, className} = options;

    if (!parent) {
      throw new Error('Weekdays element not found.');
    }

    if (!className) {
      throw new Error('Weekday class not found.');
    }

    parent.innerHTML = '';

    this.weekManager.weekdaysList.forEach((day) => {
      this.createElement(parent, {
        tagName,
        className,
        textContent: day,
      });
    });
  }

  setDays(parent = this.daysEl, options = this.options.dayEl) {
    const {tagName, className} = options;

    parent.innerHTML = '';

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startWeekDayIndex = this.weekManager.originalWeekdaysList.indexOf(this.weekManager.startWeekOn);
    const firstDayIndex = (firstDay - startWeekDayIndex + 7) % 7;

    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDay = document.createElement(tagName);
      emptyDay.className = `${className} ${className}--empty`;
      parent.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.createElement(parent, {
        tagName,
        className,
        textContent: i,
      });
    }
  }

  handleDayClick(event) {
    const {className} = this.options.dayEl;
    const emptyClass = `${className}--empty`;
    const target = event.target;

    if (target.classList.contains(className) && !target.classList.contains(emptyClass)) {
      const day = parseInt(target.textContent);
      if (!isNaN(day)) {
        this.selectDate(day);
      }
      this.selectDate(day);
    }
  }

  selectDate(day) {
    const lang = this.options.lang;
    const selectedDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
    );

    const formattedDate = selectedDate.toLocaleDateString(lang, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const isoDate = selectedDate.toISOString().split('T')[0];

    this.selectedEl.textContent = formattedDate;
    this.hiddenInput.value = isoDate;

    this.closeDatepicker();
  }

  renderCalendar() {
    this.setMonth();
    this.setWeekdays();
    this.setDays();
  }

  changeMonth(offset) {
    let newMonth = this.currentDate.getMonth() + offset;
    let newYear = this.currentDate.getFullYear();
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    this.currentDate = new Date(newYear, newMonth, 1);
    this.renderCalendar();
  }


  setupNavigationEvents() {
    if (!this.previousMonthButton || !this.nextMonthButton) {
      throw new Error("Navigation buttons are not initialized");
    }

    this.previousMonthButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.changeMonth(-1);
    });

    this.nextMonthButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.changeMonth(1);
    });
  }

  setupOutsideClickHandler() {
    document.addEventListener('click', (e) => {
      if (!this.datepickerEl.contains(e.target) &&
          !this.wrapperEl.contains(e.target)) {
        this.closeDatepicker();
      }
    });
  }

  init() {
    this.renderCalendar();

    this.selectedEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleDatepicker();
    });

    this.setupNavigationEvents();

    this.setupOutsideClickHandler();
  }
}