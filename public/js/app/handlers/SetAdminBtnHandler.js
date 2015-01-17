import AdminBarView from '../admin/views/AdminBarView'

export default class {

	handle(command) {
		AdminBarView.addAdminButton(command)
	}
}