import { Control } from "./control.js";
import { Event } from "./const.js"
import { Font } from "./font.js"

class Label extends Control {

    constructor(config = undefined) {
        super(config)

        this._font = new Font()
        this._font.on(Event.CHANGE, (sender, field) => {

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
        })
    }

    set caption(data) {

        this._caption = data
        
        if (this._canvas != undefined)
            this._canvas.innerHTML = data
    }

    get caption() {
        return this._caption
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data
            this._font.emit(Event.CHANGE, this._font, "all")
        } else {
            this._font.applyConfig(data)
        } 
    }

    get font() {
        return this._font
    }

    set width(data) {

        this._width = data
        
        if (this._canvas != undefined)
            this._canvas.style.width = data
    }

    get width() {
        return this._width
    } 

    set height(data) {
        this._height = data
        
        if (this._canvas != undefined) {
            this._canvas.style.height = data
            this._canvas.style.overflow = "clip"
        }
    }

    get height() {
        return this._height
    } 

    set horAlign(data) {

        this._horAlign = data

        if (this._canvas != undefined)
            this._canvas.style.textAlign = data
    }

    get horAlign() {
        return this._horAlign
    }

    setDefaultConf(config) {

        super.setDefaultConf(config)

        config["caption"] = this.getConf("caption", "label")
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("div")
        
        this._canvas.onclick = () => this.emit(Event.CLICK, this)

        parentCanvas.appendChild(this._canvas)
    }
} 

export { Label }