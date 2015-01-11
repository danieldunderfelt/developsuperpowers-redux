import Modal from '../../lib/Modal'

export default class {

	constructor(adminUI, editorHtml, mode) {
		this.ui = adminUI
		this.editorHtml = editorHtml
		this.mode = mode // Inline or modal
	}

	initialize() {
		if(this.mode === 'modal') {
			var editorModal = new Modal(this.editorHtml, "editor", {
				onRemove: this.onModalRemove.bind(this),
				onHide: this.onModalHide.bind(this)
			})

			this.ui.observer.subscribe({
				'editEnabled': false
			}, editorModal.remove, editorModal, 'modalRemove')

			editorModal.show()
		}
	}

	setMode(mode) {
		if(this.mode !== mode) {
			this.mode = mode
			this.initialize()
		}
	}

	onModalRemove() {
		this.ui.observer.unsubscribe('editEnabled', 'modalRemove')
	}

	onModalHide() {
		console.log('modal hidden :/')
	}
}