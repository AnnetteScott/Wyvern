<template>
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

    <div class="settings_section">
        <div class="top">
            <h2>Users</h2>
            <img src="../../assets/icons/expand_more_white_24dp.svg" draggable="false" alt="">
        </div>
        <div class="bottom">
            <span class="shadows"></span>
            <div class="inner"></div>
        </div>
    </div>

    <div class="settings_section">
        <div class="top">
            <h2>Clients</h2>
            <img src="../../assets/icons/expand_more_white_24dp.svg" draggable="false" alt="">
        </div>
        <div class="bottom">
            <span class="shadows"></span>
            <div class="inner"></div>
        </div>
    </div>

    <div class="settings_section">
        <div class="top">
            <h2>Projects</h2>
            <img src="../../assets/icons/expand_more_white_24dp.svg" draggable="false" alt="">
        </div>
        <div class="bottom">
            <span class="shadows"></span>
            <div class="inner"></div>
        </div>
    </div>

    <div class="settings_section">
        <div class="top">
            <h2>Colours</h2>
            <img src="../../assets/icons/expand_more_white_24dp.svg" draggable="false" alt="">
        </div>
        <div class="bottom">
            <span class="shadows"></span>
            <div class="inner"></div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue';

export default {
	name: 'App',
	components: {
		NavBar
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
