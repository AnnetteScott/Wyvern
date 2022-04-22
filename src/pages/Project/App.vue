<template>
	<BackgroundBubble />
	<NavBar 
		:title="`Project Time Sheets`"
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
	<div id="top_title">
		<div id="projectTitle"></div>    
	</div>
	<div id="inner">
		<div id="weeks_container">
			<template v-for="(weekDict, weekID) in projectDict['weeks']" :key="weekDict">
				<template v-if="weekDict['invoiced'] == true">
					<ButtonItem class="week_item" :data="weekID" @click="weekButton" :title="weekID" :image="require(`../../assets/icons/checkmark.svg`)"/>
				</template>
				<template v-else>
					<ButtonItem class="week_item" :data="weekID" @click="weekButton" :title="weekID"/>
				</template>
			</template>
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
			$('.button_link').each((index, weekButton) => {
				$(weekButton).removeClass('activeButton');
			});
			$(event.target).addClass('activeButton')
			this.weekDict = this.projectDict['weeks'][this.weekID];
			this.currentWeek = this.weekID;
			setTimeout(() => {
				this.$refs.TimeSheet.updateLib();
				setTimeout(() => {
					this.updateColourTotals();
				}, 1)
			}, 1)
			
		},
		colourCell(event){
			this.selectedCellsList = localStorage.getItem('selectedCellsList').split(',');
			const colourID = $(event.target).attr('colourid');
			this.selectedCellsList.forEach(cellID => {
				for(const colourIDm of Object.keys(this.masterDict['colours'])){
					if(colourIDm != 'colourWhite'){
						if(this.weekDict['colouredCells'][colourIDm].includes(cellID)){
							this.weekDict['colouredCells'][colourIDm].splice(this.weekDict['colouredCells'][colourIDm].indexOf(cellID), 1)
						}
					}
				}
				if(colourID != 'colourWhite'){
					this.weekDict['colouredCells'][colourID].push(cellID);
				}
				$(`[cellid=${cellID}]`).css({"background-color": this.masterDict['colours'][colourID]['colour'], "border-color": "black"});
			});

			this.selectedCellsList = [];
			localStorage.setItem('selectedCellsList', 'coloured') 
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.updateColourTotals();
			this.$refs.TimeSheet.updateLib();
		},
		updateColourTotals(){
			let cellTotal = this.projectDict['timeList'].length + 1;
			for(const [colourID, cellArr] of Object.entries(this.weekDict['colouredCells'])){
				if(colourID != 'colourWhite'){
					let colourTotals = {};
					if(this.projectDict['weekInterval'] == 1){
						colourTotals = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0};
					}else{
						colourTotals = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0};
					}
					cellArr.forEach(cellID => {
						colourTotals[cellID.charAt(0)] += Math.round((1/(60/this.projectDict['timeInterval'])) * 1000) / 1000;
					});
					for(let [collID, colourTotal] of Object.entries(colourTotals)){
						$(`[cellid=${collID}${cellTotal}]`).text(`${colourTotal.toFixed(2)}`)
					}
					cellTotal++;
				}
				
			}
			let columns = {};
			if(this.projectDict['weekInterval'] == 1){
				columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
			}else{
				columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
			}
			let weekTotal = 0;
			let weekMoney = 0;
			let timeTotal = 0;
			let timeMoney = 0;
			for(let i = 0; i < this.projectDict['weekInterval'] * 7; i++){
				let cellTotal = this.projectDict['timeList'].length + 1;
				let colTotal = 0;
				let colMoney = 0;
				for(let index in this.projectDict['colours']){ //Total up each colour per coloumn
					if(this.projectDict['colours'][index] != 'colourWhite'){
						let cellID = `${columns[i]}${cellTotal}`;
						colTotal += parseFloat($(`[cellid=${cellID}]`).text())
						colMoney += parseFloat($(`[cellid=${cellID}]`).text()) * this.masterDict['colours'][this.projectDict['colours'][index]]['rate']
						cellTotal++;
					}
				}
				weekTotal += colTotal;
				weekMoney += colMoney;
				$(`[cellid=${columns[i]}${cellTotal}]`).text(`${colTotal}H`)
				$(`[cellid=${columns[i]}${cellTotal + 1}]`).text(`$${colMoney.toFixed(2)}`)
				if(i % 7 == 6){
					$(`[cellid=${columns[i - 6]}${cellTotal + 2}]`).text(`${weekTotal}H`);
					$(`[cellid=${columns[i - 6]}${cellTotal + 3}]`).text(`$${weekMoney.toFixed(2)}`);
					timeTotal += weekTotal;
					timeMoney += weekMoney;
					weekTotal = 0;
					weekMoney = 0;
				}
				if(i == this.projectDict['weekInterval'] * 7 - 1){
					$(`[cellid=A${cellTotal + 4}]`).text(`${timeTotal}H`);
					$(`[cellid=A${cellTotal + 5}]`).text(`$${timeMoney.toFixed(2)}`);
				}
				
			}
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
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: flex-start;
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
	background-color: #ffffff56;
	font-family: 'Lora';
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
	border: 1px solid black
}

.colour_item:hover{
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.082), 0 10px 10px rgba(0, 0, 0, 0.11);
}

.activeButton{
	background: linear-gradient(45deg, #054ff0, #05f0f0) !important;
}
</style>
