function addColour(){
    let name = document.getElementById('colour_creation_name').value;
    let colour = document.getElementById('colour_creation_colour').value;
    colour = hexToRgb(colour);
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

function hexToRgb(c){
    if(/^#([a-f0-9]{3}){1,2}$/.test(c)){
        if(c.length== 4){
            c= '#'+[c[1], c[1], c[2], c[2], c[3], c[3]].join('');
        }
        c= '0x'+c.substring(1);
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+')';
    }
    return '';
}