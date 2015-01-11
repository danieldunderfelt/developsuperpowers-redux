import Modal from './AtomEditorModal'

export default class {

	constructor(adminUI, editorHtml, mode) {
		this.ui = adminUI
		this.editorHtml = editorHtml
		this.mode = mode // Inline or modal
		this.editorModal = {}
		this.inlineEditor = {}
	}

	initialize() {
		if(this.mode === 'modal') {
			this.setupEditorModal()
		}

		if(this.mode === 'inline') {
			this.setupInlineEditing()
		}
	}

	setMode(mode) {
		if(this.mode !== mode) {
			this.mode = mode
			this.initialize()
		}
	}

	getData() {
		var contentData;

		if(this.mode === 'modal') {
			contentData = this.editorModal.getData()
		}
		else {
			contentData = this.inlineEditor.getData()
		}

		return contentData
	}

	/* Inline edit stuff */

	setupInlineEditing() {

	}


	/* Modal stuff */

	setupEditorModal() {
		this.editorModal = new Modal(this.editorHtml, "editor", {
			onRemove: this.onModalRemove.bind(this),
			onHide: this.onModalHide.bind(this),
			onShow: this.onModalShow.bind(this)
		})

		this.ui.observer.subscribe({
			'editEnabled': false
		}, this.editorModal.remove, this.editorModal, 'modalRemove')

		this.ui.views.bar.addAdminButton({
			name: 'reshow-modal-btn',
			class: ['reshow-modal', 'hidden'],
			id: 'reshowModal',
			dataKey: '',
			dataValue: '',
			label: 'Show modal',
			clickHandler: this.editorModal.show,
			handlerContext: this.editorModal
		})

		this.editorModal.show()
	}

	onModalRemove() {
		this.ui.observer.unsubscribe('editEnabled', 'modalRemove')
		this.ui.views.bar.removeAdminButton('reshow-modal-btn')
	}

	onModalHide() {
		this.ui.views.bar.showAdminButton('reshow-modal-btn')
	}

	onModalShow() {
		this.ui.views.bar.hideAdminButton('reshow-modal-btn')
	}
}