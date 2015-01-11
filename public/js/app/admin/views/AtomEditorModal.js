import Modal from '../../lib/Modal'
import $ from 'jquery'

export default class extends Modal {

	constructor(content, style, callbacks) {
		super(content, style, callbacks)
		this.textarea = $('#atomEdit')
	}

	getData() {
		return this.textarea.html()
	}
}