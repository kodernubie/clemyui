import * as clemy from "../../dist/clemy.js"

class App extends clemy.Application {
  
    constructor() {

        super({},
            [
                new clemy.Label({
                    caption : "Components Showcase",
                    font : {
                        size : "18px",
                        color : "#FF0000",
                        bold : true,
                        italic : true,
                        underline : true
                    }
                }),
                new clemy.Label({
                    caption : "Ver 1.0",
                    font : {
                        size : "18px",
                        color : "#FF0000",
                        bold : true,
                        italic : true,
                        underline : true,
                        strikethrough : true
                    }
                }),
                new clemy.Label({
                    caption : "This label is limited by width but not limited by height Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    width : 300,
                    font : {
                        size : "12px"
                    }
                }),
                new clemy.Label({
                    caption : "This label is limited by width and height Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    width : 300,
                    height : 40,
                    horAlign : clemy.Align.RIGHT,
                    font : {
                        size : "12px"
                    }
                }),
                new clemy.Label({
                    caption : "This label is justify aligned Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    width : 300,
                    horAlign : clemy.Align.JUSTIFY,
                    font : {
                        size : "12px"
                    }
                }),
                new clemy.Label({
                    caption : "Name :",
                    left : 10,
                    top : 250,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.TextBox({
                    placeholder : "name",
                    left : 120,
                    top : 248,
                    width : 150,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Password :",
                    left : 10,
                    top : 285,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.TextBox({
                    placeholder : "password",
                    left : 120,
                    top : 283,
                    width : 150,
                    type : clemy.TextBox.PASSWORD,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Birth Date :",
                    left : 10,
                    top : 320,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.TextBox({
                    left : 120,
                    top : 318,
                    width : 150,
                    type : clemy.TextBox.DATE,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Available At :",
                    left : 10,
                    top : 355,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.TextBox({
                    left : 120,
                    top : 353,
                    width : 150,
                    type : clemy.TextBox.TIME,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Button({
                    caption : "Save",
                    name : "btn1",
                    left : 120,
                    top : 450,
                    size : clemy.Button.SIZE_SMALL,
                    onClick : (sender) => {
                        console.log("sender : ", sender);
                        console.log("this : ", this);
                    },
                }),
                new clemy.Button({
                    caption : "Delete",
                    name : "btn2",
                    left : 180,
                    top : 450,
                    mode : clemy.Button.ERROR,
                    size : clemy.Button.SIZE_SMALL,
                    onClick : "btnClick",
                })
            ])
    }

    btnClick(sender) {
        console.log("button click by string sender :", sender)
        console.log("button click by string this :", this)

        console.log("btn1 :", this.getChild("btn1"))
    }
}

window.app  = new App()