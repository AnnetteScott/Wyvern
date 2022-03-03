function checkForUpdates(){
	let update_data = undefined;
	$.ajax({
		dataType: "json",
		url: 'https://api.github.com/repos/NotNatural21/Wyvern/releases',
		cache: false,
		success: function (data){
			update_data = data;
			let current_version = [
				parseInt(wyvern_version.split('.')[0]), 
				parseInt(wyvern_version.split('.')[1]), 
				parseInt(wyvern_version.split('.')[2])
			];
			let latest_version = [
				parseInt(update_data[0].tag_name.split('V')[1].split('.')[0]), 
				parseInt(update_data[0].tag_name.split('V')[1].split('.')[1]), 
				parseInt(update_data[0].tag_name.split('V')[1].split('.')[2])
			];
			if(latest_version[0] > current_version[0] || latest_version[1] > current_version[1] || latest_version[2] > current_version[2]){
				showUpdate(update_data);
			}else{
				noUpdate();
			}

		},
		error: function (xhr, status, err){
			console.log("Error " + xhr.status + ", could not check for updates.");
			noUpdate();
		}
	});
}

function showUpdate(update_data){
	$('#update_heading').text('Update available');
	$('#update_version').html(`${wyvern_version} > <b>${update_data[0].tag_name.split('V')[1]}</b>`);
	$('#update_release_link').attr('src', update_data[0].assets[0].browser_download_url);
    $('#update_pop_up').addClass('input_box_open');
	
}

function noUpdate(){
    $('#no_update_pop_up').addClass('input_box_open');
	console.log('This ran')
	window.setTimeout(() => {
    	cancelPopUp();
	}, 3000);
}

function downloadUpdate(){
	ipcRenderer.send("downloadUpdate", {
		url: $('#update_release_link').attr('src')
	});
	cancelPopUp();
}