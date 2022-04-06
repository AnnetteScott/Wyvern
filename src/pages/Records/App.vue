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
			<label for="year_selection">Choose a Tax Year:</label>
			<select id="year_selection"  @change="onchange">
				<option v-for="(recordDict, recordYear) in masterDict['records']" :key="recordDict" :data="recordYear">
					{{ recordYear }}
				</option>
			</select>
		</div>
		
		<div class="tables">
			<div id="transactions" class="outer_table">
				<div class="title">
					<p>Transactions</p>
					<ButtonItem :title="`+ New`" @click="current_request_form = 'createTransaction'"/>
				</div>
                
				<div class="headings">
					<p>Month</p>
					<p>Date</p>
					<p>Account</p>
					<p>Type</p>
					<p>Item</p>
					<p>Category</p>
					<p>Amount</p>
				</div>
				<div v-for="(transDict, transID) in recordDict" :key="transID" :data="transID" :class="transDict['type']" @click="editTransaction">
					<p>{{ transDict['month'] }}</p>
					<p>{{ transDict['date'] }}</p>
					<p>{{ transDict['account'] }}</p>
					<p>{{ transDict['type'] }}</p>
					<p>{{ transDict['item'] }}</p>
					<p>{{ transDict['category'] }}</p>
					<p>${{ transDict['amount'] }}</p>
				</div>
			</div>
			<div id="pivot" class="outer_table">
				<div class="title">
					<p>Pivot Table</p>
				</div>
			</div>
		</div>
		<div class="tables">
			<div id="home" class="outer_table">
				<div class="title">
					<p>Home Expenses</p>
					<ButtonItem :title="`+ New`" @click="''"/>
				</div>
			</div>

			<div id="assets" class="outer_table">
				<div class="title">
					<p>Assets</p>
					<ButtonItem :title="`+ New`" @click="''"/>
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
import $ from 'jquery'

export default {
	name: 'App',
	components: {
		NavBar,
		BackgroundBubble,
        AllForms,
        ButtonItem
	},
	data() {
		return {
			masterDict: {},
			recordDict: {},
            current_request_form: ''
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
		if(Object.keys(this.masterDict['records']).length == 0){
			let date = new Date();
			let thisYear = date.getFullYear();
			this.masterDict['records'][`${thisYear - 1} - ${thisYear}`] = {};
			this.masterDict['records'][`${thisYear} - ${thisYear + 1}`] = {};
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
		}
		setTimeout(() => {
			this.recordDict = this.masterDict['records'][$(`#year_selection option:selected`).attr('data')];
		}, 1)
	},
	methods: {
		onchange(){
			this.recordDict = this.masterDict['records'][$(`#year_selection option:selected`).attr('data')];
		},
        saveCookie(){
			this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
            this.recordDict = this.masterDict['records'][$(`#year_selection option:selected`).attr('data')];
		},
        editTransaction(e){
            this.current_request_form = 'editTransaction';
            const ID = $(e.target).attr('data');
            setTimeout(() => {
                let newDate = this.recordDict[ID]['date'].split("/").reverse().join("-");
                $(`#edit_transID`).attr('transid', ID)
                $(`#edit_transID`).attr('transyear', $(`#year_selection option:selected`).attr('data'))
                $(`#edit_trans_date`).val(newDate)
                $(`#edit_trans_account`).val(this.recordDict[ID]['account'])
                $(`#edit_trans_category`).val(this.recordDict[ID]['category'])
                $(`#edit_trans_item`).val(this.recordDict[ID]['item'])
                $(`#edit_trans_amount`).val(this.recordDict[ID]['amount'])
            }, 1)
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
	height: 20px;
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


.outer_table .title{
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-bottom: 5px;
}
.outer_table .title > p{
	font-family: 'Lora';
	margin: 5px 0px;
	font-size: 20px;
	color: black;
	background-color: white;
	width: 70%;
	border-radius: 5px;
}
.outer_table .title .button_link{
	margin: 0px 10px;
}

#transactions > div:not(.title){
	display: flex;
    width: 95%;
	margin-bottom: 5px;
	border: 1px solid black;
}

#transactions > .headings{
	background-color: white;
}

#transactions > div:not(.title) > p{
	font-size: 15px;
	width: 100%;
	margin: 0px;
	border-left: 1px solid black;
	pointer-events: none;
}

#transactions > div:not(.title) > p:nth-of-type(1){
	border-left: 0px;
	max-width: 8ch;
}

#transactions > div:not(.title) > p:nth-of-type(2){
	max-width: 12ch;
}

#transactions > div:not(.title) > p:nth-of-type(4){
	max-width: 10ch;
}

#transactions > div:not(.title) > p:nth-of-type(7){
	max-width: 12ch;
}

.Credit{
	background-color: #00ff00;
	cursor: pointer;
}

.Debit{
	background-color: #ff1100;
	cursor: pointer;
}

</style>
