<template>
	<button onclick="">{{ title }}</button>
</template>

<script>
export default {
	name: 'ButtonItem',
	props: {
		title: String
	}
}
</script>

<style scoped>
button, .button {
	margin: 5px 0px;
	padding: 5px 20px;
	color: white;
	font-family: 'Segoe UI', sans-serif;
	text-decoration: none;
	background: linear-gradient(45deg, #db0c0c, #8d0505);
	border: unset;
	border-radius: 5px;
	cursor: pointer;
}

button:hover, .button:hover {
	background: linear-gradient(45deg, #e400d8, #9700dd);
}

.active_button {
	background: linear-gradient(180deg, #0c77db, #990cdb);
}
</style>
