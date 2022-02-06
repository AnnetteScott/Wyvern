let DOM_Blocks_Settings = {
    colour_card: function (colourName, color, rate){
        return '<div class="colour_card">'
        +          `<div style="background-color: ${color}"></div>`
        +           `<div value="${colourName}"class="colour_options hidden">`
        +               `<p>${colourName}</p>`
        +               '<button class"colour_pop_up_button" onclick="deleteColour()" style="width: 125px; height: 30px;">Delete Colour</button>'
        +               '<button class"colour_pop_up_button" onclick="editColour()" style="width: 125px; height: 30px;">Edit Colour</button>'
        +           '</div>'
        +          `<p onclick="showColourOptions(event)">${colourName}</p>`
        +          `<p>$${rate}</p>`
        +      '</div>';

    },
    checkboxes: function (colourID, projectID, projectName){
        return '<div class="check_box">'
        +           `<input onclick="addToDict(event)" title="Project: ${projectName}" type="checkbox" id="${colourID}_${projectID}" name="accept" value="${colourID}">`
        +      '</div>';

    }
}