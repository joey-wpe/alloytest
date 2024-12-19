import { transformToButtonObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlTestimonialResponseToTestimonial(gqlModuleData, postTypesQuery) {
	// Extract testimonials from post types query response
	const [testimonialQuery = null] = postTypesQuery?.filter(
		(post) => post?.__typename === 'RootQueryToTestimonialConnection'
	);
	var testimonials;

	if (gqlModuleData?.selectionType !== 'query') {
		testimonials = gqlModuleData.posts?.map((post) => parsedData(post));
	} else {
		testimonials = testimonialQuery?.nodes.map((post) => parsedData(post));
	}

	let testomonialData = {
		testimonials,
	};

	return testomonialData;
}

function parsedData(post) {
	const parsedTestimonial = {
		testimonialText: post.testimonialDetails.content,
		authorName: post.testimonialDetails.authorName,
		authorTitle: post.testimonialDetails.authorTitle,
		authorCompany: post.testimonialDetails.authorCompany,
	};

	if (post.testimonialDetails.logo) {
		parsedTestimonial.logo = {
			src: post.testimonialDetails?.logo?.mediaItemUrl,
			alt: post.testimonialDetails?.logo?.altText,
		};
	}
	if (post.testimonialDetails.image) {
		parsedTestimonial.image = {
			src: post.testimonialDetails?.image?.mediaItemUrl,
			alt: post.testimonialDetails?.image?.altText,
		};
	}

	if (post.testimonialDetails.actions && post.testimonialDetails.actions.length === 1) {
		const firstAction = post.testimonialDetails.actions[0];
		const buttonObject = transformToButtonObject(firstAction, 'TertiaryReverse');
		parsedTestimonial.buttons = {
			alignment: 'left',
			buttons: [buttonObject],
		};
	}
	return parsedTestimonial;
}
