import AdminStateObserver from '../AdminStateObserver'
import Modal from './AtomEditorModal'
import AdminBarView from './AdminBarView'
import AdminUI from '../AdminUI'
import Bus from '../../lib/Bus'
import MakeAdminBtnCommand from '../../commands/MakeAdminBtnCommand'
import * as buttons from '../components/buttons'

export default class {

	constructor() {
		this.editorModal = {}
	}

	initialize(editorData) {
		this.setupEditorModal(editorData)
	}

	getEditorData() {
		var contentData = this.editorModal.getData()
		return contentData
	}

	setupEditorModal(data) {
		this.editorModal = new Modal(data.html, "editor", {
			onRemove: this.onModalRemove.bind(this),
			onHide: this.onModalHide.bind(this),
			onShow: this.onModalShow.bind(this)
		})

		AdminStateObserver.subscribe({
			'editEnabled': false
		}, this.editorModal.remove, this.editorModal, 'modalRemove')

		var modalBtnCommand = new MakeAdminBtnCommand(
			buttons.barModalBtn(this.editorModal.show, this.editorModal)
		)

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