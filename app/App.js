import {Component} from './lib/index.js';
import template from './template.html';

const config = {
	selector: 'main-component',
	template: template, 
	components: [import('./header/index.js'), import('./sidebar')]
};

export default class App extends Component {
	constructor(){
		super();
		this.model.message = 'Main Component';
	}

	getConfig(){
		return config;
	}
}
