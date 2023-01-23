import { Control } from "./control.js";
import { Event } from "./const.js"

class Button extends Control {
  
    static NORMAL = "normal"
    static SUCCESS = "success"
    static WARNING = "warning"
    static ERROR = "error"

    static SIZE_BIG = "big"
    static SIZE_NORMAL = "normal"
    static SIZE_SMALL = "small"

    constructor(config = undefined) {
        super(config)
    }

    set focusable(data) {
        this._focusable = data
    }

    get focusable() {
        return this._focusable
    }

    set caption(data) {

        this._caption = data
        
        if (this._canvas != undefined)
            this._canvas.innerHTML = data
    }

    get caption() {
        return this._caption
    }

    set mode(data) {

        this._mode = data

        if (this._canvas != undefined) {

            this._canvas.classList.remove(Button.SUCCESS);
            this._canvas.classList.remove(Button.ERROR);
            this._canvas.classList.remove(Button.WARNING);

            if (data != Button.NORMAL)
                this._canvas.classList.add(data);
        }
    }

    get mode() {
        return this._mode
    }

    set size(data) {

        this._size = data

        if (this._canvas != undefined) {

            switch (data) {
                case Button.SIZE_BIG :
                    this._canvas.style.fontSize = "1.5em" 
                    break
                case Button.SIZE_NORMAL :
                    this._canvas.style.fontSize = "1em" 
                    break
                case Button.SIZE_SMALL :
                    this._canvas.style.fontSize = "0.75em" 
                    break
            }
        }
    }

    get size() {
        return this._size
    }

    setDefaultConf(config) {

        super.setDefaultConf(config)

        config["focusable"] = this.getConf("focusable", true)
        config["caption"] = this.getConf("caption", "button")
    }

    doRender(parentCanvas) {

        if (this.getConf("focusable")) {
            this._canvas = document.createElement("button")
        } else {
            this._canvas = document.createElement("a")
        }

        this._canvas.onclick = () => this.emit(Event.CLICK, this)
        this._canvas.onfocus = () => this.emit(Event.FOCUS, this)
        this._canvas.onblur = () => this.emit(Event.LOSTFOCUS, this)

        parentCanvas.appendChild(this._canvas)
    }
} 

export { Button }