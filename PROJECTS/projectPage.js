//Loads data for, and populates an individual project's page.
//Is called from the Projects selection page when a project item is selected.
function loadProjectData(e){
    const projectID = $(e.target).attr('projectid');
    currentProjectID = projectID;
    const projectDict = masterDict['projects'][projectID];
    const projectName = projectDict['projectName'];
    
    //Create the colour ribbon.
    let elemRibbon = DOM_Blocks_projects.colour_ribbon('White', '#FFF', 'colourWhite', projectID); //Always add white.
    projectDict['colourList'].forEach(colourID => { //Add every colour from the selected project's dictionary.
        let name = masterDict['colours'][colourID]['colourName'];
        let colour = masterDict['colours'][colourID]['colour'];
        elemRibbon += DOM_Blocks_projects.colour_ribbon(name, colour, colourID, projectID);
    });

    //Add the colours to the ribbon.
    $('#colour_ribbon').empty();
    $('#colour_ribbon').append(elemRibbon);

    //Create the week selection buttons.
    let elemWeek = '';
    for (const [weekID, weekDict] of Object.entries(projectDict['weeks'])){
        elemWeek += DOM_Blocks_projects.week_button(weekID, projectID);
    }

    //Add the week selection buttons to the page.
    $('#weekly_buttons').empty();
    $('#weekly_buttons').append(elemWeek);

    //Change to the individual project page.
    $(elements['navTitle']).text(projectName);
    currentPage = 'project_page';

}