<template>
	<BackgroundBubble />
	<NavBar :title="`Settings`"/>
	<SavingPopup />

	<div id="settings_tabs">
		<div class="settings_tab_button" @click="settings_tab_clicked($event, `users_bottom`)">
			<h2>Users</h2>
		</div>

		<div class="settings_tab_button" @click="settings_tab_clicked($event, `clients_bottom`)">
			<h2>Clients</h2>
		</div>

		<div class="settings_tab_button" @click="settings_tab_clicked($event, `projects_bottom`)">
			<h2>Projects</h2>
		</div>

		<div class="settings_tab_button" @click="settings_tab_clicked($event, `colours_bottom`)">
			<h2>Colours</h2>
		</div>
        
        <div class="settings_tab_button" @click="settings_tab_clicked($event, `records_bottom`)">
			<h2>Records</h2>
		</div>
	</div>

	<div id="settings_sections">
		<!-- User -->
		<div id="users_bottom" v-if="current_settings_page == `users_bottom`">
			<div class="settings_bottom_control">
				<p>You Have {{ Object.keys(masterDict['users']).length == 1 ? Object.keys(masterDict['users']).length + ' User' : Object.keys(masterDict['users']).length + ' Users' }}</p>
				<ButtonItem :title="`Create User`" @click="current_request_form=`createUserForm`" />
			</div>
			<div v-for="(userDict, userID) in masterDict['users']" :key="userDict" class="list_item" :data="userID" @click="open_edit_form($event, `editUserForm`, `users`)">{{ userDict.user }}</div>
		</div>

		<!-- client -->
		<div id="clients_bottom" v-if="current_settings_page == `clients_bottom`">
			<div class="settings_bottom_control">
				<p>You Have {{ Object.keys(masterDict['clients']).length == 1 ? Object.keys(masterDict['clients']).length + ' Client' : Object.keys(masterDict['clients']).length + ' Clients' }}</p>
				<ButtonItem :title="`Create Client`" @click="current_request_form=`createClientForm`" />
			</div>
			<div v-for="(clientDict, clientID) in masterDict['clients']" :key="clientDict" class="list_item" :data="clientID" @click="open_edit_form($event, `editClientForm`, `clients`)">{{ clientDict.client }}</div>
		</div>

		<!-- project -->
		<div id="projects_bottom" v-if="current_settings_page == `projects_bottom`">
			<div class="settings_bottom_control">
				<p>You Have {{ Object.keys(masterDict['projects']).length == 1 ? Object.keys(masterDict['projects']).length + ' Project' : Object.keys(masterDict['projects']).length + ' Projects' }}</p>
				<ButtonItem :title="`Create Project`" @click="current_request_form=`createProjectForm`" />
			</div>
			<div v-for="(projectDict, projectID) in masterDict['projects']" :key="projectDict" class="list_item" :data="projectID" @click="open_edit_form($event, `editProjectForm`, `projects`)">{{ projectDict.name }}</div>
		</div>

		<!-- colours -->
		<div id="colours_bottom" v-if="current_settings_page == `colours_bottom`">
			<div class="settings_bottom_control">
				<p>You Have {{ (Object.keys(masterDict['colours']).length - 1) == 1 ? (Object.keys(masterDict['colours']).length - 1) + ' Colour' : (Object.keys(masterDict['colours']).length - 1) + ' Colours' }}</p>
				<ButtonItem :title="`Create Colour`" @click="current_request_form=`createColourForm`" />
			</div>
			<template v-for="(colourDict, colourID) in masterDict['colours']" :key="colourDict">
				<div v-if="colourID != `colourWhite`" class="list_item" :data="colourID" @click="open_edit_form($event, `editColourForm`, `colours`)">
					<div class="colour_preview" :style="{backgroundColor: colourDict['colour']}"></div>
					<p>{{ colourDict.name }}</p>
				</div>
			</template>
		</div>
        
        <!-- Records -->
		<div id="records_bottom" v-if="current_settings_page == `records_bottom`">
            <div class="column">
                <div class="settings_section">
                    <div class="settings_bottom_control">
                        <p>You Have {{(Object.keys(masterDict['records']['categories']).length) == 1 ? (Object.keys(masterDict['records']['categories']).length) + ' Category' : (Object.keys(masterDict['records']['categories']).length) + ' Categories' }}</p>
                        <ButtonItem :title="`Create Category`" @click="current_request_form=`createCategory`" />
                    </div>
                    <template v-for="(status, Category) in masterDict['records']['categories']" :key="Category">
                        <div class="list_item" :data="Category" :category="Category" @click="open_edit_form($event, `editCategory`, `categories`)">
                            {{ Category }}
                        </div>
                    </template>
                </div>
                <div class="settings_section">
                    <div class="settings_bottom_control">
                        <p>You Have {{ ((masterDict['records']['accounts']).length) == 1 ? ((masterDict['records']['accounts']).length) + ' Account' : ((masterDict['records']['accounts']).length) + ' Accounts' }}</p>
                        <ButtonItem :title="`Create Account`" @click="current_request_form=`createAccount`" />
                    </div>
                    <template v-for="Account in masterDict['records']['accounts']" :key="Account">
                        <div class="list_item" :data="`accounts`" :account="Account" @click="open_edit_form($event, `editAccount`, `accounts`)">
                            {{ Account }}
                        </div>
                    </template>
                </div>  
				<div class="settings_section">
                    <div class="settings_bottom_control">
                        <p>You Have {{ ((masterDict['records']['payee']).length) == 1 ? ((masterDict['records']['payee']).length) + ' Payee' : ((masterDict['records']['payee']).length) + ' Payees' }}</p>
                        <ButtonItem :title="`Create Payee`" @click="current_request_form=`createPayee`" />
                    </div>
                    <template v-for="payee in masterDict['records']['payee']" :key="payee">
                        <div class="list_item" :data="`payee`" :payee="payee" @click="open_edit_form($event, `editPayee`, `payee`)">
                            {{ payee }}
                        </div>
                    </template>
                </div>  
            </div>
			
		</div>
		
		<div v-if="current_settings_page == ``"></div>
	</div>
	<AllForms :requestForm="current_request_form" @cancelled="current_request_form=``"
	@saveCookieForBeebViewing="saveCookie"/>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import AllForms from '../../components/AllForms.vue';
import ButtonItem from '../../components/ButtonItem.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import $ from 'jquery';
import SavingPopup from '@/components/SavingPopup.vue';

export default {
	name: 'App',
	components: {
    NavBar,
    AllForms,
    ButtonItem,
    BackgroundBubble,
    SavingPopup
},
	data() {
		return {
			current_settings_page: '',
			current_request_form: ``,
			masterDict: {}
		}
	},
	mounted() {
		this.masterDict = JSON.parse(localStorage.getItem('masterDict'));

		$('.settings_tab_button:nth-child(1)').click();
	},
	methods: {
		settings_tab_clicked(e, page){
			this.$data.current_settings_page = page;
			$('.settings_tab_button').removeClass('active_settings_tab')
			$(e.target).addClass('active_settings_tab')
		},
		saveCookie(){
			this.masterDict = JSON.parse(localStorage.getItem('masterDict'));
		},
		open_edit_form(event, form_name, type) {
			this.current_request_form = form_name;
			let id;
			let obj;
			
			if(type !== 'categories' && type != 'accounts' && type != 'payee'){
				id = $(event.target).attr('data');
				obj = this.masterDict[type][id];
			}
			
			const editedType = type.slice(0, -1);

			setTimeout(() => {
				if(editedType == 'user' || editedType == 'client'){
					$(`#edit_${editedType}ID`).val(obj[editedType]);
					$(`#edit_${editedType}`).val(obj[editedType]);
					$(`#edit_${editedType}_name`).val(obj['name']);
					$(`#edit_${editedType}_addOne`).val(obj['addOne']);
					$(`#edit_${editedType}_addTwo`).val(obj['addTwo']);
					$(`#edit_${editedType}_city`).val(obj['city']);
					$(`#edit_${editedType}_country`).val(obj['country']);
					$(`#edit_${editedType}_contact`).val(obj['contact']);
					$(`#edit_${editedType}ID`).attr(`${editedType}id`, id);
				}
				else if(editedType == 'project'){
					$(`#edit_${editedType}ID`).attr(`${editedType}id`, id);
					$(`#edit_${editedType}_name`).val(obj['name']);
					$(`#edit_${editedType}_duration`).val(obj['duration']);
					$(`#edit_${editedType}_target`).val(obj['targetHours']);
				}
				else if(editedType == 'colour'){
					$(`#edit_${editedType}ID`).attr(`${editedType}id`, id);
					$(`#edit_${editedType}_name`).val(obj['name']);
					$(`#edit_${editedType}_rate`).val(obj['rate']);
					$(`#edit_${editedType}_colour`).val(obj['colour']);
				}
                else if(editedType == 'categorie'){
                    let category = $(event.target).attr(`category`)
                    $(`#edit_category_old`).attr(`oldcategory`, category);
                    $(`#edit_category`).val(category);
                    $(`#edit_category_status`).prop('checked', this.masterDict['records']['categories'][category]);
                }
				else if(editedType == 'account'){
                    let account = $(event.target).attr(`account`)
                    $(`#edit_account_old`).attr(`oldaccount`, account);
                    $(`#edit_account`).val(account);
                }
				else if(editedType == 'paye'){
					let payee = $(event.target).attr(`payee`);
                    $(`#edit_payee_old`).attr(`oldpayee`, payee);
                    $(`#edit_payee`).val(payee);
				}

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

@media only screen and (max-width: 1435px) {
    #inner {
        height: calc(100vh - var(--navbar_height) - 15px);
        overflow-x: auto;
    }
}

#settings_tabs {
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-evenly;
	align-items: flex-end;
	width: 100%;
	height: 90px;
}
.settings_tab_button {
    width: 18%;
	height: 30px;
	opacity: 1;
	transition: 0.1s ease all;
	cursor: pointer;
	display: flex;
	align-items: center;
    justify-content: center;
	user-select: none;
    font-family: 'Lato';
	padding: 10px;
	background-color: #FFFFFF23;
	border-radius: 5px;
	box-shadow: 0px 0px 10px -5px white inset,
				0px 4px 16px -16px black;
}
.settings_tab_button:hover {
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.082), 0 10px 10px rgba(0, 0, 0, 0.11);
}

.active_settings_tab{
	background-color: #ffffffc5;
}

.settings_bottom_control{
    font-family: 'Lato';
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	width: 97%;
	height: 80px;
}

.settings_bottom_control div{
	height: 40px;
	width: 90% !important;
	margin-top: 5px;
}

.settings_bottom_control p{
	margin: 7px 0px 0px;
}

.settings_tab_button h2 {
	margin: 0px;
	pointer-events: none;
}

#settings_sections {
	z-index: 2;
	position: relative;
	width: 100%;
}

#settings_sections > div {
	position: relative;
	z-index: 2;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
	min-height: calc(100vh - var(--navbar_height) - 110px);
	overflow-y: scroll;
	margin: 1px 10px 10px 10px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	border-radius: 10px;
}

.list_item {
	position: relative;
	z-index: 2;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	width: 95%;
	height: 50px;
	padding: 0px 20px;
	background-color: #ffffff4f;
	border-radius: 10px;
	cursor: pointer;
	font-family: 'Lato';
	font-weight: 900;
	font-size: 1.6em;
}

.list_item:hover {
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.082), 0 10px 10px rgba(0, 0, 0, 0.11);
}

.list_item p {
	margin: 0px;
	pointer-events: none;
}

.colour_preview{
    height: 70%;
	aspect-ratio: 1;
    margin-right: 10px;
    border-radius: 10px;
}

.column{
    width: 100%;
    display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
	min-height: calc(100vh - var(--navbar_height) - 110px);
}

.settings_section{
    width: 100%;
    display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
	min-height: calc(100vh - var(--navbar_height) - 110px);
    background-color: #FFFFFF23;
	border-radius: 5px;
    gap: 10px;
	box-shadow: 0px 0px 10px -5px white inset,
				0px 4px 16px -16px black;
}

.settings_section > .list_item{
    width: 90%;
}

#records_bottom{
    overflow-y: unset !important;
}

input[type="checkbox"] {
    height: 30px;
}

</style>
