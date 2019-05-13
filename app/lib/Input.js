import * as DeepProxy from './DeepProxy.js';
import Observable from './Observable.js';

export default class Input{
	constructor(){
		let targetSymbol = Symbol.for("inputTarget");
		this[targetSymbol] = {};
		let proxySymbol = Symbol.for("proxy");
		this[proxySymbol] = DeepProxy.create(this[targetSymbol], this, true);
		this.subscribers = [];
		this.observable = new Observable((subscriber) => {
			this.subscribers.push(subscriber);
			return {unsubscribe: () => {
				this.subscribers = this.subscribers.filter(_subscriber =>  _subscriber != subscriber);
			}}
		})
	}

	getWrapper(){
		let proxySymbol = Symbol.for("proxy");
		return this[proxySymbol];
	}

	set(target, key, value, receiver) {
		this.subscribers.forEach(sub => sub.next(target));
	}

	getObservable(){
		return this.observable;
	}
}
