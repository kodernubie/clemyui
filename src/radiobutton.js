import { Control } from "./control";
import { Event } from "./const";
import { Font } from "./font";

class RadioButton extends Control {

    constructor(config = undefined, childs = undefined) {
        super(config, childs)

        this._font = new Font()
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender))
    }

    applyFont(sender) {

        if (this._canvas != undefined) {

            this._canvas.style.font = sender.name
            this._canvas.style.fontSize = sender.size
            this._canvas.style.color = sender.color

            this._canvas.style.fontWeight = sender.bold ? "bold" : "normal"
            this._canvas.style.fontStyle = sender.italic ? "italic" : "normal"

            let decor = sender.underline ? "underline" : ""

            decor += sender.strikethrough ? " line-through" : ""
            
            this._canvas.style.textDecoration = decor
        }
    }

    set caption(data) {

        this._caption = data
        
        if (this._canvas != undefined)
            this._canvas.lastChild.innerHTML = data
    }

    get caption() {
        return this._caption
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

    set selected(data) {

        if (this._canvas != undefined) {
            this._canvas.firstChild.selected = data
        }
    }

    get selected() {

        if (this._canvas != undefined) {
            return this._canvas.firstChild.checked
        } else 
            return false
    }

    set group(data) {

        if (this._canvas != undefined) {
            this._canvas.firstChild.name = data
        }
    }

    get group() {

        if (this._canvas != undefined) {
            return this._canvas.firstChild.name
        } else 
            return ""
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("label")

        let strChecked = ""
        if (this.getConf("selected", false))
            strChecked = "checked"
        
            this._canvas.innerHTML = 
        `<input type="radio" name="` + this.getConf("group", "") + `" ` + strChecked + `>
        <span class="checkable">` + this.getConf("caption", "") + `</span>`
        
        let cbxCanvas = this._canvas.firstChild
        cbxCanvas.onchange = () => this.emit(Event.CHANGE, this)

        parentCanvas.appendChild(this._canvas)
    }
}

export { RadioButton }