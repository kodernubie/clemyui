import { Control } from "./control.js";

class Container extends Control {

    _childs = new Set()

    constructor(config = undefined, childs = undefined) {

        super(config)

        this._childs = childs

        for (var child of this._childs) {

            child.parent = this
        }
    }

    get childs() {
        return this._childs
    }

    getChild(name) {

        let ret = undefined
        
        for (var child of this._childs) {

            if (child.name == name) {

                ret = child
                break
            }
        }

        return ret
    }

    render() {
        
        if ((this.parent != undefined) && 
            (this.parent.clientCanvas != undefined)) {
            
            this.doRender(this.parent.clientCanvas)

            for (var child of this._childs) {

                if (typeof child["render"] == "function")
                    child.render()
            }
        }
    }
}

export { Container }