import { Component } from "./component.js";

class Control extends Component {

    _canvas = undefined
    _clientCanvas = undefined

    constructor(config = undefined) {

        super(config)
    }

    get canvas() {
        return this._canvas
    }

    get clientCanvas() {
        return this._clientCanvas
    }
    
    get visible() {
        return this._visible
    }

    set visible(data) {

        this._visible = data

        if (this._canvas != undefined)
            this._canvas.style.display = "none"
    }

    get left() {
        return this._left
    }

    set left(data) {
        
        this._left = data

        if (this._canvas != undefined) {
            this._canvas.style.position = "absolute"
            this._canvas.style.left = data
        }
    }

    get top() {
        return this._top
    }

    set top(data) {
        
        this._top = data

        if (this._canvas != undefined) {
            this._canvas.style.position = "absolute"
            this._canvas.style.top = data
        }
    }
    
    render() {
        
        if ((this.parent != undefined) && 
            (this.parent.clientCanvas != undefined)) {

            this.setDefaultConf(this._config)

            this.doRender(this.parent.clientCanvas)

            this.applyConfig(this._config)
        }
    }

    doRender(parentCanvas) {
    }
}

export { Control }