let DOM_Blocks_Settings = {
    client_card: function (name, ID){
        return '<div class="colour_card">'
        +          `<p clientid="${ID}" onclick="editClient(event)" style="cursor: pointer;">${name}</p>`
        +      '</div>';

    },


    project_card: function (name, ID){
        return '<div class="colour_card">'
        +          `<p projectid="${ID}" onclick="editProject(event)" style="cursor: pointer;">${name}</p>`
        +      '</div>';

    },


    colour_card: function (colourName, color, rate, colourID){
        return '<div class="colour_card">'
        +          `<div style="background-color: ${color}"></div>`
        +          `<p colourid="${colourID}" onclick="editColour(event)" style="cursor: pointer;">${colourName}</p>`
        +          `<p style="cursor: default;">$${rate}</p>`
        +          `<div class="colour_card_checkbox_list"></div>`
        +      '</div>';

    },


    checkbox: function (projectName, projectID, colourID, checked = false){
        return `<input onclick="colourCheckBoxes(event)" projectid="${projectID}" colourid="${colourID}" title="Project: ${projectName}" type="checkbox" ${checked ? 'checked' : ''}>`;

    }
}