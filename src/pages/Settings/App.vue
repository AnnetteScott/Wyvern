<template>
	<BackgroundBubble />
	<NavBar 
		:title="`Settings`"
		:links="[
			{
				title: `Wyvern`,
				image: require(`../../assets/icons/home_white_24dp.svg`),
				url: `/`
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
	</div>

	<div id="settings_sections">
		<div id="users_bottom" v-if="current_settings_page == `users_bottom`">
			<div v-for="user in users" :key="user" class="list_item">{{ user.name }}</div>
			<ButtonItem :title="`Create User`" @click="current_request_form=`createUserForm`" />
		</div>

		<div id="clients_bottom" v-if="current_settings_page == `clients_bottom`">
			<div v-for="client in clients" :key="client" class="list_item">{{ client.name }}</div>
			<ButtonItem :title="`Create Client`" @click="current_request_form=`createClientForm`" />
		</div>

		<div id="projects_bottom" v-if="current_settings_page == `projects_bottom`">
			<div v-for="project in projects" :key="project" class="list_item">{{ project.name }}</div>
			<ButtonItem :title="`Create Project`" @click="current_request_form=`createUserForm`" />
		</div>

		<div id="colours_bottom" v-if="current_settings_page == `colours_bottom`">
			<div v-for="colour in colours" :key="colour" class="list_item">{{ colour.name }}</div>
			<ButtonItem :title="`Create Colour`" @click="current_request_form=`createUserForm`" />
		</div>
        
        <div v-if="current_settings_page == ``">Please Select A Tab To Begin</div>
	</div>
	<AllForms :requestForm="current_request_form" @cancelled="current_request_form=``"/>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import AllForms from '../../components/AllForms.vue';
import ButtonItem from '../../components/ButtonItem.vue';
import BackgroundBubble from '../../components/BackgroundBubble.vue';
import $ from 'jquery';
import { getCookie } from '../../cookieManager.min.js';

export default {
	name: 'App',
	components: {
		NavBar,
		AllForms,
		ButtonItem,
		BackgroundBubble
	},
	data() {
		return {
			current_settings_page: '',
			current_request_form: ``
		}
	},
	mounted() {
		console.log(JSON.parse(getCookie('masterDict')));
	},
	methods: {
		settings_tab_clicked(e, page){
			this.$data.current_settings_page = page;
			$('.settings_tab_button').removeClass('active_settings_tab')
			$(e.target).addClass('active_settings_tab')
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
	height: 30px;
	opacity: 1;
	transition: 0.1s ease all;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: #FFFFFF23;
    border-radius: 5px;
    box-shadow: 0px 0px 10px -5px white inset,
                0px 4px 16px -16px black;
}
.settings_tab_button:hover {
	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.active_settings_tab{
	background-color: #ffffffc5;
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
}

.list_item {
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	width: 95%;
	height: clamp(40px, 40px, 40px);
	padding: 0px 20px;
	background-color: #ffffff40;
	border-radius: 4px;
}
</style>
