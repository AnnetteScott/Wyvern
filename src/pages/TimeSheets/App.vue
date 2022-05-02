<template>
	<BackgroundBubble />
	<NavBar 
		:title="`Time Sheets`"
		:links="[
			{
				title: `Wyvern`,
				image: require(`../../assets/icons/home_white_24dp.svg`),
				url: `/index.html`
			},
			{
				title: `Settings`,
				image: require(`../../assets/icons/settings_white_24dp.svg`),
				url: `/Settings.html`
			},
			{
				title: `Time Sheets`,
				image: require(`../../assets/icons/schedule_white_24dp.svg`),
				url: `/TimeSheets.html`
			},
			{
				title: `Invoice`,
				image: require(`../../assets/icons/receipt_white_24dp.svg`),
				url: `/Invoice.html`
			},
			{
				title: `Records`,
				image: require(`../../assets/icons/receipt_long_white_24dp.svg`),
				url: `/Records.html`
			}
		]"
	/>
    <div id="inner">
        <div id="project_container">
            <a v-for="(projectDict, projectID) in masterDict['projects']" :key="projectDict" class="list_item" :data="projectID" @click="saveProjectID" :href="`/Project.html`">{{ projectDict.name }}</a> 
        </div>
    </div>
    
    

</template>

<script>
import NavBar from '../../components/NavBar.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import $ from 'jquery';

export default {
	name: 'App',
	components: {
		NavBar,
		BackgroundBubble
	},
    data() {
		return {
			masterDict: {}
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
	},
    methods:{
        saveProjectID(event){
            const id = $(event.target).attr('data');
            localStorage.setItem('projectID', id);
        }
    }
}
</script>

<style>
@import url('../../../public/root.css');
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: black;
	margin-top: var(--navbar_height);
}

#inner{
    width: 100%;
    height: calc(100vh - var(--navbar_height));
    display: flex;
    align-items: center;
    justify-content: center;
}

@media only screen and (max-width: 1435px) {
    #inner {
        height: calc(100vh - var(--navbar_height) - 15px);
        overflow-x: auto;
    }
}

#project_container {
    width: 100%;
    z-index: 2;
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
	min-height: calc(100vh - var(--navbar_height) - 110px);
	overflow-y: scroll;
	overflow-x: hidden;
	margin: 1px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
    border-radius: 10px;
}

.list_item {
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	width: 95%;
	height: clamp(60px, 60px, 60px);
	padding: 0px 20px;
	background-color: #ffffff40;
	border-radius: 10px;
	cursor: pointer;
	font-family: 'Lora';
	font-weight: 900;
	font-size: 2.25em;
    text-decoration: none;
    color: black;
}

.list_item:hover {
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.082), 0 10px 10px rgba(0, 0, 0, 0.11);
}
</style>
