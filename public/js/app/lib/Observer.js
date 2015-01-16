export default class {

	subscribe(keys, callback, context, bindingName) {
		for(let key in keys) {
			let val = keys[key]

			if(!this.subscribers.hasOwnProperty(key)) {
				this.subscribers[key] = []
			}

			this.subscribers[key].push({
				name: bindingName,
				callback: callback,
				context: context || this,
				onValue: val
			})
		}
	}

	unsubscribe(key, binding) {
		if(this.subscribers.hasOwnProperty(key)) {
			this.subscribers[key].forEach( (subscriber, i, subsArray) => {
				if(subscriber.name === binding) {
					subsArray.splice(i, 1)
				}
			})
		}
	}

	notifySubscribers(change) {
		change.forEach( (state) => {
			var stateKey = state.name
			var currentStateValue = this.object[stateKey]
			var oldValue = state.oldValue

			if(this.subscribers.hasOwnProperty(stateKey)) {
				this.subscribers[stateKey].forEach( (listener) => {
					if(listener.onValue !== '*' && listener.onValue !== currentStateValue) {
						return false
					}
					listener.callback.call(listener.context, currentStateValue, oldValue, stateKey)
				})
			}
		})
	}
}