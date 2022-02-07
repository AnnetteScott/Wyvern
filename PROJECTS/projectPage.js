function loadProjectData(e){
    let projectID = $(e.target).attr('projectid');
    let projectDict = masterDict['projects'][projectID];

    let elemRibbon = '<div class="color_button" onclick="" style="background-color: white;">White</div>';
    if(projectDict['colourList'] != []){
        projectDict['colourList'].forEach(colourID => {
        elemRibbon += DOM_Blocks_projects.colour_ribbon(masterDict['colours'][colourID]['colourName'], masterDict['colours'][colourID]['colour'])
    });
    }
    
    $('#colour_ribbon').empty();
    $('#colour_ribbon').append(elemRibbon);

    let elemWeek = '';
    for (const [weekID, weekDict] of Object.entries(projectDict['weeks'])){
        elemWeek += DOM_Blocks_projects.week_button(weekID)
    }

    $('#weekly_buttons').empty();
    $('#weekly_buttons').append(elemWeek);


    currentPage = 'project_page';
}