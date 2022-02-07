function loadProjectData(e){
    const projectID = $(e.target).attr('projectid');
    let projectDict = masterDict['projects'][projectID];

    let elemRibbon = '<div class="color_button" onclick="" style="background-color: white;">White</div>';
    if(projectDict['colourList'] != []){
        projectDict['colourList'].forEach(colourID => {
            let colour = masterDict['colours'][colourID]['colour']
            let name = masterDict['colours'][colourID]['colourName']
            elemRibbon += DOM_Blocks_projects.colour_ribbon(name, colour, colourID)
        });
    }
    
    $('#colour_ribbon').empty();
    $('#colour_ribbon').append(elemRibbon);

    let elemWeek = '';
    for (const [weekID, weekDict] of Object.entries(projectDict['weeks'])){
        elemWeek += DOM_Blocks_projects.week_button(weekID, projectID)
    }

    $('#weekly_buttons').empty();
    $('#weekly_buttons').append(elemWeek);


    currentPage = 'project_page';
}