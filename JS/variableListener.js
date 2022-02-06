let VL = {
	cache: {},


	loop: function () {
		Object.keys(this).forEach((f) => {
			if(f.toString().substring(0, 5) === 'task_'){
				if(this.variableHasChanged(f.toString().split('task_')[1])){
					if(this.isObject(window[f.toString().split('task_')[1]])){
						this.cache[f.toString().split('task_')[1]] = JSON.stringify(window[f.toString().split('task_')[1]]);
					}else{
						this.cache[f.toString().split('task_')[1]] = window[f.toString().split('task_')[1]];
					}
					this[f](); //Execute the function
				}
			}
		});
		window.requestAnimationFrame(this.loop.bind(this));
	},


	isObject: function (obj) {
		if(
			typeof obj === 'object' &&
			!Array.isArray(obj) &&
			obj !== null
		){
			return true;
		}else{
			return false;
		}
	},


	jsonEqual: function (jsonString, object) {
		return jsonString === JSON.stringify(object);
	},


	shallowEqual: function (object1, object2){
		const keys1 = Object.keys(object1);
		const keys2 = Object.keys(object2);
		if(keys1.length !== keys2.length){
			return false;
		}
		for(let key of keys1){
			if(object1[key] !== object2[key]){
				return false;
			}
		}
		return true; //Return true if the objects are equal.
	},


	variableHasChanged: function (v) {
		if(this.isObject(window[v])){
			return !this.jsonEqual(this.cache[v], window[v]);
		}else{
			return this.cache[v] !== window[v];
		}
	},


	add: function (v, f) {
		if(!v || typeof window[v] == 'undefined'){
			console.error("Scope Error: Variable must be globally declared with 'var'.");
			return false;
		}else if(!f){
			console.error("Argument Error: You must pass a function.");
			return false;
		}else{
			if(this.isObject(window[v])){
				this.cache[v] = JSON.stringify(window[v]); //Add the variable and its value to the cache.
			}else{
				this.cache[v] = window[v]; //Add the variable and its value to the cache.
			}
			this[`task_${v}`] = f; //Add the function to VL as a task.
			return true;
		}
	},


	remove: function (v) {
		if(this.cache[v]){
			delete this.cache[v];
			delete this[`task_${v}`];
			return true;
		}else{
			return false;
		}
	},


	init: function () {
		window.requestAnimationFrame(this.loop.bind(this));
		return true;
	}
};






function varToString (varObj){
	return Object.keys(varObj)[0];
}

const someVar = 42;
const displayName = varToString({ someVar });
//console.log(displayName);
