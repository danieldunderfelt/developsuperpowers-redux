import $ from 'jquery'
import AdminStateObserver from './AdminStateObserver'
import Bus from '../lib/Bus'
import StateUpdateCommand from '../commands/AdminStateUpdateCommand'
import EditObjectCommand from '../commands/EditObjectCommand'
import AdminBarView from './views/AdminBarView'
import Admin from './Admin'

class AdminUI {

	constructor() {
		this.saveAction = {}
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

		var action = new StateUpdateCommand('edit', 'atom', api.atom.save)

		var editObject = new EditObjectCommand(
			atomEle.data('atomid'),
			atomEle.data('atomname'),
			atomEle.data('atomdescription'),
			atomEle.html(),
			atomEle
		)

		Bus.execute(editObject)
		Bus.execute(action) // This activates editing, so setup the data the edit classes need beforehand
	}

	editingDone() {
		Admin.disableEdit()
	}

	resetUI() {
		if(!Admin.disableEdit()) { // If this is false, editing is disabled and we can proceed
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

export default new AdminUI() // This is a singleton