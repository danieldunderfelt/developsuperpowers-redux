var Geomicons = require('geomicons-open');

class UI {

	constructor() {
		var icons = document.querySelectorAll('.js-icon');

		if(icons.length > 0) {
			Geomicons.inject(icons);
		}
	}

	initialize() {

	}
}

module.exports = UI;