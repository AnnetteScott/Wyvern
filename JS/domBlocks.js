DOM_Blocks = {
    small_project_card: function (number = 0, title = ""){
        return '<div class="small_project_card" onclick="clickProject(event)">'
        +          `<h1>${number}</h1>`
        +          `<p>${title}</p>`
        +          '<div class="menu"></div>'
        +      '</div>';
    },
    time_sheet_button: function (weekOne = 1, weekTwo = 2){
        var title = "Weeks " + weekOne.toString() + " - " + weekTwo.toString();
        return `<button onclick="">${title}</button>` + '<br>'
    }
}