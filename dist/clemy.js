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

class Border extends Component {

    static MODE_BOX = "box"
    static MODE_NONE = "none"

    constructor(config) {

        super(config);
    }

    set mode(data) {
        this._mode = data;
        this.emit(Event.CHANGE, this, "color"); 
    }

    get mode() {
        return this._mode
    }
 
    set color(data) {
        this._color = data;
        this.emit(Event.CHANGE, this, "color");
    }
    
    get color() { 
        return this._color
    }

    set weight(data) {
        this._weight = data;
        this.emit(Event.CHANGE, this, "weight");
    }
    
    get weight() { 
        return this._weight
    }

    set left(data) {
        this._left = data;
        this.emit(Event.CHANGE, this, "left");
    }

    get left() { 
        return this._left
    }

    set top(data) {
        this._top = data;
        this.emit(Event.CHANGE, this, "top");
    }

    get top() { 
        return this._top
    }

    set right(data) {
        this._right = data;
        this.emit(Event.CHANGE, this, "right");
    }

    get right() { 
        return this._right
    }

    set bottom(data) {
        this._bottom = data;
        this.emit(Event.CHANGE, this, "bottom");
    }

    get bottom() { 
        return this._bottom
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

class Checkbox extends Control {

    constructor(config = undefined, childs = undefined) {
        super(config, childs);

        this._font = new Font();
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
    }

    applyFont(sender) {

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
    }

    set caption(data) {

        this._caption = data;
        
        if (this._canvas != undefined)
            this._canvas.lastChild.innerHTML = data;
    }

    get caption() {
        return this._caption
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data;
            this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
            this._font.emit(Event.CHANGE, this._font, "all");
        } else {
            this._font.applyConfig(data);
        } 
    }

    get font() {
        return this._font
    }

    set checked(data) {

        if (this._canvas != undefined) {
            this._canvas.firstChild.checked = data;
        }
    }

    get checked() {

        if (this._canvas != undefined) {
            return this._canvas.firstChild.checked
        } else 
            return false
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("label");

        let strChecked = "";
        if (this.getConf("checked", false))
            strChecked = "checked";

        this._canvas.innerHTML = 
        `<input type="checkbox" ` + strChecked + `>
        <span class="checkable">` + this.getConf("caption", "") + `</span>`;
        
        let cbxCanvas = this._canvas.firstChild;
        cbxCanvas.onchange = () => this.emit(Event.CHANGE, this);

        parentCanvas.appendChild(this._canvas);
    }
}

class Label extends Control {

    constructor(config = undefined) {
        super(config);

        this._font = new Font();
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
    }

    applyFont(sender) {

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
            this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
            this._font.emit(Event.CHANGE, this._font, "all");
        } else {
            this._font.applyConfig(data);
        } 
    }

    get font() {
        return this._font
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

class RadioButton extends Control {

    constructor(config = undefined, childs = undefined) {
        super(config, childs);

        this._font = new Font();
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
    }

    applyFont(sender) {

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
    }

    set caption(data) {

        this._caption = data;
        
        if (this._canvas != undefined)
            this._canvas.lastChild.innerHTML = data;
    }

    get caption() {
        return this._caption
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data;
            this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
            this._font.emit(Event.CHANGE, this._font, "all");
        } else {
            this._font.applyConfig(data);
        } 
    }

    get font() {
        return this._font
    }

    set selected(data) {

        if (this._canvas != undefined) {
            this._canvas.firstChild.selected = data;
        }
    }

    get selected() {

        if (this._canvas != undefined) {
            return this._canvas.firstChild.checked
        } else 
            return false
    }

    set group(data) {

        if (this._canvas != undefined) {
            this._canvas.firstChild.name = data;
        }
    }

    get group() {

        if (this._canvas != undefined) {
            return this._canvas.firstChild.name
        } else 
            return ""
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("label");

        let strChecked = "";
        if (this.getConf("selected", false))
            strChecked = "checked";
        
            this._canvas.innerHTML = 
        `<input type="radio" name="` + this.getConf("group", "") + `" ` + strChecked + `>
        <span class="checkable">` + this.getConf("caption", "") + `</span>`;
        
        let cbxCanvas = this._canvas.firstChild;
        cbxCanvas.onchange = () => this.emit(Event.CHANGE, this);

        parentCanvas.appendChild(this._canvas);
    }
}

class ItemList extends EventEmitter {

    _listSet = new Set()

    add(item) {

        this._listSet.add(item);
        item.on(Event.CHANGE, () => {
            this.emit(Event.CHANGE, this, item);
        });
    }

    del(item) {

        this._listSet.delete(item);
        this.emit(Event.CHANGE, this);
    }

    clear() {
        this._listSet.clear();
        this.emit(Event.CHANGE, this);
    }

    get(index) {
        let i = 0;
        let ret = undefined;

        for (var item of this._listSet) {
            if (i == index) {

                ret = item;
                break
            } else
                i++;
        }

        return ret
    }
}

class SelectItem extends EventEmitter {

    constructor(code, caption) {

        super();

        this._code = code;
        this._caption = caption;
    }

    get code() {
        return this._code
    }

    set code(data) {
        this._code = data;
        this.emit(Event.CHANGE, this, "code");
    }

    get caption() {
        return this._caption
    }

    set caption(data) {
        this._caption = data;
        this.emit(Event.CHANGE, this, "caption");
    }
}

class SelectItemList extends ItemList {

    addItem(code, caption) {

        this.add(new SelectItem(code, caption));
    }

    delItem(code) {

        for (var item of this._listSet) {

            if (item.code == code) {

                this.del(item);
                break       
            }
        }
    }

    setItems(items) {

        this.pauseEvent();
        this.clear();
        
        for (var item of items) {

            this.add(new SelectItem(item["code"], item["caption"]));
        }

        this.resumeEvent();
        this.emit(Event.CHANGE, this);
    }

    indexOf(code) {

        let ret = -1;
        let i = 0;

        for (var item of this._listSet) {
        
            if (item.code == code) {

                ret = i;
                break
            } else
                i++;
        }

        return ret
    }
}

class Select extends Control {

    constructor(config, child) {
        super(config, child);

        this._font = new Font();
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));

        this._listItem = new SelectItemList();
        this._listItem.on(Event.CHANGE, (sender) => this.renderItem(sender));

    }    

    applyFont(sender) {

        if (this._canvas != undefined) {

            this._canvas.style.font = sender.name;
            this._canvas.style.fontSize = sender.size;
            this._canvas.style.color = sender.color;
        }
    }

    renderItem() {

        if (this._canvas != undefined && this._listItem != undefined) {

            let strOption = "";

            for (var item of this._listItem._listSet) {

                strOption += "<option value=\"" +  item.code + "\">" + item.caption + "</option>";
            }

            this._canvas.innerHTML = strOption;
        }
    }

    get selectedItem() {

        let ret = undefined; 
        
        if (this._canvas != undefined && this._listItem != undefined)
            ret = this._listItem.get(this._canvas.selectedIndex);

        return ret 
    }

    set selectedItem(data) {

        if (this._canvas != undefined && this._listItem != undefined) {

            let idx = this._listItem.indexOf(data);

            if (idx >= 0)
                this._canvas.selectedIndex = idx;
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
            this._canvas.selectedIndex = index;
    }

    get items() {

        return this._listItem
    }

    set items(data) {

        if (data instanceof SelectItemList) {

            this._listItem = data;
            this._listItem.on(Event.CHANGE, (sender, field) => this.renderItem());
            this._listItem.emit(Event.CHANGE, this._listItem);
        } else {
            this._listItem.setItems(data);
        }
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data;
            this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
            this._font.emit(Event.CHANGE, this._font, "all");
        } else {
            this._font.applyConfig(data);
        } 
    }

    doRender(parentCanvas) {

        this._canvas = document.createElement("select");
        this.renderItem();

        this._canvas.onchange = () => this.emit(Event.CHANGE, this);
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
        this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
    }

    applyFont(sender) {

        if (this._canvas != undefined) {

            this._canvas.style.font = sender.name;
            this._canvas.style.fontSize = sender.size;
            this._canvas.style.color = sender.color;
        }
    }

    set font(data) {

        if (data instanceof Font) {
            this._font = data;
            this._font.on(Event.CHANGE, (sender, field) => this.applyFont(sender));
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
    }

    get type() {
        return this._type
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

export { Align, Application, Border, Button, Checkbox, Color, Component, Container, Control, Event, EventEmitter, Font, Label, RadioButton, Select, SelectItem, SelectItemList, TextBox };
