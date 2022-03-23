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
		<div id="time_sheet_container">
			<TimeSheet :weekID="currentWeek" ref="TimeSheet"/> 
		</div>
			
		<div id="colour_container">
			<div v-for="colourID in projectDict['colours']" :key="colourID" :colourid="colourID" class="colour_item" :style="`background-color:${masterDict['colours'][colourID]['colour']};`" @click="colourCell">{{ masterDict['colours'][colourID]['name'] }}</div>
		</div>
	</div>

</template>

<script>
import NavBar from '../../components/NavBar.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import ButtonItem from '../../components/ButtonItem.vue';
import TimeSheet from '../../components/TimeSheet.vue';
import $ from 'jquery'

export default {
	name: 'App',
	components: {
		NavBar,
		BackgroundBubble,
		ButtonItem,
		TimeSheet
	},
	data() {
		return {
			projectDict: {},
			weekDict: {},
			projectID: '',
			masterDict: {},
			currentWeek: ``,
			selectedCellsList: [],
            weekID: ''
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
		this.projectID = localStorage.getItem('projectID');
		this.projectDict = this.masterDict['projects'][this.projectID]
		$(`#projectTitle`).text(`PROJECT: ${this.projectDict['name']}`)
	},
	methods: {
		weekButton(event){
			this.weekID = $(event.target).attr('data');
			this.weekDict = this.projectDict['weeks'][this.weekID];
			$(`#weekTitle`).text(`WEEK: ${this.weekID}`)
			this.currentWeek = this.weekID;
			setTimeout(() => {
				this.$refs.TimeSheet.updateLib();
			}, 1)
		},
		colourCell(event){
			this.selectedCellsList = localStorage.getItem('selectedCellsList').split(',');
			const colourID = $(event.target).attr('colourid');
			this.selectedCellsList.forEach(cellID => {
                for(const colourID of Object.keys(this.masterDict['colours'])){
                    if(this.weekDict['colouredCells'][colourID].includes(cellID)){
                        this.weekDict['colouredCells'][colourID].splice(this.weekDict['colouredCells'][colourID].indexOf(cellID), 1)
                    }
                }
                this.weekDict['colouredCells'][colourID].push(cellID);
                $(`[cellid=${cellID}]`).css({"background-color": this.masterDict['colours'][colourID]['colour'], "border-color": "black"});
			});

			this.selectedCellsList = [];
			localStorage.removeItem('selectedCellsList')  
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
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
	width: 150px;
	min-width: 150px;
	height: calc(100vh - var(--navbar_height) - 10vh);
	overflow-y: scroll;
	margin: 10px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	border-radius: 10px;
	background-color: #ffffff3b;
}

#weeks_container > div{
	width: 90%;
	height: 30px;
}

#time_sheet_container{
	display: flex;
	align-items: center;
	width: 100%;
	height: calc(100vh - var(--navbar_height) - 10vh);
	overflow-y: scroll;
	margin: 10px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	overflow-x: scroll;
	border-radius: 10px;
	background-color: #ffffff3b;
}

#colour_container{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
	min-width: 200px;
	height: calc(100vh - var(--navbar_height) - 10vh);
	overflow-y: scroll;
	margin: 10px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	border-radius: 10px;
	background-color: #ffffff3b;
}

.colour_item{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90%;
	height: 25px;
	margin-top: 10px;
	border-radius: 10px;
	cursor: pointer;
}

.colour_item:hover{
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.082), 0 10px 10px rgba(0, 0, 0, 0.11);
}

</style>
