<template>
	<BackgroundBubble />
	<NavBar 
		:title="`Records`"
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
		<div id="selectors">
			<div id="year_select">
				<label for="year_selection">Choose a Tax Year:</label>
				<select id="year_selection"  @change="onchange">
					<template v-for="(recordDict, recordYear) in masterDict['records']" :key="recordDict" >
						<option v-if="recordYear !== 'categories' && recordYear !== 'accounts' && recordYear !== 'savedTransactions'" :data="recordYear">
							{{ recordYear }}
						</option>
					</template>
				</select>
			</div>
			<ButtonItem :title="`Delete This Year`" @click="show_delete=true"/>
		</div>
		<DeleteBox :showDelete="show_delete" @dontDelete="show_delete=false"
	@doDelete="deleteYear"/>
		
		<div class="tables">
			<SortableTable 
				id="transactions"
				title="Transactions"
				:headings="[
					'Month',
					'Date',
					'Account',
					'Type',
					'Item',
					'Category',
					'Amount'
				]"
				emphasis=""
				:sort="[
				]"
				sort_default=""
				:data="all_transactions"
				:clickable="true"
				@dataclicked="editTransaction"
			>
				<ButtonItem :title="`+ New`" @click="current_request_form = 'createTransaction'"/>
			</SortableTable>

			
		</div>
		<div class="tables">
			<div id="home" class="outer_table">
				<div class="title">
					<p>Saved Transactions</p>
					<ButtonItem :title="`+ New`" @click="current_request_form = 'createSaved'"/>
				</div>
				<div class="saved_row pivot_heading">
					<p>Account</p>
					<p>Type</p>
					<p>Item</p>
					<p>Category</p>
					<p>$</p>
					<p>Add &nbsp;&nbsp;| &nbsp;&nbsp;Edit</p>
				</div>
				<div v-for="(savedDict, savedID) in masterDict['records']['savedTransactions']" :key="savedID" class="saved_row">
					<p>{{ savedDict['account'] }}</p>
					<p>{{ savedDict['type'] }}</p>
					<p>{{ savedDict['item'] }}</p>
					<p>{{ savedDict['category'] }}</p>
					<p>{{ savedDict['amount'] }}</p>
					<p>
						<ButtonItem :image="require(`../../assets/icons/add_white_24dp.svg`)" @click="addSaved" :data="savedID"/>
						<ButtonItem :image="require(`../../assets/icons/edit_white_24dp.svg`)" @click="editSaved" :data="savedID"/>
					</p>
				</div>
			</div>
			<div id="assets" class="outer_table">
				<div class="title">
					<p>Assets</p>
					<ButtonItem :title="`+ New`" @click="current_request_form = 'createAsset'"/>
				</div>
				<div class="asset_row pivot_heading">
					<p>Date</p>
					<p>Item Description</p>
					<p>Vendor</p>
					<p>Unit Cost</p>
					<p>Units</p>
					<p>Total</p>
					<p>Attached</p>
				</div>
				<div v-for="(assetDict, assetID) in recordDict['assets']" :key="assetID" class="asset_row" :data="assetID" @click="editAsset">
					<p>{{ assetDict['date'] }}</p>
					<p>{{ assetDict['item'] }}</p>
					<p>{{ assetDict['vendor'] }}</p>
					<p>{{ assetDict['unitCost'] }}</p>
					<p>{{ assetDict['units'] }}</p>
					<p>${{ assetDict['total'] }}</p>
					<p>{{ assetDict['total'] }}</p>
				</div>
			</div>
		</div>
		<div class="tables">
			<div id="pivot" class="outer_table">
				<div class="title">
					<p>Pivot Table</p>
				</div>
				<div class="pivot_row pivot_heading">
					<p v-for="column in colNames" :key="column">
						{{ column }}
					</p>
				</div>
				<div class="pivot_row" v-for="(categoryDict, category) in pivotDict['categories']" :key="category">
					<p>{{ category }}</p>
					<p>{{ numberWithCommas(categoryDict['Apr']) }}</p>
					<p>{{ numberWithCommas(categoryDict['May']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Jun']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Jul']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Aug']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Sep']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Oct']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Nov']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Dec']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Jan']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Feb']) }}</p>
					<p>{{ numberWithCommas(categoryDict['Mar']) }}</p>
					<p>{{ numberWithCommas(categoryDict['grandTotal']) }}</p>
				</div>
				<div class="pivot_row pivot_heading">
					<template v-if="loaded">
						<p>Grand Total</p>
						<p>{{ numberWithCommas(pivotDict['months']['Apr']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['May']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Jun']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Jul']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Aug']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Sep']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Oct']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Nov']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Dec']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Jan']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Feb']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['Mar']) }}</p>
						<p>{{ numberWithCommas(pivotDict['months']['grandTotal']) }}</p>
					</template>
				</div> 
				<div class="pivot_row pivot_heading">
					<template v-if="loaded">
						<p>Tax To Pay</p>
						<p>${{ numberWithCommas(calculateTax(pivotDict['months']['grandTotal'])) }}</p>
						<p>Effective Tax Rate: {{ (calculateTax(pivotDict['months']['grandTotal']) / pivotDict['months']['grandTotal'] * 100).toFixed(2) }}%</p>
					</template>
				</div>
				<div class="pivot_row pivot_heading">
					<template v-if="loaded">
						<p>Take Home</p>
						<p>${{ numberWithCommas(pivotDict['months']['grandTotal'] - calculateTax(pivotDict['months']['grandTotal'])) }}</p>
					</template>
				</div>
			</div>
		</div>		
		<AllForms :requestForm="current_request_form" @cancelled="current_request_form=``"
	@saveCookieForBeebViewing="saveCookie"/>
	</div>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import AllForms from '../../components/AllForms.vue';
import ButtonItem from '../../components/ButtonItem.vue';
import DeleteBox from '../../components/DeleteBox.vue';
import { generateID } from '../../../public/generalFunctions.js';
import $ from 'jquery';
import SortableTable from '@/components/SortableTable.vue';
const { ipcRenderer } = window.require("electron");

export default {
	name: 'App',
	components: {
	NavBar,
	BackgroundBubble,
	AllForms,
	ButtonItem,
	SortableTable,
	DeleteBox
},
	data() {
		return {
			masterDict: JSON.parse(localStorage.getItem('masterDict')),
			pivotDict: {},
			recordDict: {},
			all_transactions: [],
			current_request_form: '',
			transID: '',
			receiptID: '',
			loaded: false,
			show_delete: false,
			yearID: '',
			colNames: ["Category", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Grand Total"]
		}
	},
	mounted() {
		let date = new Date();
		let thisYear = date.getFullYear();
		let month = date.getMonth();
		let yearID;
		if(month < 3){
			yearID = `${thisYear - 1} - ${thisYear}`;
		}else{
			yearID = `${thisYear} - ${thisYear + 1}`;
		}
		if(Object.keys(this.masterDict['records']).length == 3){
			this.masterDict['records'][`${thisYear - 1} - ${thisYear}`] = {'transactions': {}, 'assets': {}};
			this.masterDict['records'][`${thisYear} - ${thisYear + 1}`] = {'transactions': {}, 'assets': {}};
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
		}
		if(!Object.keys(this.masterDict['records']).includes(yearID)){
			this.masterDict['records'][`${thisYear} - ${thisYear + 1}`] = {'transactions': {}, 'assets': {}};
		}
		$(`#year_selection`).val(yearID);
		this.recordDict = this.masterDict['records'][yearID];
		this.yearID = yearID;
		this.listAllTransactions();
		setTimeout(() => {
			this.calculatePivotTable()
		}, 1)
		
	},
	created(){
		ipcRenderer.on('uploaded_file_done', function() {
			this.recordDict['transactions'][this.transID]['receiptID'] = this.receiptID;
			this.listAllTransactions();
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
		}.bind(this))
	},
	methods: {
		addSaved(event){
			const savedID = $(event.target).attr('data');
			this.current_request_form = 'addSaved';
			setTimeout(() => {
				$(`#add_savedID`).attr('savedid', savedID)
			}, 1)
		},
		editSaved(event){
			const savedID = $(event.target).attr('data');
			this.current_request_form = 'editSaved';
			let saveDict = this.masterDict['records']['savedTransactions'][savedID]
			setTimeout(() => {
				$(`#edit_savedID`).attr('savedid', savedID)
				$(`#edit_savedTrans_item`).val(saveDict['item'])
				$(`#edit_savedTrans_amount`).val(saveDict['amount'])
				$(`#edit_savedTrans_account`).val(saveDict['account']);
				$(`#edit_savedTrans_type`).val(saveDict['type']);
				$(`#edit_savedTrans_category`).val(saveDict['category']);
			}, 1)
		},
		calculatePivotTable(){
			const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			this.pivotDict = {'categories': {}, 'months': {}};
			this.masterDict['records']['categories'].forEach((category, index) => {
				this.pivotDict['categories'][category] = {'grandTotal': 0}
				this.pivotDict['months'] = {'grandTotal': 0}
				monthNames.forEach((month, index1) => {
					this.pivotDict['categories'][category][month] = 0;
					this.pivotDict['months'][month] = 0;
					index1;
				});
				index;
			});
			for(const [transID, transDict] of Object.entries(this.recordDict['transactions'])){
				this.pivotDict['categories'][transDict['category']][transDict['month']] += transDict['amount'];
				this.pivotDict['categories'][transDict['category']]['grandTotal'] += transDict['amount'];
				this.pivotDict['months'][transDict['month']] += transDict['amount'];
				this.pivotDict['months']['grandTotal'] += transDict['amount'];
				transID;
			}
			this.loaded = true;
		},
		uploadReceipt(event){
			this.transID = $(event.target).attr('data');
			const receiptID = generateID(this.masterDict);
			ipcRenderer.send('upload_file', receiptID)
			this.receiptID = receiptID;
		},
		downloadReceipt(event){
			const receiptID = $(event.target).attr('data');
			ipcRenderer.send('download_file', receiptID)
		},
		onchange(){
			this.recordDict = this.masterDict['records'][$(`#year_selection option:selected`).attr('data')];
			this.listAllTransactions();
			this.calculatePivotTable();
		},
		saveCookie(){
			this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
			this.recordDict = this.masterDict['records'][$(`#year_selection option:selected`).attr('data')];
			this.listAllTransactions();
			this.calculatePivotTable();

		},
		listAllTransactions() {
			this.all_transactions = []
			Object.keys(this.recordDict['transactions']).forEach(function(key) {
				let transaction = this.recordDict['transactions'][key];
				transaction.id = key;
				this.all_transactions.push(transaction);
			}.bind(this));
		},
		editTransaction(e){
			this.current_request_form = 'editTransaction';
			const ID = $(e.target).attr('data');
			setTimeout(() => {
				let transDict = this.recordDict['transactions']
				let newDate = transDict[ID]['date'].split("/").reverse().join("-");
				$(`#edit_transID`).attr('transid', ID)
				$(`#edit_transID`).attr('transyear', $(`#year_selection option:selected`).attr('data'))
				$(`#edit_trans_date`).val(newDate)
				$(`#edit_trans_item`).val(transDict[ID]['item'])
				$(`#edit_trans_amount`).val(transDict[ID]['amount'])
				$(`#edit_trans_account`).val(transDict[ID]['account']);
				$(`#edit_trans_type`).val(transDict[ID]['type']);
				$(`#edit_trans_category`).val(transDict[ID]['category']);
			}, 1)
		},
		editAsset(e){
			this.current_request_form = 'editAsset';
			const ID = $(e.target).attr('data');
			setTimeout(() => {
				let assetDict = this.recordDict['assets']
				let newDate = assetDict[ID]['date'].split("/").reverse().join("-");
				$(`#edit_assetID`).attr('assetid', ID)
				$(`#edit_assetID`).attr('assetyear', $(`#year_selection option:selected`).attr('data'))
				$(`#edit_asset_date`).val(newDate)
				$(`#edit_asset_item`).val(assetDict[ID]['item'])
				$(`#edit_asset_vendor`).val(assetDict[ID]['vendor'])
				$(`#edit_asset_unit_cost`).val(assetDict[ID]['unitCost']);
				$(`#edit_asset_units`).val(assetDict[ID]['units']);
				$(`#edit_asset_total`).val(assetDict[ID]['total']);
			}, 1)
			
		},
		deleteYear(){
			this.show_delete = false;
			let thisYear = $(`#year_selection option:selected`).attr('data');
			delete this.masterDict['records'][thisYear];
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));

			let date = new Date();
			thisYear = date.getFullYear();
			$(`#year_selection`).val(this.yearID);
			if(!Object.keys(this.masterDict['records']).includes(this.yearID)){
				this.masterDict['records'][`${thisYear} - ${thisYear + 1}`] = {'transactions': {}, 'assets': {}};
			}
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
            this.recordDict = this.masterDict['records'][this.yearID];
            this.listAllTransactions();
            this.calculatePivotTable();
		},
		calculateTax(amount){
			let firstTax = [0.105, 14000];
			let secondTax = [0.175, 48000];
			let thirdTax = [0.3, 70000];
			let fourthTax = [0.33, 180000];
			let fifthTax = [0.39];
			
			if(amount <= 0){
				return 0;
			}

			let firstTaxAmount = amount > firstTax[1] ? firstTax[1] * firstTax[0]: amount * firstTax[0]; //1470 so correct!
			if(amount <= firstTax[1]){
				return firstTaxAmount
			}

			let secondTaxAmount = amount > firstTax[1] && amount < secondTax[1] ? (amount - firstTax[1]) * secondTax[0]: (secondTax[1] - firstTax[1]) * secondTax[0] //5950 so correct
			if(amount <= secondTax[1]){
				return firstTaxAmount + secondTaxAmount
			}

			let thirdTaxAmount = amount > secondTax[1] && amount < thirdTax[1] ? (amount - secondTax[1]) * thirdTax[0]: (thirdTax[1] - secondTax[1]) * thirdTax[0] //6600 so correct
			if(amount <= thirdTax[1]){
				return firstTaxAmount + secondTaxAmount + thirdTaxAmount;
			}

			let fourthTaxAmount = amount > thirdTax[1] && amount < fourthTax[1] ? (amount - thirdTax[1]) * fourthTax[0]: (fourthTax[1] - thirdTax[1]) * fourthTax[0] //36300 so correct
			if(amount <= fourthTax[1]){
				return firstTaxAmount + secondTaxAmount + thirdTaxAmount + fourthTaxAmount;
			}

			let fifthTaxAmount = amount > fourthTax[1] ? (amount - fourthTax[1]) * fifthTax[0]: 0
			if(amount >= fourthTax[1]){
				return firstTaxAmount + secondTaxAmount + thirdTaxAmount + fourthTaxAmount + fifthTaxAmount;
			}

		},
		numberWithCommas(num) {
			return ((parseFloat(num).toFixed(2)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
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
	overflow-x: auto;
}

#inner{
	width: 100%;
	min-width: 1440px;
	height: calc(100vh - var(--navbar_height));
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
	overflow-x: auto;
}

@media only screen and (max-width: 1435px) {
	#inner {
		height: calc(100vh - var(--navbar_height) - 15px);
	}
}

#selectors{
	margin-top: 5px;
	height: 30px;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-evenly;
}

label{
	width: 200px;
}

select{
	width: 100px;
}

.tables{
	width: 100%;
	height: calc(100% - 25px);
	min-height: calc(100% - 25px);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
}

.outer_table{
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
	width: 45%;
	height: 90%;
	padding: 10px;
	background-color: #ffffff60;
	border-radius: 10px;
	box-shadow: 2px 4px 10px -7px black;
	backdrop-filter: blur(10px);
}

.outer_table > .title{
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
}
.outer_table > .title > p{
	margin: 0px;
	font-size: 28px;
}
.outer_table > .title .button_link{
	margin: 0px 10px;
}

.saved_row{
	display: flex;
	width: 100%;
	margin-bottom: 10px;
	border-right: 1px solid black;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	background-color: white;
	height: 30px;
}

.saved_row > p{
	font-size: 15px;
	width: 100%;
	margin: 0px;
	border-left: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
}

.saved_row > p:nth-child(1){
	min-width: 7ch;
}

.saved_row > p:nth-child(2){
	min-width: 6ch;
}

.saved_row > p:nth-child(3){
	min-width: 17ch;
}

.saved_row > p:nth-child(4){
	min-width: 7ch;
}

.saved_row > p:nth-child(5){
	min-width: 3ch;
}

.saved_row > p:last-child{
	min-width: 100px;
	display: flex;
	justify-content: space-evenly;
}

.saved_row .button_link{
	padding: 0px 10px;
}

.asset_row{
	display: flex;
	width: 100%;
	margin-bottom: 10px;
	border-right: 1px solid black;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	background-color: white;
	height: 30px;
	cursor: pointer;
}

.asset_row > p{
	font-size: 15px;
	width: 100%;
	margin: 0px;
	border-left: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.asset_row > p:first-child{
	min-width: 10ch;
}

.asset_row > p:nth-child(2){
	min-width: 18ch;
}

.asset_row > p:nth-child(3){
	min-width: 15ch;
}

.asset_row > p:nth-child(4){
	min-width: 5ch;
}.asset_row > p:nth-child(5){
	min-width: 5ch;
}.asset_row > p:nth-child(6){
	min-width: 5ch;
}

#pivot{
	width: 95%;
	height: 90%;
}

.pivot_row{
	display: flex;
	width: 100%;
	margin-bottom: 1px;
	border-right: 1px solid black;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	background-color: white;
	height: 25px;
}

.pivot_row p{
	font-size: 15px;
	width: 100%;
	margin: 0px;
	border-left: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
}

.pivot_row > p:first-child{
	width: 30ch;
	min-width: 30ch;
}

.pivot_heading{
	cursor: normal;
	pointer-events: none;
	background-color: #41e07e;
}

.pivot_row:nth-last-of-type(2){
	margin-top: 10px;
}

.pivot_row > p:last-child{
	min-width: 10ch;
}
</style>
