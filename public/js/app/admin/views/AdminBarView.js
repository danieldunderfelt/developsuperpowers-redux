import $ from 'jquery'
import PseudoForm from '../../lib/PseudoForm'

export default class {

	constructor(UI, observer) {
		this.ui = UI
		this.observer = observer
		this.el = $('#adminBar')
		this.currentlyVisible = false
		this.editMode = 'atom'

		this.startDefaultListeners()
		this.registerListeners()
	}

	startDefaultListeners() {
		this.el.on('click', '.admin-btn', this.adminBtnHandler.bind(this))
		this.el.on('click', '#cancel', this.ui.cancelAll.bind(this.ui))
	}

	registerListeners() {
		this.observer.subscribe({
			'editEnabled': true
		}, this.onEnableEdit, this, 'enableAdminBarEdit')

		this.observer.subscribe({
			'editEnabled': false
		}, this.onDisableEdit, this, 'disableAdminBarEdit')
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

	getData() {
		var form = new PseudoForm(`#${this.editMode}EditControls`)
		return form.get()
	}

	setData(data) {
		var form = new PseudoForm(`#${this.editMode}EditControls`)
		form.set(data)
	}

	setCollectionList(list) {
		var placeholder = $('#collectionListPlaceholder') || $('#collectionListSelect')
		var select = $('<select id="collectionListSelect" data-fieldname="collectionId"></select>')
		var collectionsList = JSON.parse(list.collections)

		collectionsList.forEach( (collection) => {
			var $item = $(`<option value="${ collection.id }">${ collection.name }</option>`)
			select.append($item)
		})

		var $noneOption = $("<option value='false'>NONE</option>")
		select.prepend($noneOption)

		placeholder.replaceWith(select)
	}

	newAtomEdit(e) {
		e.preventDefault()
		var url = $(e.currentTarget).attr('href')

		var atomData = [
			{
				'collection': {
					'name': 'testcollection1'
				},
				'order': 1,
				'name': 'testatom' + Date.now(),
				'content': "<p>I'm a test atom! Time: " + Date.now() + "</p>"
			},
			{
				'collection': {
					'name': 'testcollection1'
				},
				'order': 2,
				'name': 'secondtestatom' + Date.now(),
				'content': "<p><strong>I'm the second test atom!</strong> Time: " + Date.now() + "</p>"
			}
		]

		var req = $.post(url, {'atomData' : atomData})
	}
}