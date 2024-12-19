import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { mediateUrlPath } from '../../../wplib/urlHelpers';

export function gqlLogoGroupResponseToLogoGroup(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlLogoGroupResponseToLogoGroup: gqlModuleData is undefined');
		return null;
	}
	let slides = [];
	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);
	if (gqlModuleData.selectionType === 'query' || gqlModuleData.selectionType === 'manual') {
		slides = gqlModuleData.posts?.map((post) => {
			return {
				image_path: post.logoDetails?.logo?.mediaItemUrl,
				alt: post.logoDetails?.logo?.altText,
				url: mediateUrlPath(post.logoDetails?.website),
			};
		});
	} else {
		slides = gqlModuleData.uploads?.map((logo) => {
			return {
				image_path: logo?.image?.mediaItemUrl,
				alt: logo?.image?.altText,
				url: mediateUrlPath(logo?.website),
			};
		});
	}

	let logoGroupData = {
		preHeader: gqlModuleData.preheadText,
		preheadType: gqlModuleData.preheadType,
		heading: gqlModuleData.titleText,
		titleType: gqlModuleData.titleType,
		content: gqlModuleData.description,
		alignment: 'center',
		carouselOrGrid: gqlModuleData.displayStyle === 'slider' ? 'carousel' : 'grid',
		logosPerRow: gqlModuleData.displayStyle === 'slider' ? gqlModuleData.logosPerSlide : gqlModuleData.logosPerGridRow,
		slides,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return logoGroupData;
}
