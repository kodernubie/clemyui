class EventEmitter {

    _handlerMap = new Map()
    _eventHandler = undefined
    _eventPaused = false
    _onEventResume = undefined

    set eventHandler(handler) {
        this._eventHandler = handler
    }

    get eventHandler() {
        return this._eventHandler
    }

    pauseEvent() {
        this._eventPaused = true
    }

    resumeEvent() {
        
        this._eventPaused = false

        if (typeof(this._onEventResume) == "function")
            this._onEventResume()
    }

    on(eventName, handler) {

        let handlerList = undefined

        if  (!this._handlerMap.has(eventName)) {

            handlerList = new Set()
            this._handlerMap.set(eventName, handlerList)
        }

        handlerList.add(handler)
    }

    emit(eventName, ...args) {

        if (!this._eventPaused && this._handlerMap.has(eventName)) {

            let handlerList = this._handlerMap.get(eventName)

            for (var item of handlerList) {
                
                if (typeof(item) == "function") {

                    item(...args)
                } else if (typeof(item) == "string") {

                    if (this.eventHandler != undefined && 
                        typeof(this.eventHandler[item]) == "function")

                    this.eventHandler[item].apply(this.eventHandler, args)
                }
            }
        }
    }
}

export { EventEmitter }