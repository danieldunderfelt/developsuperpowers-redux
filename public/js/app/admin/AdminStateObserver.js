import Observer from '../lib/Observer'

class AdminStateObserver extends Observer {

	constructor() {
		this.subscribers = {}
		this.object = {}
	}

	setObservable(object) {
		this.object = object
		Object.observe(object, this.notifySubscribers.bind(this))
		return this
	}
}

export default new AdminStateObserver()