import $ from 'jquery'

export default {

	getCollectionSelect(list) {
		var select = $('<select id="collectionListSelect" data-fieldname="collectionId" data-default="false"></select>')
		var collectionsList = JSON.parse(list.collections)

		collectionsList.forEach( (collection) => {
			var $item = $(`<option value="${ collection.id }">${ collection.name }</option>`)
			select.append($item)
		})

		var $noneOption = $("<option value='false'>NONE</option>")
		select.prepend($noneOption)

		return select
	},

	existsOrFalse(obj) {
		var newObj = {}
		for(let key in obj) {
			if(typeof obj[key] !== 'undefined') {
				newObj[key] = obj[key]
			}
			else {
				newObj[key] = false
			}
		}

		return newObj;
	},

	debounce(func, wait, immediate) {
		var timeout
		return function() {
			var context = this, args = arguments
			var later = function() {
				timeout = null
				if (!immediate) func.apply(context, args)
			};
			var callNow = immediate && !timeout
			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
			if (callNow) func.apply(context, args)
		}
	}
}

