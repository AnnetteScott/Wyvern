function addNewColour(){
    let colourName = $("#colour_creation_name").val();
    let colourRate = $("#colour_creation_rate").val();
    let colour = $("#colour_creation_colour").val();
    
    if(colourName == ''){
        $("#colour_creation_name").addClass('form_error');
    }else if(colourRate == ''){
        $("#colour_creation_rate").addClass('form_error');
        $("#colour_creation_name").removeClass('form_error');
    }else {
        $("#colour_creation_rate").removeClass('form_error');
        $("#colour_creation_name").removeClass('form_error');
        //Generate unique projectID 
        let colourID = generateID();
        while(masterDict['colours'].hasOwnProperty(colourID)){
            colourID = generateID();
        }

        //Add info to clients dict
        masterDict['colours'][colourID] = {'colourName': colourName,'colourRate': colourRate, 'colour': colour}

        $('#colour_pop_up').removeClass('input_box_open');
    }

    
}