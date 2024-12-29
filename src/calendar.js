import {WeekManager} from './weekManager.js';
import {defaultOptions} from "./options.js";

export class MinimalistCalendar {
  constructor(selector, options = {}) {
    this.datepickerEls = document.querySelectorAll(selector);
    this.options = { ...defaultOptions, ...options };
    this.instances = new Map();

    this.datepickerEls.forEach((datepickerEl) => {
      if (!(datepickerEl instanceof HTMLElement)) {
        throw new Error("Invalid argument: element must be an HTMLElement.");
      }

      const instance = {
        datepickerEl,
        weekManager: new WeekManager(),
        currentDate: new Date(),
        selectedEl: this.createElement(datepickerEl, this.options.selectedEl),
        wrapperEl: this.createElement(datepickerEl, this.options.wrapperEl),
      };

      instance.monthNavigatorEl = this.createElement(instance.wrapperEl, this.options.monthNavigatorEl);
      instance.previousMonthButton = this.createElement(instance.monthNavigatorEl, this.options.previousMonthButton);
      instance.currentMonthEl = this.createElement(instance.monthNavigatorEl, this.options.currentMonthEl);
      instance.nextMonthButton = this.createElement(instance.monthNavigatorEl, this.options.nextMonthButton);
      instance.weekdaysEl = this.createElement(instance.wrapperEl, this.options.weekdaysEl);
      instance.daysEl = this.createElement(instance.wrapperEl, this.options.daysEl);
      instance.hiddenInput = this.createHiddenInput(instance.datepickerEl);

      // Bind event handlers to the specific instance
      instance.dayClickHandler = (event) => this.handleDayClick(event, instance);
      instance.toggleDatepicker = () => this.toggleDatepicker(instance);
      instance.closeDatepicker = () => this.closeDatepicker(instance);

      this.instances.set(datepickerEl, instance);
      this.initInstance(instance);
    });
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

  createHiddenInput(parent, inputName = this.options.inputName) {
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

  closeAllExcept(exceptInstance) {
    this.instances.forEach((instance) => {
      if (instance !== exceptInstance) {
        this.closeDatepicker(instance);
      }
    });
  }

  toggleDatepicker(instance) {
    if (instance.datepickerEl) {
      const isOpening = !instance.datepickerEl.classList.contains(this.options.activeClass);

      if (isOpening) {
        this.closeAllExcept(instance);
        this.openInstance = instance;
      } else {
        this.openInstance = null;
      }

      instance.datepickerEl.classList.toggle(this.options.activeClass);

      if (instance.datepickerEl.classList.contains(this.options.activeClass)) {
        instance.daysEl.addEventListener('click', instance.dayClickHandler);
      } else {
        instance.daysEl.removeEventListener('click', instance.dayClickHandler);
      }
    } else {
      throw new Error('Datepicker element not found.');
    }
  }

  closeDatepicker(instance) {
    if (instance.datepickerEl) {
      instance.datepickerEl.classList.remove(this.options.activeClass);
      instance.daysEl.removeEventListener('click', instance.dayClickHandler);
      if (this.openInstance === instance) {
        this.openInstance = null;
      }
    } else {
      throw new Error('Datepicker element not found.');
    }
  }

  setMonth(instance) {
    if (!instance.currentMonthEl) {
      throw new Error('Month element not found.');
    }

    const lang = this.options.lang;

    instance.currentMonthEl.textContent = instance.currentDate.toLocaleString(lang, {
      month: 'long',
      year: 'numeric'
    });
  }

  setWeekdays(instance) {
    const {tagName, className} = this.options.weekdayEl;

    if (!instance.weekdaysEl) {
      throw new Error('Weekdays element not found.');
    }

    if (!className) {
      throw new Error('Weekday class not found.');
    }

    instance.weekdaysEl.innerHTML = '';

    instance.weekManager.weekdaysList.forEach((day) => {
      this.createElement(instance.weekdaysEl, {
        tagName,
        className,
        textContent: day,
      });
    });
  }

  setDays(instance) {
    const {tagName, className} = this.options.dayEl;

    instance.daysEl.innerHTML = '';

    const year = instance.currentDate.getFullYear();
    const month = instance.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startWeekDayIndex = instance.weekManager.originalWeekdaysList.indexOf(instance.weekManager.startWeekOn);
    const firstDayIndex = (firstDay - startWeekDayIndex + 7) % 7;

    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDay = document.createElement(tagName);
      emptyDay.className = `${className} ${className}--empty`;
      instance.daysEl.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.createElement(instance.daysEl, {
        tagName,
        className,
        textContent: i,
      });
    }
  }

  handleDayClick(event, instance) {
    const {className} = this.options.dayEl;
    const emptyClass = `${className}--empty`;
    const target = event.target;

    if (target.classList.contains(className) && !target.classList.contains(emptyClass)) {
      const day = parseInt(target.textContent);
      if (!isNaN(day)) {
        this.selectDate(day, instance);
      }
    }
  }

  selectDate(day, instance) {
    const lang = this.options.lang;
    const selectedDate = new Date(
      instance.currentDate.getFullYear(),
      instance.currentDate.getMonth(),
      day
    );

    const formattedDate = selectedDate.toLocaleDateString(lang, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const isoDate = selectedDate.toISOString().split('T')[0];

    instance.selectedEl.textContent = formattedDate;
    instance.hiddenInput.value = isoDate;

    this.closeDatepicker(instance);
  }

  renderCalendar(instance) {
    this.setMonth(instance);
    this.setWeekdays(instance);
    this.setDays(instance);
  }

  changeMonth(offset, instance) {
    let newMonth = instance.currentDate.getMonth() + offset;
    let newYear = instance.currentDate.getFullYear();
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    instance.currentDate = new Date(newYear, newMonth, 1);
    this.renderCalendar(instance);
  }

  setupNavigationEvents(instance) {
    if (!instance.previousMonthButton || !instance.nextMonthButton) {
      throw new Error("Navigation buttons are not initialized");
    }

    instance.previousMonthButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.changeMonth(-1, instance);
    });

    instance.nextMonthButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.changeMonth(1, instance);
    });
  }

  setupOutsideClickHandler(instance) {
    document.addEventListener('click', (e) => {
      const isOutsideAllDatepickers = Array.from(this.instances.values()).every(inst =>
        !inst.datepickerEl.contains(e.target) && !inst.wrapperEl.contains(e.target)
      );

      if (isOutsideAllDatepickers) {
        this.closeAllExcept(null); // Закрываем все датапикеры
      }
    });
  }


  initInstance(instance) {
    this.renderCalendar(instance);

    instance.selectedEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      instance.toggleDatepicker();
    });

    this.setupNavigationEvents(instance);
    this.setupOutsideClickHandler(instance);
  }
}