<template>
    <div id="outer_box" v-if="showDelete">
        <div id="inner_box">
            Are you sure you want to delete this?
            <div id="buttons">
                <ButtonItem :title="'Yes'" @click="this.$emit('doDelete', '')"/>
                <ButtonItem :title="'No'" @click="this.$emit('dontDelete', '')"/>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonItem from './ButtonItem.vue';

export default {
	name: 'DeleteBox',
    emits: ['doDelete','dontDelete'],
	props: {
        showDelete: Boolean
	},
    components: {
		ButtonItem
	}
}
</script>


<style scoped>
#outer_box{
    position: absolute;
    z-index: 1000;
    inset: 0px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', sans-serif;
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    transition: 0.2s ease all;
}
#inner_box{
    display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background-color: #FFFFFF23;
	border-radius: 5px;
	box-shadow: 0px 0px 10px -5px white inset, 0px 4px 16px -16px black;
	transition: 0.3s ease all;
}

#buttons{
    display: flex;
    width: 100%;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-evenly;
}

#buttons > div{
    height: 25px;
    width: 75px;
}

</style>
