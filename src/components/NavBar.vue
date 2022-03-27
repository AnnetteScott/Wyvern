<template>
	<div id="navbar">
		<h1>{{ title }}</h1>
		<span class="menu_button" @click="navbar_menu_open = !navbar_menu_open" style="background-image: url(./menu_white_24dp.svg)">
        </span>
	</div>

	<div id="navbar_menu" :style="compute_navbar_menu_position">
		<a v-for="link in links" :key="link" :href="link.url" :title="link.title">
			<img :src="link.image" draggable="false" alt="">
			<p>{{ link.title }}</p>
		</a>
	</div>
</template>

<script>

export default {
	name: 'NavBar',
	props: {
		title: String,
		links: Array
	},
	data() {
		return {
			navbar_menu_open: true
		}
	},
	computed: {
		compute_navbar_menu_position() {
			return this.$data.navbar_menu_open ? `right: 0px;` : `right: calc(0px - var(--navbar_menu_width))`;
		}
	},
	mounted() {
		window.setTimeout(function() {
			this.$data.navbar_menu_open = false;
		}.bind(this), 10);
	}
}
</script>

<style scoped>
@import url('../../public/root.css');


#navbar {
	position: fixed;
	z-index: 999;
	top: 0px;
	right: 0px;
	left: 0px;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	height: var(--navbar_height);
	padding: 0px 40px;
	color: white;
	font-family: 'Lora';
	font-size: 0.9em;
	background-color: black;
}
#navbar .menu_button {
	position: relative;
	display: block;
	height: 75%;
	aspect-ratio: 1;
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100%;
	cursor: pointer;
}

#navbar_menu {
	position: fixed;
	z-index: 99;
	top: var(--navbar_height);
	right: 0px;
	bottom: 0px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-evenly;
	align-items: center;
	width: var(--navbar_menu_width);
	font-family: 'Lora';
	background-color: black;
	transition: 0.3s ease all;
}
#navbar_menu a {
	color: white;
	font-family: inherit;
	text-decoration: none;
	opacity: 0.7;
	transition: 0.1s ease all;
}
#navbar_menu a:hover {
	opacity: 1;
}
</style>
