let TaskManager = {
    enabled: true,

    start: function (){
        if(TaskManager.enabled){window.requestAnimationFrame(TaskManager.render_loop);}
    },

    render_loop: function (){
        TaskManager.tasks.t_projects();
        TaskManager.tasks.t_colours();

        if(TaskManager.enabled){window.requestAnimationFrame(TaskManager.render_loop);}
    },

    tasks: {
        t_projects: function (){
            if(shallowEqual(projectMasterDict, TaskManager.cache.c_projects) == false){
                let elem = '';
                Object.keys(projectMasterDict).forEach(function(k, i){
                    elem += DOM_Blocks.small_project_card(i, k.toString().replaceAll("_", " "));
                });
                document.getElementById("projects_list").innerHTML = elem;
                TaskManager.cache.c_projects = { ...projectMasterDict };
            }
        },

        t_colours: function (){
            if(shallowEqual(colourMasterDict, TaskManager.cache.c_colours) == false){
                let elem = '';
                let elemCheck = '';
                Object.keys(colourMasterDict).forEach(function(k){
                    elem += DOM_Blocks_Settings.colour_card(k, colourMasterDict[k][0]);
                });
                Object.keys(colourMasterDict).forEach(function(key){
                    Object.keys(projectMasterDict).forEach(function(k){
                        elemCheck += DOM_Blocks_Settings.checkboxes(k, key);
                    });
                    elemCheck += "<br>"
                });
                
                document.getElementById("colour_list").innerHTML = elem;
                document.getElementById("colour_list_checkboxes").innerHTML = elemCheck;
                TaskManager.cache.c_colours = { ...colourMasterDict };
            }
        },

        t_navigation: function (){
            if(currentPage === TaskManager.cache.c_navigation){

            }
        }
    },

    cache: {
        c_projects: {},
        c_colours: {},
        c_navigation: null
    }
}


function shallowEqual(object1, object2){
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if(keys1.length !== keys2.length){
        return false;
    }
    for(let key of keys1){
        if(object1[key] !== object2[key]){
            return false;
        }
    }
    return true;
  }