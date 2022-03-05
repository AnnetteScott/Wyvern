VL.add('masterDict', function(){
	updateAll();
});

function updateAll(){
	//User updater
	let elem = '';
	for(const [userID, userDict] of Object.entries(masterDict['users'])){
		elem += DOM_Blocks_Settings.user_card(userID, userDict['user']);
	}
	$("#user_list").empty();
	$("#user_list").append(elem);


	//Client Updater
	let clientElement = $("#client_list");
	elem = '';
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
	$('.colour_card').each(function(i, obj){
		$(obj).css({'z-index': ($('.colour_card').length - i)});
	});

	//Colour Checkboxes
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
			elem += DOM_Blocks_Settings.checklist_item(projectDict['projectName'], projectID, colourID, checked);
		}
		$(obj).append(DOM_Blocks_Settings.checklist(elem))
	});


	//Update Invoice page selection boxes
	elem = '<label for="projectSelection">Choose a Project: </label>';
    elem += '<select onchange="updateTimeSheetSelection()" name="projectSelection" id="projectSelection">';
	for(const [projctID, projctDict] of Object.entries(masterDict['projects'])){
		elem += `<option projectid="${projctID}">${projctDict['projectName']}</option>`;
	}
	elem += '</select>';
	$("#project_selection_box").empty();
	$("#project_selection_box").append(elem);
	invoiceChosenProjectID = $("#projectSelection option:selected").attr('projectid');
	updateTimeSheetSelection()

	//Add Clients
	elem = '<label for="clientSelection">Choose a Client: </label>';
    elem += '<select  name="clientSelection" id="clientSelection">';
	for(const [clientID, clientDict] of Object.entries(masterDict['clients'])){
		elem += `<option clientid="${clientID}">${clientDict['clientName']}</option>`;
	}
	elem += '</select>';
	$("#client_selection_box").empty();
	$("#client_selection_box").append(elem);

	//Add User
	elem = '<label for="userSelection">Choose a user: </label>';
    elem += '<select  name="userSelection" id="userSelection">';
	for(const [userID, userDict] of Object.entries(masterDict['users'])){
		elem += `<option userid="${userID}">${userDict['user']}</option>`;
	}
	elem += '</select>';
	$("#user_selection_box").empty();
	$("#user_selection_box").append(elem);

	//Budget Updater
	let budgetElement = $("#budget_year_list");
	elem = '';
	for (const [budgetID, budgetDict] of Object.entries(masterDict['budgets'])){
		console.log(budgetID)
		if(budgetID != "income" && budgetID != "expense"){
			elem += DOM_Blocks_Budget.budget_card(budgetDict['budgetName'], budgetID, budgetDict['startYear'], budgetDict['endYear']);
		}
	}
	budgetElement.empty();
	budgetElement.append(elem);

	let budgetDict = masterDict['budgets'][selectedBudgetID];
	if(selectedBudgetID != '' && currentPage === 'budget_page'){
		//Create the week selection buttons.
		elem = '';
		for (const [year, yearDict] of Object.entries(budgetDict['years'])){
			elem += DOM_Blocks_Budget.year_button(year);
		}
		//Add the week selection buttons to the page.
		$('#yearly_buttons').empty();
		$('#yearly_buttons').append(elem);
	}	
}


function updateTimeSheetSelection(){
	if(Object.keys(masterDict['projects']).length != 0){
		invoiceChosenProjectID = $("#projectSelection option:selected").attr('projectid');
		let elem = '<label for="timeSheetSelection">Choose A Week: </label>';
    	elem += '<select id="timeSheetSelection">';
		for(const [weekID] of Object.entries(masterDict['projects'][invoiceChosenProjectID]['weeks'])){
			elem += `<option projectid="${invoiceChosenProjectID}" weekid="${weekID}">${weekID}</option>`;
		}
		elem += '</select>';
		
		$("#week_selection_box").empty();
		$("#week_selection_box").append(elem);
	}
}

//updateAll();