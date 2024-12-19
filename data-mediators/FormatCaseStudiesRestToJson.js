import { createContentBlocksModules } from './PageTemplateHelpers/flexTemplateHelpers';
import { emptyReturnNull, decodeHtmlEntities } from '../wplib/util';
import { formatWPTranslated, createPageFooterObject } from './PageTemplateHelpers/moleculeHelpers';

export function transformCaseStudiesByIDRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'caseStudiesByID':
			return transformCaseStudiesByIDJson(restResponse);
		case 'caseStudiesList':
			return transformCaseStudyRestToList(restResponse);

		default:
			console.error('ERROR: transformCaseStudiesByIDRestToJson: dataType was undefined, returning null');
			return null;
	}
}

function transformCaseStudyRestToList(restResponse) {
	return restResponse.map((node) => {
		return {
			__typename: 'CaseStudy',
			title: node?.title?.rendered ?? null,
			databaseId: node?.id,
			locale: { __typename: 'Locale', locale: node?.wpml_current_locale },
			slug: node?.slug,
			uri: node?.uri,
		};
	});
}

function transformCaseStudiesByIDJson(restResponse) {
	let keyOutcomes = null;
	if (Array.isArray(restResponse?.acf?.key_outcomes)) {
		keyOutcomes = restResponse.acf?.key_outcomes?.map((keyOutcome) => ({
			__typename: 'CaseStudy_Casestudyfields_keyOutcomes',
			stat: keyOutcome.stat,
			statTrailingCharacter: emptyReturnNull(keyOutcome?.stat_trailing_character) ?? null,
			text: keyOutcome.text,
			type: keyOutcome.type,
			description: emptyReturnNull(keyOutcome?.description) ?? null,
		}));
	}
	let companyProducts = [];
	if (Array.isArray(restResponse?.acf?.company_facts?.company_products)) {
		companyProducts = restResponse.acf?.company_facts?.company_products?.map((companyProduct) => ({
			__typename: 'CaseStudy_Casestudyfields_CompanyFacts_companyProducts',
			products: {
				__typename: 'AcfLink',
				title: companyProduct.products?.title ?? null,
				target: companyProduct.products?.target ?? null,
				url: companyProduct.products?.url ?? null,
			},
		}));
	}

	let flexRepeater = [];
	if (Array.isArray(restResponse.acf?.flex_repeater)) {
		flexRepeater =
			restResponse.acf?.flex_repeater?.map((flexRepeater) => ({
				__typename: 'CaseStudy_Casestudyfields_flexRepeater',
				description: emptyReturnNull(flexRepeater?.description) ?? null,
				text: emptyReturnNull(flexRepeater?.text) ?? null,
				type: flexRepeater.type,
				showBulletPoints: emptyReturnNull(flexRepeater?.show_bullet_points) ?? null,
				bulletPoints: emptyReturnNull(flexRepeater?.bullet_points) ?? null,
				image: flexRepeater.image
					? {
							__typename: 'MediaItem',
							altText: flexRepeater.image?.alt ?? '',
							mediaItemUrl: flexRepeater.image?.url ?? null,
					  }
					: null,
			})) ?? null;
	}

	let caseStudyTitle = decodeHtmlEntities(restResponse.title?.rendered) ?? null;

	return {
		__typename: 'CaseStudy',
		seo: {
			__typename: 'PostTypeSEO',
			canonical: restResponse.yoast_head_json?.canonical ?? null,
			fullHead: restResponse.yoast_head ?? null,
			metaDesc: restResponse.yoast_head_json?.description ?? null,
			metaRobotsNofollow: restResponse.yoast_head_json?.robots?.follow ?? null,
			metaRobotsNoindex: restResponse.yoast_head_json?.robots?.index ?? null,
		},
		slug: restResponse.slug,
		title: caseStudyTitle,
		excerpt: restResponse.excerpt?.rendered,
		pageFooter: createPageFooterObject(
			restResponse?.acf?.call_to_action_settings,
			restResponse?.acf?.call_to_action_group
		),
		caseStudyFields: {
			__typename: 'CaseStudy_Casestudyfields',
			overview: restResponse.acf?.overview,
			alertSettings: restResponse.acf?.alert_settings ?? null,
			customerName: restResponse.acf?.customer_name ?? null,
			companyLogo: {
				__typename: 'MediaItem',
				altText: restResponse.acf?.company_logo?.alt ?? null,
				mediaItemUrl: restResponse.acf?.company_logo?.url ?? null,
			},
			alertgroup: {
				__typename: 'CaseStudy_Casestudyfields_Alertgroup',
				alertContentMessage: restResponse.acf?.alertgroup?.alert_content_message ?? null,
				alertContentAlertType: restResponse.acf?.alertgroup?.alert_content_alert_type ?? null,
				alertContentActions: restResponse.acf?.alertgroup?.alert_content_actions ?? null,
			},
			keyOutcomes: keyOutcomes,
			companyFacts: {
				__typename: 'CaseStudy_Casestudyfields_CompanyFacts',
				industry: restResponse.acf?.company_facts?.industry,
				location: restResponse.acf?.company_facts?.location,
				size: restResponse.acf?.company_facts?.size,
				useCase: emptyReturnNull(restResponse.acf?.company_facts?.use_case) ?? null,
				companyProducts: companyProducts,
			},
			flexRepeater: flexRepeater,
		},
		translated: formatWPTranslated(restResponse?.wpml_translations, restResponse?.wpml_current_locale),
		contentBlocksModules: createContentBlocksModules(restResponse?.acf?.modules),
	};
}
