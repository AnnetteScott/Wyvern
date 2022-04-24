<template>
	<BackgroundBubble />
	<NavBar 
		:title="`Project: ${projectDict['name']}`"
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
        <template v-if="weekID !== ''">
            <p>Complete </p>
            <p id="hours_left" style="font-weight: bold;"></p>
            <p>more hours to reach {{ projectDict['targetHours'] }}H</p>
        </template>
	</div>
	<div id="inner">
		<div id="weeks_container">
			<template v-for="(weekDict, weekID) in projectDict['weeks']" :key="weekDict">
				<template v-if="weekDict['invoiced'] == true">
					<ButtonItem class="week_item" :data="weekID" @click="weekButton" :title="weekID" :image="require(`../../assets/icons/checkmark.svg`)" @contextmenu="rightClickWeek"/>
				</template>
				<template v-else>
					<ButtonItem class="week_item" :data="weekID" @click="weekButton" :title="weekID" @contextmenu="rightClickWeek"/>
				</template>
			</template>
            <ButtonItem class="week_item" @click="addWeek" :title="`+`"/>
		</div>
		<div id="time_sheet_container">
			<TimeSheet :weekID="currentWeek" ref="TimeSheet"/> 
		</div>
			
		<div id="colour_container">
			<div v-for="colourID in projectDict['colours']" :key="colourID" :colourid="colourID" class="colour_item" :style="`background-color:${masterDict['colours'][colourID]['colour']};`" @click="colourCell">
                <p v-bind:style="`color: ${pickTextColorBasedOnBgColor(masterDict['colours'][colourID]['colour'])}`">{{ masterDict['colours'][colourID]['name'] }}</p>
            </div>
		</div>
	</div>
	<div id="week_button_menu">
		<div class="context_option" @click="toggleCheckMark">Toggle Invoice Status</div>
		<div class="context_option" @click="show_delete=true">Delete Week</div>
	</div>
    <DeleteBox :showDelete="show_delete" @dontDelete="show_delete=false"
	@doDelete="deleteWeek"/>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import ButtonItem from '../../components/ButtonItem.vue';
import TimeSheet from '../../components/TimeSheet.vue';
import DeleteBox from '../../components/DeleteBox.vue';
import $ from 'jquery';
import {addToDate } from '../../../public/generalFunctions.js';

export default {
	name: 'App',
	components: {
		NavBar,
		BackgroundBubble,
		ButtonItem,
		TimeSheet,
        DeleteBox
	},
	data() {
		return {
			projectDict: {},
			weekDict: {},
			projectID: '',
			masterDict: {},
			currentWeek: ``,
			selectedCellsList: [],
			weekID: '',
			week: '',
            show_delete: false,
            projectTitle: ''
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
		this.projectID = localStorage.getItem('projectID');
		this.projectDict = this.masterDict['projects'][this.projectID];
	},
	methods: {
		rightClickWeek(e) {
			let position = $(e.target).position();  
			$(`#week_button_menu`).removeClass('visible');
			setTimeout(() => {
				$(`#week_button_menu`).addClass('visible');
				this.week = $(e.target).attr('data')
			}, 1)
			$('#week_button_menu').css({
				left: position.left + 128.25 +'px', //16.75 should be 145
				top: position.top + 5 + 'px' //95 should be 100
			})
			const scope = document.getElementById("app");
			scope.addEventListener("click", (e) => {
				if(e.target.offsetParent != $('#week_button_menu')){
					$(`#week_button_menu`).removeClass('visible');
				}
			}) 
		},
		toggleCheckMark(){
			this.projectDict['weeks'][this.week]['invoiced'] ? this.projectDict['weeks'][this.week]['invoiced'] = false : this.projectDict['weeks'][this.week]['invoiced'] = true;
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
		},
        addWeek(){
            let colourIds = Object.keys(this.masterDict['colours'])
            let duration = this.projectDict['duration'];
            if(this.projectDict['weekInterval'] == 1){
                let date = this.projectDict['weeks'][`${duration}`]['startDate'];
                date = addToDate(date, 14);
                this.projectDict['weeks'][`${duration + 1}`] = {'startDate': date, 'colouredCells': {}, 'invoiced': false};
                colourIds.forEach(colourID => {
                    if(colourID != 'colourWhite'){
                        this.projectDict['weeks'][`${duration}`]['colouredCells'][colourID] = [];
                    }
                });
                this.projectDict['duration'] += 1;

            }else if(this.projectDict['weekInterval'] == 2){
                let lastKey = `${duration - 1} - ${duration}`;
                let date = this.projectDict['weeks'][lastKey]['startDate'];
                date = addToDate(date, 14);
                this.projectDict['weeks'][`${duration + 1} - ${duration + 2}`] = {'startDate': date, 'colouredCells': {}, 'invoiced': false};
                colourIds.forEach(colourID => {
                    if(colourID != 'colourWhite'){
                        this.projectDict['weeks'][`${duration + 1} - ${duration + 2}`]['colouredCells'][colourID] = [];
                    }
                });
                this.projectDict['duration'] += 2;
            }
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
        },
        deleteWeek(){
            this.show_delete = false;
            delete this.projectDict['weeks'][this.week];
            let weekKeys = Object.keys(this.projectDict['weeks'])
            let lastKey = weekKeys[weekKeys.length - 1]
            if(this.projectDict['weekInterval'] == 1){
                this.projectDict['duration'] = parseInt(lastKey)
            }
            else if(this.projectDict['weekInterval'] == 2){
                this.projectDict['duration'] = parseInt(lastKey.split(' - ')[1])
            }
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
            console.log(this.masterDict)
        },
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
				
			}
            $(`[cellid=A${cellTotal + 4}]`).text(`${timeTotal}H`);
			$(`[cellid=A${cellTotal + 5}]`).text(`$${timeMoney.toFixed(2)}`);
            let neededHours = this.projectDict['targetHours'] - timeTotal <= 0 ? 0 : this.projectDict['targetHours'] - timeTotal;
            $(`#hours_left`).text(neededHours)
		},
        pickTextColorBasedOnBgColor(bgColor) {
            let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
            let r = parseInt(color.substring(0, 2), 16); // hexToR
            let g = parseInt(color.substring(2, 4), 16); // hexToG
            let b = parseInt(color.substring(4, 6), 16); // hexToB
            let uicolors = [r / 255, g / 255, b / 255];
            let c = uicolors.map((col) => {
                if (col <= 0.03928) {
                return col / 12.92;
                }
                return Math.pow((col + 0.055) / 1.055, 2.4);
            });
            let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
            return (L > 0.179) ? '#000000' : '#ffffff';
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
	justify-content: center;
}

#top_title > p{
	font-size: 17px;
    padding: 0px 4px;
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

.colour_item p{
    pointer-events: none;
    font-family: 'Lora';
    font-size: 17px;
}

.colour_item:hover{
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.082), 0 10px 10px rgba(0, 0, 0, 0.11);
}

.activeButton{
	background: linear-gradient(45deg, #054ff0, #05f0f0) !important;
}

#week_button_menu{
	position: fixed;
	z-index: 500;
	width: 200px;
	background: #1b1a1a;
	border-radius: 10px;
	transform: scale(0);
	transform-origin: top left;
}

#week_button_menu.visible{
	transform: scale(1);
	transition: transform 200ms ease-in-out;
}

#week_button_menu .context_option{
	padding: 8px 10px;
	font-size: 15px;
	color: #eee;
	cursor: pointer;
	border-radius: inherit;
}

#week_button_menu .context_option:hover{
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
}
</style>
