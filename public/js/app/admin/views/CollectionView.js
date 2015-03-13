import $ from 'jquery'
import StateUpdateCommand from '../../commands/AdminStateUpdateCommand'
import Bus from '../../lib/Bus'
import AdminStateObserver from '../AdminStateObserver'
import _ from 'lodash'

class CollectionView {

	constructor() {
		this.el = $('#currentCollection')
		this.atoms = this.el.find('.superpowers-atom')
		this.btnsActive = false
		this.editActive = false
		this.initialize()
	}

	initialize() {
		this.startListeners()
	}

	startListeners() {
		this.el.on('mouseover', this.onHover.bind(this))
		this.el.on('mouseleave', this.exitHover.bind(this))

		$('#addAtom').on('click', this.addAtom.bind(this))
	}

	addAtom(e) {
		e.preventDefault()
		this.editActive = true
		this.removeUIBtns()

		//var stateUpdate = new StateUpdateCommand('addAtom', 'addAtom', )
	}

	onHover(e) {
		if(this.atoms.length > 0 && !this.editActive) {
			this.hoverAction(e)
		}
		else if(this.atoms.length === 0 && !this.btnsActive && !this.editActive) {
			this.showAtomAddBtn()
		}
	}

	hoverAction(e) {
		let atom = this.getAtomByMousePos(e)
		let pos = e.originalEvent.movementY > 0 ? "after" : "before"
		this.showAtomAddBtn(pos, atom)
	}

	getAtomByMousePos(e) {
		var ele = $(document.elementFromPoint(e.clientX, e.clientY)).parents('.superpowers-atom')
		return ele.length > 0 ? ele : null
	}

	exitHover(e) {
		this.btnsActive = false
		this.removeUIBtns()
	}

	showAtomAddBtn(pos, atom) {
		this.btnsActive = true

		var btn = $('#addAtom').addClass("active")

		if(atom !== null && atom.length > 0) {
			atom[pos](btn)
		}
	}

	removeUIBtns() {
		$('#addAtom').removeClass("active")
	}
}

export default new CollectionView()