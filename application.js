import { Container } from "./container.js"

class Application extends Container {
    
    constructor(config = undefined, childs = undefined) {

        super(config, childs)

        this.eventHandler = this 
    }

    start(canvas) {

        this._clientCanvas = canvas
        
        this._clientCanvas.innerHTML = ""
        this._clientCanvas.style.position = "absolute"
        this._clientCanvas.style.width = "100%"
        this._clientCanvas.style.height = "100%"        
        this._clientCanvas.style.margin = "0 0 0 0"
        this._clientCanvas.style.padding = "0 0 0 0"

        this.render()
    }

    render() {
        
        this.doRender()

        for (var child of this._childs) {

            if (typeof child["render"] == "function")
                child.render()
        }
    }
}

export { Application }