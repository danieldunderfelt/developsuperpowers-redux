import Admin from '../admin/Admin'

export default class {

	handle(command) {

		var editObject = {
			id: command.id,
			name: command.name,
			description: command.description,
			content: command.content,
			element: command.element
		}

		Admin.setEditObjectData(editObject)
	}
}