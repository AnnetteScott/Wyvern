let DOM_Blocks_projects = {
    project_card: function (name, ID){
        return `<div class="project_item" projectid="${ID}" onclick="loadProjectData(event)" style="cursor: pointer;">`
        +          `<p>${name}</p>`
        +      '</div>';

    },
    week_button: function (weekTitle, projectID){
        return `<button onclick="timesheetGen(event)" weekTitle="${weekTitle}" projectid="${projectID}" class="project_week_buttons">${weekTitle}</button>`
    },

    colour_ribbon: function (name, colour, colourID, projectID){
        return `<div colourid="${colourID}" projectid="${projectID}" class="color_button" onclick="colourCell(event)" style="background-color: ${colour};">${name}</div>`
    },
    
    timesheet_col: function (colID){
        return `<div id="ts_col_${colID}" class="time_sheet_column"></div>`
    }
}