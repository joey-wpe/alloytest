import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { mediateUrlPath } from '../../../wplib/urlHelpers';

export function gqlComparisonChartResponseToComparisonChart(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlComparisonChartResponseToComparisonChart: gqlModuleData is undefined');
		return null;
	}

	let paddings = {
		verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : 'default',
		bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : 'default',
	};

	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);

	function comparisonChartDataSetter(tabData, bodyData, headerData, buttonsData) {
		let tableCompare = {
			table: {
				tabs: {
					type: 'list',
					items: tabData?.map(tab => tab.tabTitle),
				},
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

	const tableCompare = comparisonChartDataSetter(
		gqlModuleData.headerTabs,
		gqlModuleData.comparisonChart,
		gqlModuleData.comparisonChartHeader,
		gqlModuleData.comparisonChartButtons
	);

	let comparisonChartData = {
		additionalClasses: gqlModuleData.additionalClasses,
		anchor: gqlModuleData.anchor,
		tableCompare: tableCompare,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return comparisonChartData;
}
