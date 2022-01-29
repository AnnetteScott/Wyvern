let TaskManager = {
    enabled: true,

    start: function (){
        if(TaskManager.enabled){window.requestAnimationFrame(TaskManager.render_loop);}
    },

    render_loop: function (){
        TaskManager.tasks.t_projects();

        if(TaskManager.enabled){window.requestAnimationFrame(TaskManager.render_loop);}
    },

    tasks: {
        t_projects: function (){
            if(shallowEqual(projects, TaskManager.cache.c_projects) == false){
                let elem = '';
                Object.keys(projects).forEach(function(k, i){
                    elem += DOM_Blocks.small_project_card(i, k.toString().replaceAll("_", " "));
                });
                document.getElementById("projects_list").innerHTML = elem;
                TaskManager.cache.c_projects = { ...projects };
            }
        },

        t_navigation: function (){
            if(currentPage === TaskManager.cache.c_navigation){

            }
        }
    },

    cache: {
        c_projects: {},
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