let DOM_Blocks_projects = {
    project_card: function (name, ID){
        return `<div class="project_item" projectid="${ID}" onclick="loadProjectData(event)" style="cursor: pointer;">`
        +          `<p>${name}</p>`
        +      '</div>';

    },
    week_button: function (weekTitle){
        return `<button onclick="" weekTitle="${weekTitle}" class="project_week_buttons">${weekTitle}</button>`
    },

    colour_ribbon: function (name, colour){
        return `<div class="color_button" onclick="" style="background-color: ${colour};">${name}</div>`
    }
}