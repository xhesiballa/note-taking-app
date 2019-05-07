import Mustache from 'mustache/mustache.js';

export default class Component{
	constructor() {
		console.log('Component');
		this.childComponents = [];
		let symbol = Symbol.for("model");
		this[symbol] = {}
		this.model = new Proxy(this[symbol], this);
	}

	render(){
		let model = this[Symbol.for("model")];
		this.selector.innerHTML = Mustache.render(this.template, model);
	}

	set(obj, prop, value){
		let model = this[Symbol.for("model")];
		console.debug(model);
		console.debug(` prop: ${prop}, value: ${value}`);
		obj[prop] = value;
		console.debug(model);
		this.render();
		return true;
	}
}
