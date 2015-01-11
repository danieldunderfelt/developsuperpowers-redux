import AdminUI from './AdminUI'
import Observer from '../lib/ObjectSubscribe'
import AtomEditor from './editors/AtomEditor'

export default class {

	constructor() {
		this.state = {
			editEnabled: false,
			editMode: false, // new or edit
			editEntity: null, // atom or collection
			currentApi: null // api endpoint to post data to
		}

		this.editObject = null // if mode is edit, this stores the initial atom data

		this.observer = new Observer(this.state) // State observer
		this.ui = new AdminUI(this, this.observer) // Global admin UI functionality

		this.currentEditor = null // The current editor instance
	}

	initialize() {
		this.ui.initialize()

		this.observer.subscribe({
			'editEnabled': true
		}, this.initializeEditor, this, 'initEditor')

		this.observer.subscribe({
			'editEnabled': false
		}, this.discardEditor, this, 'discardEditor')
	}

	initializeEditor() {
		if(this.state.editEntity === 'atom') {
			this.currentEditor = new AtomEditor(this, this.ui, this.state.editMode)
		}

		this.currentEditor.initialize()
	}

	discardEditor() {
		this.currentEditor = null
	}

	saveData(data) {
		var req = $.post(this.state.currentApi, {atomData: data})

		req.success(this.saveSuccess.bind(this))
		req.fail(this.saveFail.bind(this))
	}

	saveSuccess(response) {
		console.log(response)
	}

	saveFail(response) {
		console.error(response)
	}


	/*
	 *	State getters and setters
	 */

	enableEdit() {
		if(!this.state.editEnabled) {
			this.state.editEnabled = true
		}

		return this.state.editEnabled
	}

	disableEdit(force = false) {
		if(this.state.editEnabled || force === true) {
			this.state.editEnabled = false
		}

		return this.state.editEnabled
	}

	setEditObjectData(data) {
		this.editObject = data
	}

	getEditObjectData(data) {
		return this.editObject
	}

	setEditMode(mode) {
		this.state.editMode = mode
	}

	getEditMode() {
		return this.state.editMode
	}

	setEntity(entity) {
		this.state.editEntity = entity
	}

	getEntity() {
		return this.state.editEntity
	}

	setApi(apiUrl) {
		this.state.currentApi = apiUrl
	}

	getApi() {
		return this.state.currentApi
	}

}