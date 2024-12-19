import { transformToButtonObject } from '../../../data-mediators/ActionsResponseToButtons';
import { gqlFaqAccordionResponseToFaqAccordion } from '../../modules/FaqAccordion/FaqAccordion.datamediator';
import { splitStringIntoArray } from '../../../wplib/util';
import { mediateUrlPath } from '../../../wplib/urlHelpers';

export function gqlPricingDetailTemplateResponseToPricingDetailTemplate(gqlTemplateData) {
	if (!gqlTemplateData) {
		console.error('ERROR: gqlPricingDetailTemplateResponseToPricingDetailTemplate: gqlTemplateData is undefined');
		return null;
	}

	// gqlResponsePriceCards to PriceCards
	let cards = gqlTemplateData.priceCards?.priceCards?.map((card) => {
		let parsedCard = {
			prehead: {
				text: card.priceCardTitleText,
				color: 'mist',
			},
			subHead: card.priceCardSubTitleText,
			price: `${card.priceCardAmount}/${card.priceCardAmountDetail}`,
			description: card.priceCardCardDescription,
			itemsTitle: 'Highlights',
			items: card.priceCardHighlights ? splitStringIntoArray(card.priceCardHighlights) : null,
		};
		if (card.priceCardActionLink && Object.keys(card.priceCardActionLink).length !== 0) {
			let actionData = {
				adaText: card.priceCardActionAdaText,
				seoText: card.priceCardActionSeoText,
				link: mediateUrlPath(card.priceCardActionLink),
			};
			parsedCard.button = transformToButtonObject(actionData, 'PrimaryDefault');
		}
		return parsedCard;
	});
	let price = {
		imageLogo: {
			src: gqlTemplateData.priceCards?.cardTitleLogo?.mediaItemUrl ?? null,
			alt: gqlTemplateData.priceCards?.cardTitleLogo?.altText,
		},
		title: gqlTemplateData.priceCards.cardTitle,
		description: gqlTemplateData.priceCards.description,
		cards,
		background: {
			type: 'pattern',
			color: 'blue',
		},
	};
	if (gqlTemplateData.priceCards.actions && gqlTemplateData.priceCards.actions.length === 1) {
		const firstAction = gqlTemplateData.priceCards.actions[0];
		price.button = transformToButtonObject(firstAction, 'TertiaryDefault');
	}

	const tableCompare = comparisonChartDataSetter(
		gqlTemplateData.comparisonChart,
		gqlTemplateData.comparisonChartHeader,
		gqlTemplateData.comparisonChartButtons
	);

	let faqAccordionData = gqlFaqAccordionResponseToFaqAccordion(gqlTemplateData.faqsBlock);
	return {
		price,
		tableCompare,
		faqAccordionData,
	};
}

function comparisonChartDataSetter(bodyData, headerData, buttonsData) {
	let tableCompare = {
		table: {
			headTable: {
				type: 'list',
				items: [{ item: headerData.packageHeader }],
			},
			bodies: [
				{
					type: 'check',
					items: [],
				},
				{
					type: 'check',
					items: [{ item: headerData.essentialHeader }],
					buttons: [
						{
							buttonStyle: 'PrimaryDefault',
							buttonText: buttonsData.essentialButtons?.solid?.title ?? null,
							link: mediateUrlPath(buttonsData.essentialButtons?.solid?.url ?? '#'),
						},
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: buttonsData.essentialButtons?.outlined?.title ?? null,
							link: mediateUrlPath(buttonsData.essentialButtons?.outlined?.url ?? '#'),
						},
					],
				},
				{
					type: 'check',
					items: [{ item: headerData.proHeader }],
					buttons: [
						{
							buttonStyle: 'PrimaryDefault',
							buttonText: buttonsData.proButtons?.solid?.title ?? null,
							link: mediateUrlPath(buttonsData.proButtons?.solid?.url ?? '#'),
						},
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: buttonsData.proButtons?.outlined?.title ?? null,
							link: mediateUrlPath(buttonsData.proButtons?.outlined?.url ?? '#'),
						},
					],
				},
				{
					type: 'check',
					items: [{ item: headerData.enterpriseHeader }],
					buttons: [
						{
							buttonStyle: 'PrimaryDefault',
							buttonText: buttonsData.enterpriseButtons?.solid?.title ?? null,
							link: mediateUrlPath(buttonsData.enterpriseButtons?.solid?.url ?? '#'),
						},
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: buttonsData.enterpriseButtons?.outlined?.title ?? null,
							link: mediateUrlPath(buttonsData.enterpriseButtons?.outlined?.url ?? '#'),
						},
					],
				},
			],
		},
	};

	const table = tableCompare.table;

	bodyData?.forEach((column, index) => {
		const head = table.headTable;
		const bodies = table.bodies;
		const { packageGroup, essentialGroup, proGroup, enterpriseGroup } = column;
		const groupArray = [packageGroup, essentialGroup, proGroup, enterpriseGroup];

		for (let i = 0; i <= 3; i++) {
			if (i == 0) {
				head.items.push({ item: groupArray[i].package });
				continue;
			}

			if (groupArray[i].type === 'none') {
				bodies[i].items.push({ item: '' });
				continue;
			}

			if (groupArray[i].type === 'yesno') {
				bodies[i].items.push({ item: groupArray[i].yesNo === 'yes' });
				continue;
			}

			bodies[i].items.push({ item: groupArray[i].text });
		}
	});

	tableCompare.table.bodies.shift();
	return tableCompare;
}
