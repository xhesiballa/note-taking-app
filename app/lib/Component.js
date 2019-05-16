import Mustache from 'mustache/mustache.js';
import * as DeepProxy from './DeepProxy.js';
import Input from './Input.js';
import Observable from './Observable.js';


export default class Component{
	constructor() {
		Object.assign(this, this.getConfig());

		let symbol = Symbol.for("model");
		this[symbol] = {}
		this.model = DeepProxy.create(this[symbol], this);
		this.render();
		if(this.components){
			this.initialiseSubComponents();
			Promise.all(this.components).then(() => {
				this.init();
			});
		}
	}

	initialiseSubComponents(){
		if(this.components){
			this.components.forEach((promise) => {
				promise.then(module => {
					let child = new module.default();
					let inputs = child.getConfig().inputs;
					if(inputs){
						inputs.forEach(key => {
							let observable = new Observable(watcher(this, key));
							child[key] = observable;
						});
					}
					child.init();

					let outputs = child.getConfig().outputs;
					if(outputs){
						outputs.forEach(key => {
							let observable = new Observable(watcher(child, key));
							this[key] = observable;
						});
					}
				});
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

	init(){};
}

function watcher(target, key){
	let subscribers = [];
	Object.defineProperty(target, key, { set(newVal){
			subscribers.forEach(s => s.next(newVal));
		}});
	return (subscriber) => {
		subscribers.push(subscriber);
		return {
			unsubscribe: () => {
				subscribers = subscribers.filter(s => s!=subscriber);
			}
		}
	}
}
