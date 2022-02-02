DOM_Blocks = {
    small_project_card: function (number = 0, title = ""){
        return '<div class="small_project_card" onclick="clickProject(event)">'
        +          `<h1>${number}</h1>`
        +          `<p>${title}</p>`
        +          '<div class="projectMenu"></div>'
        +      '</div>';
    },
    time_sheet_button: function (title){
        return `<button value="${title}"onclick="tableGen(event)">${title}</button>` + '<br>'
    }
}