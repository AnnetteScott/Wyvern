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
			<div id="edit_colourID" projectid="invalid"></div>
			<label for="edit_colour_name">Colour Name:</label>
			<input id="edit_colour_name" type="text" />
			
			<label for="edit_colour_rate">Colour Rate</label>
			<input id="edit_colour_rate" type="number" step="0.01" />

			<label for="edit_colour_colour">Colour:</label>
			<input type="color" id="edit_colour_colour" name="head" value="#000000">

			<ButtonItem :title="`Save Colour`" @click="editColour"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
			<ButtonItem :title="`Delete`" @click="deleteColour"/>
		</div>
	</div>
</template>


<script>
import ButtonItem from './ButtonItem.vue';
import $ from 'jquery';
import { generateID, reDoDate, addToDate  } from '../../public/generalFunctions.js';

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
			masterDict: {}
		}
	},
	methods: {
		createUser(){
			let user = $('#create_user').val();
			let name = $('#create_user_name').val();
			let addOne = $('#create_user_addOne').val();
			let addTwo = $('#create_user_addTwo').val();
			let city = $('#create_user_city').val();
			let country = $('#create_user_country').val();
			let contact = $('#create_user_contact').val();
			

			let userID = generateID();
			while(Object.keys(this.masterDict['users']).includes(userID)) {
				userID = generateID();
			}

			this.masterDict['users'][userID] = {'user': user, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
			
			let thingy = this.masterDict;
			localStorage.setItem('masterDict', JSON.stringify(thingy));
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
			

			let clientID = generateID();
			while(Object.keys(this.masterDict['clients']).includes(clientID)) {
				clientID = generateID();
			}

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

			let thisVar = [name, duration, date, timeInterval, weekInterval]
			thisVar;
			
			let projectID = generateID();
			while(Object.keys(this.masterDict['projects']).includes(projectID)) {
				projectID = generateID();
			}
			
			let timeList = [`Date | Time`];
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
			this.masterDict['projects'][projectID] = {'name': name, 'colourList': [], 'weeks': {}, 'timeList': timeList, 'duration': duration};
			
			
			if(weekInterval == 1){
				for(let w = 1; w < duration; w++){
					this.masterDict['projects'][projectID]['weeks'][`${w}`] = {'startDate': date, 'colourCells': {}, 'totalColumnColour': {}, 'totalColumn': {}, 'totalColour$': {}};
					date = addToDate(date, 14);
				}
			}else if(weekInterval == 2){
				if(duration % 2 == 1){
					duration++;
				}   
				for(let w = 1; w <= duration; w+= 2){
					this.masterDict['projects'][projectID]['weeks'][`${w} - ${w + 1}`] = {'startDate': date, 'colourCells': {}, 'totalColumnColour': {}, 'totalColumn': {}, 'totalColour$': {}};
					date = addToDate(date, 14);
				}
			}
			

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		createColour(){
			let colourName = $("#colour_creation_name").val();
			let colourRate = (parseFloat($("#colour_creation_rate").val())).toFixed(2);
			let colour = $("#colour_creation_colour").val();

			let colourID = generateID();
			while(Object.keys(this.masterDict['colours']).includes(colourID)) {
				colourID = generateID();
			}

			this.masterDict['colours'][colourID] = {'name': colourName, 'rate': colourRate, 'colour': colour};

			localStorage.setItem('masterDict', JSON.stringify(this.masterDict));
			this.$emit('cancelled', '');
			this.$emit('saveCookieForBeebViewing', '');
		},

		editUser(){

		},

		editClient(){

		},

		editProject(){

		},

		editColour(){

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
