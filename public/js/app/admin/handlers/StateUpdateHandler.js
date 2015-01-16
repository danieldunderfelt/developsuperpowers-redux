export default class {

	constructor(admin) {
		this.admin = admin
	}

	handle(command) {
		if(this.admin.enableEdit()) {

			if(typeof command.mode !== 'undefined') {
				this.admin.setEditMode(command.mode)
			}

			if(typeof command.entity !== 'undefined') {
				this.admin.setEntity(command.entity)
			}

			if(typeof command.api !== 'undefined') {
				this.admin.setApi(command.api)
			}
		}
	}
}