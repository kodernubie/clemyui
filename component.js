import { EventEmitter } from "./eventEmitter.js";

class Component extends EventEmitter {
    
    _config = {}
    
    constructor(config = undefined) {

        super()

        if (config != undefined)
            this._config = config
    }

    get eventHandler() {

        let ret = this._eventHandler

        if (ret == undefined && this.parent != undefined) {

            ret = this.parent.eventHandler
        }

        return ret
    }
    
    set eventHandler(handler) {

        if (handler == true)
            handler = this
        
        this._eventHandler = handler
    }

    set name(data) {
        this._name = data
    }
    
    get name() {
        return this._name
    }
    
    getConf(name, defaultVal) {

        return this._config[name] == undefined ? defaultVal : this._config[name]
    }

    setDefaultConf(config) {
    }

    applyConfig(config = undefined) {

        this.pauseEvent()

        if (config != undefined)
            this._config = config

        for (var i in this._config) {
            
            if (i.length > 2 && 
                i.startsWith("on") && 
                i[2] == i[2].toUpperCase()) {

                this.on(i[2].toLowerCase() + i.substring(3), this._config[i])
            } else if (i in this) {

                Reflect.set(this, i, this._config[i], this)
            }
        }

        this.resumeEvent()
    }
}

export { Component }