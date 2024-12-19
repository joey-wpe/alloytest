module.exports = async (page, scenario, vp) => {

	await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
	// Disable SVG animations
	await page.evaluate(() => document.querySelector('*').setAttribute('style', 'animation: none !important'));

	// Get the height of the rendered page
	const bodyHandle = await page.$('body');
	const { height } = await bodyHandle.boundingBox();
	await bodyHandle.dispose();

	// Scroll one viewport at a time, pausing to let content load
	const viewportHeight = page.viewport().height;
	let viewportIncr = 0;
	while (viewportIncr + viewportHeight < height) {
		await page.evaluate(_viewportHeight => {
			window.scrollBy(0, _viewportHeight);
		}, viewportHeight);
		await page.waitFor(2000);
		viewportIncr = viewportIncr + viewportHeight;
	}

	// Scroll back to top
	await page.evaluate(_ => {
		window.scrollTo(0, 0);
	});

	// Some extra delay to let images load
	await page.waitFor(100);

	// StagingPilot->clearAllIntervals()
	// await page.evaluate(function () {
	//   for (let i = 1; i < 99999; i++) {
	//     window.clearInterval(i);
	//   }
	// });
};