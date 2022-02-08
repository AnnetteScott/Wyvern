let DOM_Blocks_Settings = {
    user_card: function (ID, user){
        return '<div class="colour_card">'
        +          `<p userid="${ID}" onclick="editUser(event)" style="cursor: pointer;">${user}</p>`
        +      '</div>';
    },

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


    checklist: function (items){
        return '<div class="dropdown-check-list" tabindex="100">'
        +          `<span class="checklist_anchor" onclick="toggleChecklist(event)">Projects</span>`
        +          `<ul class="items">${items}</ul>`
        +      '</div>';
    },


    checklist_item: function (projectName, projectID, colourID, checked = false){
        return `<li><input type="checkbox" onclick="colourCheckBoxes(event)" projectid="${projectID}" colourid="${colourID}" ${checked ? 'checked' : ''} />${projectName}</li>`;
    },


    checkbox: function (projectName, projectID, colourID, checked = false){
        return `<input onclick="colourCheckBoxes(event)" projectid="${projectID}" colourid="${colourID}" title="Project: ${projectName}" type="checkbox" ${checked ? 'checked' : ''}>`;
    }
}