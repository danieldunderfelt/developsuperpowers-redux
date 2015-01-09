import $ from 'jquery'
import widgets from '../WidgetBuilder'

export default class {

	constructor(UI) {
		this.ui = UI
		this.el = $('#adminBar')

		this.startDefaultListeners()
	}

	startDefaultListeners() {
		this.el.on('click', '#newAtom', this.newAtomEdit.bind(this))
	}

	newAtomEdit(e) {
		e.preventDefault()
		var url = $(e.currentTarget).attr('href')

		var atomData = [
			{
				'collection': {
					'name': 'testcollection'
				},
				'order': 1,
				'name': 'testatom' + Date.now(),
				'content': "<p>I'm a test atom! Time: " + Date.now() + "</p>"
			},
			{
				'collection': {
					'name': 'testcollection'
				},
				'order': 2,
				'name': 'secondtestatom' + Date.now(),
				'content': "<p><strong>I'm the second test atom!</strong> Time: " + Date.now() + "</p>"
			}
		]

		var req = $.post(url, {'atomData' : atomData})
	}
}