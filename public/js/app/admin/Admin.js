import AdminUI from './AdminUI'
import Bus from '../lib/Bus'
import AdminStateObserver from './AdminStateObserver'
import AtomEditor from './editors/AtomEditor'

class Admin {

	constructor() {
		// Value properties
		this.state = {
			editEnabled: false,
			editMode: false, // new or edit
			editEntity: null, // atom or collection
			currentApi: null // api endpoint to post data to
		}
		this.handlersPath = 'js/app/admin/handlers/'
		this.editObject = null // if mode is edit, this stores the initial atom data

		// Object references
		this.currentEditor = null // The current editor instance
		this.observer = {}

		// Set those up
		this.bootstrap()
	}

	bootstrap() {
		// Observer is singleton, other classes depend on it being setup, so do that first
		this.observer = AdminStateObserver.setObservable(this.state) // State observer
	}

	initialize() {
		AdminUI.initialize()

		this.observer.subscribe({
			'editEnabled': true
		}, this.initializeEditor, this, 'initEditor')

		this.observer.subscribe({
			'editEnabled': false
		}, this.discardEditor, this, 'discardEditor')
	}

	initializeEditor() {
		if(this.state.editEntity === 'atom') {
			this.currentEditor = new AtomEditor(this.state.editMode)
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
		if(apiUrl !== null && typeof apiUrl !== 'undefined') {
			this.state.currentApi = apiUrl
		}
	}

	getApi() {
		return this.state.currentApi
	}

}

export default new Admin()