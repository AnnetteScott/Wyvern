<template>
	<div class="button_link" :title="$props.title">
		<p v-if="title">{{ title }}</p>
		<img :src="image" draggable="false" alt="">
	</div>
</template>

<script>
export default {
	name: 'ButtonLink',
	props: {
		title: String,
		glow: Boolean,
        image: String
	}
}
</script>

<style scoped>
.button_link {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	min-height: 20px;
	max-height: 50px;
	margin: 0px;
	font-family: inherit;
	font-size: 17px;
	font-weight: bold;
	text-decoration: none;
	background: linear-gradient(90deg, #8202ccb2, #bb02ccb2);
	box-shadow: 0px 15px 30px -10px #8202cc;
	border-radius: 30px;
	overflow: hidden;
	cursor: pointer;
}
.button_link p {
	z-index: 1;
	margin: -2px 10px 0px 10px;
	padding: 2px 0px;
	color: white;
	font-family: inherit;
	font-weight: 100;
	text-decoration: none;
	user-select: none;
    pointer-events: none;
    font-family: 'Lato';
}

.button_link img {
    pointer-events: none;
}

.button_link:hover{
    background: linear-gradient(90deg, #8202cc, #bb02cc);
}
</style>
