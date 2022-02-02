let DOM_Blocks_Settings = {
    colour_card: function (colourName, color){
        return '<div class="colour_card">'
        +          `<div style="background-color: ${color}"></div>`
        +          `<p>${colourName}</p>`
        +      '</div>';

    },
    checkboxes: function (project, colourName){
        return '<div class="check_box">'
        +  `<input onclick="addToDict(event)" title="Project: ${project}" type="checkbox" id="settings_colour_${project}_${colourName}" name="accept" value="${colourName}">`
        +      '</div>';

    }
}
