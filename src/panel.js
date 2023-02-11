import { Container } from "./container"
import { Border } from "./border"
import { Event } from "./const"

class Panel extends Container {

    constructor(config = undefined, childs = undefined) {

        super(config, childs)

        this._border = new Border()
        this._border.on(Event.CHANGE, (sender) => this.applyBorder(sender)) 
    }

    applyBoder(sender) {

        switch (sender.mode) {
            case Border.MODE_NONE :
                break
            case Border.MODE_BOX :
                break 
        }
    }
}

export { Panel }