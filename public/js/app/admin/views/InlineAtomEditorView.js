import $ from 'jquery'
import AdminStateObserver from '../AdminStateObserver'

export default class {

	constructor() {
		this.ele = null
	}

	initialize(atomData) {
		AdminStateObserver.subscribe({
			'editEnabled': false
		}, this.disposeEditor, this, 'disposeInlineEditor')

		this.setupInlineTextarea(atomData)
	}

	setupInlineTextarea(atomData) {
		this.ele = atomData.element
		this.ele.attr('contenteditable', true)
		this.ele.addClass("edit-active")
		this.ele.text(this.ele.html()) // Doing this FEELS weird... but I'm comfortable with it :)
	}

	disposeEditor() {
		this.ele.attr('contenteditable', false)
		this.ele.removeClass('edit-active')
		this.ele.html(this.ele.text()) // Ditto
	}

	getEditorData() {
		return this.ele.html()
	}
}