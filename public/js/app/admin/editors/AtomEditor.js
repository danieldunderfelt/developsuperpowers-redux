import $ from 'jquery'

export default class {

	constructor(admin, UI, mode) {
		this.admin = admin
		this.ui = UI
		this.mode = mode

		this.controls = {
			submitAtom: this.submitAtomData.bind(this)
		}
	}

	initialize() {
		var collectionPromise = new Promise(this.getCollectionList.bind(this))
		collectionPromise.then(this.ui.views.bar.setCollectionList.bind(this.ui.views.bar))

		if(this.mode === 'new') {
			var editorPromise = new Promise(this.getAtomEditor.bind(this))
			editorPromise.then(this.initAtomEditor.bind(this))
		}
		else {
			this.ui.views.bar.setData(this.admin.editObject)
		}
	}

	initAtomEditor(data) {
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

	submitAtomData(data) {

	}
}