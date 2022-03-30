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
				<p>Transactions</p>
                <div>
                    <p>Month</p>
                    <p>Date</p>
                    <p>Account</p>
                    <p>Type</p>
                    <p>Item</p>
                    <p>Category</p>
                    <p>Amount</p>
                </div>
                <div v-for="(transDict, transID) in recordDict" :key="transID" :data="transDict" :class="transDict['type']">
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
				<p>Pivot Table</p>
			</div>
        </div>
        <div class="tables">
            <div id="home" class="outer_table">
                <p>Home Expenses</p>
            </div>

            <div id="assets" class="outer_table">
                <p>Assets</p>
            </div>
        </div>
			
		
	</div>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import $ from 'jquery'

export default {
	name: 'App',
	components: {
		NavBar,
		BackgroundBubble
	},
	data() {
		return {
			masterDict: {},
			recordDict: {},
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
		if(Object.keys(this.masterDict['records']).length == 0){
			let date = new Date();
			let thisYear = date.getFullYear();
			this.masterDict['records'][`${thisYear - 1} - ${thisYear}`] = {}
			this.masterDict['records'][`${thisYear} - ${thisYear + 1}`] = {}
		}
        setTimeout(() => {
            this.recordDict = this.masterDict['records'][$(`#year_selection option:selected`).attr('data')];
            console.log(this.recordDict)
        }, 1)
	},
    methods: {
        onchange(){
            this.recordDict = this.masterDict['records'][$(`#year_selection option:selected`).attr('data')];
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

.outer_table > p{
	font-family: 'Lora';
	margin: 5px 0px;
	font-size: 20px;
	color: black;
    background-color: white;
    width: 50%;
}

#transactions > div{
    width: 95%;
    display: flex;
    margin-bottom: 5px;
    border: 1px solid black;
}

#transactions > div:first-of-type{
    background-color: white;
}

#transactions > div > p{
    font-size: 15px;
    width: 100%;
    margin: 0px;
    border-left: 1px solid black;
}

#transactions > div > p:nth-of-type(1){
    border-left: 0px;
    max-width: 8ch;
}

#transactions > div > p:nth-of-type(2){
    max-width: 12ch;
}

#transactions > div > p:nth-of-type(4){
    max-width: 10ch;
}

#transactions > div > p:nth-of-type(7){
    max-width: 12ch;
}

.credit{
    background-color: rgb(5, 197, 5);
}

</style>
