export class WeekManager {
    constructor(startWeekOn = 'mon') {
        this.originalWeekdaysList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        this.setStartWeekOn(startWeekOn);
    }
    setStartWeekOn(startWeekOn) {
        if (!this.originalWeekdaysList.includes(startWeekOn)) {
            throw new Error(`Invalid day: ${startWeekOn}`);
        }
        const index = this.originalWeekdaysList.indexOf(startWeekOn);
        this.weekdaysList = this.originalWeekdaysList
            .slice(index)
            .concat(this.originalWeekdaysList.slice(0, index));
        this.startWeekOn = startWeekOn;
    }
}