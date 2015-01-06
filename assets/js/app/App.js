var UI = require('./UI');

class App {

	constructor() {
		this.ui = new UI();
	}

	initialize() {
		this.ui.initialize();
	}
}

module.exports = App;