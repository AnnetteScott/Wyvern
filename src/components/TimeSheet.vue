<template>
	<template v-if="weekID != ``">
		<div v-for="(col, index) in columnLetter" :key="col" :colID="col" class="column">
			<div :cellID="`${col}0`" class="dateCell">{{ dateList[index] }}</div>
			<template v-if="col == `Z`">
				<div  v-for="(time, indexd) in projDict['timeList']" :key="time" :cellID="`Z${indexd}`" class="dateCell">{{ time }}</div>
			</template>
			<template v-else>
				<div  v-for="(time, indext) in projDict['timeList']" :key="time" :cellID="`${col}${indext}`" class="cell" />
			</template>
		</div>
	</template>
</template>

<script>
import { addToDate } from '../../public/generalFunctions.js';

export default {
	name: 'TimeSheet',
	props: {
		weekID: String
	},
	data() {
		return {
			weekDict: {},
			projDict: {},
			projectID: '',
			columnLetter: [],
			dateList: []
		}
	},
	methods: {
		updateLib(){
			this.projDict = JSON.parse(localStorage.getItem('masterDict'))['projects'][localStorage.getItem('projectID')]
			this.weekDict = this.projDict['weeks'][this.$props.weekID];
			
			this.dateList = [`Date | Time`];
			this.dateList.push(this.weekDict['startDate']);
			for(let i = 1; i < (this.projDict['weekInterval'] * 7); i++){
				this.dateList.push(addToDate(this.weekDict['startDate'], i))
			}
			if(this.projDict['weekInterval'] == 1){
				this.columnLetter = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
			}else{
				this.columnLetter = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
			}
		}
	}
}
</script>

<style scoped>
.column{
	width: 100%;
	min-width: 90px;
	height: 97%;
	max-height: 97%;
	border-left: 1px solid black;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
}

.column:last-child{
	border-right: 1px solid black;
	margin-right: 10px;
}

.column:nth-child(1){
	margin-left: 10px;
}
.dateCell{
	background-color: white;
    width: 100%;
    height: 25px;
	border-bottom: 1px solid black;
}
.cell{
	background-color: white;
    width: 100%;
    height: 25px;
	border-bottom: 1px dashed black;
}
</style>
