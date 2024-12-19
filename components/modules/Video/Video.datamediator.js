import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonObject, transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlVideoResponseToVideo(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlVideoResponseToVideo: gqlModuleData is undefined');
		return null;
	}
	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}
	const buttonObject = transformToButtonsObject('center', gqlModuleData.actions);
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);
	let video = gqlModuleData.video.map((item) => {
		let parsedItem = {
			title: item.titleText,
			titleType: item.titleType,
			designation: item.description,
			author: item.author,
			mediaContent: {
				video: {
					url: item.videoUrl,
					alt: 'Featured Media',
					thumbnail: item?.image?.mediaItemUrl,
				},
			},
		};
		if (item.actions && item.actions.length === 1) {
			const firstAction = item.actions[0];
			parsedItem.button = transformToButtonObject(firstAction, 'TertiaryDefault');
		}
		return parsedItem;
	});

	let videoData = {
		preHeader: gqlModuleData.preheadText,
		preheadType: gqlModuleData.preheadType,
		heading: gqlModuleData.titleText,
		titleType: gqlModuleData.titleType,
		description: gqlModuleData.description,
		video,
		buttons: buttonObject,
		background: {
			color: backgroundColor,
			type: backgroundType,
			paddings,
		},
	};

	return videoData;
}
