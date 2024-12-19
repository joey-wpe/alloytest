import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';
import { mediateUrlPath } from '../../../wplib/urlHelpers';

export function gqlResourceGridResponseToResourceGrid(t, gqlModuleData, resourcesQueryData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlResourceGridResponseToResourceGrid: gqlModuleData is undefined');
		return null;
	}
	const placeholderImageUri = '/img/resource-placeholder.png';

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);

	let posts = [];
	if (gqlModuleData?.selectionMethod === 'query' && resourcesQueryData) {
		switch (gqlModuleData?.allowedTypes) {
			case 'case_study':
				posts = resourcesQueryData[2]?.nodes;
				break;
			case 'news':
				posts = resourcesQueryData[3]?.nodes;
				break;
			case 'partner':
				posts = resourcesQueryData[1]?.nodes;
				break;
			case 'resource':
				posts = resourcesQueryData[0]?.nodes;
				break;
			case 'post':
				posts = resourcesQueryData[5]?.nodes;
				break;
			case 'learn':
				posts = resourcesQueryData[6]?.nodes;
				break;
			default:
				posts = [];
				break;
		}
	} else {
		posts = gqlModuleData.posts;
	}

	var items = [];
	if (posts) {
		items = posts.map((post) => {
			let url = post.url ?? post?.uri ?? '';
			if (post.__typename === 'News' && post.templateNews?.externalResource === true) {
				url = post.templateNews.urlOfResource;
			}
			// console.log('RG: post', post);
			// TODO:: prehead is not populating for case studies
			let parsedData = {
				title: post.title,
				description: post.excerpt,
				prehead: post.type,
				uri: mediateUrlPath(url),
				resourceType: post.resourceTypes?.nodes.length ? post.resourceTypes?.nodes[0].name : null,
			};

			let image;
			const defaultFeaturedImg = post?.featuredImage?.node?.mediaItemUrl ?? post?.featuredImage;

			// Check if the post has the correct default image when no featured image is provided
			const defaultImgRegex = /\/default\.(svg|png)$/;
			const isDefaultImage = post.__typename === 'post' && defaultImgRegex.test(defaultFeaturedImg);
			if (isDefaultImage || !defaultFeaturedImg) {
				image = {
					src: placeholderImageUri,
					alt: t('resourceGrid.featuredImage'),
				};
			} else {
				image = {
					src: defaultFeaturedImg,
					alt: t('resourceGrid.featuredImage'),
				};
			}
			parsedData.featuredImage = image;

			return parsedData;
		});

		gqlModuleData?.allowFeatured ? items : (items = items.slice(0, 6));
	}

	let resourceGridData = {
		prehead: gqlModuleData?.preheadText ?? t('resourceGrid.relatedResources'),
		preheadType: gqlModuleData?.preheadType ?? 'default',
		title: gqlModuleData.titleText,
		titleType: gqlModuleData.titleType,
		selectAType: gqlModuleData?.allowFeatured ? 'featured' : 'basic',
		selectionMethod: gqlModuleData?.selectionMethod === 'none' ? 'none' : null,
		description: gqlModuleData?.description,
		allignment: gqlModuleData.contentAlignment,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
		items,
	};

	if (gqlModuleData.actions && Object.keys(gqlModuleData.actions).length !== 0) {
		const buttonObject = transformToButtonsObject(
			gqlModuleData.contentAlignment,
			gqlModuleData.actions,
			'button--reverse'
		);
		resourceGridData.actionGroup = buttonObject;
	}

	return resourceGridData;
}
