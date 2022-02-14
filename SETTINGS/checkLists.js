//Toggles open/closed the dropdown of a specified checklist.
//Called from the click listener of a checklist element.
function toggleChecklist(e){
	$(e.target).parent().toggleClass('visible');
}