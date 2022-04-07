import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import $ from 'jquery'
const { ipcRenderer } = window.require("electron");
ipcRenderer.on('reedMasterDict', function(event, arg) {
    $('#saving_pop_up').addClass('input_box_open');
    window.setTimeout(function(){
        $('#saving_pop_up').removeClass('input_box_open');
    }, 1000)
    event.sender.send('readMasterDict', JSON.parse(window.localStorage.getItem('masterDict')));
    arg
});

ipcRenderer.send('master_dict_read')
ipcRenderer.on('master_dict_reading', function(event, data) {
    event;
    if(!window.localStorage.getItem('masterDict')){
        window.localStorage.setItem('masterDict', JSON.stringify(data))
    }
    
})

ipcRenderer.on('loadData', function(event, data) {
    window.localStorage.setItem('masterDict', data)
    event;
})

saveChecker();

app.mount('#app');




function saveChecker(){
    let masterDict = JSON.parse(window.localStorage.getItem('masterDict'));
    if(masterDict['saveVersion'] == 4){
        masterDict['records']['accounts'] = [];
        masterDict['records']['categories'] = ['Contract Work'];
        masterDict['saveVersion'] = 5;
    }
    window.localStorage.setItem('masterDict', JSON.stringify(masterDict));
}