import { Component } from "./component"
import { Event } from "./const"

class Border extends Component {

    static MODE_BOX = "box"
    static MODE_NONE = "none"

    constructor(config) {

        super(config)
    }

    set mode(data) {
        this._mode = data
        this.emit(Event.CHANGE, this, "color") 
    }

    get mode() {
        return this._mode
    }
 
    set color(data) {
        this._color = data
        this.emit(Event.CHANGE, this, "color")
    }
    
    get color() { 
        return this._color
    }

    set weight(data) {
        this._weight = data
        this.emit(Event.CHANGE, this, "weight")
    }
    
    get weight() { 
        return this._weight
    }

    set left(data) {
        this._left = data
        this.emit(Event.CHANGE, this, "left")
    }

    get left() { 
        return this._left
    }

    set top(data) {
        this._top = data
        this.emit(Event.CHANGE, this, "top")
    }

    get top() { 
        return this._top
    }

    set right(data) {
        this._right = data
        this.emit(Event.CHANGE, this, "right")
    }

    get right() { 
        return this._right
    }

    set bottom(data) {
        this._bottom = data
        this.emit(Event.CHANGE, this, "bottom")
    }

    get bottom() { 
        return this._bottom
    }
}

export { Border }