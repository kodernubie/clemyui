import { Control } from "./control";
import { EventEmitter } from "./eventEmitter";
import { Event } from "./const"
import { Font } from "./font"
import { ItemList } from "./itemlist"

class SelectItem extends EventEmitter {

    constructor(code, caption) {

        super()

        this._code = code
        this._caption = caption
    }

    get code() {
        return this._code
    }

    set code(data) {
        this._code = data
        this.emit(Event.CHANGE, this, "code")
    }

    get caption() {
        return this._caption
    }

    set caption(data) {
        this._caption = data
        this.emit(Event.CHANGE, this, "caption")
    }
}

class SelectItemList extends ItemList {

    addItem(code, caption) {

        this.add(new SelectItem(code, caption))
    }

    delItem(code) {

        for (var item of this._listSet) {

            if (item.code == code) {

                this.del(item)
                break       
            }
        }
    }

    setItems(items) {

        this.pauseEvent()
        this.clear()
        
        for (var item of items) {

            this.add(new SelectItem(item["code"], item["caption"]))
        }

        this.resumeEvent()
        this.emit(Event.CHANGE, this)
    }

    indexOf(code) {

        let ret = -1
        let i = 0

        for (var item of this._listSet) {
        
            if (item.code == code) {

                ret = i
                break
            } else
                i++
        }

        return ret
    }
}

class Select extends Control {

    constructor(config, child) {
        super(config, child)

        this._font = new Font()
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender))

        this._listItem = new SelectItemList()
        this._listItem.on(Event.CHANGE, (sender) => this.renderItem(sender))

    }    

    applyFont(sender) {

        if (this._canvas != undefined) {

            this._canvas.style.font = sender.name
            this._canvas.style.fontSize = sender.size
            this._canvas.style.color = sender.color
        }
    }

    renderItem() {

        if (this._canvas != undefined && this._listItem != undefined) {

            let strOption = ""

            for (var item of this._listItem._listSet) {

                strOption += "<option value=\"" +  item.code + "\">" + item.caption + "</option>"
            }

            this._canvas.innerHTML = strOption
        }
    }

    get selectedItem() {

        let ret = undefined 
        
        if (this._canvas != undefined && this._listItem != undefined)
            ret = this._listItem.get(this._canvas.selectedIndex)

        return ret 
    }

    set selectedItem(data) {

        if (this._canvas != undefined && this._listItem != undefined) {

            let idx = this._listItem.indexOf(data)

            if (idx >= 0)
                this._canvas.selectedIndex = idx
        } 
    }

    get selectedIndex() {
        if (this._canvas != undefined)
            return this._canvas.selectedIndex
        else
            return -1
    }

    set selectedIndex(index) {

        if (this._canvas != undefined)
            this._canvas.selectedIndex = index
    }

    get items() {

        return this._listItem
    }

    set items(data) {

        if (data instanceof SelectItemList) {

            this._listItem = data
            this._listItem.on(Event.CHANGE, (sender, field) => this.renderItem())
            this._listItem.emit(Event.CHANGE, this._listItem)
        } else {
            this._listItem.setItems(data)
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

    doRender(parentCanvas) {

        this._canvas = document.createElement("select")
        this.renderItem()

        this._canvas.onchange = () => this.emit(Event.CHANGE, this)
        this._canvas.onfocus = () => this.emit(Event.FOCUS, this)
        this._canvas.onblur = () => this.emit(Event.LOSTFOCUS, this)

        parentCanvas.appendChild(this._canvas)
    }
}

export { SelectItem, SelectItemList, Select }