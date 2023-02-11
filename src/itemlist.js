import { EventEmitter } from "./eventEmitter"
import { Event } from "./const"

class ItemList extends EventEmitter {

    _listSet = new Set()

    add(item) {

        this._listSet.add(item)
        item.on(Event.CHANGE, () => {
            this.emit(Event.CHANGE, this, item)
        })
    }

    del(item) {

        this._listSet.delete(item)
        this.emit(Event.CHANGE, this)
    }

    clear() {
        this._listSet.clear()
        this.emit(Event.CHANGE, this)
    }

    get(index) {
        let i = 0
        let ret = undefined

        for (var item of this._listSet) {
            if (i == index) {

                ret = item
                break
            } else
                i++
        }

        return ret
    }
}

export { ItemList }