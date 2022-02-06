let DOM_Blocks_Settings = {
    client_card: function (name, ID){
        return '<div class="colour_card">'
        +          `<p clientid="${ID}">${name}</p>`
        +      '</div>';

    },


    project_card: function (name, ID){
        return '<div class="colour_card">'
        +          `<p projectid="${ID}">${name}</p>`
        +      '</div>';

    },


    colour_card: function (colourName, color, rate, colourID){
        return '<div class="colour_card">'
        +          `<div style="background-color: ${color}"></div>`
        +          `<p colourid="${colourID}" onclick="editColour(event)">${colourName}</p>`
        +          `<p>$${rate}</p>`
        +          `<div class="colour_card_checkbox_list"></div>`
        +      '</div>';

    },


    checkbox: function (projectName){
        return `<input onclick="addToDict(event)" title="Project: ${projectName}" type="checkbox">`;

    }
}