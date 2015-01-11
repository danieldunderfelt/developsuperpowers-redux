import $ from 'jquery'

export default class {

	constructor(admin, UI, mode) {
		this.admin = admin
		this.ui = UI
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
		this.ui.showAtomEditor(data.html)
		this.ui.attachControls(this.controls)
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
		data.content = this.ui.getEditorData()
		this.admin.saveData(data)
	}
}