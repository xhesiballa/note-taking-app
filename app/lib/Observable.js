export default class Observable{
	constructor(subscribe){
		this._subscribe = subscribe;
	}

	subscribe(observer) {
		return this._subscribe(observer);
	}
}