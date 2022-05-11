import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

const { ipcRenderer } = window.require("electron");
ipcRenderer.on('reedMasterDict', function(event, arg) {
    ipcRenderer.send('trigger_save_pop_up');
    event.sender.send('readMasterDict', JSON.parse(window.localStorage.getItem('masterDict')));
    arg;
});

ipcRenderer.send('master_dict_read');
ipcRenderer.on('master_dict_reading', function(event, data) {
    if(!window.localStorage.getItem('masterDict')){
        window.localStorage.setItem('masterDict', JSON.stringify(data));
    }
});

ipcRenderer.on('loadData', function(event, data) {
    window.localStorage.setItem('masterDict', data);
    event;
});

window.setTimeout(function(){
    saveChecker(); 
}, 1);

app.mount('#app');


function saveChecker(){
    let pjson = require('../package.json');
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
                if(recordsDict['transactions'] != undefined){
                    for(const[transID, transDict] of Object.entries(recordsDict['transactions'])){
                        transDict['receiptID'] = '';
                        transID;
                    }
                }
                
            }
        }
        masterDict['saveVersion'] = 9;
    }
    if(masterDict['saveVersion'] == 9){
        delete masterDict['records']['homeExpenses']
        masterDict['records']['savedTransactions'] = {}
        masterDict['saveVersion'] = 10;
    }
    if(masterDict['saveVersion'] == 10){
        let categoryCopy = [... masterDict['records']['categories']];
        masterDict['records']['categories'] = {};
        categoryCopy.forEach(item => {
            masterDict['records']['categories'][item] = true;
        });
        masterDict['saveVersion'] = 11;
    }
    if(masterDict['saveVersion'] == 11){
        masterDict['records']['payee'] = [];
        masterDict['saveVersion'] = 12;
    }
    if(masterDict['saveVersion'] == 12){
        for(const[yearID, recordsDict] of Object.entries(masterDict['records'])){
            if(yearID != 'accounts' && yearID != 'categories' && yearID != 'homeExpenses'){
                if(recordsDict['transactions'] != undefined){
                    for(const[transID, transDict] of Object.entries(recordsDict['transactions'])){
                        transDict['payee'] = '';
                        transID;
                    }
                }
            }
        }
        masterDict['saveVersion'] = 13;
    }
    if(masterDict['saveVersion'] == 13){
        masterDict['showGST'] = true;
        masterDict['saveVersion'] = 14;
    }
    if(masterDict['saveVersion'] == 14){
        masterDict['version'] = pjson.version;
        masterDict['saveVersion'] = 15;
    }
    masterDict['version'] = pjson.version;
    window.localStorage.setItem('masterDict', JSON.stringify(masterDict));
}