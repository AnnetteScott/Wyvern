let DOM_Blocks_Settings = {
    colour_card: function (colourName, color){
        return '<div class="colour_card">'
        +          `<div style="background-color: ${color}"></div>`
        +           `<div value="${colourName}"class="colour_options hidden">`
        +               `<p>${colourName}</p>`
        +               '<button class"colour_pop_up_button" onclick="deleteColour()" style="width: 125px; height: 30px;">Delete Colour</button>'
        +               '<button class"colour_pop_up_button" onclick="editColour()" style="width: 125px; height: 30px;">Edit Colour</button>'
        +           '</div>'
        +          `<p onclick="showColourOptions(event)">${colourName}</p>`
        +      '</div>';

    },
    checkboxes: function (project, colourName){
        return '<div class="check_box">'
        +  `<input onclick="addToDict(event)" title="Project: ${project}" type="checkbox" id="settings_colour_${project}_${colourName}" name="accept" value="${colourName}">`
        +      '</div>';

    }
}
