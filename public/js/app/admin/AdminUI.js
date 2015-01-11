import $ from 'jquery'
import AdminBarView from './views/AdminBarView'
import AtomEditorView from './views/AtomEditorView'

export default class {

	constructor(admin, stateObserver) {
		this.admin = admin
		this.observer = stateObserver
		this.editorControls = {}

		this.views = {
			bar: new AdminBarView(this, stateObserver)
		}
	}

	initialize() {
		this.observer.subscribe({
			'editEnabled': false
		}, this.resetUI, this, 'resetAdminUI')

		$('.container').on('dblclick', '.superpowers-atom', this.startAtomInlineEdit.bind(this))
	}

	startAtomInlineEdit(e) {
		e.preventDefault()
		var atomEle = $(e.currentTarget)

		var action = this.makeAdminAction('edit', 'atom')
		var editObject = this.makeEditObject(atomEle)

		this.admin.setEditObjectData(editObject)
		this.setAdminAction(action)
	}

	setAdminAction(action) {
		if(this.admin.enableEdit()) {
			this.admin.setEditMode(action.mode)
			this.admin.setEntity(action.entity)
			this.admin.setApi(action.api)
		}
	}

	showAtomEditor(data) {
		this.views.atomEditor = new AtomEditorView(this, data, 'modal')
		this.views.atomEditor.initialize()
	}

	attachControls(controls) {
		this.editorControls = controls
		this.views.bar.setSaveAction(this.editorControls.saveAtom)
	}

	getEditorData() {
		return this.views.atomEditor.getData()
	}

	makeAdminAction(mode, type) {
		return {
			mode: mode,
			entity: type,
			api: api[type].save
		}
	}

	makeEditObject(el) {
		return {
			id: el.data('atomid'),
			name: el.data('atomname'),
			description: el.data('atomdescription'),
			content: el.html()
		}
	}

	editingDone() {
		this.admin.disableEdit()
	}

	resetUI() {
		if(!this.admin.disableEdit()) {
			this.admin.setEditMode(false)
			this.admin.setEntity(null)
			this.admin.setApi(null)
			this.admin.setEditObjectData({})
			this.admin.currentEditor = null
		}
	}

	cancelAll(e) {
		if(typeof e !== 'undefined') {
			e.preventDefault()
		}

		this.admin.disableEdit()
	}
}