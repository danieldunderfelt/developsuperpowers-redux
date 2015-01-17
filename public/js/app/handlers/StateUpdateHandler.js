import Admin from '../admin/Admin'

export default class {

	handle(command) {
		if(Admin.enableEdit()) {

			if(typeof command.mode !== 'undefined') {
				Admin.setEditMode(command.mode)
			}

			if(typeof command.entity !== 'undefined') {
				Admin.setEntity(command.entity)
			}

			if(typeof command.api !== 'undefined') {
				Admin.setApi(command.api)
			}
		}
	}
}