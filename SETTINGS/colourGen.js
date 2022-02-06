let selectedColourID = '';

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

		if(selectedColourID == ''){
			let colourID = generateID();
			//Generate unique projectID 
			while(masterDict['colours'].hasOwnProperty(colourID)){
				colourID = generateID();
			}
			masterDict['colours'][colourID] = {};
			//Add info to colour dict
			masterDict['colours'][colourID] = {'colourName': colourName,'colourRate': colourRate, 'colour': colour}
		}else{
			masterDict['colours'][selectedColourID] = {};
			//Add info to colour dict
			masterDict['colours'][selectedColourID] = {'colourName': colourName,'colourRate': colourRate, 'colour': colour}
		}
		selectedColourID = '';
        $('#colour_pop_up').removeClass('input_box_open');
		$("#colour_creation_name").val('');
		$("#colour_creation_rate").val('');
        $("#create_client_name").val('#000000');
    }
}


function editColour(e){
	let colourID = $(e.target).attr('colourid');
	$("#colour_creation_name").val(masterDict['colours'][colourID]['colourName']);
    $("#colour_creation_rate").val(masterDict['colours'][colourID]['colourRate']);
    $("#colour_creation_colour").val(masterDict['colours'][colourID]['colour']);
	$('#colour_pop_up').addClass('input_box_open');
	selectedColourID = colourID;
}
