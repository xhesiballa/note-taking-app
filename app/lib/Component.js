import Mustache from 'mustache/mustache.js';
import * as DeepProxy from './DeepProxy.js';

export default class Component{
	constructor() {
		Object.assign(this, this.getConfig());

		let symbol = Symbol.for("model");
		this[symbol] = {}
		this.model = DeepProxy.create(this[symbol], this);
		this.render();
		this.initialiseSubComponents();
	}

	initialiseSubComponents(){
		if(this.components){
			this.components.forEach((promise) => {
				promise.then(module => new module.default());
			});
		}
	}

	render(){
		let model = this[Symbol.for("model")];
		if(typeof this.selector == 'string'){
			this.selector = document.getElementsByTagName(this.selector)[0];
		}
		this.selector.innerHTML = Mustache.render(this.template, model);
		this.initialiseListeners();
	}

	set(obj, prop, value){
		this.render();
	}

	initialiseListeners(){}
}
