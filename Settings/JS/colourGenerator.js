function addColour(){
    let name = document.getElementById('colour_creation_name').value;
    let colour = document.getElementById('colour_creation_colour').value;
    if(name in colourMasterDict || name == '' || name == null){
        document.querySelector('.creation_form').classList.add('form_error');
    } else {
        document.querySelector('.creation_form').classList.remove('form_error');
        colourMasterDict[name] = [colour, {"yes":[], "no":[]}];

        //Clear inputs
        document.getElementById('colour_creation_name').value = ""; 
        changePage('PAGE_settings');
    }
}