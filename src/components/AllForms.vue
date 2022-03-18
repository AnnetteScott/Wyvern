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

			<ButtonItem :title="`Save User`"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
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

			<ButtonItem :title="`Save Client`" @click="saveClient"/>
			<ButtonItem :title="`Cancel`" @click="this.$emit('cancelled', '')"/>
		</div>
	</div>
</template>


<script>
import ButtonItem from './ButtonItem.vue';
import $ from 'jquery'
import generateID from '../../public/generalFunctions.js'

export default {
	name: 'AllForms',
	props: {
        requestForm: String
	},
	components: {
        ButtonItem
	},
    methods: {
        saveClient(){
            let client = $('#create_client').val();
            let name = $('#create_client_name').val();
            let addOne = $('#create_client_addOne').val();
            let addTwo = $('#create_client_addTwo').val();
            let city = $('#create_client_city').val();
            let country = $('#create_client_country').val();
            let contact = $('#create_client_contact').val();
            

            let clientID = generateID();
            while(Object.keys(this.$masterDict['clients']).includes(clientID)) {
                clientID = generateID();
            }

            this.$masterDict['clients'][clientID] = {'client': client, 'name': name, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country, 'contact': contact};
            
        }
    },
    mounted() {
        /* console.log(this.$masterDict) */
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
</style>
