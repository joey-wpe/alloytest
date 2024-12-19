export function transformToBackgroundStructure(gqlModuleData) {
	// console.log(gqlModuleData, 'gqlModuleData');
	let backgroundType = 'solid';
	let backgroundColor = 'blue';
	let backgroundImage = '';

	// new:             backgroundType, backgroundColor, backgroundPattern, backgroundImage
	// white is         color, none, none
	// blaze is         color, blaze,
	// blaze pattern    pattern, "blaze_pattern"

	// console.log('>>> gqlModuleData.backgroundType', gqlModuleData.backgroundType);
	// console.log('>>> gqlModuleData.backgroundColor', gqlModuleData.backgroundColor);
	// console.log('>>> gqlModuleData.backgroundPattern', gqlModuleData.backgroundPattern);

	if (gqlModuleData.backgroundType === 'solid' || gqlModuleData.backgroundType === 'color') {
		backgroundType = 'solid';
		if (
			gqlModuleData.backgroundColor === 'none' ||
			gqlModuleData.backgroundColor === 'white' ||
			gqlModuleData?.backgroundColor === null
		) {
			backgroundColor = 'white';
		} else if (gqlModuleData.backgroundColor === 'blaze') {
			backgroundColor = 'blaze';
		} else if (gqlModuleData.backgroundColor === 'tricentis_blue') {
			backgroundColor = 'blue';
		} else if (gqlModuleData.backgroundColor === 'warp') {
			backgroundColor = 'warp';
		} else {
			console.error(
				'ERROR: transformToBackgroundStructure: backgroundColor is not valid',
				gqlModuleData.backgroundColor
			);
		}
	} else if (gqlModuleData.backgroundType === 'pattern') {
		backgroundType = 'pattern';
		if (gqlModuleData.backgroundPattern === 'blaze_pattern') {
			backgroundColor = 'blaze';
		} else if (gqlModuleData.backgroundPattern === 'tricentis_blue_pattern') {
			backgroundColor = 'blue';
		} else if (gqlModuleData.backgroundPattern === 'warp_pattern') {
			backgroundColor = 'warp';
		} else if (
			gqlModuleData.backgroundPattern === 'light_pattern' ||
			gqlModuleData.backgroundPattern === 'light_gray'
		) {
			backgroundColor = 'light';
		} else if (
			gqlModuleData.backgroundPattern === 'gradient_angel' ||
			gqlModuleData.backgroundPattern === 'rainbow_pattern'
		) {
			backgroundColor = 'rainbow';
		} else {
			console.error('ERROR: transformToBackgroundStructure: pattern is not valid', gqlModuleData.backgroundPattern);
		}
	} else if (gqlModuleData.backgroundType === 'image') {
		backgroundType = 'image';
		backgroundColor = 'blaze';
		backgroundImage = gqlModuleData.backgroundImage?.image?.mediaItemUrl;
	} else {
		console.error('ERROR: transformToBackgroundStructure: backgroundType is not valid', gqlModuleData.backgroundType);
	}

	// console.log('=== backgroundType', backgroundType);
	// console.log('=== backgroundColor', backgroundColor);
	// console.log('=== backgroundImage', backgroundImage);

	return {
		backgroundType,
		backgroundColor,
		backgroundImage,
	};
}
