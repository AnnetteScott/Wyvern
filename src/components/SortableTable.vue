<template>
    <div class="table">
        <div v-if="$props.title" class="title"><p>{{ $props.title }}</p><span><slot></slot></span></div>
        <div class="row headings">
            <p  v-for="heading in $props.headings" 
				:key="heading" 
				:class="'heading' + `${$props.sort && $props.sort_default ? $props.sort.includes($props.sort_default) && heading == $props.sort_default ? ' forwards' : '' : ''}`" 
				:style="`${heading == 'image' ? 'max-width: 38px;' : ''}${$props.sort ? $props.sort.includes(heading) ? 'cursor: pointer;' : 'pointer-events: none;' : 'pointer-events: none;'}`" 
				:title="`${$props.sort ? $props.sort.includes(heading) ? `Sort by ${heading}` : heading : heading}`" 
				@click="sort_table(`${heading}`, $event)"
			>{{ (heading == 'image' ? '' : heading) }}</p>
        </div>
        <div class="inner">
            <div v-for="item in table_rows" 
				:key="item" 
				class="row" 
				:data="item.id ? item.id : ''"  
				:value="JSON.stringify(item)" 
				:style="`${$props.clickable ? 'user-select: none;cursor: pointer;' : 'pointer-events: none;'}${item.amount < 0 ? 'background-color:#ff26265c;' : item.amount > 0 ? 'background-color:#00ff005e;' : ''}`" 
				@click="this.$parent.editTransaction($event)"
			>
                <p v-for="heading in $props.headings" :key="heading" :title="item[heading.toLowerCase()]" :style="`${heading == 'image' ? 'max-width: 38px;' : ''}`">
                    <img v-if="heading == 'image'" :src="item[heading]" draggable="false" loading="lazy" alt="">
                    <b v-else-if="$props.emphasis && heading == $props.emphasis">{{  item[heading.toLowerCase()] }}</b>
                    {{ (heading != 'image' && !($props.emphasis && heading == $props.emphasis) ? item[heading.toLowerCase()] : '') }}

                    <template v-if="heading == 'Receipt' && item.receiptID != ''">
                        <img :src="require(`../assets/icons/fileDownload.svg`)" draggable="false" alt="" @click.stop="this.$parent.downloadReceipt($event)" :data="item.receiptID" style="pointer-events:all;">
                    </template>
                    <template v-else-if="heading == 'Receipt'">
                        <img :src="require(`../assets/icons/fileUpload.svg`)" draggable="false" alt="" @click.stop="this.$parent.uploadReceipt($event)" :data="item.id" style="pointer-events:all;">
                    </template>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'SortableTable',
	props: {
		title: String,
		headings: Array,
		emphasis: String,
		sort: Array,
		sort_default: String,
		rows: Array,
		clickable: Boolean
	},
	data() {
		return {
			table_rows: this.rows
		}
	},
    watch: {
        rows() {
            this.table_rows = this.rows;
        }
    },
	methods: {
        sort_table(heading = false, event = false) {// Sort the table rows alphabetically based on the content of a selected column.
            if(this.table_rows && heading){
                let table_data = [],
					is_numeric = false;
                this.table_rows.forEach((data_elem) => {// Create a list of arrays formatted as [heading specified data, full data item].
                    let raw_data = data_elem[heading.toLowerCase()],
						formatted_data = raw_data;
                    if(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/i.test(raw_data)){ // If the heading specified data is formatted '00/00/0000'.
                        raw_data = raw_data.split('/');
                        formatted_data = `${raw_data[2]}/${raw_data[1]}/${raw_data[0]}`; // Reverse it to '0000/00/00' so it can be sorted correctly.
                    }else if(!isNaN(raw_data)){ // If the heading specified data is a number.
                        formatted_data = parseFloat(raw_data);
                        is_numeric = true;
                    }
					table_data.push([formatted_data, data_elem]);
                });
                if(is_numeric){
                    table_data.sort((a,b) => {return a[0] - b[0];});
                }else{
                    table_data.sort();
                }
                // Reverse the list if the heading is selected multiple times.
				if(event){
					if(Array.from(event.target.classList).includes('forwards')){
						table_data.reverse();
						event.target.classList.remove('forwards');
					}else{
						event.target.classList.add('forwards');
					}
				}
                // Update the rows in the table.
                this.table_rows = [];
				table_data.forEach(function(data_elem) {
					this.table_rows.push(data_elem[1]);
				}.bind(this)); 
            }
		},
		sort_table_default() {
			if(this.sort_default && this.headings.includes(this.sort_default)){
				this.sort_table(this.sort_default);
			}
		}
	},
	mounted() {
        setTimeout(function() {
            this.table_rows = this.rows;
            this.sort_table_default();
		}.bind(this), 1);
	}
}
</script>

<style scoped>
.table {
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	width: 95%;
    height: 90%;
	padding: 10px;
	background-color: #ffffff60;
	border-radius: 10px;
	box-shadow: 2px 4px 10px -7px black;
	backdrop-filter: blur(10px);
}
.table .title {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
}
.table .title > p {
	margin: 0px;
	font-size: 28px;
}
.table .inner {
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	height: 100%;
	background-color: #fff3;
	border-radius: 0px 0px 5px 5px;
	overflow-x: hidden;
	overflow-y: auto;
}
.table .row {
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 40px;
	box-sizing: border-box;
	padding: 0px 10px;
}
.table .row:nth-child(odd):not(.headings) {
	background-color: #fff0;
}
.table .row:nth-child(even):not(.headings) {
	background-color: #fff3;
    border-top: 1px solid #0001;
    border-bottom: 1px solid #0001;
}
.table .row:not(.headings):hover {
	background-color: #fffB !important;
}
.table .row > * {
	position: relative;
	display: block;
	width: 100%;
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.table .row > *:nth-child(1) {
	min-width: 3rem;
	max-width: 5rem;
}
.table .row > *:nth-child(2) {
	min-width: 6rem;
	max-width: 7rem;
}
.table .row > *:nth-child(3) {
	min-width: 15rem;
}
.table .row > *:nth-child(4) {
	min-width: 3rem;
	max-width: 5rem;
}
.table .row > *:nth-child(5) {
	min-width: 15rem;
}
.table .row > *:nth-child(6) {
	min-width: 15rem;
}
.table .row > *:nth-child(7) {
	min-width: 17rem;
}
.table .row > *:nth-child(8) {
	min-width: 6rem;
	max-width: 8rem;
}

.table .row:not(.headings) > * {
    pointer-events: none;
}
.table .row b {
	color: black;
	font-weight: 600;
}
.table .row img {
	position: relative;
	display: block;
	width: 30px;
	aspect-ratio: 1;
	border-radius: 50%;
}
.table .headings {
	position: sticky;
	z-index: 2;
	top: 0px;
	height: 34px;
	font-size: 14px;
	font-weight: 500;
	text-transform: capitalize;
	background-color: white;
	border-radius: 5px 5px 0px 0px;
	box-shadow: 0px 2px 5px -4px black;
	user-select: none;
}
.table .headings p::after {
	content: "";
	position: absolute;
	z-index: 2;
	top: 5px;
	right: 10px;
	width: 8px;
	height: 8px;
	background-color: black;
	clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
	opacity: 0;
	user-select: none;
}
.table .headings .forwards::after {
	clip-path: polygon(100% 100%, 0% 100%, 50% 0%);
}
.table .headings p:hover::after {
	opacity: 1;
}
</style>
