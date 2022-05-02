import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

const { ipcRenderer } = window.require("electron");
ipcRenderer.on('reedMasterDict', function(event, arg) {
    ipcRenderer.send('trigger_save_pop_up');
    event.sender.send('readMasterDict', JSON.parse(window.localStorage.getItem('masterDict')));
    arg;
});

ipcRenderer.on('loadData', function(event, data) {
    window.localStorage.setItem('masterDict', data);
    event;
})

app.mount('#app');