# ClemyUI
Pure ES6 UI framework 

Current Feature :
- Simple components system
- Label
- Button
- Checkbox
- RadioButton
- TextBox (support text, date, time, datetime, number)


## Usage

Import ClemyUI from your ES6 module :

```
import * as clemy from "https://cdn.jsdelivr.net/gh/kodernubie/clemyui@v.0.0.2/dist/clemy.min.js"
```

## Example

Create your app script Eq. **app.js**

```
import * as clemy from "https://cdn.jsdelivr.net/gh/kodernubie/clemyui@v.0.0.2/dist/clemy.min.js"

window.app = new clemy.Application({}, 
  [
    new clemy.Label({
        caption : "Hello World"
      }),
    new clemy.Label({
        name : "lblCounter",
        caption : "Press button to start count"
      }),
    new clemy.Button({
      caption : "++",
      onClick: () => {
        if (this.count == undefined) {
          this.count = 0
        }
        
        this.count++
        this.getChild("lblCounter").caption = "Counter : " + this.count
      }
    })
  ])
```

And then create your html file Eq. **index.html**

```
<html>
  <header>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic">
      <script type="module" src="./app.js"></script>
  </header>
  <body onload="app.start(document.body)">
  </body>
<html>
```

See example project in directory **/test** to see detail components/controls usage.
