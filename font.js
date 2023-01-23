import { Component } from "./component.js"
import { Event } from "./const.js"

class Font extends Component {

    constructor(config) {

        super(config)

        this._onEventResume = () => this.emit(Event.CHANGE, this, "all")
        this.applyConfig()
    }

    set name(data) {
        this._name = data
        this.emit(Event.CHANGE, this, "name")
    }

    get name() {
        return this._name
    }

    set size(data) {
        this._size = data
        this.emit(Event.CHANGE, this, "size")
    }

    get size() {
        return this._size
    }

    set color(data) {
        this._color = data
        this.emit(Event.CHANGE, this, "color")
    }

    get color() {
        return this._color
    }

    set bold(data) {
        this._bold = data
        this.emit(Event.CHANGE, this, "bold")
    }

    get bold() {
        return this._bold
    }

    set italic(data) {
        this._italic = data
        this.emit(Event.CHANGE, this, "italic")
    }

    get italic() {
        return this._italic
    }

    set underline(data) {
        this._underline = data
        this.emit(Event.CHANGE, this, "underline")
    }

    get underline() {
        return this._underline
    }

    set strikethrough(data) {
        this._strikethrough = data
        this.emit(Event.CHANGE, this, "strikethrough")
    }

    get strikethrough() {
        return this._strikethrough
    }
} 

export { Font }