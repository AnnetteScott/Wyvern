let renderDOM = {
    enabled: true,

    start: function (){
        if(renderDOM.enabled){window.requestAnimationFrame(renderDOM.render_loop);}
    },

    render_loop: function (){
        renderDOM.tasks.t_projects();

        if(renderDOM.enabled){window.requestAnimationFrame(renderDOM.render_loop);}
    },

    tasks: {
        t_projects: function (){
            if(projects !== renderDOM.cache.c_projects){
                let elem = '';
                Object.keys(projects).forEach(function(k, i){
                    elem += DOM_Blocks.small_project_card(i, k.toString().replaceAll("_", " "));
                });
                document.getElementById("projects_list").innerHTML = elem;
                renderDOM.cache.c_projects = projects;
            }
        }

    },

    cache: {
        c_projects: null
    }
}