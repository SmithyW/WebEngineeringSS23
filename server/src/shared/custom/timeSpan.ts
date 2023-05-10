/**
 * Custom Object to store TimeSpan including hours and minutes
 */
export class TimeSpan {
    hours: number;
    minutes: number;

    constructor(hours: number, minutes: number) {
        if (hours < 0) {
            throw new Error("Hours must be greater than 0");
        }
        this.hours = hours;
        if (minutes < 0 || minutes > 59) {
            throw new Error("Minutes must be in range(0,59)");
        }
        this.minutes = minutes;
    }

    // Class iinstance methods

    /**
     * Adds a TimeSpan to the current instance
     * @param ts TimeSpan to be added
     */
    add(ts: TimeSpan): void {
        this.hours += ts.hours;
        this.minutes += ts.minutes;
        if (this.minutes > 59) {
            this.minutes -= 60;
            this.hours += 1;
        }
    }

    /**
     * Subtracts a TimeSpan from the current instance
     * @param ts TimeSpan to be subtracted
     */
    subtract(ts: TimeSpan): void {
        this.hours -= ts.hours;
        this.minutes -= ts.minutes;
        if (this.minutes < 0) {
            this.minutes += 60;
            this.hours -= 1;
        }
        if (this.hours < 0) {
            this.hours = 0;
            this.minutes = 0;
        }
    }

    /**
     * Converts a TimeSpan Object to a string representation
     * @returns String representation of TimeSpan formatted to HH:mm
     */
    toString(): String {
        return `${this.hours}:${this.toTwoDigits(this.minutes)}`;
    }

    // Static class methods

    /**
     * Takes a Date object and extracts the time to create a new TimeSpan instance
     * @param date Date object
     * @returns new TimeSpan instance
     */
    static fromDate(date: Date): TimeSpan {
        return new TimeSpan(date.getHours(), date.getMinutes());
    }

    // Private helper methods
    /**
     * Converts a Number to two digit string representation
     * @param num Number to convert
     * @returns Two digit string value of number
     */
    private toTwoDigits(num: number): String {
        return num.toLocaleString("de-DE", { minimumIntegerDigits: 2 });
    }
}