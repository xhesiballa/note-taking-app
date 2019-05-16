import Quill from 'quill/dist/quill.js';
import 'quill/dist/quill.snow.css';
// import katex from 'katex';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

import $ from 'jquery';
import {Component} from "./../lib/index.js";

import template from "./template.html";
import './main.scss';

const config = {
	inputs: ['documentId'],
	selector: 'editor-component',
	template: template, 
};

// window.katex = katex;

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'align': [] }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'header': [false, 6, 5, 4, 3, 2, 1] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  ['link', 'image', 'formula'],

  ['clean']                                         // remove formatting button
];

export default class Editor extends Component {
	constructor(){
		super();
		this.model.edit = false;
	}

	init(){
		this.documentId.subscribe({next:(documentId) => {
			this.model.edit = false;
			let doc = this.loadDocument(documentId);
			if(doc){
				this.model.documentId = doc.id;
				this.model.title = doc.title;
				let deltas = doc.content;
				let converter = new QuillDeltaToHtmlConverter(deltas, {inlineStyles: true});
				$("#html").html(converter.convert());
			}
		}});
	}

	getConfig(){
		return config;
	}

	initialiseListeners(){
		$("#saveButton").click(() => {this.save();});
		$("#editButton").click(() => {this.edit();});
	}

	save(){
		this.model.edit = false;
		this.deltas = this.quill.getContents().ops;
		let converter = new QuillDeltaToHtmlConverter(this.deltas, {inlineStyles: true});
		let html = converter.convert(); 
		this.saveDocument({
			id: this.model.documentId,
			title: this.model.title,
			content: this.deltas
		});
		$("#html").html(html);
	}

	edit(){
		this.model.edit = true;
		this.initialiseEditor();
	}

	initialiseEditor(){
		this.quill = new Quill('#editor', {
			theme: 'snow',
			modules: {
				toolbar: toolbarOptions
			}
		});
		let value = this.loadDocument(this.model.documentId);
		this.quill.setContents(value.content);
	}

	loadDocument(documentId){
		let json = localStorage.getItem("documents");
		let docArray = json?JSON.parse(json):[];
		return docArray.find(doc => doc.id === documentId);
	}

	saveDocument(newDoc){
		let json = localStorage.getItem("documents");
		let docArray = json?JSON.parse(json):[];
		let doc = docArray.find(d => d.id === newDoc.id);
		if(doc){
			doc.content = newDoc.content;
		}else{
			docArray.push(newDoc);
		}
		localStorage.setItem("documents", JSON.stringify(docArray));
	}
}