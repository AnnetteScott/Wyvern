let selectedUserID = '';

function addNewUser(){
    let user = $("#create_user").val();
    let userName = $("#create_user_name").val();
    let userAddressOne = $("#create_user_addOne").val();
    let userAddressTwo = $("#create_user_addTwo").val();
    let userCity = $("#create_user_city").val();
    let userCountry = $("#create_user_country").val();
    let userContact = $("#create_user_contact").val();

    let userID = generateID();
    if(selectedUserID == ''){
        //Generate unique projectID 
    
        while(masterDict['users'].hasOwnProperty(userID)){
            userID = generateID();
        }    
        //Add info to clients dict
        masterDict['users'][userID] = {'user': user,'userName': userName, 'userAddressOne': userAddressOne, 'userAddressTwo': userAddressTwo, 'userCity': userCity, 'userCountry': userCountry}
    }else{
        masterDict['users'][selectedUserID]['user'] = user;
        masterDict['users'][selectedUserID]['userName'] = userName;
        masterDict['users'][selectedUserID]['userAddressOne'] = userAddressOne;
        masterDict['users'][selectedUserID]['userAddressTwo'] = userAddressTwo;
        masterDict['users'][selectedUserID]['userCity'] = userCity;
        masterDict['users'][selectedUserID]['userCountry'] = userCountry;
        masterDict['users'][selectedUserID]['userContact'] = userContact;
        clientID = selectedUserID;
    }

    //Clear input
    $("#create_user").val('')
    $("#create_user_name").val('')
    $("#create_user_addOne").val('')
    $("#create_user_addTwo").val('')
    $("#create_user_city").val('')
    $("#create_user_country").val('')
    $('#user_pop_up').removeClass('input_box_open');
    selectedUserID = '';
    
}

function editUser(e){
	let userID = $(e.target).attr('userid');
    let userDict = masterDict['users'][userID]
    $("#create_user").val(userDict['user']);
    $("#create_user_name").val(userDict['userName']);
    $("#create_user_addOne").val(userDict['userAddressOne']);
    $("#create_user_addTwo").val(userDict['userAddressTwo']);
    $("#create_user_city").val(userDict['userCity']);
    $("#create_user_country").val(userDict['userCountry']);
	$('#user_pop_up').addClass('input_box_open');
	selectedUserID = userID;
}
