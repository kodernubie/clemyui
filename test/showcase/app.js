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
                    top : 290,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.TextBox({
                    placeholder : "password",
                    left : 120,
                    top : 288,
                    width : 150,
                    type : clemy.TextBox.PASSWORD,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Birth Date :",
                    left : 10,
                    top : 330,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.TextBox({
                    left : 120,
                    top : 328,
                    width : 150,
                    type : clemy.TextBox.DATE,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Available At :",
                    left : 10,
                    top : 370,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.TextBox({
                    left : 120,
                    top : 368,
                    width : 150,
                    type : clemy.TextBox.TIME,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Gender :",
                    left : 10,
                    top : 405,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.RadioButton({
                    left : 120,
                    top : 403,
                    caption : "Male",
                    name : "rbtMale",
                    group : "gender",
                    selected : true,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.RadioButton({
                    left : 220,
                    top : 403,
                    caption : "Female",
                    name : "rbtFemale",
                    group : "gender",
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Language :",
                    left : 10,
                    top : 440,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.Checkbox({
                    left : 120,
                    top : 438,
                    caption : "English",
                    name : "cbxEng",
                    checked : true,
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Checkbox({
                    left : 220,
                    top : 438,
                    caption : "Bahasa",
                    font : {
                        size : "14px"
                    }
                }),
                new clemy.Label({
                    caption : "Nationality :",
                    left : 10,
                    top : 475,
                    font : {
                        size : "14px",
                        bold : true
                    }
                }),
                new clemy.Select({
                    left : 120,
                    top : 473,
                    width : 200,
                    name : "slcNationality",
                    font : {
                        size : "14px"
                    },
                    items : [
                        { code : "ID", caption : "Indonesia"},
                        { code : "US", caption : "United State of America"}
                    ],
                    onChange : () => {
                        console.log("selected : ", 
                            this.getChild("slcNationality").selectedItem.code,  
                            this.getChild("slcNationality").selectedItem.caption)
                    }
                }),
                new clemy.Button({
                    caption : "Save",
                    name : "btn1",
                    left : 120,
                    top : 550,
                    size : clemy.Button.SIZE_SMALL,
                    onClick : (sender) => {
                        console.log("sender : ", sender);
                        console.log("this : ", this);

                        this.getChild("cbxEng").caption = "Changed"
                        this.getChild("cbxEng").checked = !this.getChild("cbxEng").checked
                    },
                }),
                new clemy.Button({
                    caption : "Delete",
                    name : "btn2",
                    left : 180,
                    top : 550,
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

        if (this.getChild("rbtMale").selected) {
            console.log("Male Selected")
        } else {
            console.log("Female Selected")
        }
    }
}

window.app  = new App()