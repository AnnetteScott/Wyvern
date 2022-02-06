let VL = {
	cache: {},


	loop: function () {
		Object.keys(this).forEach((f) => {
			if(f.toString().substring(0, 5) === 'task_'){
				if(this.variableHasChanged(f.toString().split('task_')[1])){
					this.cache[f.toString().split('task_')[1]] = window[f.toString().split('task_')[1]];
					this[f](); //Execute the function
				}
			}
		});
		window.requestAnimationFrame(this.loop.bind(this));
	},


	variableHasChanged: function (v) {
		return this.cache[v] !== window[v];
	},


	add: function (v, f) {
		if(!v || typeof window[v] == 'undefined'){
			console.error("Scope Error: Variable must be globally declared with 'var'.");
			return false;
		}else if(!f){
			console.error("Argument Error: You must pass a function.");
			return false;
		}else{
			this.cache[v] = window[v]; //Add the variable and its value to the cache.
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