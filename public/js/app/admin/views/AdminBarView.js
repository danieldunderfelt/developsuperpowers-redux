import $ from 'jquery'
import PseudoForm from '../../lib/PseudoForm'
import Helpers from '../../lib/Helpers'

export default class {

	constructor(UI, observer) {
		this.ui = UI
		this.observer = observer
		this.el = $('#adminBar')
		this.currentlyVisible = false
		this.editMode = 'atom'
		this.saveAction = false

		this.startDefaultListeners()
		this.registerListeners()
	}

	startDefaultListeners() {
		this.el.on('click', '.admin-btn', this.adminBtnHandler.bind(this))
		this.el.on('click', '#cancel', this.ui.cancelAll.bind(this.ui))
		this.el.on('click', '#saveCurrent', this.saveBtnAction.bind(this))
	}

	registerListeners() {
		this.observer.subscribe({
			'editEnabled': true
		}, this.onEnableEdit, this, 'enableAdminBarEdit')

		this.observer.subscribe({
			'editEnabled': false
		}, this.onDisableEdit, this, 'disableAdminBarEdit')

		this.observer.subscribe({
			'editMode': 'edit'
		}, this.setEditData, this, 'setAdminBarEditData')

		this.observer.subscribe({
			'editMode': 'new'
		}, this.cleanEditData, this, 'cleanAdminBarEditData')
	}

	addAdminButton(btnData) {
		var btnClasses = btnData.class.join(' ')
		var $btn = $(`<li class="dynamic-btn ${btnData.name}"><button type="button" class="button ${btnClasses}" id="${btnData.id}" data-${btnData.dataKey}="${btnData.dataValue}">${btnData.label}</button></li>`)
		this.el.find('.actions ul').prepend($btn)

		$btn.on('click', btnData.clickHandler.bind(btnData.handlerContext))
	}

	removeAdminButton(name) {
		this.el.find('.actions').find(`.dynamic-btn.${name}`).remove()
	}

	showAdminButton(name) {
		this.el.find('.actions').find(`.dynamic-btn.${name}`).find('button').removeClass('hidden')
	}

	hideAdminButton(name) {
		this.el.find('.actions').find(`.dynamic-btn.${name}`).find('button').addClass('hidden')
	}

	adminBtnHandler(e) {
		e.preventDefault()
		var element = $(e.currentTarget)
		var action = element.data('action').split('.')

		var actionData = {
			mode: action[0], // new or edit
			entity: action[1], // atom or collection
			api: element.attr('href') // endpoint provided by button href
		}

		this.ui.setAdminAction(actionData)
	}

	saveBtnAction(e) {
		e.preventDefault()

		if(this.saveAction !== false) {
			this.saveAction(this.getData())
			this.ui.editingDone()
		}
	}

	onEnableEdit() {
		this.editMode = this.ui.admin.state.editEntity

		this.el.find('.on-edit').removeClass("hidden")
		this.el.find('#' + this.editMode + 'EditControls').removeClass("hidden")
		this.el.find('.on-standby').addClass("hidden")
	}

	onDisableEdit() {
		this.el.find('.on-edit').addClass("hidden")
		this.el.find('.edit-mode').addClass("hidden")
		this.el.find('.on-standby').removeClass("hidden")
	}

	setSaveAction(callback) {
		this.saveAction = callback
	}

	setEditData() {
		var data = this.ui.admin.getEditObjectData()

		if(data !== null) {
			this.setData(data)
		}
	}

	cleanEditData() {
		var form = new PseudoForm(`#${this.editMode}EditControls`)
		form.reset()
		this.removeModal()
	}

	getData() {
		var form = new PseudoForm(`#${this.editMode}EditControls`)
		return form.get()
	}

	setData(data) {
		var form = new PseudoForm(`#${this.editMode}EditControls`)
		form.set(data)
	}
}