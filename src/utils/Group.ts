import InputDetails from "../types/InputDetails";

export default class Group {
    constructor(public items: InputDetails[]= [], public activeIndex = 0) { }

    get active() {
        return this.items[this.activeIndex];
    }

    get first() {
        return this.items[0];
    }

    get last() {
        return this.items[this.items.length - 1];
    }
}