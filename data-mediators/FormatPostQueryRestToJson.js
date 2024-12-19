function transformPostQueryRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'posts':
			return transformPostsRestToJson(restResponse);
		case 'resources':
			return transformResourcesRestToJson(restResponse);
		case 'partners':
			return transformPartnersRestToJson(restResponse);
		case 'news':
			return transformNewsRestToJson(restResponse);
		case 'caseStudies':
			return transformCaseStudyRestToJson(restResponse);
		case 'learn':
			return transformLearnRestToJson(restResponse);
		case 'testimonials':
			return transformTestimonialsRestToJson(restResponse);

		default:
			console.error('ERROR: transformPostQueryRestToJson: dataType was undefined, returning null');
			return null;
	}
}

function featuredImageTypes(node) {
	let heroData = node?.acf?.hero;

	if (heroData?.default_hero_media_media_type !== 'undefined') {
		if (heroData?.default_hero_media_media_type === 'image') {
			return {
				__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
				node: {
					__typename: 'MediaItem',
					mediaItemUrl: heroData?.default_hero_media_image.url,
					alt: heroData?.default_hero_media_image.alt,
					altText: heroData?.default_hero_media_image.alt,
				},
			};
		} else if (heroData?.default_hero_media_media_type === 'embed') {
			// do nothing
		} else if (heroData?.default_hero_media_media_type === 'post_image') {
			return {
				__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
				node: {
					__typename: 'MediaItem',
					mediaItemUrl: node?.featured_media_src?.url ?? null,
					altText: node?.featured_media_src?.alt_text ?? null,
				},
			};
		} else if (heroData?.default_hero_media_media_type === 'form') {
			// do nothing
		} else if (heroData?.default_hero_media_media_type === 'none') {
			// do nothing
		} else {
			console.warn(
				'[featuredImageTypes not supported in FormatPostQueryRestToJson.js',
				heroData?.default_hero_media_media_type
			);
		}
	}
}

function transformPostsRestToJson(restResponse) {
	return {
		__typename: 'RootQueryToPostConnection',
		nodes: restResponse
			? restResponse?.map((node) => {
					return {
						__typename: 'Posts',
						title: node?.title?.rendered ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						databaseId: node?.id ?? null,
						uri: node?.uri ?? null,
						locale: {
							__typename: 'Locale',
							locale: node?.wpml_current_locale ?? null,
						},
						featuredImage: featuredImageTypes(node),
					};
			  })
			: null,
	};
}

function transformResourcesRestToJson(restResponse) {
	return {
		__typename: 'RootQueryToResourceConnection',
		nodes: restResponse
			? restResponse?.map((node) => {
					return {
						__typename: 'Resource',
						title: node?.title?.rendered ?? null,
						uri: node?.uri ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						featuredImage: {
							__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
							node: {
								__typename: 'MediaItem',
								mediaItemUrl: node?.featured_media_src?.url ?? null,
								altText: node?.featured_media_src?.alt_text ?? '',
								alt: node?.featured_media_src?.alt_text ?? '',
							},
						},
					};
			  })
			: null,
	};
}

function transformPartnersRestToJson(restResponse) {
	return {
		__typename: 'RootQueryToPartnerConnection',
		nodes: restResponse
			? restResponse?.map((node) => {
					return {
						__typename: 'Partner',
						title: node?.title?.rendered ?? null,
						databaseId: node?.id ?? null,
						uri: node?.uri ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						featuredImage: featuredImageTypes(node),
					};
			  })
			: null,
	};
}

function transformNewsRestToJson(restResponse) {
	return {
		__typename: 'RootQueryToNewsConnection',
		nodes: restResponse
			? restResponse?.map((node) => {
					return {
						__typename: 'News',
						title: node?.title?.rendered ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						databaseId: node?.id ?? null,
						uri: node?.uri ?? null,
						locale: {
							__typename: 'Locale',
							locale: node?.wpml_current_locale ?? null,
						},
						templateNews: {
							__typename: 'News_Templatenews',
							externalResource: node?.acf?.external_resource || null,
							urlOfResource: node?.acf?.url_of_resource ?? null,
							publishDisplayDate: node?.acf?.publish_display_date ?? null,
						},
					};
			  })
			: null,
	};
}

function transformCaseStudyRestToJson(restResponse) {
	return {
		__typename: 'RootQueryToCaseStudyConnection',
		nodes: restResponse
			? restResponse?.map((node) => {
					return {
						__typename: 'CaseStudy',
						id: node?.id ?? null,
						slug: node?.slug ?? null,
						title: node?.title?.rendered ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						databaseId: node?.id ?? null,
						locale: { __typename: 'Locale', locale: node?.wpml_current_locale ?? null },
						uri: node?.uri ?? null,
						caseStudySliderDetails: {
							__typename: 'CaseStudy_Casestudysliderdetails',
							sliderPhoto: {
								__typename: 'MediaItem',
								altText: node?.acf?.slider_photo?.alt ?? null,
								mediaItemUrl: node?.acf?.slider_photo?.url ?? null,
							},
							sliderLogo: {
								__typename: 'MediaItem',
								altText: node?.acf?.slider_logo?.alt ?? null,
								mediaItemUrl: node?.acf?.slider_logo?.url ?? null,
							},
						},
						caseStudyFields: {
							__typename: 'CaseStudy_Casestudyfields',
							keyOutcomes:
								node?.acf?.key_outcomes && node?.acf?.key_outcomes.length > 0
									? node?.acf?.key_outcomes.map((outcomes) => {
											return {
												__typename: 'CaseStudy_Casestudyfields_keyOutcomes',
												description: outcomes?.description || null,
												stat: +outcomes?.stat || null,
												text: outcomes?.text || null,
												type: outcomes?.type || null,
											};
									  })
									: [],
							companyFacts: {
								__typename: 'CaseStudy_Casestudyfields_CompanyFacts',
								industry: node?.acf?.company_facts?.industry || null,
								location: node?.acf?.company_facts?.location || null,
								size: node?.acf?.company_facts?.size || null,
								useCase: node?.acf?.company_facts?.use_case || null,
								companyProducts:
									node?.acf?.company_facts?.company_products &&
									node?.acf?.company_facts?.company_products.length > 0 &&
									node?.acf?.company_facts?.company_products.map((comProduct) => {
										return {
											__typename: 'CaseStudy_Casestudyfields_CompanyFacts_companyProducts',
											products: {
												__typename: 'AcfLink',
												target: comProduct?.products?.target ?? null,
												title: comProduct?.products?.title || null,
												url: comProduct?.products?.url || null,
											},
										};
									}),
							},
							companyLogo: {
								__typename: 'MediaItem',
								altText: node?.acf?.company_logo?.alt ?? null,
								mediaItemUrl: node?.acf?.company_logo?.url ?? null,
							},
						},
						featuredImage: {
							__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
							node: {
								__typename: 'MediaItem',
								mediaItemUrl: node?.featured_media_src?.url ?? null,
								altText: node?.featured_media_src?.alt_text ?? null,
							},
						},
					};
			  })
			: null,
	};
}

function transformLearnRestToJson(restResponse = []) {
	return {
		__typename: 'RootQueryToLearnConnection',
		nodes:
			restResponse && restResponse.length > 0
				? restResponse.map((node) => ({
						__typename: 'Learn',
						title: node?.title?.rendered ?? null,
						uri: node?.uri ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						featuredImage:
							node?.featured_media && node?.featured_media !== 0
								? {
										__typename: 'MediaItem',
										mediaItemUrl: node?.featured_media_src?.url ?? null,
										altText: node?.featured_media_src?.alt_text ?? null,
								  }
								: null,
				  }))
				: [],
	};
}

function transformTestimonialsRestToJson(restResponse) {
	return {
		__typename: 'RootQueryToTestimonialConnection',
		nodes:
			restResponse && restResponse.length > 0
				? restResponse.map((node) => {
						return {
							__typename: 'Testimonial',
							id: node?.id,
							title: node?.title?.rendered,
							contentTypeName: 'testimonial',
							testimonialId: node?.id ?? null,
							uri: node?.uri ?? null,
							testimonialDetails: {
								__typename: 'Testimonial_Testimonialdetails',
								authorCompany: node?.acf?.author_company || null,
								authorName: node?.acf?.author_name || null,
								authorTitle: node?.acf?.author_title || null,
								content: node?.acf?.content || null,
								actions:
									node?.acf?.actions && node?.acf?.actions.length > 0
										? node?.acf?.actions?.map((action) => {
												return {
													__typename: 'Testimonial_Testimonialdetails_actions',
													adaText: action?.ada_text || null,
													seoText: action?.seo_text || null,
													function: action?.function || null,
													link: {
														__typename: 'AcfLink',
														target: action?.link?.target ?? null,
														title: action?.link?.title ?? null,
														url: action?.link?.url ?? null,
													},
												};
										  })
										: null,
								image: node?.acf?.image
									? {
											__typename: 'MediaItem',
											altText: '',
											mediaItemUrl: node?.acf?.image,
									  }
									: null,
								logo: node?.acf?.logo
									? {
											__typename: 'MediaItem',
											altText: '',
											mediaItemUrl: node?.acf?.logo,
									  }
									: null,
							},
						};
				  })
				: [],
	};
}

module.exports = transformPostQueryRestToJson;
