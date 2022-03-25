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
    event.sender.send('readMasterDict', window.localStorage.getItem('masterDict'));
    arg
});

ipcRenderer.send('master_dict_read')
ipcRenderer.on('master_dict_reading', function(event, data) {
    if(!window.localStorage.getItem('masterDict')){
        window.localStorage.setItem('masterDict', JSON.stringify(data))
    }
})
app.mount('#app');