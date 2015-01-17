import AdminStateObserver from '../AdminStateObserver'
import Modal from './AtomEditorModal'
import AdminBarView from './AdminBarView'
import AdminUI from '../AdminUI'
import Bus from '../../lib/Bus'
import MakeAdminBtnCommand from '../../commands/MakeAdminBtnCommand'
import * as buttons from '../components/buttons'

export default class {

	constructor(editorHtml, mode) {
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

		AdminStateObserver.subscribe({
			'editEnabled': false
		}, this.editorModal.remove, this.editorModal, 'modalRemove')

		var modalBtnCommand = new MakeAdminBtnCommand(buttons.barModalBtn(this.editorModal.show, this.editorModal))

		Bus.execute(modalBtnCommand)
		this.editorModal.show()
	}

	onModalRemove() {
		AdminStateObserver.unsubscribe('editEnabled', 'modalRemove')
		AdminBarView.removeAdminButton('reshow-modal-btn')
	}

	onModalHide() {
		AdminBarView.showAdminButton('reshow-modal-btn')
	}

	onModalShow() {
		AdminBarView.hideAdminButton('reshow-modal-btn')
	}
}