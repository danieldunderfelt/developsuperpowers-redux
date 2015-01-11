import $ from 'jquery'

export default class {

	constructor(formContainer) {
		this.form = $(formContainer)
	}

	get() {
		var data = {}

		this.form.find('input, textarea, select, .pseudo-input').each( (i, el) => {
			var $ele = $(el)
			if(!$ele.is('.pseudo-input')) {
				data[$ele.data('fieldname')] = $ele.val() === "" ? false : $ele.val()
			}
			else {
				data[$ele.data('fieldname')] = $ele.text() === "" ? false : $ele.text()
			}
		})

		return data
	}

	set(data) {
		for(let dataPoint in data) {
			var formEle = this.form.find(`[data-fieldname="${dataPoint}"]`)
			if(formEle.length > 0) {
				if(!formEle.is('.pseudo-input')) {
					formEle.val(data[dataPoint])
				}
				else {
					formEle.text(data[dataPoint])
				}
			}
		}
	}

	reset() {
		this.form.find('input, textarea, select, .pseudo-input').each( (i, el) => {
			var $ele = $(el)

			if(!$ele.is('.pseudo-input')) {
				$ele.val( $ele.data('default') )
			}
			else {
				$ele.text( $ele.data('default') )
			}
		})
	}
}