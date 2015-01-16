class Bus {

	constructor() {
		this.controller = {}
	}

	setController(controller) {
		this.controller = controller
	}

	execute(command) {
		System.import('js/app/admin/handlers/'+ command.handler +'Handler')
		.then(imported => {
			var handlerInstance = new imported.default(this.controller)
			handlerInstance.handle(command)
		})
	}

	registerHandler(name, handler) {
		this.handlers[name] = handler
	}
}

export default new Bus()