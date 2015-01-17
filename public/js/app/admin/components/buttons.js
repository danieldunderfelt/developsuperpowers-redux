export function barModalBtn(handler, context) {
	return {
		name: 'reshow-modal-btn',
		class: ['reshow-modal', 'hidden'],
		id: 'reshowModal',
		dataKey: '',
		dataValue: '',
		label: 'Show modal',
		clickHandler: handler,
		handlerContext: context
	}
}