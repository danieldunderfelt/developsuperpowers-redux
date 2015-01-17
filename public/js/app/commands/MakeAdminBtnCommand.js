export default class {

	constructor(data) {
		this.handler = 'SetAdminBtn'
		for(var btnProp in data) {
			this[btnProp] = data[btnProp]
		}
	}
}