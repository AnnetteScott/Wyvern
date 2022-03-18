import { createApp } from 'vue'
import App from './App.vue'

let saveVersion = 3;
let masterDict = {"projects": {}, "clients": {}, "colours": {}, "users": {}, "taxes": {}, "saveVersion": saveVersion}
const app = createApp(App)
app.config.globalProperties.$masterDict = masterDict;

app.mount('#app');