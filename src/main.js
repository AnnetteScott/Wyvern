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

window.setTimeout(function(){
    saveChecker();
}, 1)

app.mount('#app');


function saveChecker(){
    let masterDict = JSON.parse(window.localStorage.getItem('masterDict'));
    if(masterDict['saveVersion'] == 4){
        masterDict['records']['accounts'] = [];
        masterDict['records']['categories'] = ['Contract Work'];
        masterDict['saveVersion'] = 5;
    }
    if(masterDict['saveVersion'] == 5){
        masterDict['records']['homeExpenses'] = {};
        masterDict['saveVersion'] = 6;
    }
    if(masterDict['saveVersion'] == 6){
        masterDict['colours']['colourWhite']['name'] = 'Clear';
        for(const[projectID, projectDict] of Object.entries(masterDict['projects'])){
            for(const[weekID, weekDict] of Object.entries(projectDict['weeks'])){
                masterDict['projects'][projectID]['weeks'][weekID]['invoiced'] = false;
                weekDict['invoiced'] = false;
            }
        }
        masterDict['saveVersion'] = 7;
    }
    if(masterDict['saveVersion'] == 7){
        for(const[projectID, projectDict] of Object.entries(masterDict['projects'])){
            projectDict['targetHours'] = 0;
            projectID;
        }
        masterDict['saveVersion'] = 8;
    }
    if(masterDict['saveVersion'] == 8){
        for(const[yearID, recordsDict] of Object.entries(masterDict['records'])){
            if(yearID != 'accounts' && yearID != 'categories' && yearID != 'homeExpenses'){
                for(const[transID, trandDict] of Object.entries(recordsDict['transactions'])){
                    trandDict['receiptID'] = '';
                    transID;
                }
            }
        }
        masterDict['saveVersion'] = 9;
    }
    window.localStorage.setItem('masterDict', JSON.stringify(masterDict));
}