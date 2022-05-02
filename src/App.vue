<template>
	<BackgroundBubble/>
    <NavBar 
        :title="`Wyvern`"
        :links="[
            {
                title: `Wyvern`,
                image: require(`./assets/icons/home_white_24dp.svg`),
                url: `/index.html`
            },
            {
                title: `Settings`,
                image: require(`./assets/icons/settings_white_24dp.svg`),
                url: `/Settings.html`
            },
            {
                title: `Time Sheets`,
                image: require(`./assets/icons/schedule_white_24dp.svg`),
                url: `/TimeSheets.html`
            },
            {
                title: `Invoice`,
                image: require(`./assets/icons/receipt_white_24dp.svg`),
                url: `/Invoice.html`
            },
            {
                title: `Records`,
                image: require(`./assets/icons/receipt_long_white_24dp.svg`),
                url: `/Records.html`
            }
        ]"
    />
    <SavingPopup />
    <div id="home_page">
        <img src="./assets/WyvernIcon.png" draggable="false" alt="" style="filter: grayscale(1) brightness(4);">
        <h1>Welcome To Wyvern!</h1>
        <h2>An Invoicing and Timesheet Software</h2>
        <br>
        <p>Click the menu in the top right to get started.</p>
    </div>

</template>

<script>
import NavBar from './components/NavBar.vue';
import BackgroundBubble from './components/BackgroundBubble.vue';
import SavingPopup from './components/SavingPopup.vue';

export default {
	name: 'App',
	components: {
        NavBar,
        BackgroundBubble,
        SavingPopup
    },
	mounted() {
        setTimeout(() => {
            console.log(JSON.parse(localStorage.getItem('masterDict')));
        }, 1)
		
	}
}
</script>

<style>
@import url('../public/root.css');
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: black;
}

#home_page{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    height: calc(100vh - var(--navbar_height));
    user-select: none;
}

#home_page::before{
	content: "";
	position: absolute;
	z-index: -1;
	display: block;
	width: min(70vw, 70vh);
	aspect-ratio: 1;
	border: 3px solid #ffffff40;
	border-radius: 50%;
	transform: translateY(var(--navbar_height));

    display: none;
}

#home_page::after{
	content: "";
	position: absolute;
	z-index: -1;
	display: block;
	width: min(80vw, 80vh);
	aspect-ratio: 1;
	border: 3px solid #ffffff20;
	border-radius: 50%;
	transform: translateY(var(--navbar_height));

    display: none;
}

</style>
