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


app.mount('#app');