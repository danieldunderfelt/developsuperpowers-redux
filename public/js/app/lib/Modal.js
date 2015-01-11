import $ from 'jquery'
import Velocity from 'velocity-animate'

export default class {

	constructor(content, style, callbacks) {
		this.content = content
		this.style = style
		this.callbacks = callbacks
		this.modal = {}

		this.makeModal()
	}

	makeModal() {
		var $modalWindow = $(`<article class="superpowers-modal ${ this.style }"></article>`)
		var $modalClose = $("<button type='button' class='modal-close' id='modalClose'></button>")
		var $contentWrapper = $(`<section class="superpowers-modal-content">${ this.content }</section>`)

		$modalWindow.prepend($modalClose)
		$modalWindow.append($contentWrapper)
		$('body').append($modalWindow)

		this.modal = $modalWindow
		$modalWindow.on('click', '#modalClose', this.modalClose.bind(this))

		this.fireCallback('onCreate')
	}

	show() {
		Velocity(this.modal, 'fadeIn', {duration: 500, }).then( () => {
			this.fireCallback('onShow')
		})
	}

	modalClose(e) {
		e.preventDefault()
		this.hide()
	}

	hide(remove = false) {
		var hideAnim = Velocity(this.modal, 'fadeOut', {duration: 500}).then( () => {
			let callback = remove ? 'onRemove' : 'onHide'
			this.fireCallback(callback)
		})

		if(remove) {
			return hideAnim
		}
	}

	remove() {
		var hideAnim = this.hide(true)
		hideAnim.then( () => {
			this.modal.remove()
		})
	}

	fireCallback(which) {
		if(this.callbacks.hasOwnProperty(which)) {
			this.callbacks[which]()
		}
	}
}