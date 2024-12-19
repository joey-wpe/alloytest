import { transformToButtonsObject } from './ActionsResponseToButtons';
import { transformToBackgroundStructure } from './BackgroundResponseToBackground';
import { parseFormFields } from './formFieldParser';

export function isMastheadNone(pageHeader) {
	return pageHeader.heroType === 'none';
}

export function isMasthead(pageHeader) {
	return pageHeader.heroType === 'default';
}

export function isMastheadMinimal(pageHeader) {
	return pageHeader.heroType === 'minimal';
}

export function heroToMasthead(t, pageHeader, page) {
	const tempBackgroundDefinition = {
		backgroundType: pageHeader?.hero?.defaultHeroBackgroundType,
		backgroundColor: pageHeader?.hero?.defaultHeroBackgroundColor,
		backgroundPattern: pageHeader?.hero?.defaultHeroBackgroundPattern,
	};

	const { backgroundType, backgroundColor } = transformToBackgroundStructure(tempBackgroundDefinition);

	var buttons = [];
	if (pageHeader?.hero?.defaultHeroActions) {
		const buttonsDefinition = transformToButtonsObject('left', pageHeader?.hero?.defaultHeroActions, 'button--default');
		buttons = buttonsDefinition.buttons;
	}

	let mastheadData = {
		prehead: {
			text: pageHeader?.hero?.defaultHeroPreheadText ?? '',
			Tag: pageHeader?.hero?.defaultHeroPreheadType ?? 'default',
		},
		preheadLogo:
			(pageHeader?.hero?.defaultHeroPreheadLogo && {
				src: pageHeader?.hero?.defaultHeroPreheadLogo?.mediaItemUrl,
				alt: pageHeader?.hero?.defaultHeroPreheadLogo?.alt,
			}) ??
			null,
		title: {
			text: pageHeader?.hero?.defaultHeroTitleText ?? '',
			Tag: pageHeader?.hero?.defaultHeroTitleType ?? 'default',
		},
		description: {
			text: pageHeader?.hero?.defaultHeroDescription,
			Tag: 'p',
		},
		action: {
			alignment: 'left',
			buttons: buttons,
		},
		background: {
			type: backgroundType,
			color: backgroundColor,
			isPriorityImage: true, // prefetch all masthead images as they should be above the fold
		},
		postTypeTerms: page?.postTypeTerms ?? null,
	};

	// handle the various media types
	if (pageHeader?.hero?.defaultHeroMediaMediaType === 'image') {
		mastheadData.mediaContent = {
			image: {
				src: pageHeader?.hero?.defaultHeroMediaImage?.mediaItemUrl ?? '',
				alt: pageHeader?.hero?.defaultHeroMediaImage?.altText ?? '',
			},
		};
	} else if (pageHeader?.hero?.defaultHeroMediaMediaType === 'embed') {
		mastheadData.mediaContent = {
			video: {
				url: pageHeader?.hero?.defaultHeroMediaVideoEmbed,
				thumbnail: pageHeader?.hero?.defaultHeroMediaVideoOverlayImage?.mediaItemUrl,
			},
		};
	} else if (pageHeader?.hero?.defaultHeroMediaMediaType === 'post_image') {
		mastheadData.mediaContent = {
			image: {
				src: page?.featuredImage?.node?.mediaItemUrl ?? '',
				alt: page?.featuredImage?.node?.altText ?? '',
			},
		};
	} else if (pageHeader?.hero?.defaultHeroMediaMediaType === 'form') {
		const formData = parseFormFields(t, pageHeader.hero.defaultHeroMediaFormGroup);
		mastheadData.mediaContent = {
			form: formData,
		};
	} else if (pageHeader?.hero?.defaultHeroMediaMediaType === 'none') {
		// do nothing
	} else {
		console.warn(
			'[PageHeaderToMastheadsMediator.js] - heroToMasthead() - media type not supported',
			pageHeader?.hero?.defaultHeroMediaMediaType
		);
	}

	return mastheadData;
}

export function heroMinimalToMastheadMinimal(pageHeader) {
	let tempBackgroundDefinition = {
		backgroundType: pageHeader?.heroMinimal?.backgroundType,
		backgroundColor: pageHeader?.heroMinimal?.backgroundColor,
		backgroundPattern: pageHeader?.heroMinimal?.backgroundPattern,
	};
	if (pageHeader?.heroMinimal.backgroundImage) {
		tempBackgroundDefinition.backgroundImage = {
			image: {
				mediaItemUrl: pageHeader?.heroMinimal?.backgroundImage?.image?.mediaItemUrl,
			},
		};
	}
	const { backgroundType, backgroundColor, backgroundImage } = transformToBackgroundStructure(tempBackgroundDefinition);

	let mastheadData = {
		prehead: pageHeader?.heroMinimal?.preheadText ?? '',
		preheadType: pageHeader?.heroMinimal?.preheadType ?? 'default',
		title: pageHeader?.heroMinimal?.titleText ?? '',
		titleType: pageHeader?.heroMinimal?.titleType ?? 'default',
		description: pageHeader?.heroMinimal?.description,
		background: {
			type: backgroundType,
			color: backgroundColor,
			desktopBackgroundImage: backgroundImage,
			isPriorityImage: true, // prefetch all masthead images as they should be above the fold
		},
	};

	return mastheadData;
}
