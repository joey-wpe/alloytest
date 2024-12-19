import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';

// Takes GraphQL module specific response and turns it in the structure the module wants (see *.gqlresponse.json and *.sampledata.js for input and output examples)
export function gqlFaqAccordionResponseToFaqAccordion(gqlModuleData, hasPadding) {
	// console.log('in >>>>>', gqlModuleData);
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	let faqData = {
		commonHeaderDetails: {
			prehead: gqlModuleData.preheadText,
			preheadType: gqlModuleData.preheadType,
			title: gqlModuleData.titleText,
			titleType: gqlModuleData.titleType,
			description: gqlModuleData.description,
		},
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	faqData.accordionItems = gqlModuleData.faqs.map((faqEntry) => {
		return {
			title: faqEntry.question,
			body: faqEntry.answer,
		};
	});

	// console.log('out >>>>>', faqData);
	return faqData;
}
