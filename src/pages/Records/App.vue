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
                        <option v-if="recordYear !== 'categories' && recordYear !== 'accounts' && recordYear !== 'homeExpenses'" :data="recordYear">
                            {{ recordYear }}
                        </option>
                    </template>
                </select>
            </div>
            <ButtonItem :title="`Delete This Year`" @click="deleteYear"/>
		</div>
		
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
					'Month',
					'Date',
					'Account',
					'Type',
					'Item',
					'Category',
					'Amount'
				]"
				sort_default="Date"
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
					<p>Repeating Home Expenses</p>
					<ButtonItem :title="`+ New`" @click="current_request_form = 'createHome'"/>
				</div>
                <div class="headings">
					<p>Start Date</p>
					<p>Receiver</p>
					<p>Category</p>
					<p>Full Amount</p>
					<p>Percent</p>
					<p>Claimed Amount</p>
					<p>How Often</p>
					<p>Last Occurence</p>
				</div>
               <div v-for="(homeDict, homeID) in masterDict['records']['homeExpenses']" class="asset" :key="homeID" :data="homeID" @click="''">
					<p>{{ homeDict['startDate'] }}</p>
					<p>{{ homeDict['receiver'] }}</p>
					<p>{{ homeDict['category'] }}</p>
					<p>{{ homeDict['fullAmount'] }}</p>
					<p>{{ homeDict['percent'] }}</p>
					<p>{{ homeDict['claimedAmount'] }}</p>
					<p>{{ homeDict['often'] }}</p>
					<p>{{ homeDict['lastOccurence'] }}</p>
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
                    <p>{{ categoryDict['Apr'] }}</p>
                    <p>{{ categoryDict['May'] }}</p>
                    <p>{{ categoryDict['Jun'] }}</p>
                    <p>{{ categoryDict['Jul'] }}</p>
                    <p>{{ categoryDict['Aug'] }}</p>
                    <p>{{ categoryDict['Sep'] }}</p>
                    <p>{{ categoryDict['Oct'] }}</p>
                    <p>{{ categoryDict['Nov'] }}</p>
                    <p>{{ categoryDict['Dec'] }}</p>
                    <p>{{ categoryDict['Jan'] }}</p>
                    <p>{{ categoryDict['Feb'] }}</p>
                    <p>{{ categoryDict['Mar'] }}</p>
                    <p>{{ categoryDict['grandTotal'] }}</p>
                </div>
                <div class="pivot_row pivot_heading">
                    <template v-if="loaded">
                        <p>Grand Total</p>
                        <p>{{ pivotDict['months']['Apr'] }}</p>
                        <p>{{ pivotDict['months']['May'] }}</p>
                        <p>{{ pivotDict['months']['Jun'] }}</p>
                        <p>{{ pivotDict['months']['Jul'] }}</p>
                        <p>{{ pivotDict['months']['Aug'] }}</p>
                        <p>{{ pivotDict['months']['Sep'] }}</p>
                        <p>{{ pivotDict['months']['Oct'] }}</p>
                        <p>{{ pivotDict['months']['Nov'] }}</p>
                        <p>{{ pivotDict['months']['Dec'] }}</p>
                        <p>{{ pivotDict['months']['Jan'] }}</p>
                        <p>{{ pivotDict['months']['Feb'] }}</p>
                        <p>{{ pivotDict['months']['Mar'] }}</p>
                        <p>{{ pivotDict['months']['grandTotal'] }}</p>
                    </template>
                </div>
                <div class="pivot_row pivot_heading">
                    <template v-if="loaded">
                        <p>Tax To Pay</p>
                        <p>{{ calculateTax(pivotDict['months']['grandTotal']) }}</p>
                    </template>
                </div>
			</div>
        </div>
		<div class="tables">
			<div id="assets" class="outer_table">
				<div class="title">
					<p>Assets</p>
					<ButtonItem :title="`+ New`" @click="current_request_form = 'createAsset'"/>
				</div>
                <div class="headings">
					<p>Date Purchased</p>
					<p>Item Description</p>
					<p>Vendor</p>
					<p>Unit Cost</p>
					<p>Units</p>
					<p>Total</p>
					<p>Attached</p>
				</div>
                <div v-for="(assetDict, assetID) in recordDict['assets']" :key="assetID" class="asset" :data="assetID" @click="editAsset">
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
		<AllForms :requestForm="current_request_form" @cancelled="current_request_form=``"
	@saveCookieForBeebViewing="saveCookie"/>
	</div>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import AllForms from '../../components/AllForms.vue';
import ButtonItem from '../../components/ButtonItem.vue';
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
    SortableTable
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
            console.log(this.pivotDict)
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
            console.log(receiptID)
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
            let thisYear = $(`#year_selection option:selected`).attr('data');
            delete this.masterDict['records'][thisYear];
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
        },
        calculateTax(amount){
            let firstTax = [0.105, 14000];
            let secondTax = [0.175, 48000];
            let thirdTax = [0.3, 70000];
            let fourthTax = [0.33, 180000];
            let fifthTax = [0.39]; 

            let firstAmount = amount > firstTax[1] ? firstTax[1] * firstTax[0]: amount * firstTax[0];
            
            amount = Math.max(0, amount - firstTax[1]);

            let secondAmount = amount > secondTax[1] ? secondTax[1] * secondTax[0]: amount * secondTax[0];
            amount = Math.max(0, amount - secondTax[1]);

            let thirdAmount = amount > thirdTax[1] ? thirdTax[1] * thirdTax[0]: amount * thirdTax[0];
            amount = Math.max(0, amount - thirdTax[1]);

            let fourthAmount = amount > fourthTax[1] ? fourthTax[1] * fourthTax[0]: amount * fourthTax[0];
            amount = Math.max(0, amount - fourthTax[1]);
            
            let fifthAmount = amount * fifthTax[0];

            let totalTax = firstAmount + secondAmount + thirdAmount + fourthAmount + fifthAmount;

            return totalTax <= 0 ? 0 : totalTax.toFixed(2);
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
	flex-direction: column;
	align-items: center;
	overflow-y: scroll;
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
	height: 95%;
	width: 45%;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	border-radius: 15px;
	background-color: #ffffff5d;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: default;
	overflow-y: scroll;
}


.outer_table > .title{
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-bottom: 5px;
}
.outer_table > .title > p{
	font-family: 'Lora';
	margin: 5px 0px;
	font-size: 20px;
	color: black;
	background-color: white;
	width: 70%;
	border-radius: 5px;
}
.outer_table > .title .button_link{
	margin: 0px 10px;
}

#transactions_list{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#transactions_list > div{
    width: 95%;
    display: flex;
	margin-bottom: 6px;
	border: 1px solid black;
}

#transactions_list > div > p{
    font-size: 15px;
	width: 100%;
	margin: 0px;
	border-left: 1px solid black;
	pointer-events: none;
}

.Credit{
	background-color: #00ff00;
	cursor: pointer;
}

.Debit{
    color: white;
	background-color: #ff1100;
	cursor: pointer;
}

#assets > div:not(.title) > p:nth-of-type(1){
	max-width: 16ch;
}

#assets > div:not(.title) > p:nth-of-type(6){
	max-width: 10ch;
}

.asset{
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	border-radius: 5px;
	background-color: #ffffff5d;
	cursor: pointer;
}


#pivot{
    width: 95%;
    height: 90%;
}

.pivot_row{
    display: flex;
    width: 95%;
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
    background-color: #f3f5f9;
}

.pivot_row:nth-last-of-type(2){
    margin-top: 10px;
}

.pivot_row > p:last-child{
    min-width: 10ch;
}
</style>
