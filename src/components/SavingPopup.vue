<template>
	<div id="saving_pop_up" :style="{opacity: saving_in_progress ? 1 : 0}">
		<span class="spinner"></span>
		<p>Saving...</p>
	</div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
	name: 'SavingPopup',
	data() {
		return {
			saving_in_progress: false
		}
	},
	created(){
		ipcRenderer.on('trigger_the_save_pop_up', function() {
			this.saving_in_progress = true;
			window.setTimeout(function() {
				this.saving_in_progress = false;
			}.bind(this), 2000);
		}.bind(this));
	}
}
</script>

<style scoped>
#saving_pop_up {
	position: absolute;
	z-index: 1000;
	top: 6px;
	right: 100px;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	width: 100px;
	height: 40px;
	color: white;
	font-size: 16px;
	opacity: 0;
	transition: 0.5s ease opacity;
}
#saving_pop_up .spinner {
	position: relative;
	display: block;
	height: 1em;
	aspect-ratio: 1;
	color: inherit;
	border: 0.15em solid #ffffff23;
	border-top: 0.15em solid currentColor;
	border-radius: 50%;
	animation: saving_spinner 0.8s linear infinite;
}
@keyframes saving_spinner {
	0%   {transform: rotate(0deg);}
	100% {transform: rotate(360deg);}
}
#saving_pop_up p {
	font-size: 1em;
}
</style>
