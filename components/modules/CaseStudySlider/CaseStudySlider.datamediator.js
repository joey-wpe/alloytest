import GlobalConstants from '../../../GlobalConstants';
import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';

export function gqlCaseStudySliderResponseToCaseStudySlider(t, gqlModuleData, hasPadding, postTypesQuery, locale) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlCaseStudySliderResponseToCaseStudySlider: gqlModuleData is undefined');
		return null;
	}
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);

	const [caseStudiesQuery = null] = postTypesQuery?.filter(
		(post) => post?.__typename === 'RootQueryToCaseStudyConnection'
	);

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	// console.log('SELECTION TYPE IS: ', gqlModuleData.selectionType); // ex: 'manual'
	var stories = [];
	if (gqlModuleData.selectionType === 'manual') {
		stories = getStoriesFromPosts(t, gqlModuleData.posts, locale);
	} else {
		stories = getStoriesFromPosts(t, caseStudiesQuery?.nodes, locale);
	}

	// it's possible for stories to not have a value if the module has no stories, so we'll fall back to an empty array
	if (!stories) {
		console.error('ERROR: CaseStudySlider.datamediator: stories is undefined  - there are no posts to show?!');
		stories = [];
	}
	let CaseStudySliderData = {
		stories,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};
	return CaseStudySliderData;
}

function getStoriesFromPosts(t, posts, locale) {
	const landingPageLink = GlobalConstants.FrontendRoutes.CaseStudies;

	var stories =
		posts?.map((post) => {
			// console.log('getStoriesFromPosts', post);
			let parsedPost = {
				prehead: t('caseStudySlider.postPreHead'),
				title: post?.title ?? '',
				description: post?.excerpt ?? '',
				buttons: {
					alignment: 'left',
					buttons: [
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: t('generic.readMore'),
							// this ternary is to fix the trailing slash for french and german links.
							link: locale.length
								? `/${locale}/${GlobalConstants.FrontendRoutes.CaseStudies}/${post.slug}`
								: `/${GlobalConstants.FrontendRoutes.CaseStudies}/${post.slug}`,
						},
						{
							buttonStyle: 'TertiaryReverse',
							buttonText: t('caseStudySlider.viewMore'),
							// this ternary is to fix the trailing slash for french and german links.
							link: locale.length ? `/${locale}/${landingPageLink}` : `/${landingPageLink}`,
						},
					],
				},
			};

			let keyOutcomes = [];
			if (Array.isArray(post?.caseStudyFields?.keyOutcomes)) {
				keyOutcomes =
					post?.caseStudyFields?.keyOutcomes?.map((item) => {
						return {
							data: `${item?.stat ?? ''}${item?.statTrailingCharacter ?? '%'} ${item?.text ?? ''}`,
						};
					}) ?? [];
			}
			parsedPost.list = {
				title: t('caseStudySlider.keyOutcomes') + ':',
				items: [...keyOutcomes],
			};
			if (post.caseStudySliderDetails?.sliderLogo) {
				let logo = {
					src: post.caseStudySliderDetails.sliderLogo.mediaItemUrl,
					alt: post.caseStudySliderDetails.sliderLogo.altText,
				};
				parsedPost.logo = logo;
			}

			if (post.caseStudySliderDetails?.sliderPhoto) {
				let image = {
					src: post.caseStudySliderDetails.sliderPhoto.mediaItemUrl,
					alt: post.caseStudySliderDetails.sliderPhoto.altText,
				};
				parsedPost.image = image;
			}
			return parsedPost;
		}) ?? []; // stories;

	return stories;
}
