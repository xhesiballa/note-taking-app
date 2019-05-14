import {Component} from "./../lib/index.js";
import template from "./template.html";
import './main.scss';

const config = {
	selector: 'header-component',
	template: template, 
};

export default class HeaderComponent extends Component{
	constructor(){
		super();
		this.model.user = {name: 'Xhesi', role: 'Developer'};
	}

	getConfig(){
		return config;
	}
}
