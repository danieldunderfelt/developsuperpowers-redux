import $ from 'jquery'
import AdminStateObserver from './AdminStateObserver'
import Bus from '../lib/Bus'
import StateUpdateCommand from '../commands/AdminStateUpdateCommand'
import EditObjectCommand from '../commands/EditObjectCommand'
import AdminBarView from './views/AdminBarView'
import AtomEditorView from './views/AtomEditorView'
import Admin from './Admin'

class AdminUI {

	constructor() {
		this.editorControls = {}
		this.atomEditor = {}
	}

	initialize() {
		AdminStateObserver.subscribe({
			'editEnabled': false
		}, this.resetUI, this, 'resetAdminUI')

		$('.container').on('dblclick', '.superpowers-atom', this.startAtomInlineEdit.bind(this))
	}

	startAtomInlineEdit(e) {
		e.preventDefault()
		var atomEle = $(e.currentTarget)

		var action = new StateUpdateCommand('edit', 'atom')

		var editObject = new EditObjectCommand(
			atomEle.data('atomid'),
			atomEle.data('atomname'),
			atomEle.data('atomdescription'),
			atomEle.html()
		)

		Bus.execute(editObject)
		Bus.execute(action) // This activates editing, so setup the data the edit classes need beforehand
	}

	showAtomEditor(data) {
		this.atomEditor = new AtomEditorView(data, 'modal')
		this.atomEditor.initialize()
	}

	attachControls(controls) {
		this.editorControls = controls
		AdminBarView.setSaveAction(this.editorControls.saveAtom)
	}

	getEditorData() {
		return this.views.atomEditor.getData()
	}

	editingDone() {
		Admin.disableEdit()
	}

	resetUI() {
		if(!Admin.disableEdit()) {
			Admin.setEditMode(false)
			Admin.setEntity(null)
			Admin.setApi(null)
			Admin.setEditObjectData({})
			Admin.currentEditor = null
		}
	}

	cancelAll(e) {
		if(typeof e !== 'undefined') {
			e.preventDefault()
		}

		Admin.disableEdit()
	}
}

export default new AdminUI()