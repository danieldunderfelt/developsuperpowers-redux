import Geomicons from 'geomicons-open';

export default class {

	constructor() {
		var icons = document.querySelectorAll('.js-icon');

		if(icons.length > 0) {
			Geomicons.inject(icons);
		}
	}

	initialize() {

	}
}