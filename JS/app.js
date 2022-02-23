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

/* let minutes = 5;
let the_interval = minutes * 60 * 1000;
let backUpNum = 0;
setInterval(function() {
    let path = `./DATA/Backups/backup${backUpNum}.json`;
    write_file(JSON.stringify(masterDict), path);
    backUpNum++;
    backUpNum = backUpNum % 3;
}, the_interval); */