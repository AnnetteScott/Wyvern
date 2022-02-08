function toggleChecklist(e){
	if($(e.target).parent().hasClass('visible')){
		$(e.target).parent().removeClass('visible');
	}else{
		$(e.target).parent().addClass('visible');
	}
}