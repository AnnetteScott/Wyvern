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
        //Generate unique projectID 
        let clientID = generateID();
        while(masterDict['clients'].hasOwnProperty(clientID)){
            clientID = generateID();
        }

        //Add info to clients dict
        masterDict['clients'][clientID] = {'client': client,'clientName': clientName, 'clientAddressOne': clientAddressOne, 'clientAddressTwo': clientAddressTwo, 'clientCity': clientCity, 'clientCountry': clientCountry}

        //place options on project creation page
        let elem = ''
        Object.keys(masterDict['clients']).forEach(clientID => {
            elem += `<option value="${clientID}">${masterDict['clients'][clientID]['client']}</option>`;
        });
        $("#client_project_selection").append(elem);

        $("#create_client").val('')
        $("#create_client_name").val('')
        $("#create_client_addOne").val('')
        $("#create_client_addTwo").val('')
        $("#create_client_city").val('')
        $("#create_client_country").val('')

        currentPage = "settings";
    }
 
}