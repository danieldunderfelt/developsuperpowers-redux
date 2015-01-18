import $ from 'jquery'
import Admin from '../Admin'
import AdminUI from '../AdminUI'
import NewAtomEditorView from '../views/NewAtomEditorView'
import InlineAtomEditorView from '../views/InlineAtomEditorView'

export default class {

	constructor(mode) {
		this.mode = mode // new or edit; new triggers modal, edit is inline
		this.editorView = {}

		this.controls = {
			saveAtom: this.collectAtomData.bind(this)
		}
	}

	initialize() {
		if(this.mode === 'new') {
			var editorPromise = new Promise(this.getAtomEditor.bind(this))
			editorPromise.then(this.setupNewAtomEditor.bind(this))
		}
		else if(this.mode === 'edit') {
			this.setupInlineAtomEditor()
		}
	}

	setupNewAtomEditor(data) {
		this.editorView = new NewAtomEditorView()
		this.editorView.initialize(data)

		AdminUI.attachControls(this.controls)
	}

	setupInlineAtomEditor() {
		this.editorView = new InlineAtomEditorView()
		this.editorView.initialize(Admin.getEditObjectData())

		AdminUI.attachControls(this.controls)
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