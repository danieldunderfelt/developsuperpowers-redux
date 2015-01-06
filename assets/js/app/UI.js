var Geomicons = require('geomicons-open');

class UI {

	constructor() {
		var icons = document.querySelectorAll('.js-icon');
		Geomicons.inject(icons);
	}

	initialize() {

	}
}

module.exports = UI;