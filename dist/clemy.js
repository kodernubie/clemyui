class Align {

    static LEFT = "left"
    static RIGHT = "right"
    static CENTER = "center"
    static JUSTIFY = "justify"
}

class Color {

    static RED = "#FF0000"
    static GREEN = "#00FF00"
    static BLUE = "#0000FF"
    static WHITE = "#FFFFFF"
    static BLACK = "#000000"
}

class Event {

    static CHANGE = "change"
    static CLICK = "click"
    static FOCUS = "focus"
    static LOSTFOCUS = "lostFocus"
}

class EventEmitter {

    _handlerMap = new Map()
    _eventHandler = undefined
    _eventPaused = false
    _onEventResume = undefined

    set eventHandler(handler) {
        this._eventHandler = handler;
    }

    get eventHandler() {
        return this._eventHandler
    }

    pauseEvent() {
        this._eventPaused = true;
    }

    resumeEvent() {
        
        this._eventPaused = false;

        if (typeof(this._onEventResume) == "function")
            this._onEventResume();
    }

    on(eventName, handler) {

        let handlerList = undefined;

        if  (!this._handlerMap.has(eventName)) {

            handlerList = new Set();
            this._handlerMap.set(eventName, handlerList);
        }

        handlerList.add(handler);
    }

    emit(eventName, ...args) {

        if (!this._eventPaused && this._handlerMap.has(eventName)) {

            let handlerList = this._handlerMap.get(eventName);

            for (var item of handlerList) {
                
                if (typeof(item) == "function") {

                    item(...args);
                } else if (typeof(item) == "string") {

                    if (this.eventHandler != undefined && 
                        typeof(this.eventHandler[item]) == "function")

                    this.eventHandler[item].apply(this.eventHandler, args);
                }
            }
        }
    }
}

class Component extends EventEmitter {
    
    _config = {}
    
    constructor(config = undefined) {

        super();

        if (config != undefined)
            this._config = config;
    }

    get eventHandler() {

        let ret = this._eventHandler;

        if (ret == undefined && this.parent != undefined) {

            ret = this.parent.eventHandler;
        }

        return ret
    }
    
    set eventHandler(handler) {

        if (handler == true)
            handler = this;
        
        this._eventHandler = handler;
    }

    set name(data) {
        this._name = data;
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

        this.pauseEvent();

        if (config != undefined)
            this._config = config;

        for (var i in this._config) {
            
            if (i.length > 2 && 
                i.startsWith("on") && 
                i[2] == i[2].toUpperCase()) {

                this.on(i[2].toLowerCase() + i.substring(3), this._config[i]);
            } else if (i in this) {

                Reflect.set(this, i, this._config[i], this);
            }
        }

        this.resumeEvent();
    }
}

class Font extends Component {

    constructor(config) {

        super(config);

        this._onEventResume = () => this.emit(Event.CHANGE, this, "all");
        this.applyConfig();
    }

    set name(data) {
        this._name = data;
        this.emit(Event.CHANGE, this, "name");
    }

    get name() {
        return this._name
    }

    set size(data) {
        this._size = data;
        this.emit(Event.CHANGE, this, "size");
    }

    get size() {
        return this._size
    }

    set color(data) {
        this._color = data;
        this.emit(Event.CHANGE, this, "color");
    }

    get color() {
        return this._color
    }

    set bold(data) {
        this._bold = data;
        this.emit(Event.CHANGE, this, "bold");
    }

    get bold() {
        return this._bold
    }

    set italic(data) {
        this._italic = data;
        this.emit(Event.CHANGE, this, "italic");
    }

    get italic() {
        return this._italic
    }

    set underline(data) {
        this._underline = data;
        this.emit(Event.CHANGE, this, "underline");
    }

    get underline() {
        return this._underline
    }

    set strikethrough(data) {
        this._strikethrough = data;
        this.emit(Event.CHANGE, this, "strikethrough");
    }

    get strikethrough() {
        return this._strikethrough
    }
}

class Control extends Component {

    _canvas = undefined
    _clientCanvas = undefined

    constructor(config = undefined) {

        super(config);
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

        this._visible = data;

        if (this._canvas != undefined)
            this._canvas.style.display = "none";
    }

    get left() {
        return this._left
    }

    set left(data) {
        
        this._left = data;

        if (this._canvas != undefined) {
            this._canvas.style.position = "absolute";
            this._canvas.style.left = data;
        }
    }

    get top() {
        return this._top
    }

    set top(data) {
        
        this._top = data;

        if (this._canvas != undefined) {
            this._canvas.style.position = "absolute";
            this._canvas.style.top = data;
        }
    }
    
    render() {
        
        if ((this.parent != undefined) && 
            (this.parent.clientCanvas != undefined)) {

            this.setDefaultConf(this._config);

            this.doRender(this.parent.clientCanvas);

            this.applyConfig(this._config);
        }
    }

    doRender(parentCanvas) {
    }
}

class Container extends Control {

    _childs = new Set()

    constructor(config = undefined, childs = undefined) {

        super(config);

        this._childs = childs;

        for (var child of this._childs) {

            child.parent = this;
        }
    }

    get childs() {
        return this._childs
    }

    getChild(name) {

        let ret = undefined;
        
        for (var child of this._childs) {

            if (child.name == name) {

                ret = child;
                break
            }
        }

        return ret
    }

    render() {
        
        if ((this.parent != undefined) && 
            (this.parent.clientCanvas != undefined)) {
            
            this.doRender(this.parent.clientCanvas);

            for (var child of this._childs) {

                if (typeof child["render"] == "function")
                    child.render();
            }
        }
    }
}

class Application extends Container {
    
    constructor(config = undefined, childs = undefined) {

        super(config, childs);

        this.eventHandler = this; 
    }

    start(canvas) {

        this._clientCanvas = canvas;
        
        this._clientCanvas.innerHTML = "";
        this._clientCanvas.style.position = "absolute";
        this._clientCanvas.style.width = "100%";
        this._clientCanvas.style.height = "100%";        
        this._clientCanvas.style.margin = "0 0 0 0";
        this._clientCanvas.style.padding = "0 0 0 0";

        this.render();
    }

    render() {
        
        this.doRender();

        for (var child of this._childs) {

            if (typeof child["render"] == "function")
                child.render();
        }
    }
}

class Label extends Control {

    constructor(config = undefined) {
        super(config);

        this._font = new Font();
        this._font.on(Event.CHANGE, (sender, field) => {

            if (this._canvas != undefined) {

                this._canvas.style.font = sender.name;
                this._canvas.style.fontSize = sender.size;
                this._canvas.style.color = sender.color;

                this._canvas.style.fontWeight = sender.bold ? "bold" : "normal";
                this._canvas.style.fontStyle = sender.italic ? "italic" : "normal";

                let decor = sender.underline ? "underline" : "";

                decor += sender.strikethrough ? " line-through" : "";
                
                this._canvas.style.textDecoration = decor;
            }
        });
    }

    set caption(data) {

        this._caption = data;
        
        if (this._canvas != undefined)
            this._canvas.innerHTML = data;
    }

    get caption() {
        return this._caption
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data;
            this._font.emit(Event.CHANGE, this._font, "all");
        } else {
            this._font.applyConfig(data);
        } 
    }

    get font() {
        return this._font
    }

    set width(data) {

        this._width = data;
        
        if (this._canvas != undefined)
            this._canvas.style.width = data;
    }

    get width() {
        return this._width
    } 

    set height(data) {
        this._height = data;
        
        if (this._canvas != undefined) {
            this._canvas.style.height = data;
            this._canvas.style.overflow = "clip";
        }
    }

    get height() {
        return this._height
    } 

    set horAlign(data) {

        this._horAlign = data;

        if (this._canvas != undefined)
            this._canvas.style.textAlign = data;
    }

    get horAlign() {
        return this._horAlign
    }

    setDefaultConf(config) {

        super.setDefaultConf(config);

        config["caption"] = this.getConf("caption", "label");
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("div");
        
        this._canvas.onclick = () => this.emit(Event.CLICK, this);

        parentCanvas.appendChild(this._canvas);
    }
}

class Button extends Control {
  
    static NORMAL = "normal"
    static SUCCESS = "success"
    static WARNING = "warning"
    static ERROR = "error"

    static SIZE_BIG = "big"
    static SIZE_NORMAL = "normal"
    static SIZE_SMALL = "small"

    constructor(config = undefined) {
        super(config);
    }

    set focusable(data) {
        this._focusable = data;
    }

    get focusable() {
        return this._focusable
    }

    set caption(data) {

        this._caption = data;
        
        if (this._canvas != undefined)
            this._canvas.innerHTML = data;
    }

    get caption() {
        return this._caption
    }

    set mode(data) {

        this._mode = data;

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

        this._size = data;

        if (this._canvas != undefined) {

            switch (data) {
                case Button.SIZE_BIG :
                    this._canvas.style.fontSize = "1.5em"; 
                    break
                case Button.SIZE_NORMAL :
                    this._canvas.style.fontSize = "1em"; 
                    break
                case Button.SIZE_SMALL :
                    this._canvas.style.fontSize = "0.75em"; 
                    break
            }
        }
    }

    get size() {
        return this._size
    }

    setDefaultConf(config) {

        super.setDefaultConf(config);

        config["focusable"] = this.getConf("focusable", true);
        config["caption"] = this.getConf("caption", "button");
    }

    doRender(parentCanvas) {

        if (this.getConf("focusable")) {
            this._canvas = document.createElement("button");
        } else {
            this._canvas = document.createElement("a");
        }

        this._canvas.onclick = () => this.emit(Event.CLICK, this);
        this._canvas.onfocus = () => this.emit(Event.FOCUS, this);
        this._canvas.onblur = () => this.emit(Event.LOSTFOCUS, this);

        parentCanvas.appendChild(this._canvas);
    }
}

class TextBox extends Control {

    static TEXT = "text"
    static NUMBER = "number"
    static MAIL = "mail"
    static PASSWORD = "password"
    static DATE = "date"
    static TIME = "time"
    static DATETIME = "lodatetime-localstFocus"

    constructor(config, child) {
        super(config, child);

        this._font = new Font();
        this._font.on(Event.CHANGE, (sender, field) => {

            if (this._canvas != undefined) {

                this._canvas.style.font = sender.name;
                this._canvas.style.fontSize = sender.size;
                this._canvas.style.color = sender.color;
            }
        });
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data;
            this._font.emit(Event.CHANGE, this._font, "all");
        } else {
            this._font.applyConfig(data);
        } 
    }

    get font() {
        return this._font
    }

    set type(data) {

        this._type = data;
        
        if (this._canvas != undefined)
            this._canvas.type = data;

        console.log(this._canvas.type);
    }

    get type() {
        return this._type
    }

    set width(data) {

        this._width = data;
        
        if (this._canvas != undefined)
            this._canvas.style.width = data;
    }

    get width() {
        return this._width
    } 

    set height(data) {
        this._height = data;
        
        if (this._canvas != undefined)
            this._canvas.style.height = data;
    }

    get height() {
        return this._height
    }

    set placeholder(data) {

        this._placeholder = data;
        
        if (this._canvas != undefined)
            this._canvas.placeholder = data;
    }

    get placeholder() {
        return this._placeholder
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("input");
        this._canvas.type = this.getConf("type", "text");

        this._canvas.onclick = () => this.emit(Event.CLICK, this);
        this._canvas.onfocus = () => this.emit(Event.FOCUS, this);
        this._canvas.onblur = () => this.emit(Event.LOSTFOCUS, this);

        parentCanvas.appendChild(this._canvas);
    }
}

export { Align, Application, Button, Color, Component, Container, Control, Event, EventEmitter, Font, Label, TextBox };
