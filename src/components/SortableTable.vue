<template>
    <template v-if="loaded">
        <div :id="$props.id" class="table">
            <div v-if="$props.title" class="title"><p>{{ $props.title }}</p><span><slot></slot></span></div>
            <div class="row headings">
                <p v-for="heading in $props.headings" :key="heading" class="heading" :style="`${heading == 'image' ? 'max-width: 38px;' : ''}${$props.id && $props.sort.includes(heading) ? 'cursor: pointer;' : 'pointer-events: none;'}`" :title="`${$props.id && $props.sort.includes(heading) ? `Sort by ${heading}` : heading}`" @click="sort_table">{{ (heading == 'image' ? '' : heading) }}</p>
            </div>
            <div class="inner">
                <div class="row" v-for="item in $props.data" :key="item" :data="item['id']" :value="JSON.stringify(item)" :style="`${$props.clickable ? 'user-select: none;cursor: pointer;' : 'pointer-events: none;'}${item.amount < 0 ? 'background-color:#f004;' : item.amount > 0 ? 'background-color:#0f03;' : ''}`" @click="this.$parent.editTransaction($event)">
                    <p v-for="heading in $props.headings" :key="heading" :title="item[heading.toLowerCase()]" :style="`${heading == 'image' ? 'max-width: 38px;' : ''}`">
                        <img v-if="heading == 'image'" :src="item[heading]" draggable="false" loading="lazy" alt="">
                        <b v-else-if="$props.emphasis && heading == $props.emphasis">{{  item[heading.toLowerCase()] }}</b>
                        {{ (heading != 'image' && !($props.emphasis && heading == $props.emphasis) ? item[heading.toLowerCase()] : '') }}
                    </p>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
export default {
	name: 'SortableTable',
	props: {
		id: String,
		title: String,
		headings: Array,
		emphasis: String,
		sort: Array,
		sort_default: String,
		data: Array,
		clickable: Boolean
	},
    data() {
		return {
			loaded: false
		}
	},
	methods: {
		sort_table(e = false, heading = false) {
            if(document.querySelector(`#${this.id} .inner`) != null){
                let elem;
                let position;

                if(e && !heading){
                    elem = e.target;
                    position = [];
                    // Loop through previous siblings until `null` to get the DOM index of the selected heading.
                    while((elem = elem.previousElementSibling)){
                        position.push(elem);
                    }
                    elem = e.target;
                    position = position.length;
                }else{
                    position = 0;
                    document.querySelectorAll(`#${this.id} .heading`).forEach(function(heading_elem, index) {
                        if(heading_elem.innerText.toLowerCase() === heading.toLowerCase()){
                            elem = heading_elem;
                            position = index;
                        }
                    }.bind(this));
                }
                // Sort the table rows alphabetically based on the content of the selected column.
                let table_data = Array.from(document.querySelector(`#${this.id} .inner`).querySelectorAll('.row'));
                let is_numeric = false;
                table_data.forEach((data_elem, index) => {
                    let raw_data = data_elem.querySelector(`p:nth-child(${position + 1})`).innerText;
                    let formatted_data = raw_data;
                    if(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/i.test(raw_data)){
                        raw_data = raw_data.split('/');
                        formatted_data = `${raw_data[2]}/${raw_data[1]}/${raw_data[0]}`
                    }else if(!isNaN(raw_data)){
                        formatted_data = parseFloat(raw_data);
                        is_numeric = true;
                    }
                    table_data[index] = [formatted_data, data_elem];
                });
                if(is_numeric){
                    table_data.sort(function(a,b) {return a[0] - b[0];});
                }else{
                    table_data.sort();
                }
                // Reverse the list if the heading is selected multiple times.
                if(Array.from(elem.classList).includes('forwards')){
                    table_data.reverse();
                    elem.classList.remove('forwards');
                }else{
                    elem.classList.add('forwards');
                }
                // Update the rows in the table.
                document.querySelector(`#${this.id} .inner`).innerHTML = '';
                let sorted_elements = '';
                table_data.forEach((row) => {
                    sorted_elements += row[1].outerHTML;
                });
                document.querySelector(`#${this.id} .inner`).innerHTML = sorted_elements; 
            }
			
		},
		sort_table_default() {
            this.loaded = true
			if(this.sort_default && this.headings.includes(this.sort_default)){
				this.sort_table(false, this.sort_default);
			}
		}
	},
	mounted() {
        setTimeout(function() {
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
	width: clamp(300px, 90%, 1000px);
	min-height: 300px;
	max-height: 90%;
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
	width: 200px;
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
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
