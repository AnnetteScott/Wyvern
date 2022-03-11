function changePage(pageID){
    toggleNavMenu();
    currentPage = pageID;
}


function toggleNavMenu(){
    if($(elements['navMenu']).hasClass('active')){
        $(elements['navMenu']).removeClass('active');
        //Un-animate the navlinks
        $('#nav_menu li').each(function (index) {
            $(this).css('animation', 'unset');
        });
    }else{
        $(elements['navMenu']).addClass('active');
        //Animate the navlinks
        $('#nav_menu li').each(function (index) {
            $(this).css('animation', `a_navLinkFade 0.2s ease forwards ${index / 7 + 0.15}s`);
        });
    }
}


VL.add('currentPageTitle', function(){
    if(currentPageTitle === 'home'){
        $(elements['navTitle']).text('wyvern');
    }else if(currentPageTitle != 'project page'){
        $(elements['navTitle']).text(currentPageTitle);
    }
});


VL.add('currentPage', function(){
    $('.page').addClass('hidden');
    $(`#PAGE_${currentPage}`).removeClass('hidden');
    currentPageTitle = currentPage.replace("_", " ");
});
