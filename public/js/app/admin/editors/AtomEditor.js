import $ from 'jquery'
import Admin from '../Admin'
import AdminUI from '../AdminUI'
import AdminBarView from '../views/AdminBarView'
import NewAtomEditorView from '../views/NewAtomEditorView'
import InlineAtomEditorView from '../views/InlineAtomEditorView'

export default class {

	constructor(mode) {
		this.mode = mode // new or edit; new triggers modal, edit is inline
		this.editorView = {}
	}

	initialize() {
		if(this.mode === 'new') {
			var editorPromise = new Promise(this.getAtomEditor.bind(this))
			editorPromise.then(data => {
				this.editorView = new NewAtomEditorView()
				this.editorView.initialize(data)
			})
		}

		else if(this.mode === 'edit') {
			this.editorView = new InlineAtomEditorView()
			this.editorView.initialize(Admin.getEditObjectData())
		}

		AdminBarView.setSaveAction(this.collectAtomData.bind(this))
	}

	getAtomEditor(resolve, reject) {
		var req = $.post(api.atom.edit)

		req.success(resolve)
		req.fail(reject)
	}

	collectAtomData(data) {
		data.content = this.editorView.getEditorData()
		Admin.saveData(data)
	}
}