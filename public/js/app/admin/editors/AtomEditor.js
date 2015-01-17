import $ from 'jquery'
import Admin from '../Admin'
import AdminUI from '../AdminUI'

export default class {

	constructor(mode) {
		this.mode = mode // new or edit; new triggers modal, edit is inline

		this.controls = {
			saveAtom: this.collectAtomData.bind(this)
		}
	}

	initialize() {

		if(this.mode === 'new') {
			var editorPromise = new Promise(this.getAtomEditor.bind(this))
			editorPromise.then(this.setupNewAtomEditor.bind(this))
		}
	}

	setupNewAtomEditor(data) {
		AdminUI.showAtomEditor(data.html)
		AdminUI.attachControls(this.controls)
	}

	getCollectionList(resolve, reject) {
		var req = $.post(api.collection.list)

		req.success(resolve)
		req.fail(reject)
	}

	getAtomEditor(resolve, reject) {
		var req = $.post(api.atom.edit)

		req.success(resolve)
		req.fail(reject)
	}

	collectAtomData(data) {
		data.content = AdminUI.getEditorData()
		Admin.saveData(data)
	}
}