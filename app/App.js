import {Component} from './lib/index.js';
import template from './template.html';

const config = {
	selector: 'main-component',
	template: template, 
	components: [import('./header'), import('./sidebar'), import('./editor')]
};

export default class App extends Component {
	constructor(){
		super();
	}

	getConfig(){
		return config;
	}

	init(){
		this.selectedId.subscribe({next: (val)=>{this.documentId = val;}});
		this.newTitle.subscribe({next: (val)=>{this._newTitle = val}});
	}
}
