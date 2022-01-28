let alerty = {
    title: "Alert",
    message: "",
    options: [{t:"Ok",c:''}],

    elem: {
        alert: document.getElementById("alert"),
        title: document.querySelector("#alert .title"),
        message: document.querySelector("#alert .message"),
        options: document.querySelector("#alert .options")
    },

    show: function (){
        this.elem.title.innerHTML = this.title;
        this.elem.message.innerHTML = this.message;
        this.elem.options.innerHTML = this.options.forEach((option) => {
            return `<button>${option}</button>`;
        });
        this.elem.alert.classList.remove("hidden");
    },

    hide: function (){
        this.elem.alert.classList.add("hidden");
    }
}