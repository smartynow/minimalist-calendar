The `README` looks clear and well-organized, but I noticed a few minor adjustments that could enhance clarity and correctness. Here's the improved version with some recommendations:

---

# Minimalist Calendar

Minimalist Calendar is a lightweight, customizable calendar component built using vanilla JavaScript and CSS. It allows you to create and manage a calendar with features like date selection, month navigation, and a responsive design.

## Features

- **Date Selection:** Select a date by clicking on a day.
- **Month Navigation:** Navigate through months using the next and previous buttons.
- **Customizable:** Easily customize styles, text, and behavior via options.
- **Responsive Design:** The calendar adapts to different screen sizes.
- **Language Support:** Supports localization for different languages (default is English).
- **Hidden Input:** Allows integration with forms by updating a hidden input field with the selected date.

## Installation

You can either clone the repository or download the source files.

### Clone with Git:
```bash
git clone https://github.com/yourusername/minimalist-calendar.git
```

### Include in HTML:
Alternatively, you can include the `minimalist-calendar.js` and `minimalist-calendar.css` files directly in your HTML project.

```html
<script src="path/to/minimalist-calendar.js" type="module"></script>
<link rel="stylesheet" href="path/to/minimalist-calendar.css">
```

## Usage

1. **Include the necessary files**:
   - `minimalist-calendar.js`
   - `minimalist-calendar.css`

2. **Create a container element for the calendar**:
   ```html
   <div class="minimalist-calendar"></div>
   ```

3. **Initialize the calendar (Optional)**:
   ```javascript
   import { MinimalistCalendar } from './minimalist-calendar.js';

   const calendar = new MinimalistCalendar('.minimalist-calendar', {});
   ```

4. **Customize the CSS**:
   - Modify the CSS to match your design by changing classes such as `.minimalist-calendar`, `.minimalist-calendar__day`, etc.

## Options

You can customize the calendar by passing an options object to the constructor:

- `lang` (String): The language for the calendar (default: `'en'`).
- `activeClass` (String): The CSS class for the active state (default: `'active'`).
- `selectedEl` (Object): The selected date element's tag name, class name, and text content (default: `{ tagName: 'span', className: 'selected-date', textContent: 'Select Date' }`).
- `wrapperEl` (Object): The wrapper element's tag name and class name (default: `{ tagName: 'div', className: 'calendar-wrapper' }`).
- `monthNavigatorEl` (Object): The month navigator element's tag name and class name (default: `{ tagName: 'div', className: 'month-navigator' }`).
- `previousMonthButton` (Object): The previous month button's tag name, class name, and text content (default: `{ tagName: 'button', className: 'prev-month', textContent: 'Prev' }`).
- `nextMonthButton` (Object): The next month button's tag name, class name, and text content (default: `{ tagName: 'button', className: 'next-month', textContent: 'Next' }`).
- `weekdaysEl` (Object): The weekdays container's tag name and class name (default: `{ tagName: 'div', className: 'weekdays' }`).
- `dayEl` (Object): The day button's tag name and class name (default: `{ tagName: 'button', className: 'day' }`).

## Example

Here's a simple example of how the calendar looks and works:

```html
<!-- Datepicker -->
<div class="minimalist-calendar reservation-form__input reservation-form__input--date"></div>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues or submit pull requests if you want to improve the project!

## Acknowledgements

- Inspired by various minimalist calendar designs.
- Built with pure JavaScript and CSS.