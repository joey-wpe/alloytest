import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';

export function disruptorSocialMediaResponseToDisruptorSocialMedia(moduleData) {
	if (!moduleData) {
		console.error('ERROR: disruptorSocialMediaResponseToDisruptorSocialMedia: moduleData is undefined');
		return null;
	}

	// console.log('---------- Disruptor REST response -------------');
	// console.log(moduleData);
	// console.log('---------------------------------------------------');

	// uniform way of handling background info from a module
	const { color, type, pattern } = moduleData.background;
	const gqlModuleBackground = {
		backgroundType: type,
		backgroundColor: color,
		backgroundPattern: pattern,
		backgroundImage: null,
	};

	const { backgroundType, backgroundColor, backgroundImage } = transformToBackgroundStructure(gqlModuleBackground);

	let DisruptorData = {
		title: moduleData.title,
		description: moduleData.content,
		socials: moduleData.global_social_channels?.map((social) => {
			return {
				type: social.social_type,
				link: social.website,
				target: social.target || '_blank',
			};
		}),
	};
	if (backgroundType === 'image') {
		DisruptorData.background = {
			type: backgroundType,
			desktopBackgroundImage: backgroundImage,
			color: backgroundColor,
			colorScheme: moduleData?.backgroundImage?.colorScheme,
		};
	} else {
		DisruptorData.background = {
			type: backgroundType,
			color: backgroundColor,
		};
	}

	return DisruptorData;
}
