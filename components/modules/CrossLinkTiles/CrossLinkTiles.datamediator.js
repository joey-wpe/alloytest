import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlCrossLinkTilesResponseToCrossLinkTiles(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlCrossLinkTilesResponseToCrossLinkTiles: gqlModuleData is undefined');
		return null;
	}
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	const tiles = gqlModuleData.tiles.map((tile) => {
		const parsedTile = {
			title: tile.titleText,
			description: tile.description,
			image: {
				src: tile.image?.mediaItemUrl,
				alt: tile.image?.altText,
			},
		};
		if (tile.actions && tile.actions.length === 1) {
			const firstAction = tile.actions[0];
			const buttonObject = transformToButtonObject(firstAction, 'TertiaryDefault');
			parsedTile.button = buttonObject;
		}
		return parsedTile;
	});

	let crossLinkTilesData = {
		tiles,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return crossLinkTilesData;
}
