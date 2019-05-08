import Mustache from 'mustache/mustache.js';
import * as DeepProxy from './DeepProxy.js';

export default class Component{
	constructor() {
		this.childComponents = [];
		let symbol = Symbol.for("model");
		this[symbol] = {}
		this.model = DeepProxy.create(this[symbol], this)
	}

	render(){
		let model = this[Symbol.for("model")];
		this.selector.innerHTML = Mustache.render(this.template, model);
	}

	set(obj, prop, value){
		this.render();
	}
}
