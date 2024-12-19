// onBefore example (puppeteer engine)
module.exports = async (page, scenario, vp, isReference) => {
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36.')
	//console.log(await page.evaluate('navigator.userAgent'))
	const testUrl = new URL(scenario.url)

	const blockedDomains = [
		'static.doubleclick.net',
		'securepubads.g.doubleclick.net',
		'tpc.googlesyndication.com',
		//'adserver-us.adtech.advertising.com',
		'c.amazon-adsystem.com',
		'paid.outbrain.com',
		//'images.outbrainimg.com',
		'www.googletagmanager.com',
		'acdn.adnxs.com',
		'tagan.adlightning.com',
		'b-code.liadm.com',
		'connect.facebook.net',
		'tag.bounceexchange.com',
		'jadserve.postrelease.com',
		'ads.adaptv.advertising.com',
		'q017o-jh7o1.ads.tremorhub.com'
	]
	let allowedDomains = [
		'code.jquery.com',
		'jquery.com',
		testUrl.host
	]

	if (typeof scenario.referenceUrl !== "undefined") {
		const referenceUrl = new URL(scenario.referenceUrl)
		allowedDomains.push(referenceUrl.host);
	}

	//turns request interceptor on
	await page.setRequestInterception(true);
	//var allScriptDomains = []
	page.on('request', request => {

		var requestDomain = null;
		var frags = request.url().split('/');
		if (frags.length > 2) {
			requestDomain = frags[2];
		}
		// if (request.resourceType() === 'script' || request.resourceType() === 'xhr') {
		// 	if (!(allScriptDomains.includes(requestDomain))) {
		// 		allScriptDomains.push(requestDomain)	
		// 	}
		// }
		// if ((request.resourceType() === 'script' || request.resourceType() === 'xhr') && blockedDomains.includes(requestDomain)) {
		if ((request.resourceType() === 'script' || request.resourceType() === 'xhr') && !(allowedDomains.includes(requestDomain))) {
			console.log("Blocking: " + requestDomain)
			request.abort();
		}
		else {
			console.log("Loading: " + requestDomain)
			request.continue();
		}
	});
	//console.log(allScriptDomains)
};