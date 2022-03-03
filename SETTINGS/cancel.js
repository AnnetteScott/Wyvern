function cancelPopUp(){
    //Client
    $('#client_pop_up').removeClass('input_box_open');
    //Clear input
    $("#create_client").val('')
    $("#create_client_name").val('')
    $("#create_client_addOne").val('')
    $("#create_client_addTwo").val('')
    $("#create_client_city").val('')
    $("#create_client_country").val('')
    $("#client_project_selection").removeClass('form_error');
    $("#create_client").removeClass('form_error');
    $("#create_client_name").removeClass('form_error');
    

    //User
    $('#user_pop_up').removeClass('input_box_open');
    //Clear input
    $("#create_user").val('')
    $("#create_user_name").val('')
    $("#create_user_addOne").val('')
    $("#create_user_addTwo").val('')
    $("#create_user_city").val('')
    $("#create_user_country").val('')
    
    //Project
    $('#project_pop_up').removeClass('input_box_open');
    //Clear Input
    $("#create_project_name").val('');
    $("#create_project_duration").val('');
    $("#create_project_date").val(); 
    $("#create_project_name").removeClass('form_error');
    $("#create_project_date").removeClass('form_error');
    $("#create_project_duration").removeClass('form_error');
    $("#create_project_date").css({"filter": "none", "pointer-events": "unset"});


    //Colour
    $("#colour_creation_name").val('');
    $("#colour_creation_rate").val('');
    $("#colour_creation_colour").val('');
    $('#colour_pop_up').removeClass('input_box_open');


    //Update
    $('#update_pop_up').removeClass('input_box_open');
    $('#no_update_pop_up').removeClass('input_box_open');
}