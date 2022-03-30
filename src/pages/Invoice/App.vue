<template>
	<BackgroundBubble />
	<NavBar 
		:title="`Invoice`"
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
	<SavingPopup />
	<!-- Invoice Selector -->
	<div class="form_container">
        <div class="form">
            <div id="top">
                <div class="side">
                    <label for="project_selection">Choose a Project:</label>
                    <template v-if="isProjects">
                        <select id="project_selection" @change="onchange">
                            <option v-for="(projDict, projID) in masterDict['projects']" :key="projDict" :data="projID">
                                {{ projDict['name'] }}
                            </option>
                        </select>
                    </template>
                    <template v-else>
                        <div class="advisory">Go To Settings To Create A Project</div>
                    </template>
                    <template v-if="currentProjectID !== ''">
                        <label for="week_selection">Choose a Week:</label>
                        <select id="week_selection">
                            <option v-for="(weekDict, weekID) in masterDict['projects'][currentProjectID]['weeks']" :key="weekDict" :data="weekID">
                            {{ weekID }}
                            </option>
                        </select>
                    </template>
                    
                    <label for="user_selection">Choose a User:</label>
                    <template v-if="isUsers">
                        <select id="user_selection">
                            <option v-for="(userDict, userID) in masterDict['users']" :key="userDict" :data="userID">
                                {{ userDict['user'] }}
                            </option>
                        </select>
                    </template>
                    <template v-else>
                        <div class="advisory">Go To Settings To Create A User</div>
                    </template>
                    
                    <label for="client_selection">Choose a Client:</label>
                    <template v-if="isClients">
                        <select id="client_selection">
                            <option v-for="(projDict, projID) in masterDict['clients']" :key="projDict" :data="projID">
                                {{ projDict['client'] }}
                            </option>
                        </select>
                    </template>
                    <template v-else>
                        <div class="advisory">Go To Settings To Create A Client</div>
                    </template>

                    <label for="invoice_date">Invoice Date:</label>
                    <input id="invoice_date" type="date" />

                    <label for="invoice_for">Invoice For:</label>
                    <input id="invoice_for" type="text" />
                    
                    <label for="invoice_ID">Invoice ID:</label>
                    <input id="invoice_ID" type="text" />
                </div>
                <div class="side">
                    <label for="invoice_include_colours">Include All Colours:</label>
                    <input id="invoice_include_colours" type="checkbox" />
                    
                    <label for="invoice_add_records">Add To Records:</label>
                    <input id="invoice_add_records" type="checkbox" @click="changeState" checked/>
                    <template v-if="addToRecord">
                        <label for="records_account">Account:</label>
                        <input id="records_account" type="text" />
                    </template>
                </div>
            </div>    
            <ButtonItem :title="`Print Invoice`" @click="generateInvoice"/>
        </div>	
	</div>

	<div id="invoice_page" style="display: none;">
		<div id="PRINTtheTHING">
			<div style="-webkit-print-color-adjust: exact" id="invoice_sheet">
				<div class="inner">
					<div class="top_section">
						<div class="top_left">
							<h2 id="user_name_invoice"></h2>
							<p id="user_addOne_invoice"></p>
							<p id="user_addTwo_invoice"></p>
							<p id="user_city_invoice"></p>
							<p id="user_country_invoice"></p>
							<p id="user_contact_invoice"></p>
							<div class="box_with_heading">
								<p>Client ID</p>
								<p id="client_id_invoice"></p>
							</div>
							<div class="box_with_heading">
								<p>Bill To</p>
								<p id="client_name_invoice"></p>
								<p id="client_addOne_invoice"></p>
								<p id="client_addTwo_invoice"></p>
								<p id="client_city_invoice"></p>
								<p id="client_country_invoice"></p>
							</div>
						</div>
						<div class="top_right">
							<div class="title">INVOICE</div>
							<div class="dual_box_heading">
								<div class="box_with_heading">
									<p>Invoice #</p>
									<p id="invoice_id_invoice"></p>
								</div>
								<div class="box_with_heading">
									<p>Date</p>
									<p id="invoice_date_invoice"></p>
								</div>
							</div>
							<div class="box_with_heading">
								<p>Invoice Period</p>
								<p id="invoice_date_period"></p>
							</div>
							<div class="box_with_heading">
								<p>Invoice For</p>
								<p id="invoice_for_invoice"></p>
							</div>
						</div>
					</div>
					<div id="bottom_section">
						<div v-for="(col, index) in columnLetter" :key="col" :colID="col" class="invoice_sheet_column">
							<div class="cell heading">{{ columnHeadings[index] }}</div>
							<div v-for="(Info, colourID) in includedColours" :key="colourID" class="cell">{{ Info[keys[index]] }}</div>

							<div v-if="col == 'C'" class="cell" style="border-left: 1px solid black" >Subtotal</div>
							<div v-if="col == 'C'" class="cell" style="border-left: 1px solid black" >Tax</div>
							<div v-if="col == 'C'" class="cell" style="border-left: 1px solid black" >Total</div>

							<div v-if="col == 'D'" class="cell">{{ invoiceTotal }}</div>
							<div v-if="col == 'D'" class="cell">0</div>
							<div v-if="col == 'D'" class="cell">{{ invoiceTotal }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import SavingPopup from '../../components/SavingPopup.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import ButtonItem from '../../components/ButtonItem.vue';
import { addToDate, generateID } from '../../../public/generalFunctions.js';
import $ from 'jquery';

export default {
	name: 'App',
	components: {
		NavBar,
		SavingPopup,
		BackgroundBubble,
		ButtonItem
	},
	data() {
		return {
			masterDict: {},
            isProjects: false,
            isUsers: false,
            isClients: false,
			currentProjectID: '',
			projWeek: {},
			includedColours: {},
			invoiceTotal: 0,
			columnLetter: ['A', 'B', 'C', 'D'],
			columnHeadings: ['Description', 'Rate', 'Quantity', 'Total $'],
			keys: ['name', 'rate', 'QTY', 'Total'],
            addToRecord: true
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
        if(Object.keys(this.masterDict['projects']).length != 0){
            setTimeout(() => {
                this.currentProjectID = $(`#project_selection option:selected`).attr('data'); 
            }, 1)
        }
        this.isProjects = Object.keys(this.masterDict['projects']).length != 0;
        this.isUsers = Object.keys(this.masterDict['users']).length != 0;
        this.isClients = Object.keys(this.masterDict['clients']).length != 0;
	},
	methods: {
		onchange(){
			this.currentProjectID = $(`#project_selection option:selected`).attr('data');
		},
        changeState(){
            this.addToRecord = $('#invoice_add_records')[0].checked;
        },
		generateInvoice(){
			//Invoice Date. Uses todays date if none is selected.
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            let invoiceDate = $('#invoice_date').val() ? $('#invoice_date').val() : today
			$('#invoice_date_invoice').text(invoiceDate);
			
			//Invoice Period
			let invoice_period = this.masterDict['projects'][this.currentProjectID]['weeks'][$('#week_selection').val()]['startDate'];
			invoice_period += ' to ';
			invoice_period += addToDate(this.masterDict['projects'][this.currentProjectID]['weeks'][$('#week_selection').val()]['startDate'], 13);
			$('#invoice_date_period').text(invoice_period);
			//Invoice For
			$('#invoice_for_invoice').text($('#invoice_for').val());
			//Invoice ID
            let invoiceID = $('#invoice_ID').val()
			$('#invoice_id_invoice').text(invoiceID);

			let clientDict = this.masterDict['clients'][$("#client_selection option:selected").attr('data')];
			let userDict = this.masterDict['users'][$("#user_selection option:selected").attr('data')];
			let projDict = this.masterDict['projects'][this.currentProjectID];
			this.projWeek = projDict['weeks'][$("#week_selection option:selected").attr('data')];

			//User
			$('#user_name_invoice').text(userDict['name']);
			$('#user_addOne_invoice').text(userDict['addOne']);
			$('#user_addTwo_invoice').text(userDict['addTwo']);
			$('#user_city_invoice').text(userDict['city']);
			$('#user_country_invoice').text(userDict['country']);
			$('#user_contact_invoice').text(userDict['contact']);

			
			//client
			$('#client_id_invoice').text(clientDict['client']);
			$('#client_name_invoice').text(clientDict['name']);
			$('#client_addOne_invoice').text(clientDict['addOne']);
			$('#client_addTwo_invoice').text(clientDict['addTwo']);
			$('#client_city_invoice').text(clientDict['city']);
			$('#client_country_invoice').text(clientDict['country']);

            this.includedColours = {};
            let includeAllColours = $('#invoice_include_colours')[0].checked
			this.invoiceTotal = 0;
			for(const [colourID, cellList] of Object.entries(this.projWeek['colouredCells'])){
				if(cellList.length != 0 || includeAllColours){
					let qty = (Math.round((1/(60/projDict['timeInterval'])) * 1000) / 1000) * cellList.length;
					let total = qty * parseFloat(this.masterDict['colours'][colourID]['rate'])
					this.includedColours[colourID] = {'name': this.masterDict['colours'][colourID]['name'], 'rate': this.masterDict['colours'][colourID]['rate'], 'QTY': qty, 'Total': total};
					this.invoiceTotal += total
				}
			}
			this.includedColours['blank1'] = {'name': '', 'rate': '', 'QTY': '', 'Total': ''};
			this.includedColours['blank2'] = {'name': '', 'rate': '', 'QTY': '', 'Total': ''};
			this.includedColours['blank3'] = {'name': '', 'rate': '', 'QTY': '', 'Total': ''};
			this.includedColours['blank4'] = {'name': '', 'rate': '', 'QTY': '', 'Total': ''};

			setTimeout(() => {
				this.printInvoice();
			}, 1)
			if($('#invoice_add_records')[0].checked){
                let transID = generateID();
                while(Object.keys(this.masterDict['clients']).includes(transID)) {
                    transID = generateID();
                }

                let date = new Date();
                let month = date.getMonth();
                let thisYear = date.getFullYear();
                let yearID;
                if(month < 3){
                    yearID = `${thisYear - 1} - ${thisYear}`
                }else{
                    `${thisYear} - ${thisYear + 1}`
                }
                if(Object.keys(this.masterDict['records']).length == 0){
                    let date = new Date();
                    let thisYear = date.getFullYear();
                    this.masterDict['records'][`${thisYear - 1} - ${thisYear}`] = {}
                    this.masterDict['records'][`${thisYear} - ${thisYear + 1}`] = {}
                }
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                this.masterDict['records'][yearID][transID] = {'month': monthNames[month], 'date': invoiceDate, 'account': $('#records_account').val(), 'type': 'Credit', 'item': `${clientDict['client']} - ${invoiceID}`, 'category': 'contract work', 'amount': this.invoiceTotal}
                localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
            }

		},
		printInvoice(id="invoice_page"){
			let html = `<title>Print Preview</title><link rel="shortcut icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDhINWMtMS42NiAwLTMgMS4zNC0zIDN2Nmg0djRoMTJ2LTRoNHYtNmMwLTEuNjYtMS4zNC0zLTMtM3ptLTMgMTFIOHYtNWg4djV6bTMtN2MtLjU1IDAtMS0uNDUtMS0xcy40NS0xIDEtMSAxIC40NSAxIDEtLjQ1IDEtMSAxem0tMS05SDZ2NGgxMlYzeiIvPjwvc3ZnPg==">`;
			/* 
			$('link').each(function() { // find all <link tags that have
				if ($(this).attr('rel').indexOf('stylesheet') !=-1) { // rel="stylesheet"
					html += `<link rel="stylesheet" href="${$(this).attr("href")}" />`;
				}
			});
			 */
			html += `<link rel="stylesheet" href="/invoicePrint.css" />`
			html += '<body onload="window.focus(); window.print()">'+$("#"+id).html()+'</body>';
			let w = window.open("","_blank", 'width=800,height=900,nodeIntegration=yes');
			if (w) {
				w.document.write(html); 
				w.document.close() 
			}
		}
	}
}
</script>

<style>

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: black;
	margin-top: var(--navbar_height);
}

input {
	width: 200px;
	margin-bottom: 15px;
	padding: 2px;
	font-family: 'Segoe UI', sans-serif;
	font-size: 15px;
	background-color: transparent;
	border: 1px solid white;
	border-bottom: 3px solid white;
	border-radius: 5px;
	outline: unset;
	transition: 0.2s ease border;
}

.form_error {
	border-color: red !important;
}

.form_container {
	position: absolute;
	inset: 0px;
	opacity: 1;
	display: flex;
	justify-content: center;
    flex-direction: column;
	align-items: center;
	font-family: 'Segoe UI', sans-serif;
}

.form{
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background-color: #FFFFFF57;
	border-radius: 5px;
	box-shadow: 0px 0px 10px -5px white inset,
				0px 4px 16px -16px black;
}

.form button:first-of-type{
	margin-top: 20px;
}

#top{
    display: flex;
    flex-direction: row;
}

.side{
    display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.side:nth-child(1){
    margin-right: 30px;
}

select{
	margin: 0px 0px 10px;
	border-radius: 10px;
	padding: 5px;
	width: 110px;
	outline: none;
	height: 27px;
}

label{
    margin-top: 12px;
    font-family: 'Lora';
}

input[type="checkbox"]{
    height: 30px;
}

.advisory{
    font-style: italic;
    color: #850c0c
}

.button_link{
    width: 100% !important;
}
</style>
