import {
	moduleIconTypeMap,
	moduleIconWrapperTypeMap,
	moduleIconCardBackgroundImageTypeMap,
	moduleIconCardActionTypeMap,
	backgroundImageTypeMap,
} from './mappings';
import { convertIframeToUrl, decodeHtmlEntities } from '../../wplib/util';
import { formatActions } from './moleculeHelpers';

// All of these functions used in the file flexTemplateHelpers.js for formatting createContentBlocksModules.

export const formatDataBoxBoxeslargeAndSmall = (boxes, layout) => {
	if (!boxes || boxes.length === 0) return null;

	return boxes.map((box) => {
		const commonFields = {
			statDescription: box?.stat_description || null,
		};

		if (layout === 'data_box_large') {
			return {
				__typename: 'ContentNode_Contentblocksmodules_Modules_DataBoxLarge_boxes',
				...commonFields,
				statMainTitle: box?.stat_main_title || null,
				number: box?.stat_number || null,
				title: box?.stat_main_title || '',
				prehead: box?.stat_sub_title || '',
				description: box?.stat_description || '',
				statNumber: box?.stat_number || null,
				statSubTitle: box?.stat_sub_title || null,
				statTrailingCharacter: box?.stat_trailing_character || null,
				actions: formatActions(box?.actions, ''),
			};
		} else {
			return {
				__typename: 'ContentNode_Contentblocksmodules_Modules_DataBoxSmall_boxes',
				...commonFields,
				dataStatNumber: box?.data_stat_number || null,
			};
		}
	});
};

export const formatModuleTiles = (tiles) => {
	if (!tiles || tiles.length === 0) return null;
	return tiles.map((tile) => {
		return {
			__typename: 'ContentNode_Contentblocksmodules_Modules_CrossTiles_tiles',
			description: tile?.description || null,
			titleText: tile?.title_text || null,
			titleType: tile?.title_type || null,
			image: {
				__typename: 'MediaItem',
				altText: '',
				mediaItemUrl: tile?.image || null,
			},
			actions: formatActions(tile?.actions, 'ContentNode_Contentblocksmodules_Modules_CrossTiles_tiles_actions'),
		};
	});
};

export const formatFaqs = (faqs) => {
	if (!faqs || faqs.length === 0) return null;
	return faqs.map((faq) => {
		return {
			__typename: 'ContentNode_Contentblocksmodules_Modules_Faqs_faqs',
			question: faq?.question || null,
			answer: faq?.answer || null,
		};
	});
};

export const formatModuleVideos = (videos) => {
	if (!videos || videos.length === 0) return null;
	return videos.map((video) => {
		return {
			__typename: 'ContentNode_Contentblocksmodules_Modules_Video_video',
			description: video?.description || null,
			author: video?.author || null,
			titleText: video?.title_text || null,
			titleType: video?.title_type || null,
			videoUrl: convertIframeToUrl(video?.video_url),
			image: video?.image?.url
				? {
						__typename: 'MediaItem',
						altText: '',
						mediaItemUrl: video?.image?.url || null,
				  }
				: null,
			actions: formatActions(video?.actions, 'ContentNode_Contentblocksmodules_Modules_Video_actions'),
		};
	});
};

export const formatBasicTabberTabs = (tabs, layout) => {
	const type =
		layout === 'product_tabber'
			? 'ContentNode_Contentblocksmodules_Modules_ProductTabber_tabs'
			: 'ContentNode_Contentblocksmodules_Modules_BasicTabber_tabs';

	const actionType =
		layout === 'product_tabber'
			? 'ContentNode_Contentblocksmodules_Modules_ProductTabber_tabs_actions'
			: 'ContentNode_Contentblocksmodules_Modules_BasicTabber_tabs_actions';

	if (!tabs || tabs.length === 0) return null;
	return tabs.map((tab) => {
		return {
			__typename: type,
			description: tab?.description || null,
			preheadText: tab?.prehead_text || null,
			preheadType: tab?.prehead_type || null,
			tabTitle: tab?.tab_title || null,
			teaser: tab?.teaser || null,
			titleText: tab?.title_text || null,
			titleType: tab?.title_type || null,
			productLogo: tab?.product_logo?.ID
				? {
						__typename: 'MediaItem',
						altText: tab?.product_logo?.alt || '',
						mediaItemUrl: tab?.product_logo?.url || '',
				  }
				: null,
			image: tab?.image?.url
				? {
						__typename: 'MediaItem',
						altText: tab?.image?.alt ?? null,
						mediaItemUrl: tab?.image?.url || null,
				  }
				: null,
			actions: formatActions(tab?.actions, actionType),
		};
	});
};

export const formatCardGridCards = (cards) => {
	if (!cards || cards.length === 0) return null;
	return cards.map((card) => {
		return {
			__typename: 'ContentNode_Contentblocksmodules_Modules_CardGrid_cards',
			description: card?.description || null,
			titleText: card?.title_text || null,
			titleType: card?.title_type || null,
			image: card?.image
				? {
						__typename: 'MediaItem',
						altText: '',
						mediaItemUrl: card?.image ?? null,
				  }
				: null,
			actions: formatActions(card?.actions, 'ContentNode_Contentblocksmodules_Modules_CardGrid_cards_actions'),
		};
	});
};

const formatResourcesGridCaseStudiesPost = (post) => {
	return {
		__typename: 'CaseStudy',
		uri: post?.uri ?? null,
		id: post?.id ?? null,
		slug: post?.slug ?? null,
		title: post?.title?.rendered ?? null,
		excerpt: post?.excerpt?.rendered ?? null,
		featuredImage: {
			__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
			node: {
				__typename: 'MediaItem',
				mediaItemUrl: post?.featured_media_src?.url ?? null,
			},
		},
	};
};

export const formatCaseStudyPost = (post) => {
	return {
		__typename: 'CaseStudy',
		id: post?.id ?? null,
		slug: post?.slug ?? null,
		title: post?.title?.rendered ?? null,
		excerpt: post?.excerpt?.rendered ?? null,
		caseStudySliderDetails: {
			__typename: 'CaseStudy_Casestudysliderdetails',
			sliderPhoto: {
				__typename: 'MediaItem',
				altText: post?.acf?.slider_photo?.alt ?? null,
				mediaItemUrl: post?.acf?.slider_photo?.url ?? null,
			},
			sliderLogo: post?.acf?.slider_logo?.url
				? {
						__typename: 'MediaItem',
						altText: post?.acf?.slider_logo?.alt ?? null,
						mediaItemUrl: post?.acf?.slider_logo?.url ?? null,
				  }
				: null,
		},
		caseStudyFields: {
			__typename: 'CaseStudy_Casestudyfields',
			keyOutcomes:
				post?.acf?.key_outcomes && post?.acf?.key_outcomes?.length > 0
					? post?.acf?.key_outcomes?.map((outcomes) => {
							return {
								__typename: 'CaseStudy_Casestudyfields_keyOutcomes',
								description: outcomes?.description || null,
								stat: outcomes?.stat ? Number(outcomes?.stat) : null,
								statTrailingCharacter: outcomes?.stat_trailing_character || null,
								text: outcomes?.text || null,
								type: outcomes?.type || null,
							};
					  })
					: null,
			companyFacts: {
				__typename: 'CaseStudy_Casestudyfields_CompanyFacts',
				industry: post?.acf?.company_facts?.industry || null,
				location: post?.acf?.company_facts?.location || null,
				size: post?.acf?.company_facts?.size || null,
				useCase:
					post?.acf?.company_facts?.use_case && post?.acf?.company_facts?.use_case.length > 0
						? post?.acf?.company_facts?.use_case.map((usecase) => {
								return {
									__typename: 'CaseStudy_Casestudyfields_CompanyFacts_useCase',
									example: usecase,
								};
						  })
						: null,
				companyProducts:
					post?.acf?.company_facts?.company_products && post?.acf?.company_facts?.company_products.length > 0
						? post?.acf?.company_facts?.company_products?.map(({ products }) => {
								return {
									__typename: 'CaseStudy_Casestudyfields_CompanyFacts_companyProducts',
									products: {
										__typename: 'AcfLink',
										target: products?.target ?? null,
										title: products?.title ?? null,
										url: products?.url ?? null,
									},
								};
						  })
						: null,
			},
			companyLogo: post?.acf?.company_logo?.url
				? {
						__typename: 'MediaItem',
						altText: post?.acf?.company_logo?.alt ?? null,
						mediaItemUrl: post?.acf?.company_logo?.url ?? null,
				  }
				: null,
		},
	};
};

const getResourceTypeTopicAndProduct = (terms = [], type = '') => {
	const validTypes = ['ResourceTopic', 'ResourceType', 'ResourceProduct'];
	if (!validTypes.includes(type)) return [];

	const taxonomyMapping = {
		ResourceTopic: 'tri_resource_topics',
		ResourceType: 'resource_type',
		ResourceProduct: 'tri_general_products',
	};

	const taxonomy = taxonomyMapping[type];
	if (!taxonomy) return [];

	const filteredNodes = terms.filter((term) => term.taxonomy === taxonomy);

	return filteredNodes.map((node) => ({
		__typename: type,
		id: node?.term_id || null,
		name: decodeHtmlEntities(node?.name),
	}));
};

const formatResourcePost = (post) => {
	return {
		__typename: 'Resource',
		uri: post?.uri ?? null,
		id: post?.id ?? null,
		content: post?.content?.rendered ?? null,
		excerpt: post?.excerpt?.rendered ?? null,
		title: post?.title?.rendered ?? null,
		featuredImage:
			post?.featured_media && post.featured_media !== 0
				? {
						__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
						node: {
							__typename: 'MediaItem',
							mediaItemUrl: post?.featured_media_src?.url ?? null,
						},
				  }
				: null,
		date: post?.date ?? null,
		databaseId: post?.id ?? null,
		resourceProducts: {
			__typename: 'ResourceToResourceProductConnection',
			nodes: getResourceTypeTopicAndProduct(post?.post_type_terms, 'ResourceProduct'),
		},
		resourceTopics: {
			__typename: 'ResourceToResourceTopicConnection',
			nodes: getResourceTypeTopicAndProduct(post?.post_type_terms, 'ResourceTopic'),
		},
		resourceTypes: {
			__typename: 'ResourceToResourceTypeConnection',
			nodes: getResourceTypeTopicAndProduct(post?.post_type_terms, 'ResourceType'),
		},
	};
};

const formatLogoPost = (post) => {
	return {
		__typename: 'Logo',
		id: post?.id || null,
		link: post?.link || null,
		logoDetails: {
			__typename: 'Logo_Logodetails',
			website: post?.acf?.website || null,
			logo: {
				__typename: 'MediaItem',
				id: post?.acf?.logo?.ID || null,
				mediaItemUrl: post?.acf?.logo?.url || null,
				altText: post?.acf?.logo?.alt || '',
			},
		},
	};
};

const formatTestimonialSliderPost = (post) => {
	return {
		__typename: 'Testimonial',
		id: post?.id ?? null,
		title: post?.title?.rendered ?? null,
		contentTypeName: post?.type ?? null,
		testimonialId: post?.id ?? null,
		testimonialDetails: {
			__typename: 'Testimonial_Testimonialdetails',
			authorCompany: post?.acf?.author_company || null,
			authorName: post?.acf?.author_name || null,
			authorTitle: post?.acf?.author_title || null,
			content: post?.acf?.content || null,
			actions: formatActions(post?.acf?.actions, 'Testimonial_Testimonialdetails_actions'),
			image: post?.acf?.image
				? {
						__typename: 'MediaItem',
						altText: 'alt textt',
						mediaItemUrl: post?.acf?.image ?? null,
				  }
				: null,
			logo: post?.acf?.logo
				? {
						__typename: 'MediaItem',
						altText: '',
						mediaItemUrl: post?.acf?.logo,
				  }
				: null,
		},
	};
};

export const handleContentModulePosts = (posts, layout) => {
	if (!Array.isArray(posts) || posts.length === 0) return null;

	const formatPost = (post) => {
		const type = post?.type || post?.post_type;
		switch (type) {
			case 'case_study':
				return layout === 'resources_grid' ? formatResourcesGridCaseStudiesPost(post) : formatCaseStudyPost(post);
			case 'resource':
				return formatResourcePost(post);
			case 'testimonial':
				return formatTestimonialSliderPost(post);
			case 'logo':
				return formatLogoPost(post);
			default:
				return post;
		}
	};

	return posts.map(formatPost);
};

export const formatIcons = (module) => {
	const { icons, acf_fc_layout } = module || {};
	if (!icons || icons.length === 0) return null;
	return icons.map((icon) => {
		return {
			__typename: moduleIconTypeMap[acf_fc_layout],
			description: icon?.description || null,
			titleText: icon?.title_text || null,
			titleType: icon?.title_type || null,
			iconWrapper: {
				__typename: moduleIconWrapperTypeMap[acf_fc_layout],
				supportIcon: icon?.icon_wrapper?.support_icon || null,
			},
			backgroundIconColor1: icon?.background_icon_color_1 || null,
			backgroundIconColor2: icon?.background_icon_color_2 || null,
			backgroundIconColor3: icon?.background_icon_color_3 || null,
			backgroundColor: icon?.background_color || null,
			backgroundType: icon?.background_type ?? null,
			backgroundImage: {
				__typename: moduleIconCardBackgroundImageTypeMap[acf_fc_layout],
				colorOverlay: icon?.background_image?.color_overlay ?? null,
				image: icon?.background_image?.image?.url
					? {
							__typename: 'MediaItem',
							altText: icon?.background_image?.image?.alt ?? null,
							mediaItemUrl: icon?.background_image?.image?.url ?? null,
					  }
					: null,
			},
			actions: formatActions(icon.actions, moduleIconCardActionTypeMap[acf_fc_layout]),
		};
	});
};

export const formatUploads = (uploads) => {
	if (!uploads || uploads.length === 0) return null;
	return uploads.map(({ image, website }) => {
		return {
			__typename: 'ContentNode_Contentblocksmodules_Modules_Logos_uploads',
			image: image?.url
				? {
						__typename: 'MediaItem',
						altText: image?.alt ?? null,
						mediaItemUrl: image?.url ?? null,
				  }
				: null,
			website: website || null,
		};
	});
};

export const formatFormSelectForm = (formSelectForm) => {
	if (!formSelectForm || !formSelectForm?.id) return null;
	return {
		__typename: 'Form',
		id: formSelectForm?.id || null,
		formId: formSelectForm?.id || null,
		title: formSelectForm?.title?.rendered || null,
		supportCPTFormFields: {
			__typename: 'Form_Supportcptformfields',
			formId: formSelectForm?.acf?.form_id || null,
		},
	};
};

export const formatFormFremiumEmails = (formFremiumEmails) => {
	if (Array.isArray(formFremiumEmails) && formFremiumEmails.length > 0) {
		return formFremiumEmails;
	}
	return null;
};

export const formmatFormRedirectUrl = (formRedirectUrl) => {
	if (!formRedirectUrl || !formRedirectUrl.url) return null;
	return {
		__typename: 'AcfLink',
		target: formRedirectUrl?.target || '',
		title: formRedirectUrl?.title || '',
		url: formRedirectUrl?.url || '',
	};
};

export const formatSecondaryContentColumns = (secondaryContentColumns) => {
	if (!secondaryContentColumns || secondaryContentColumns.length === 0) return null;
	return secondaryContentColumns.map((secondaryContent) => {
		return {
			__typename: 'ContentNode_Contentblocksmodules_Modules_ProductTabber_secondaryContentColumns',
			description: secondaryContent?.description || null,
			title: secondaryContent?.title || null,
		};
	});
};

export const formatBackgroundImage = (module) => {
	const { acf_fc_layout, background_image } = module || {};
	return {
		__typename: backgroundImageTypeMap[acf_fc_layout],
		colorScheme: background_image?.color_scheme || null,
		image: background_image?.image?.url
			? {
					__typename: 'MediaItem',
					altText: background_image?.image?.alt || '',
					mediaItemUrl: background_image?.image?.url || null,
			  }
			: null,
		mobileImage: background_image?.mobile_image?.url
			? {
					__typename: 'MediaItem',
					altText: background_image?.mobile_image?.alt || '',
					mediaItemUrl: background_image?.mobile_image?.url,
			  }
			: null,
	};
};

export const formatMediaFormGroup = (mediaFormGroup, type) => {
	if (!mediaFormGroup) return null;
	return {
		__typename: type,
		coCode: mediaFormGroup?.co_code || null,
		comboboxChoices: mediaFormGroup?.combobox_choices || null,
		consentCheckbox: mediaFormGroup?.consent_checkbox || null,
		customThankYou: mediaFormGroup?.custom_thank_you || null,
		initiative: mediaFormGroup?.initiative ?? null,
		marketingOptInCheckbox: mediaFormGroup?.marketing_opt_in_checkbox || null,
		nextForm: mediaFormGroup?.next_form || null,
		persona: mediaFormGroup?.persona || null,
		product: mediaFormGroup?.product || null,
		fremiumEmails:
			mediaFormGroup?.fremium_emails && mediaFormGroup?.fremium_emails.length > 0
				? mediaFormGroup?.fremium_emails
				: null,
		redirectUrl: mediaFormGroup?.redirect_url
			? {
					__typename: 'AcfLink',
					target: mediaFormGroup?.redirect_url?.target ?? null,
					title: mediaFormGroup?.redirect_url?.title ?? null,
					url: mediaFormGroup?.redirect_url?.url ?? null,
			  }
			: null,
		reportingTitle: mediaFormGroup?.reporting_title || null,
		resourceFormCta: mediaFormGroup?.resource_form_cta || null,
		selectForm: mediaFormGroup?.select_form
			? {
					__typename: 'Form',
					id: mediaFormGroup?.select_form?.id ?? null,
					supportCPTFormFields: {
						__typename: 'Form_Supportcptformfields',
						formId: mediaFormGroup?.select_form?.acf?.form_id ?? null,
						formTitle: mediaFormGroup?.select_form?.acf?.form_title ?? null,
					},
			  }
			: null,
		termsOptInCheckbox: mediaFormGroup?.terms_opt_in_checkbox || null,
		type: mediaFormGroup?.type || null,
	};
};

export const formatMediaImage = (mediaImage) => {
	if (!mediaImage) return null;
	return {
		__typename: 'MediaItem',
		altText: mediaImage?.alt,
		mediaItemUrl: mediaImage?.url,
	};
};

export const formatMediaVideoOverlayImage = (mediaVideoOverlayImage) => {
	if (!mediaVideoOverlayImage) return null;
	return {
		__typename: 'MediaItem',
		altText: mediaVideoOverlayImage?.alt ?? null,
		mediaItemUrl: mediaVideoOverlayImage?.url ?? null,
	};
};

export const createHeaderTabs = (headerTabs) => {
	if (!headerTabs || headerTabs.length === 0) return null;
	return headerTabs.map((tabs) => {
		return {
			tabTitle: tabs.tab_title ?? '',
		};
	});
};

export const createComparisonChartHeader = (comparisonChartHeader = {}) => {
	if (!comparisonChartHeader) return null;
	return {
		enterpriseHeader: comparisonChartHeader?.enterprise_header ?? null,
		essentialHeader: comparisonChartHeader?.essential_header ?? null,
		packageHeader: comparisonChartHeader?.package_header ?? null,
		proHeader: comparisonChartHeader?.pro_header ?? null,
	};
};

export const createComparisonChart = (comparisonChart) => {
	if (!comparisonChart || comparisonChart.length === 0) return null;
	return comparisonChart.map((chart) => {
		return {
			packageGroup: {
				package: chart?.package_group?.package ?? '',
			},
			proGroup: {
				text: chart?.pro_group?.text ?? null,
				type: chart?.pro_group?.type ?? 'none',
				yesNo: chart?.pro_group?.yes_no ?? null,
			},
			essentialGroup: {
				text: chart?.essential_group?.text ?? null,
				type: chart?.essential_group?.type ?? 'none',
				yesNo: chart?.essential_group?.yes_no ?? null,
			},
			enterpriseGroup: {
				text: chart?.enterprise_group?.text ?? null,
				type: chart?.enterprise_group?.type ?? 'none',
				yesNo: chart?.enterprise_group?.yes_no ?? null,
			},
		};
	});
};

export const createComparisonChartButton = (module) => {
	const { comparison_chart_buttons } = module || {};
	const { enterprise_buttons, essential_buttons, pro_buttons } = comparison_chart_buttons || {};

	return {
		enterpriseButtons: {
			outlined: {
				url: enterprise_buttons?.outlined?.url ?? null,
				title: enterprise_buttons?.outlined?.title ?? null,
				target: enterprise_buttons?.outlined?.target ?? null,
			},
			solid: {
				url: enterprise_buttons?.solid?.url ?? null,
				title: enterprise_buttons?.solid?.title ?? null,
				target: enterprise_buttons?.solid?.target ?? null,
			},
		},
		essentialButtons: {
			outlined: {
				url: essential_buttons?.outlined?.url ?? null,
				title: essential_buttons?.outlined?.title ?? null,
				target: essential_buttons?.outlined?.target ?? null,
			},
			solid: {
				url: essential_buttons?.solid?.url ?? null,
				title: essential_buttons?.solid?.title ?? null,
				target: essential_buttons?.solid?.target ?? null,
			},
		},
		proButtons: {
			outlined: {
				url: pro_buttons?.outlined?.url ?? null,
				title: pro_buttons?.outlined?.title ?? null,
				target: pro_buttons?.outlined?.target ?? null,
			},
			solid: {
				url: pro_buttons?.solid?.url ?? null,
				title: pro_buttons?.solid?.title ?? null,
				target: pro_buttons?.solid?.target ?? null,
			},
		},
	};
};

export const handleFormComboboxChoices = (formComboboxChoices = []) => {
	if (!Array.isArray(formComboboxChoices) || formComboboxChoices.length === 0) return null;
	return formComboboxChoices.map(({ combobox_choices, combobox_id, combobox_label }) => ({
		comboboxChoices:
			combobox_choices?.map(({ choice_name, choice_value }) => ({
				choiceName: choice_name ?? null,
				choiceValue: choice_value ?? null,
			})) ?? null,
		comboboxId: combobox_id ?? null,
		comboboxLabel: combobox_label ?? null,
	}));
};

export const handleFormConsentCheckbox = (formConsentCheckbox) => {
	if (!Array.isArray(formConsentCheckbox) || formConsentCheckbox.length === 0) {
		return null;
	}
	return formConsentCheckbox.map((checkbox) => {
		return {
			checkboxContent: checkbox?.checkbox_content ?? null,
			checkboxId: checkbox?.checkbox_id ?? null,
		};
	});
};
