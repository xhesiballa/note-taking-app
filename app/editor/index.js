import Quill from 'quill/dist/quill.js';
import 'quill/dist/quill.snow.css';
import katex from 'katex';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

import $ from 'jquery';
import {Component} from "./../lib/index.js";

import template from "./template.html";
import './main.scss';

const config = {
	selector: 'editor-component',
	template: template, 
};

window.katex = katex;
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['image', 'formula'],

  ['clean']                                         // remove formatting button
];

export default class Editor extends Component {
	constructor(){
		super();
		this.model.title = "Oscal19";
		this.model.edit = false;
	}

	getConfig(){
		return config;
	}

	save(){
		this.model.edit = false;
		this.deltas = this.quill.getContents().ops;
		this.converter = new QuillDeltaToHtmlConverter(this.deltas, {inlineStyles: true});
		let html = this.converter.convert(); 
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
		this.quill.getContents(this.deltas);
	}

	initialiseListeners(){
		$("#saveButton").click(() => {this.save();});
		$("#editButton").click(() => {this.edit();});
	}
}