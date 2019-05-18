import $ from 'jquery';
import {Component} from "./../lib/index.js";
import template from "./template.html";
import feather from "feather-icons/dist/feather.js";
import './main.scss';

const config = {
	selector: 'sidebar-component',
	template: template, 
	outputs: ['selectedId'],
	inputs: ['_newTitle']
}

export default class SidebarComponent extends Component{
	constructor(){
		super();
		this.model.documents = this.loadDocuments();
	}

	getConfig(){
		return config;
	}

	init(){
		this._newTitle.subscribe({next: (val) => {
			this.model.documents = this.loadDocuments();
		}});
	}

	initialiseListeners(){
		$("#documentList>li>a").click((event)=>{
			let id = $(event.target).data("id");
			this.selectedId = id;
		});

		$("#newDocumentButton").click(()=>{
			let id = this.model.documents.length;
			if(id > 0){
				 id = this.model.documents.map(d => d.id).reduce((a, b) => Math.max(a, b));
			}	
			id++;
			let newDocument = {id: id, title: `untitled${id}`};
			this.model.documents.push(newDocument);
			let doc = this.loadDocuments();
			doc.push(newDocument);
			localStorage.setItem("documents", JSON.stringify(doc));
		})

		feather.replace();
	}

	loadDocuments(){
		let json = localStorage.getItem("documents");
		return json?JSON.parse(json):[];
	}
}

