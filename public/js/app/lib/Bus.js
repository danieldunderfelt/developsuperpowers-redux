class Bus {

	execute(command) {
		System.import('js/app/handlers/' + command.handler +'Handler')
		.then(imported => {
			var handlerInstance = new imported.default()
			handlerInstance.handle(command)
		})
		.catch(error => {
			console.error(error)
		})
	}
}

export default new Bus()