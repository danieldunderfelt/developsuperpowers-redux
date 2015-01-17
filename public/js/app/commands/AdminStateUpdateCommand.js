export default class {

	constructor(mode, entity, api) {
		this.handler = 'StateUpdate'
		this.mode = mode
		this.entity = entity
		this.api = api || null
	}
}