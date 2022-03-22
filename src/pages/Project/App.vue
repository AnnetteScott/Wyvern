<template>
	<BackgroundBubble />
	<NavBar 
		:title="`Project Time Sheets`"
		:links="[
			{
				title: `Wyvern`,
				image: require(`../../assets/icons/home_white_24dp.svg`),
				url: `/`
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
	<div id="top_title">
		<div id="projectTitle"></div>    
		<div id="weekTitle">WEEK: </div> 
	</div>
	<div id="inner">
		<div id="weeks_container">
			<ButtonItem v-for="(weekDict, weekID) in projectDict['weeks']" :key="weekDict" class="list_item" :data="weekID" @click="weekButton" :title="weekID" />
		</div>
		<div id="time_sheet_container"></div>
		<div id="colour_container"></div>
	</div>

</template>

<script>
import NavBar from '../../components/NavBar.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import ButtonItem from '../../components/ButtonItem.vue';
import $ from 'jquery'

export default {
	name: 'App',
	components: {
		NavBar,
		BackgroundBubble,
		ButtonItem
	},
	data() {
		return {
			projectDict: {},
			weekDict: {},
			projectID: '',
			masterDict: {}
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
		this.projectID = localStorage.getItem('projectID')
		this.projectDict = this.masterDict['projects'][this.projectID]
		$(`#projectTitle`).text(`PROJECT: ${this.projectDict['name']}`)
	},
	methods: {
		weekButton(event){
			const weekID = $(event.target).attr('data');
			this.weekDict = this.projectDict['weeks'][weekID];
			console.log($(event.target))
			$(`#weekTitle`).text(`WEEK: ${weekID}`)
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
	flex-direction: row;
}

#top_title{
	height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

#top_title > div{
	font-size: 20px;
}

#weeks_container{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: clamp(150px, 150px, 150px);
	height: calc(100vh - var(--navbar_height) - 10vh);
	overflow-y: scroll;
	margin: 10px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	border-radius: 10px;
}

#weeks_container > div{
	width: 90%;
	height: 30px;
}

#time_sheet_container{
	display: flex;
	width: 100%;
	height: calc(100vh - var(--navbar_height) - 10vh);
	overflow-y: scroll;
	margin: 10px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	overflow-x: scroll;
	border-radius: 10px;
}

#colour_container{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: clamp(250px, 250px, 250px);
	height: calc(100vh - var(--navbar_height) - 10vh);
	overflow-y: scroll;
	margin: 10px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	border-radius: 10px;
}


</style>
