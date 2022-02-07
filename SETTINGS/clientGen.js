let selectedID = '';

function addNewClient(){
    let client = $("#create_client").val();
    let clientName = $("#create_client_name").val();
    let clientAddressOne = $("#create_client_addOne").val();
    let clientAddressTwo = $("#create_client_addTwo").val();
    let clientCity = $("#create_client_city").val();
    let clientCountry = $("#create_client_country").val();

    if(client == ''){
        $("#create_client").addClass('form_error');
    }else if(clientName == ''){
        $("#create_client_name").addClass('form_error');
        $("#create_client").removeClass('form_error');
    }else{
        let clientID = generateID();
        if(selectedID == ''){
			//Generate unique projectID 
           
            while(masterDict['clients'].hasOwnProperty(clientID)){
                clientID = generateID();
            }    
			//Add info to clients dict
            masterDict['clients'][clientID] = {'client': client,'clientName': clientName, 'clientAddressOne': clientAddressOne, 'clientAddressTwo': clientAddressTwo, 'clientCity': clientCity, 'clientCountry': clientCountry}
            masterDict['clients'][clientID]['projects'] = [];
		}else{
			masterDict['clients'][selectedID]['client'] = client;
			masterDict['clients'][selectedID]['clientName'] = clientName;
			masterDict['clients'][selectedID]['clientAddressOne'] = clientAddressOne;
			masterDict['clients'][selectedID]['clientAddressTwo'] = clientAddressTwo;
			masterDict['clients'][selectedID]['clientCity'] = clientCity;
			masterDict['clients'][selectedID]['clientCountry'] = clientCountry;
            clientID = selectedID;
		}
        //place options on project creation page
        let elem = ''
        for (const [clientID, clientDict] of Object.entries(masterDict['clients'])) {
            elem += `<option value="${clientID}">${clientDict['client']}</option>`;
        };
        $("#client_project_selection").empty();
        $("#client_project_selection").append(elem);


        //Clear input
        $("#create_client").val('')
        $("#create_client_name").val('')
        $("#create_client_addOne").val('')
        $("#create_client_addTwo").val('')
        $("#create_client_city").val('')
        $("#create_client_country").val('')
        $('#client_pop_up').removeClass('input_box_open');
        selectedID = '';
    }
 
}

function editClient(e){
	let clientID = $(e.target).attr('clientid');
    let clientDict = masterDict['clients'][clientID]
    $("#create_client").val(clientDict['client']);
    $("#create_client_name").val(clientDict['clientName']);
    $("#create_client_addOne").val(clientDict['clientAddressOne']);
    $("#create_client_addTwo").val(clientDict['clientAddressTwo']);
    $("#create_client_city").val(clientDict['clientCity']);
    $("#create_client_country").val(clientDict['clientCountry']);
	$('#client_pop_up').addClass('input_box_open');
	selectedID = clientID;
}
