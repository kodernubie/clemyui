import { Control } from "./control";
import { Event } from "./const"
import { Font } from "./font"

class TextBox extends Control {

    static TEXT = "text"
    static NUMBER = "number"
    static MAIL = "mail"
    static PASSWORD = "password"
    static DATE = "date"
    static TIME = "time"
    static DATETIME = "lodatetime-localstFocus"

    constructor(config, child) {
        super(config, child)

        this._font = new Font()
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender))
    }

    applyFont(sender) {

        if (this._canvas != undefined) {

            this._canvas.style.font = sender.name
            this._canvas.style.fontSize = sender.size
            this._canvas.style.color = sender.color
        }
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data
            this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender))
            this._font.emit(Event.CHANGE, this._font, "all")
        } else {
            this._font.applyConfig(data)
        } 
    }

    get font() {
        return this._font
    }

    set type(data) {

        this._type = data
        
        if (this._canvas != undefined)
            this._canvas.type = data
    }

    get type() {
        return this._type
    }

    set placeholder(data) {

        this._placeholder = data
        
        if (this._canvas != undefined)
            this._canvas.placeholder = data
    }

    get placeholder() {
        return this._placeholder
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("input")
        this._canvas.type = this.getConf("type", "text")

        this._canvas.onclick = () => this.emit(Event.CLICK, this)
        this._canvas.onfocus = () => this.emit(Event.FOCUS, this)
        this._canvas.onblur = () => this.emit(Event.LOSTFOCUS, this)

        parentCanvas.appendChild(this._canvas)
    }
}

export { TextBox }