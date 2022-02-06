VL.add('masterDict', function(){
	updateAll();
});


function updateAll(){
	//Client Updater
	let clientElement = $("#client_list");
	let elem = '';
	for (const [clientID, clientDict] of Object.entries(masterDict['clients'])) {
		elem += DOM_Blocks_Settings.client_card(clientDict['clientName'], clientID);
	}
	clientElement.empty();
	clientElement.append(elem);


	//Project Updater
	let projectElement = $("#project_list");
	elem = '';
	for (const [projectID, projectDict] of Object.entries(masterDict['projects'])) {
		elem += DOM_Blocks_Settings.project_card(projectDict['projectName'], projectID);
	}
	projectElement.empty();
	projectElement.append(elem);



	//Colour Updater
	let colourElement = $("#colour_list");
	elem = '';
	for (const [colourID, colourDict] of Object.entries(masterDict['colours'])) {
		elem += DOM_Blocks_Settings.colour_card(colourDict['colourName'], colourDict['colour'], colourDict['colourRate'], colourID);
	}
	colourElement.empty();
	colourElement.append(elem);

	elem = '';
	let projectNameList = [];

	for (const [clientID, clientDict] of Object.entries(masterDict['projects'])) {
		for (const [projectID, projectDict] of Object.entries(clientDict)) {
			projectNameList.push(projectDict['projectName']);
		}
	}

	for (projectName in projectNameList) {
		elem += DOM_Blocks_Settings.checkbox(projectNameList[projectName]);
	}
	$('.colour_card_checkbox_list').empty();
	$('.colour_card_checkbox_list').append(elem);
}


updateAll();