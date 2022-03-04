var ipcRenderer = require("electron").ipcRenderer;

ipcRenderer.send('master_dict_read');
ipcRenderer.on('master_dict_reading', function(event, data) {
    masterDict = {...data}
})

ipcRenderer.on('read_from_var', function(event, arg) {
    $('#saving_pop_up').addClass('input_box_open');
    window.setTimeout(function(){
        $('#saving_pop_up').removeClass('input_box_open');
    }, 1000)
    event.sender.send('readed_var', masterDict);
});

ipcRenderer.on("download progress", (event, progress) => {
    const cleanProgressInPercentages = Math.floor(progress * 100); // Without decimal point


    $('#download_progress_box').text(cleanProgressInPercentages);
    $('#download_pop_up').addClass('input_box_open');
});

ipcRenderer.on("download complete", (event, file) => {
    $('#download_progress_box').text('Download Complete!');
    window.setTimeout(() => {
    	cancelPopUp();
        console.log("This is running")
	}, 3000);
    console.log("This is also running")
});

ipcRenderer.on("download_folder", (event, filePath) => {
    downloadsFolder = filePath;
    console.log(filePath)
});