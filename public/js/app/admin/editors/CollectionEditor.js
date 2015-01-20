import Admin from '../Admin'
import AdminBarView from '../views/AdminBarView'

export default class {

	constructor() {
		AdminBarView.setSaveAction(this.saveCollectionData.bind(this))
	}

	saveCollectionData(data) {
		Admin.saveData(data)
	}
}