import {Component} from "./../lib/index.js";
import template from "./template.html";
import feather from "feather-icons/dist/feather.js";
import './main.scss';

const config = {
	selector: 'sidebar-component',
	template: template, 
};

export default class SidebarComponent extends Component{
	constructor(){
		super();
		feather.replace();
	}

	getConfig(){
		return config;
	}
}

