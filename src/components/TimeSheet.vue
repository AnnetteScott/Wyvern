<template>
	<template v-if="weekID != ``">
		<div v-for="(col, index) in columnLetter" :key="col" :colID="col" class="column">
			<div :cellID="`${col}-1`" class="dateCell">{{ dayList[index] }}</div>
			<div :cellID="`${col}0`" class="dateCell">{{ dateList[index] }}</div>
			<template v-if="col == `Z`">
				<div  v-for="(time, index) in timeList" :key="time" :cellID="`Z${index + 1}`" class="dateCell">{{ time }}</div>
			</template>
			<template v-else>
				<div  v-for="(time, index) in timeList" :key="time" :cellID="`${col}${index + 1}`" class="cell" :weekid="`${weekID}`" @mousedown="cellDown" @mouseover="cellHovered" @mouseup="cellRelease"/>
			</template>

			<!-- Weekly Cells -->
			<template v-if="col == `Z`">
				<div  v-for="(time, index) in infoList" :key="time" :cellID="`Z${index + cellIndexOffSet + 1}`" class="dateCell">{{ time }}</div>
			</template>
			<template v-if="col == `A` || col == `H`">
				<div  v-for="(time, index) in infoList" :key="time" :cellID="`${col}${index + cellIndexOffSet + 1}`" class="infoCell" :weekid="`${weekID}`"></div>
			</template>
			
			<template v-if="col == `Z`">
				<div  v-for="(time, index) in totalList" :key="time" :cellID="`Z${index + cellIndexOffSet + 3}`" class="dateCell">{{ time }}</div>
			</template>
			<template v-if="col == `A` && weekInterval == 1">
				<div  v-for="(time, index) in totalList" :key="time" :cellID="`${col}${index + cellIndexOffSet + 3}`" class="totalCellOne" :weekid="`${weekID}`"></div>
			</template>
			<template v-if="col == `A` && weekInterval == 2">
				<div  v-for="(time, index) in totalList" :key="time" :cellID="`${col}${index + cellIndexOffSet + 3}`" class="totalCellTwo" :weekid="`${weekID}`"></div>
			</template>
		</div>
	</template>
	<div id="user_selection_tip" class ="tool_tip hidden">Time: </div>
</template>

<script>
import { addToDate, dateToAmerica } from '../../public/generalFunctions.js';
import $ from 'jquery'

export default {
	name: 'TimeSheet',
	props: {
		weekID: String
	},
	data() {
		return {
			masterDict: {},
			projDict: {},
			weekDict: {},
			columnLetter: [],
			dateList: [],
			dayList: [],
			timeList: [],
			infoList: [],
			totalList: [],
			selectedCellsList: [],
			cellClicked: false,
			previousDate: 'Z',
			previousTime: '0',
			cellIndexOffSet: 0,
			weekInterval: '',
            timeInterval: 0,
            timeIndex: 0
		}
	},
	mounted(){
		const onMouseMove = (e) =>{
			$('#user_selection_tip').css({
				left: e.pageX + 55 + 'px',
				top: e.pageY - 20 + 'px'
			})
		}
		document.addEventListener('mousemove', onMouseMove);
        
        window.setInterval(() => {
            if(this.timeInterval !== 0){
                this.currentTime();
            }
        }, 60 * 1000)
	},
	methods: {
        currentTime() {
            let today = new Date();
            let mins = today.getMinutes();
            let minutes;
            if(mins > 48){
                minutes = 0;
            }else{
                minutes = (Math.round(today.getMinutes() / this.timeInterval) * this.timeInterval) % 60;
            }
            if (minutes == 0){
                minutes = '00'
            }
            let hours = parseInt(today.getHours());
            if (minutes === 0 && today.getMinutes >= 31){
                hours++;
                hours = hours % 24;
            }
            let time;
            if(hours < 10){
                time = "0" + hours + ":" + minutes;
            }else{
                time = hours + ":" + minutes;
            }
            this.timeIndex = this.timeList.indexOf(time) + 1;
            const cellID = `Z${this.timeIndex}`;
            $(`[colid=Z] > div`).css({"background-color": 'white'});
            $(`[cellid=${cellID}]`).css({"background-color": 'green'});
        },
		updateLib(){
            this.masterDict = JSON.parse(localStorage.getItem('masterDict'))
			this.projDict = this.masterDict['projects'][localStorage.getItem('projectID')]
			this.weekDict = this.projDict['weeks'][this.$props.weekID];
			this.columnLetter = [];
			this.dateList = [];
			this.timeList = [];
			this.weekInterval = this.projDict['weekInterval'];
            this.timeInterval = this.projDict['timeInterval'];

			if(this.selectedCellsList != []){
				this.selectedCellsList.forEach(cellIDR => {
					let colouredCells = this.listOfValuesArr(this.weekDict['colouredCells']);
					if(colouredCells.includes(cellIDR)){
						let cellColour = '';
						for(const [colourID, colourDict] of Object.entries(this.weekDict['colouredCells'])){
							if(colourDict.includes(cellIDR)){
								cellColour = this.masterDict['colours'][colourID]['colour'];
							}
						}
						
						this.cellDeSelect(cellIDR, cellColour);
					} else {
						this.cellDeSelect(cellIDR, "white"); 
					}
					
				});
			}
			this.selectedCellsList = [];
			this.cellClicked = false;

			//Colour coloured cells
			setTimeout(() => {
				$(`.cell`).css({"background-color": 'white', "border-color": "black"});
				for(const colourID of Object.keys(this.weekDict['colouredCells'])){
					this.weekDict['colouredCells'][colourID].forEach(cellID => {
						$(`[cellid=${cellID}]`).css({"background-color": this.masterDict['colours'][colourID]['colour'], "border-color": "black"});
					});
				}
			}, 1)

			this.dateList = [`Date | Time`];
			this.dateList.push(this.weekDict['startDate']);
			for(let i = 1; i < (this.projDict['weekInterval'] * 7); i++){
				this.dateList.push(addToDate(this.weekDict['startDate'], i))
			}

			this.timeList = [...this.projDict['timeList']];

			if(this.projDict['colours'] != []){
				for (let colourID of this.projDict['colours']) {
					if(colourID != 'colourWhite'){
						this.timeList.push(this.masterDict['colours'][colourID]['name']);  
					}
				}
			}
			this.timeList.push("Total Hours:");
			this.timeList.push("Total Daily $:");
			this.cellIndexOffSet = this.timeList.length;

			this.infoList = ["Weekly Hours:"];
			this.infoList.push("Weekly $:");

			this.totalList = ["Timesheet Hours:"];
			this.totalList.push("Timesheet Total $:");

            //Remove pointer events for the info section
			setTimeout(() => {
				for(let i = this.projDict['timeList'].length + 3; i <= this.timeList.length + this.infoList.length + this.totalList.length + 1; i++) {
					$(`.column > div:nth-child(${i})`).css("pointer-events", "none");
					$(`.column > div:nth-child(${i})`).css("user-select", "none");
				}
                //Set border for bottom of timelist timesheet section
				$(`.column > div:nth-child(${this.projDict['timeList'].length + 3})`).css("border-top", "2px solid black");
				$(`.column > div:nth-child(${this.projDict['timeList'].length + 2})`).css("border-bottom", "2px solid black");

				$(`.column > div:nth-child(${this.timeList.length})`).css("border-bottom", "2px solid black");
				$(`.column > div:nth-child(${this.timeList.length + 1})`).css({"border-top": '1px solid black', "font-weight": "bold"});
				$(`.column > div:nth-child(${this.timeList.length + 2})`).css({"font-weight": "bold"});

				$(`[colid=Z] > div:nth-child(${this.timeList.length + 1})`).css({"font-weight": "normal"});
				$(`[colid=Z] > div:nth-child(${this.timeList.length + 2})`).css({"font-weight": "normal"});

                for(let i = 0; i <= this.timeList.length + this.infoList.length + this.totalList.length + 1; i++) {
                    $('.column').each(function(i, obj) {
                        if(i == 7){
                            $(obj).css("border-right", "1px solid black");
                        }
                    });
				}
                this.currentTime();
			}, 1)
			
			if(this.projDict['weekInterval'] == 1){
				this.columnLetter = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
			}else{
				this.columnLetter = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
			}

            //Day list
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            this.dayList = ['Day'];
            this.dateList.forEach(date => {
                if(date != `Date | Time`){
                    let newDate = new Date(dateToAmerica(date))
                    this.dayList.push(days[newDate.getDay()])
                }
            });
		},
		cellDown(event){
			this.cellClicked = true;
			const cellID = $(event.target).attr('cellid');
			this.selectCell(event.target);
			if(localStorage.getItem('selectedCellsList') === 'coloured'){
				localStorage.setItem('selectedCellsList', [])
			}else{
				if(this.selectedCellsList != []){
					this.selectedCellsList.forEach(cellIDR => {
						let colouredCells = this.listOfValuesArr(this.weekDict['colouredCells']);
						if(colouredCells.includes(cellIDR)){
							let cellColour = '';
							for(const [colourID, colourDict] of Object.entries(this.weekDict['colouredCells'])){
								if(colourDict.includes(cellIDR)){
									cellColour = this.masterDict['colours'][colourID]['colour'];
								}
							}
							
							this.cellDeSelect(cellIDR, cellColour);
						} else {
							this.cellDeSelect(cellIDR, "white"); 
						}
						
					});
				}
			}
			
			if(!(this.selectedCellsList.includes(cellID) && this.selectedCellsList.length == 1)){
				this.selectedCellsList = [cellID];
			}else{
				this.selectedCellsList = []
			}

			let firstTimeID = "Z" + cellID.substring(1);
			let firstTime = ($(`[cellid=${firstTimeID}]`).text()).split(":");
			let timeSelected = this.selectedCellsList.length * Math.round((1/(60/this.projDict['timeInterval'])) * 1000) / 1000;
			let timePeriod = `${firstTime[0]}:${firstTime[1]} - ${firstTime[0]}:${parseInt(firstTime[1]) + this.timeInterval - 1}`
			$('#user_selection_tip').text(`Time Selected: ${timeSelected.toFixed(2)}H\n${timePeriod} `);
			$('#user_selection_tip').removeClass('hidden'); 

		},
		cellHovered(event){
			const cellID = $(event.target).attr('cellid');
			if(this.cellClicked && (!this.selectedCellsList.includes(cellID))){
				this.selectCell(event.target);
				this.selectedCellsList.push(cellID);

				let timeSelected = this.selectedCellsList.length * Math.round((1/(60/this.projDict['timeInterval'])) * 1000) / 1000;
				let minTimeCell = "Z" + this.minCell(this.selectedCellsList);
				let maxTimeCell = "Z" + this.maxCell(this.selectedCellsList);
				let maxTime = ($(`[cellid=${maxTimeCell}]`).text()).split(":");
				let timePeriod = `${$(`[cellid=${minTimeCell}]`).text()} - ${maxTime[0]}:${parseInt(maxTime[1]) + this.timeInterval - 1}`;
				
				$('#user_selection_tip').text(`Time Selected: ${timeSelected.toFixed(2)}H\n${timePeriod} `);
			}

			const cellCol = cellID[0];
			const cellNum = cellID.substring(1);
			$(`[cellid=${cellCol}-1]`).css({"background-color": "#D1D3D9"});
			$(`[cellid=${cellCol}0]`).css({"background-color": "#D1D3D9"});
			$(`[cellid=Z${cellNum}]`).css({"background-color": "#D1D3D9"});
			if(this.previousDate != cellCol){
				$(`[cellid=${this.previousDate}-1]`).css({"background-color": "#ffffff"});
				$(`[cellid=${this.previousDate}0]`).css({"background-color": "#ffffff"});
				this.previousDate = cellCol;
			}
			if(this.previousTime != cellNum){
                if(this.previousTime === this.timeIndex){
                    $(`[cellid=Z${this.previousTime}]`).css({"background-color": "green"});
                }else{
                    $(`[cellid=Z${this.previousTime}]`).css({"background-color": "#ffffff"});
                }
				this.previousTime = parseInt(cellNum);
			}

		},
		cellRelease(){
			this.cellClicked = false;
			$('#user_selection_tip').addClass('hidden');
			localStorage.setItem('selectedCellsList', this.selectedCellsList);
		},
		selectCell(element){
			element.style.borderColor = "cyan";
			element.style.background = "#D1D3D9";
		},
		cellDeSelect(ID, colour){
			$(`[cellid=${ID}]`).css({"background-color": colour,  "border-color": "black"});
		},
		listOfValues(obj){
			let valueList = [];
			for(const [key, value] of Object.entries(obj)){
				valueList.push(value)
				key;
			}
			return valueList;
		},
		listOfValuesArr(obj){
			let valueList = [];
			for(const [key, value] of Object.entries(obj)){
				for (const element of value) {
					valueList.push(element)
				}
				key;
			}
			return valueList;
		},
		minCell(arr){
			let smallestNum = arr[0].substring(1);
			for(let i = 0; i < arr.length; i++){
				if(parseInt(arr[i].substring(1)) < smallestNum){
					smallestNum = parseInt(arr[i].substring(1))
				}
			}
			return smallestNum;
		},

		maxCell(arr){
			let smallestNum = arr[0].substring(1);
			for(let i = 0; i < arr.length; i++){
				if(parseInt(arr[i].substring(1)) > smallestNum){
					smallestNum = parseInt(arr[i].substring(1))
				}
			}
			return smallestNum;
		}
	}
}
</script>

<style scoped>
.column{
	width: 100%;
	z-index: 2;
	min-width: 90px;
	border-left: 1px solid black;
	border-top: 1px solid black;
    margin-top: 10px;
}

#time_sheet_container > div:nth-last-child(2){
    border-right: 1px solid black;
}

.column:nth-child(1){
	left: 0px;
	z-index: 10;
	position: sticky;
	min-width: 140px;
	margin-left: 10px;
	border: 1px solid black;
	pointer-events: none;
}

.column:nth-child(2){
	border-left: 0px solid black;
}

.column > div:nth-child(1){
	top: 0px;
	position: sticky;
	pointer-events: none;
	user-select: none;
}

.column > div:nth-child(2){
	top: 26px;
	position: sticky;
	pointer-events: none;
	user-select: none;
}

.dateCell{
	background-color: white;
	width: 100%;
	height: 25px;
	max-height: 25px;
	border-bottom: 1px solid black;
}
.cell{
	width: 100%;
	height: 25px;
	max-height: 25px;
	border-bottom: 1px dashed black;
}

.infoCell{
	background-color: white;
	width: calc(700% + 6px);
	height: 25px;
	min-height: 25px;
	max-height: 25px;
	border-bottom: 1px solid black;
	border-right: 1px solid black;
    font-weight: bold;

}

.totalCellOne{
	background-color: white;
	width: calc(700% + 5px);
	height: 25px;
	min-height: 25px;
	max-height: 25px;
	border-bottom: 1px solid black;
	border-right: 1px solid black;
}

.totalCellTwo{
	background-color: white;
	width: calc(1400% + 14px);
	height: 25px;
	min-height: 25px;
	max-height: 25px;
	border-bottom: 1px solid black;
	border-right: 1px solid black;
    font-weight: bold;
}

#user_selection_tip{
	position: absolute;
	transform: translate(-50%,-50%);
	height: 35px;
	width: 120px;
	background-color: #FFFFFF;
	border-radius: 5px;
	box-shadow: 0px 0px 10px -5px white inset,
				0px 4px 16px -16px black;
	font-size: 12px;
	user-select: none;
	pointer-events: none;
	z-index: 100;
}

.tool_tip{
	border: 2px solid black;
}

.hidden {
	display: none !important;
}
</style>
