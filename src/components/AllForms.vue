<template>
	<!-- Create User -->
	<div class="form_container" v-if="requestForm == `createUserForm`">
		<div class="form">
			<label for="create_user">User:</label>
			<input id="create_user" type="text" />

			<label for="create_user_name">Name:</label>
			<input id="create_user_name" type="text" />

			<label for="create_user_addOne">Address line 1</label>
			<input id="create_user_addOne" type="text" />

			<label for="create_user_addTwo">Address line 2</label>
			<input id="create_user_addTwo" type="text" />

			<label for="create_user_city">City/State</label>
			<input id="create_user_city" type="text" />

			<label for="create_user_country">Country:</label>
			<input id="create_user_country" type="text" />

			<label for="create_user_contact">Contact</label>
			<input id="create_user_contact" type="text" />

			<ButtonItem :title="`Create User`" @click="createUser"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>
	
	<!-- Edit User -->
	<div class="form_container" v-if="requestForm == `editUserForm`">
		<div class="form" id="editUserForm">
			<div id="edit_userID" userid="invalid"></div>
			<label for="edit_user">User:</label>
			<input id="edit_user" type="text" />

			<label for="edit_user_name">Name:</label>
			<input id="edit_user_name" type="text" />

			<label for="edit_user_addOne">Address line 1</label>
			<input id="edit_user_addOne" type="text" />

			<label for="edit_user_addTwo">Address line 2</label>
			<input id="edit_user_addTwo" type="text" />

			<label for="edit_user_city">City/State</label>
			<input id="edit_user_city" type="text" />

			<label for="edit_user_country">Country:</label>
			<input id="edit_user_country" type="text" />

			<label for="edit_user_contact">Contact</label>
			<input id="edit_user_contact" type="text" />

			<ButtonItem :title="`Save User`" @click="editUser"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
			<ButtonItem :title="`Delete`" @click="deleteUser"/>
		</div>
	</div>
	
	<!-- Create Client -->
	<div class="form_container" v-if="requestForm == `createClientForm`">
		<div class="form">
			<label for="create_client">Client:</label>
			<input id="create_client" type="text" />

			<label for="create_client_name">Name:</label>
			<input id="create_client_name" type="text" />

			<label for="create_client_addOne">Address line 1</label>
			<input id="create_client_addOne" type="text" />

			<label for="create_client_addTwo">Address line 2</label>
			<input id="create_client_addTwo" type="text" />

			<label for="create_client_city">City/State</label>
			<input id="create_client_city" type="text" />

			<label for="create_client_country">Country:</label>
			<input id="create_client_country" type="text" />

			<label for="create_client_contact">Contact</label>
			<input id="create_client_contact" type="text" />

			<ButtonItem :title="`Create Client`" @click="createClient"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>
	
	<!-- Edit Client -->
	<div class="form_container" v-if="requestForm == `editClientForm`">
		<div class="form">
			<div id="edit_clientID" clientid="invalid"></div>
			<label for="edit_client">Client:</label>
			<input id="edit_client" type="text" />

			<label for="edit_client_name">Name:</label>
			<input id="edit_client_name" type="text" />

			<label for="edit_client_addOne">Address line 1</label>
			<input id="edit_client_addOne" type="text" />

			<label for="edit_client_addTwo">Address line 2</label>
			<input id="edit_client_addTwo" type="text" />

			<label for="edit_client_city">City/State</label>
			<input id="edit_client_city" type="text" />

			<label for="edit_client_country">Country:</label>
			<input id="edit_client_country" type="text" />

			<label for="edit_client_contact">Contact</label>
			<input id="edit_client_contact" type="text" />

			<ButtonItem :title="`Save Client`" @click="editClient"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
			<ButtonItem :title="`Delete`" @click="deleteClient"/>
		</div>
	</div>
	
	<!-- Create Project -->
	<div class="form_container" v-if="requestForm == `createProjectForm`">
		<div class="form">
			<label for="create_project_name">Project name:</label>
			<input id="create_project_name" type="text" />

			<label for="create_project_duration">Project duration:</label>
			<input id="create_project_duration" type="number" />

			<label for="create_project_date">Project start date:</label>
			<input id="create_project_date" type="date" />

			<label for="time_interval">Choose a Time Interval:</label>
			<select id="time_interval">
				<option value="5">5 Minutes</option>
				<option value="10">10 Minutes</option>
				<option value="15">15 Minutes</option>
				<option value="30">30 Minutes</option>
				<option value="60">1 Hour</option>
			</select>
			
			<label for="week_interval">Choose a Timesheet length:</label>
			<select id="week_interval">
				<option value="1">1 Week</option>
				<option value="2">2 Weeks</option>
			</select>

			<ButtonItem :title="`Create Project`" @click="createProject"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>
	
	<!-- Edit Project -->
	<div class="form_container" v-if="requestForm == `editProjectForm`">
		<div class="form">
			<div id="edit_projectID" projectid="invalid"></div>
			<label for="edit_project_name">Project name:</label>
			<input id="edit_project_name" type="text" />

			<label for="edit_project_duration">Project duration:</label>
			<input id="edit_project_duration" type="number" />

			<ButtonItem :title="`Save Project`" @click="editProject"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
			<ButtonItem :title="`Delete`" @click="deleteProject"/>
		</div>
	</div>
	
	<!-- Create Colour -->
	<div class="form_container" v-if="requestForm == `createColourForm`">
		<div class="form">
			<label for="create_colour_name">Colour Name:</label>
			<input id="create_colour_name" type="text" />
			
			<label for="create_colour_rate">Colour Rate</label>
			<input id="create_colour_rate" type="number" step="0.01" />

			<label for="create_colour_colour">Colour:</label>
			<input type="color" id="create_colour_colour" name="head" value="#000000">

			<ButtonItem :title="`Create Colour`" @click="createColour"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>
	
	<!-- Edit Colour -->
	<div class="form_container" v-if="requestForm == `editColourForm`">
		<div class="form">
			<div id="edit_colourID" colourid="invalid"></div>
			<label for="edit_colour_name">Colour Name:</label>
			<input id="edit_colour_name" type="text" />
			
			<label for="edit_colour_rate">Colour Rate:</label>
			<input id="edit_colour_rate" type="number" step="0.01" />

			<label for="edit_colour_colour">Colour:</label>
			<input type="color" id="edit_colour_colour" name="head" value="#000000">

			<ButtonItem :title="`Save Colour`" @click="editColour"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
			<ButtonItem :title="`Delete`" @click="deleteColour"/>
		</div>
	</div>
	
	<!-- Create Transaction -->
	<div class="form_container" v-if="requestForm == `createTransaction`">
		<div class="form">
			<div id="edit_transID" transid="invalid" transyear="invalid"></div>
			<label for="create_trans_date">Transaction Date:</label>
			<input id="create_trans_date" type="date" />

			<label for="create_trans_account">Account:</label>
			<select id="create_trans_account">
				<option v-for="account in masterDict['records']['accounts']" :key="account" :data="account">
                    {{ account }}
                </option>
			</select>

			<label for="create_trans_type">Type:</label>
			<select id="create_trans_type">
				<option value="Credit">Credit</option>
				<option value="Debit">Debit</option>
			</select>

			<label for="create_trans_category">Category:</label>
			<select id="create_trans_category">
				<option v-for="category in masterDict['records']['categories']" :key="category" :data="category">
                    {{ category }}
                </option>
			</select>
			
			<label for="create_trans_item">Item:</label>
			<input id="create_trans_item" type="text" />

			<label for="create_trans_amount">Amount:</label>
			<input id="create_trans_amount" type="number" step="0.01" />

			<ButtonItem :title="`Create Transaction`" @click="createTransaction"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>
    
    <!-- Edit Transaction -->
	<div class="form_container" v-if="requestForm == `editTransaction`">
		<div class="form">
			<div id="edit_transID" transid="invalid" transyear="invalid"></div>
			<label for="edit_trans_date">Transaction Date:</label>
			<input id="edit_trans_date" type="date" />

			<label for="edit_trans_account">Account:</label>
			<select id="edit_trans_account">
				<option v-for="account in masterDict['records']['accounts']" :key="account" :data="account">
                    {{ account }}
                </option>
			</select>

			<label for="edit_trans_type">Type:</label>
			<select id="edit_trans_type">
				<option value="Credit">Credit</option>
				<option value="Debit">Debit</option>
			</select>

			<label for="edit_trans_category">Category:</label>
			<select id="edit_trans_category">
				<option v-for="category in masterDict['records']['categories']" :key="category" :data="category">
                    {{ category }}
                </option>
			</select>
			
			<label for="edit_trans_item">Item:</label>
			<input id="edit_trans_item" type="text" />

			<label for="edit_trans_amount">Amount:</label>
			<input id="edit_trans_amount" type="number" step="0.01" />

			<ButtonItem :title="`Save Transaction`" @click="editTransaction"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
			<ButtonItem :title="`Delete`" @click="deleteTransaction"/>
		</div>
	</div>
    
    <!-- Create Category -->
	<div class="form_container" v-if="requestForm == `createCategory`">
		<div class="form">
			<label for="create_category">Category:</label>
			<input id="create_category" type="text" />

			<ButtonItem :title="`Create Category`" @click="createCategory"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>

    <!-- Edit Category -->
	<div class="form_container" v-if="requestForm == `editCategory`">
		<div class="form">
            <div id="edit_category_old" oldcategory='invalid'></div>
			<label for="edit_category">Category:</label>
			<input id="edit_category" type="text" />

			<ButtonItem :title="`Save Category`" @click="editCategory"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
            <ButtonItem :title="`Delete`" @click="deleteCategory"/>
		</div>
	</div>
    

    <!-- Create Accounts -->
	<div class="form_container" v-if="requestForm == `createAccount`">
		<div class="form">
			<label for="create_account">Account:</label>
			<input id="create_account" type="text" />

			<ButtonItem :title="`Create Account`" @click="createAccount"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>

    <!-- Edit Accounts -->
	<div class="form_container" v-if="requestForm == `editAccount`">
		<div class="form">
            <div id="edit_account_old" oldaccount='invalid'></div>
			<label for="edit_account">Account:</label>
			<input id="edit_account" type="text" />

			<ButtonItem :title="`Save Account`" @click="editAccount"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
            <ButtonItem :title="`Delete`" @click="deleteAccount"/>
		</div>
	</div>
    
    <!-- Create Asset -->
	<div class="form_container" v-if="requestForm == `createAsset`">
		<div class="form">
			<label for="create_asset_date">Purchased Date:</label>
			<input id="create_asset_date" type="date" />

			<label for="create_asset_item">Item Description:</label>
			<input id="create_asset_item" type="text" />

			<label for="create_asset_vendor">Vendor:</label>
			<input id="create_asset_vendor" type="text" />

			<label for="create_asset_unit_cost">Unit Cost:</label>
			<input id="create_asset_unit_cost" type="number" step="0.01" />

			<label for="create_asset_units">Units:</label>
			<input id="create_asset_units" type="number" step="0.01" />

			<label for="create_asset_total">Total:</label>
			<input id="create_asset_total" type="number" step="0.01" />

			<ButtonItem :title="`Create Asset`" @click="createAsset"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>

    <!-- Edit Asset -->
	<div class="form_container" v-if="requestForm == `editAsset`">
		<div class="form">
            <div id="edit_assetID" assetid="invalid" assetyear="invalid"></div>

			<label for="edit_asset_date">Purchased Date:</label>
			<input id="edit_asset_date" type="date" />

			<label for="edit_asset_item">Item Description:</label>
			<input id="edit_asset_item" type="text" />

			<label for="edit_asset_vendor">Vendor:</label>
			<input id="edit_asset_vendor" type="text" />

			<label for="edit_asset_unit_cost">Unit Cost:</label>
			<input id="edit_asset_unit_cost" type="number" step="0.01" />

			<label for="edit_asset_units">Units:</label>
			<input id="edit_asset_units" type="number" step="0.01" />

			<label for="edit_asset_total">Total:</label>
			<input id="edit_asset_total" type="number" step="0.01" />

			<ButtonItem :title="`Save Account`" @click="editAsset"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
            <ButtonItem :title="`Delete`" @click="deleteAsset"/>
		</div>
	</div>

    <!-- Create Home Expenses -->
	<div class="form_container" v-if="requestForm == `createHome`">
		<div class="form">
			<label for="create_home_date">Starting Date:</label>
			<input id="create_home_date" type="date" />

			<label for="create_home_receiver">Receiver:</label>
			<input id="create_home_receiver" type="text" />

			<label for="create_home_category">Category:</label>
			<select id="create_home_category">
				<option v-for="category in masterDict['records']['categories']" :key="category" :data="category">
                    {{ category }}
                </option>
			</select>

			<label for="create_home_fullAmount">Full Amount:</label>
			<input id="create_home_fullAmount" type="number" step="0.01" />

			<label for="create_home_percentage">Percentage:</label>
			<input id="create_home_percentage" type="number" step="0.01" />

            <label for="create_home_often">How Often:</label>
			<select id="create_home_often">
				<option data="Monthly">Monthly</option>
				<option data="Fortnightly">Fortnightly</option>
				<option data="Weekly">Weekly</option>
				<option data="Daily">Daily</option>
				<option data="28 Days">28 Days</option>
			</select>

			<ButtonItem :title="`Create Reapeating Home Expense`" @click="createHome"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>
    
</template>


<script>
import ButtonItem from './ButtonItem.vue';
import $ from 'jquery';
import { generateID, reDoDate, addToDate } from '../../public/generalFunctions.js';

export default {
	name: 'AllForms',
	emits: ["cancelled", "saveCookieForBeebViewing"],
	props: {
		requestForm: String
	},
	components: {
		ButtonItem
	},
	data() {
		return {
			masterDict: {},
			recordDict: {}
		}
	},
	methods: {
        createHome(){
            let startDate = ($('#create_home_date').val()).split("-");
			startDate = startDate.reverse().join("/");
            let receiver = $('#create_home_receiver').val();
            let category = $('#create_home_category option:selected').val();
            let fullAmount = parseFloat($('#create_home_fullAmount').val());
            let percent = parseFloat($('#create_home_percentage').val());
            let often = $('#create_home_often option:selected').val();
            let claimedAmount = fullAmount * (percent / 100);

            const homeID = generateID(this.masterDict);

            this.masterDict['records']['homeExpenses'][homeID] = {'startDate': startDate};
            this.masterDict['records']['homeExpenses'][homeID]['receiver'] = receiver;
            this.masterDict['records']['homeExpenses'][homeID]['category'] = category;
            this.masterDict['records']['homeExpenses'][homeID]['fullAmount'] = fullAmount;
            this.masterDict['records']['homeExpenses'][homeID]['percent'] = percent;
            this.masterDict['records']['homeExpenses'][homeID]['claimedAmount'] = claimedAmount;
            this.masterDict['records']['homeExpenses'][homeID]['often'] = often;
            this.masterDict['records']['homeExpenses'][homeID]['lastOccurence'] = startDate;

            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        createAsset(){
            let item = $('#create_asset_item').val();
			let vendor = parseInt($('#create_asset_vendor').val());
            let date = ($('#create_asset_date').val()).split("-");
			date = date.reverse().join("/");

			let unitCost = parseInt($(`#create_asset_unit_cost`).val());
			let units = parseInt($(`#create_asset_units`).val());
			let total = parseInt($(`#create_asset_total`).val());
            let thisYear = $(`#year_selection option:selected`).attr('data')
            const assetID = generateID(this.masterDict);
            console.log(this.masterDict['records'][thisYear])
            this.masterDict['records'][thisYear]['assets'][assetID] = {'item': item, 'vendor': vendor, 'date': date, 'unitCost': unitCost, 'units': units, 'total': total}

            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        editAsset(){

        },
        deleteAsset(){
            const ID = $('#edit_assetID').attr('assetid');
			const YEAR = $('#edit_assetID').attr('assetyear');
			delete this.masterDict['records'][YEAR]['assets'][ID];

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        createCategory(){
            let category = $(`#create_category`).val()
            if(category == ''){ //If no category was provided
				$("#create_category").addClass('form_error');
				return false;
			}
			$("#create_category").removeClass('form_error');
            this.masterDict['records']['categories'].push(category);
            
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        editCategory(){
            let category =  $(`#edit_category_old`).attr(`oldcategory`);
            const index = this.masterDict['records']['categories'].indexOf(category);
            if (index > -1) {
                this.masterDict['records']['categories'].splice(index, 1);
            }

            let newCategory = $(`#create_category`).val()
            if(newCategory == ''){ //If no category was provided
				$("#create_category").addClass('form_error');
				return false;
			}
			$("#create_category").removeClass('form_error');
            this.masterDict['records']['categories'].push(newCategory);
 
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        deleteCategory(){
            let category =  $(`#edit_category_old`).attr(`oldcategory`);
            const index = this.masterDict['records']['categories'].indexOf(category);
            if (index > -1) {
                this.masterDict['records']['categories'].splice(index, 1);
            }

            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        createAccount(){
            let account = $(`#create_account`).val()
            if(account == ''){ //If no category was provided
				$("#create_account").addClass('form_error');
				return false;
			}
			$("#create_account").removeClass('form_error');
            this.masterDict['records']['accounts'].push(account);
            
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        editAccount(){
            let account =  $(`#edit_account_old`).attr(`oldaccount`);
            const index = this.masterDict['records']['accounts'].indexOf(account);
            if (index > -1) {
                this.masterDict['records']['accounts'].splice(index, 1);
            }

            let newAccount = $(`#edit_account`).val()
            if(newAccount == ''){ //If no category was provided
				$("#edit_account").addClass('form_error');
				return false;
			}
			$("#edit_account").removeClass('form_error');
            this.masterDict['records']['categories'].push(newAccount);
 
            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        deleteAccount(){
            let account =  $(`#edit_account_old`).attr(`oldaccount`);
            const index = this.masterDict['records']['accounts'].indexOf(account);
            if (index > -1) {
                this.masterDict['records']['accounts'].splice(index, 1);
            }

            localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
        createTransaction(){
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			let date = ($('#create_trans_date').val()).split("-");
			let month = parseInt(date[1]) - 1;
            let thisYear = parseInt(date[0]);
			date = date.reverse().join("/");

			let account = $(`#create_trans_account option:selected`).val();
			let type = $(`#create_trans_type option:selected`).val();
			let category = $(`#create_trans_category option:selected`).val();
			let item = $('#create_trans_item').val();

			let amount = type == 'Credit' ? Math.abs(parseFloat($('#create_trans_amount').val())) : 0 - parseFloat($('#create_trans_amount').val());

            let yearID;
            if(month < 3){
                yearID = `${thisYear - 1} - ${thisYear}`;
            }else{
                yearID = `${thisYear} - ${thisYear + 1}`;
            }

            const transID = generateID(this.masterDict);
            if(!Object.keys(this.masterDict['records']).includes(yearID)){
                this.masterDict['records'][yearID] = {'transactions': {}, 'assets': {}};
            }
			this.masterDict['records'][yearID]['transactions'][transID] = {'month': monthNames[month], 'date': date, 'account': account, 'type': type, 'item': item, 'category': category, 'amount': amount}

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
        },
		editTransaction(){
			const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			this.recordDict = this.masterDict['records'][$('#edit_transID').attr('transyear')];
			const ID = $('#edit_transID').attr('transid')
			let date = ($('#edit_trans_date').val()).split("-");
			let month = parseInt(date[1]) - 1;
			let year = parseInt(date[0]);
			date = date.reverse().join("/");

			let account = $(`#edit_trans_account option:selected`).val();
			let type = $(`#edit_trans_type option:selected`).val();
			let category = $(`#edit_trans_category option:selected`).val();
			let item = $('#edit_trans_item').val();

            let preAmount = Math.abs(parseFloat($('#edit_trans_amount').val()))
			let amount = type == 'Credit' ? preAmount : 0 - preAmount;
			
			let yearID;
			if(month < 3){
				yearID = `${year - 1} - ${year}`;
			}else{
				yearID = `${year} - ${year + 1}`;
			}

			delete this.recordDict['transactions'][ID]
			this.masterDict['records'][yearID]['transactions'][ID] = {'month': monthNames[month], 'date': date, 'account': account, 'type': type, 'item': item, 'category': category, 'amount': amount}
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},
		deleteTransaction(){
			const ID = $('#edit_transID').attr('transid');
			const YEAR = $('#edit_transID').attr('transyear');
			delete this.masterDict['records'][YEAR]['transactions'][ID];

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},
		createUser(){
			let user = $('#create_user').val();
			let name = $('#create_user_name').val();
			let addOne = $('#create_user_addOne').val();
			let addTwo = $('#create_user_addTwo').val();
			let city = $('#create_user_city').val();
			let country = $('#create_user_country').val();
			let contact = $('#create_user_contact').val();
			
			if(user == '' || user == null){ //If no user name was entered.
				$("#create_user").addClass('form_error');
				return false;
			}
			$("#create_user").removeClass('form_error');

			const userID = generateID(this.masterDict);

			this.masterDict['users'][userID] = {'user': user, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		createClient(){
			let client = $('#create_client').val();
			let name = $('#create_client_name').val();
			let addOne = $('#create_client_addOne').val();
			let addTwo = $('#create_client_addTwo').val();
			let city = $('#create_client_city').val();
			let country = $('#create_client_country').val();
			let contact = $('#create_client_contact').val();

			if(client == '' || client == null){ //If no client name was entered.
				$("#create_client").addClass('form_error');
				return false;
			}
			$("#create_client").removeClass('form_error');

			const clientID = generateID(this.masterDict);

			this.masterDict['clients'][clientID] = {'client': client, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
			
		},

		createProject(){
			let name = $('#create_project_name').val();
			let duration = parseInt($('#create_project_duration').val());
			let date = reDoDate($('#create_project_date').val());
			let timeInterval = parseInt($(`#time_interval option:selected`).val())
			let weekInterval = parseInt($(`#week_interval option:selected`).val())

			if(name == '' || name == null){ //If no project name was entered.
				$("#create_project_name").addClass('form_error');
				return false;
			}
			if(isNaN(duration)){ //If no duration was provided
				$("#create_project_duration").addClass('form_error');
				$("#create_project_name").removeClass('form_error');
				return false;
			}
			if(date == 'NaN/NaN/NaN'){ //If no date was provided
				$("#create_project_date").addClass('form_error');
				$("#create_project_duration").removeClass('form_error');
				return false;
			}
			$("#create_project_date").removeClass('form_error');
			$('#create_project_name').val('');
			$('#create_project_duration').val('');
			$('#create_project_date').val('');

			const projectID = generateID(this.masterDict);
			
			let timeList = [];
			for(let h = 0; h < 24; h++){
				let hour = h;
				if(h < 10){
					hour = `0${h}`
				}
				for(let m = 0; m < 60; m += timeInterval){
					let minute = m;
					if(m < 10){
						minute = `0${m}`
					}
					timeList.push(`${hour}:${minute}`)
				}
			}
			let colourIds = Object.keys(this.masterDict['colours'])

			this.masterDict['projects'][projectID] = {'name': name, 'colours': colourIds, 'weeks': {}, 'timeList': timeList, 'duration': duration, 'weekInterval': weekInterval, 'timeInterval': timeInterval};
			
			
			if(weekInterval == 1){
				for(let w = 1; w <= duration; w++){
					this.masterDict['projects'][projectID]['weeks'][`${w}`] = {'startDate': date, 'colouredCells': {}};
					colourIds.forEach(colourID => {
						if(colourID != 'colourWhite'){
							this.masterDict['projects'][projectID]['weeks'][`${w}`]['colouredCells'][colourID] = [];
						}
					});
					date = addToDate(date, 7);
				}
			}else if(weekInterval == 2){
				if(duration % 2 == 1){
					duration++;
					this.masterDict['projects'][projectID]['duration'] = duration;
				}   
				for(let w = 1; w <= duration; w+= 2){
					this.masterDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`] = {'startDate': date, 'colouredCells': {}};
					colourIds.forEach(colourID => {
						if(colourID != 'colourWhite'){
							this.masterDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`]['colouredCells'][colourID] = [];
						}
					});
					date = addToDate(date, 14);
				}
			}
			

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		createColour(){
			let colourName = $("#create_colour_name").val();
			let colourRate = (parseFloat($("#create_colour_rate").val())).toFixed(2);
			let colour = $("#create_colour_colour").val();

			const colourID = generateID(this.masterDict);

			this.masterDict['colours'][colourID] = {'name': colourName, 'rate': colourRate, 'colour': colour};
			for (let [projectID, projectDict] of Object.entries(this.masterDict['projects'])) {
				projectDict['colours'].push(colourID);
				projectID;
				let duration = projectDict.duration;
				if(projectDict.weekInterval == 1){
					for(let w = 1; w <= duration; w++){
						this.masterDict['projects'][projectID]['weeks'][`${w}`]['colouredCells'][colourID] = [];
					}
				}
				else if(projectDict.weekInterval == 2){
					for(let w = 1; w <= duration; w+= 2){
						this.masterDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`]['colouredCells'][colourID] = [];
					}
				}
			}

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		editUser(){
			const userID = $(`#edit_userID`).attr('userid');
			let user = $('#edit_user').val();
			let name = $('#edit_user_name').val();
			let addOne = $('#edit_user_addOne').val();
			let addTwo = $('#edit_user_addTwo').val();
			let city = $('#edit_user_city').val();
			let country = $('#edit_user_country').val();
			let contact = $('#edit_user_contact').val();

			this.masterDict['users'][userID] = {'user': user, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		editClient(){
			const clientID = $(`#edit_clientID`).attr('clientid');
			let client = $('#edit_client').val();
			let name = $('#edit_client_name').val();
			let addOne = $('#edit_client_addOne').val();
			let addTwo = $('#edit_client_addTwo').val();
			let city = $('#edit_client_city').val();
			let country = $('#edit_client_country').val();
			let contact = $('#edit_client_contact').val();

			this.masterDict['clients'][clientID] = {'client': client, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		editProject(){
			const projectID = $(`#edit_projectID`).attr('projectid');
			const name = $('#edit_project_name').val();
			let duration = parseInt($('#edit_project_duration').val());

			if(name == '' || name == null){ //If no project name was entered.
				$("#edit_project_name").addClass('form_error');
				return false;
			}
			if(isNaN(duration)){ //If no duration was provided
				$("#edit_project_duration").addClass('form_error');
				$("#edit_project_name").removeClass('form_error');
				return false;
			}

			$("#edit_project_name").removeClass('form_error');
			$("#edit_project_duration").removeClass('form_error');
			$('#edit_project_name').val('');
			$('#edit_project_duration').val('');

            let colourIds = Object.keys(this.masterDict['colours'])
			let previousDur = this.masterDict['projects'][projectID]['duration'];
			if(this.masterDict['projects'][projectID]['duration'] < duration){
				if(this.masterDict['projects'][projectID]['weekInterval'] == 1){
					let date = this.masterDict['projects'][projectID]['weeks'][`${previousDur}`]['startDate'];
					for(let w = previousDur + 1; w <= duration; w++){
						date = addToDate(date, 14);
						this.masterDict['projects'][projectID]['weeks'][`${w}`] = {'startDate': date, 'colouredCells': {}};
                        colourIds.forEach(colourID => {
                            if(colourID != 'colourWhite'){
                                    this.masterDict['projects'][projectID]['weeks'][`${w}`]['colouredCells'][colourID] = [];
                            }
                        });
					}

					this.masterDict['projects'][projectID]['duration'] = duration;

				}else if(this.masterDict['projects'][projectID]['weekInterval'] == 2){

					let lastKey = `${previousDur - 1} - ${previousDur}`;
					let date = this.masterDict['projects'][projectID]['weeks'][lastKey]['startDate'];
					for(let w = previousDur + 1; w <= duration; w+= 2){
						date = addToDate(date, 14);
						this.masterDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`] = {'startDate': date, 'colouredCells': {}};
                        colourIds.forEach(colourID => {
                            if(colourID != 'colourWhite'){
                                    this.masterDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`]['colouredCells'][colourID] = [];
                            }
                        });
					}
					if(duration % 2 == 1){
						this.masterDict['projects'][projectID]['duration'] = duration + 1;
					}else{
						this.masterDict['projects'][projectID]['duration'] = duration;
					}
				}
			}

			this.masterDict['projects'][projectID]['name'] = name;
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		editColour(){
			const colourID = $(`#edit_colourID`).attr('colourid');
			console.log(colourID)
			let colourName = $("#edit_colour_name").val();
			let colourRate = (parseFloat($("#edit_colour_rate").val())).toFixed(2);
			let colour = $("#edit_colour_colour").val();
			
			this.masterDict['colours'][colourID] = {'name': colourName, 'rate': colourRate, 'colour': colour};
			console.log(this.masterDict)
			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		deleteUser(){
			const userID = $(`#edit_userID`).attr('userid');
			delete this.masterDict['users'][userID];

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		deleteClient(){
			const clientID = $(`#edit_clientID`).attr('clientid');
			delete this.masterDict['clients'][clientID];

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		deleteProject(){
			const projectID = $(`#edit_projectID`).attr('projectid');
			delete this.masterDict['projects'][projectID];

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		deleteColour(){
			const colourID = $(`#edit_colourID`).attr('colourid');
			delete this.masterDict['colours'][colourID];
			for(const[projectID, projectDict] of Object.entries(this.masterDict['projects'])){
				const index = projectDict['colours'].indexOf(colourID);
				if (index > -1) {
					projectDict['colours'].splice(index, 1);
				}
				for(const [weekID, weekDict] of Object.entries(projectDict['weeks'])){
					for(const [projColour, colouredCell] of Object.entries(weekDict['colouredCells'])){
						if(projColour === colourID){
							colouredCell;
							delete this.masterDict['projects'][projectID]['weeks'][weekID]['colouredCells'][colourID]
						}
					}
				}
			}

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
	}
}
</script>


<style scoped>
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
	z-index: 1000;
	inset: 0px;
	opacity: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Segoe UI', sans-serif;
	backdrop-filter: blur(15px);
	transition: 0.2s ease all;
}

.form{
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background-color: #FFFFFF23;
	border-radius: 5px;
	box-shadow: 0px 0px 10px -5px white inset,
				0px 4px 16px -16px black;
	backdrop-filter: blur(7px);
	transition: 0.3s ease all;
}

.form button:first-of-type{
	margin-top: 20px;
}

select{
	margin: 10px 0px;
	border-radius: 10px;
	padding: 5px;
	width: 110px;
	outline: none;
}
</style>
