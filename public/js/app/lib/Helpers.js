import $ from 'jquery'

export default {

	getCollectionSelect: function(list) {
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
	existsOrFalse: function(obj) {
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
	}
}