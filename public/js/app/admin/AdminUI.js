import $ from 'jquery'

import AdminBarView from './views/AdminBarView'

export default class {

	constructor(admin) {
		this.admin = admin
		this.editMode = false

		this.views = {
			bar: new AdminBarView(this)
		}
	}

	initialize() {
		console.log("Admin UI init")
	}

	setupEdit() {
		var $container = $('.content-container')
		$container.addClass("admin-edit")
	}
}