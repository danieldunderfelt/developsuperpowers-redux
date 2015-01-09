import UI from './global/UI'
import Auth from './admin/Auth'
import Admin from './admin/Admin'

export default class {

	constructor() {
		this.ui = new UI()
		this.admin = {}
	}

	initialize() {
		this.ui.initialize()
		this.initAdmin();
	}

	initAdmin() {
		var adminLoad = new Promise(Auth.getAuthStatus)
		adminLoad.then(() => {
			this.admin = new Admin()
			this.admin.initialize()
		})
	}
}