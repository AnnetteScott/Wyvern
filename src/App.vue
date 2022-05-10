<template>
	<BackgroundBubble/>
    <NavBar :title="`Wyvern`"/>
    <SavingPopup />
   
    <div id="home_page"> 
    <template v-if="update">
        <div id="update">
            There is an update available. Go to &nbsp; <a @click="openWyvern">Wyvern Releases</a>
        </div>
    </template>
        <img src="./assets/WyvernIcon.png" draggable="false" alt="" style="filter: grayscale(1) brightness(4);">
        <h1>Welcome To Wyvern!</h1>
        <br>
        <p>Click the menu in the top right to get started.</p>
    </div>

</template>

<script>
import NavBar from './components/NavBar.vue';
import BackgroundBubble from './components/BackgroundBubble.vue';
import SavingPopup from './components/SavingPopup.vue';
import $ from 'jquery';
const { shell } = window.require("electron");

export default {
	name: 'App',
	components: {
        NavBar,
        BackgroundBubble,
        SavingPopup
    },
	mounted() {
        this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
        console.log(this.masterDict);
        setTimeout(() => {
            this.checkForUpdates();
        }, 1);
	},
    data() {
        return {
            update: false,
            masterDict: {}
        }
    },
    methods: {
        openWyvern(){
            shell.openExternal('https://github.com/Scott-Studios/Wyvern/releases/latest/')
        },
        updateVar(){
            this.update = true;
        },
        checkForUpdates(){
            let masterDict = {...this.masterDict}
            let update_data = undefined;
            let ref = this;
            $.ajax({
                dataType: "json",
                url: 'https://api.github.com/repos/Scott-Studios/Wyvern/releases',
                cache: false,
                success: function (data){
                    update_data = data;
                    let current_version = [
                        parseInt(masterDict['version'].split('.')[0]), 
                        parseInt(masterDict['version'].split('.')[1]), 
                        parseInt(masterDict['version'].split('.')[2])
                    ];
                    let latest_version = [
                        parseInt(update_data[0].tag_name.split('v')[1].split('.')[0]), 
                        parseInt(update_data[0].tag_name.split('v')[1].split('.')[1]), 
                        parseInt(update_data[0].tag_name.split('v')[1].split('.')[2])
                    ];
                    if(latest_version[0] > current_version[0] || latest_version[1] > current_version[1] || latest_version[2] > current_version[2]){
                        //nothing
                    }else{
                        ref.updateVar();
                    }

                },
                error: function (xhr){
                    console.log("Error " + xhr.status + ", could not check for updates.");
                }
            });
        }
	}
}
</script>

<style>
@import url('../public/root.css');
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: black;
}

#home_page{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    height: calc(100vh - var(--navbar_height));
    user-select: none;
}

#home_page::before{
	content: "";
	position: absolute;
	z-index: -1;
	display: block;
	width: min(70vw, 70vh);
	aspect-ratio: 1;
	border: 3px solid #ffffff40;
	border-radius: 50%;
	transform: translateY(var(--navbar_height));

    display: none;
}

#home_page::after{
	content: "";
	position: absolute;
	z-index: -1;
	display: block;
	width: min(80vw, 80vh);
	aspect-ratio: 1;
	border: 3px solid #ffffff20;
	border-radius: 50%;
	transform: translateY(var(--navbar_height));

    display: none;
}

#update{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 40px;
    box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
    border-radius: 10px;
    background-color: #ffffff3b;
}

#update a{
    cursor: pointer;
    color: blue;
}

</style>
