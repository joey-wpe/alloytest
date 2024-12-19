export function navReducer(headerData) {
	headerData['headerMegaMenu'] = null;
	headerData['headerTopData'] = null;
	headerData['languages'] = null;
	headerData['reduced'] = true;
	return headerData;
}

export function footerReducer(footerData) {
	footerData['footerActionBar'] = null;
	footerData['socialMedia'] = null;
	footerData['reduced'] = true;
	return footerData;
}
