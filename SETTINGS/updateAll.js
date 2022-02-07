VL.add('masterDict', function(){
	updateAll();
});


function updateAll(){
	//Client Updater
	let clientElement = $("#client_list");
	let elem = '';
	for (const [clientID, clientDict] of Object.entries(masterDict['clients'])) {
		elem += DOM_Blocks_Settings.client_card(clientDict['client'], clientID);
	}
	clientElement.empty();
	clientElement.append(elem);


	//Project Updater
	let projectElement = $("#project_list");
	let projectElementProjects = $("#project_list_projects");
	elem = '';
	let projectElem = '';
	for (const [projectID, projectDict] of Object.entries(masterDict['projects'])) {
		elem += DOM_Blocks_Settings.project_card(projectDict['projectName'], projectID);
		projectElem += DOM_Blocks_projects.project_card(projectDict['projectName'], projectID);
	}
	projectElement.empty();
	projectElementProjects.empty();
	projectElement.append(elem);
	projectElementProjects.append(projectElem);


	//place client options on project creation page
	elem = ''
	for (const [clientID, clientDict] of Object.entries(masterDict['clients'])) {
		elem += `<option value="${clientID}">${clientDict['client']}</option>`;
	};
	$("#client_project_selection").empty();
	$("#client_project_selection").append(elem);



	//Colour Updater
	let colourElement = $("#colour_list");
	elem = '';
	for (const [colourID, colourDict] of Object.entries(masterDict['colours'])) {
		elem += DOM_Blocks_Settings.colour_card(colourDict['colourName'], colourDict['colour'], colourDict['colourRate'], colourID);
	}
	colourElement.empty();
	colourElement.append(elem);

	//Checkboxes
	$('.colour_card_checkbox_list').empty();
	let colourIDList = [];
	for (const [colourID, colourDict] of Object.entries(masterDict['colours'])) {
		colourIDList.push(colourID);
	}
	$('.colour_card_checkbox_list').each(function(i, obj) {
		elem = "";
		const colourID = colourIDList[i];
		for (const [projectID, projectDict] of Object.entries(masterDict['projects'])) {
			let checked = masterDict['projects'][projectID]['colourList'].includes(colourID);
			elem += DOM_Blocks_Settings.checkbox(projectDict['projectName'], projectID, colourID, checked);
		}
		$(obj).append(elem)
	});

}


updateAll();