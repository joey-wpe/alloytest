// For now, it is only used in plugins/netlify-plugin-filter-json-generator-narwhal

function transformRestToJson(restResponse, type) {
	switch (type) {
		case 'news':
		case 'press':
			return transformNewsRestToJsonList(restResponse);
		case 'learn':
		case 'events':
		case 'caseStudies':
		case 'partners':
		case 'posts':
		case 'resources':
		case 'exploreProducts':
			return transformRestToJsonList(restResponse, type);
		default:
			console.error('ERROR: transformRestToJson: dataType was undefined, returning null');
			return null;
	}
}

const mainTypes = {
	caseStudies: 'RootQueryToCaseStudyConnection',
	events: 'RootQueryToEventConnection',
	exploreProducts: 'RootQueryToExplore_productConnection',
	partners: 'RootQueryToPartnerConnection',
	posts: 'RootQueryToPostConnection',
	resources: 'RootQueryToResourceConnection',
};

const childTypes = {
	caseStudies: 'CaseStudy',
	events: 'Event',
	exploreProducts: 'Explore_product',
	partners: 'Partner',
	posts: 'Post',
	resources: 'Resource',
	learn: 'Learn',
	news: 'News',
	press: 'Press',
};

const TermsMain = {
	caseStudies: 'CaseStudyToTermNodeConnection',
	events: 'EventToTermNodeConnection',
	exploreProducts: 'Explore_productToTermNodeConnection',
	partners: 'PartnerToTermNodeConnection',
	posts: 'PostToTermNodeConnection',
	resources: 'ResourceToTermNodeConnection',
};

const termTypes = {
	tri_region: 'Region',
	tri_industry: 'ResourceIndustry',
	tri_general_products: 'ResourceProduct',
	tri_resource_topics: 'ResourceTopic',
	tri_events_month: 'EventMonth',
	tri_event_type: 'EventType',
	partnertype: 'Partnertype',
	partner_cert: 'PartnerCertification',
	category: 'Category',
	post_tag: 'Tag',
	resource_type: 'ResourceType',
	learntype: 'learntype',
};

/* This function is used to transform the following cases: 
case studies, events, explore products, partners, posts, resources, and learn. */
function transformRestToJsonList(restResponse, type) {
	if (!Array.isArray(restResponse) || restResponse.length === 0)
		return {
			__typename: mainTypes[type],
			nodes: [],
		};

	const safeAccess = (object, path, defaultValue) =>
		path.reduce((acc, key) => (acc && key in acc ? acc[key] : null), object) || defaultValue;

	const mapTerm = ({ taxonomy, name, slug, term_id, term_taxonomy_id }) => ({
		__typename: termTypes[taxonomy] || null,
		taxonomyName: taxonomy || null,
		termId: term_id || null,
		termTaxonomyId: term_taxonomy_id || null,
		name: name || null,
		slug: slug || null,
	});

	const mapResponseItem = ({
		id,
		title,
		excerpt,
		date,
		uri,
		tri_general_products__primary_product_id,
		primary_category_id,
		wpml_current_locale,
		post_type_terms,
		featured_media,
		featured_media_src,
		acf,
	}) => ({
		__typename: childTypes[type],
		title: safeAccess(title, ['rendered'], null),
		excerpt: safeAccess(excerpt, ['rendered'], ''),
		date: date ?? null,
		id: id ?? null,
		uri: uri ?? null,
		locale: {
			__typename: 'Locale',
			locale: wpml_current_locale,
		},
		primary_taxonomy_id: tri_general_products__primary_product_id ?? null,
		primary_category_id: primary_category_id ?? null,
		featuredImage:
			featured_media && featured_media !== 0
				? {
						__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
						node: {
							__typename: 'MediaItem',
							altText: safeAccess(featured_media_src, ['alt_text'], ''),
							sourceUrl: safeAccess(featured_media_src, ['url'], ''),
						},
				  }
				: null,
		terms: {
			__typename: TermsMain[type],
			nodes: (post_type_terms?.filter(({ taxonomy }) => taxonomy !== 'translation_priority') || []).map(mapTerm),
		},
		resourcesPage:
			type === 'resources'
				? {
						__typename: 'Resource_Resourcespage',
						excludeFromArchivePage: acf?.exclude_from_archive_page ?? null,
				  }
				: undefined,
		eventsPage:
			type === 'events'
				? {
						__typename: 'Event_Eventspage',
						excludeFromArchivePage: acf?.exclude_from_archive_page ?? null,
						when: {
							__typename: 'Event_Eventspage_When',
							date: acf?.when?.date ?? null,
							eventDateInfo: acf?.when?.event_date_info ?? null,
							customTileDate: acf?.when?.custom_tile_date ?? null,
						},
						eventsDetails: {
							__typename: 'Event_Eventspage_EventsDetails',
							when: {
								__typename: 'Event_Eventspage_EventsDetails_When',
								fromDate: acf?.events_details?.when?.from_date ?? null,
								eventDateInfo: acf?.events_details?.when?.event_date_info ?? null,
								customTileDate: acf?.events_details?.when?.custom_tile_date ?? null,
							},
						},
				  }
				: undefined,
	});

	return {
		__typename: mainTypes[type],
		nodes: restResponse.map(mapResponseItem),
	};
}

function transformNewsRestToJsonList(restResponse) {
	return {
		__typename: 'RootQueryToNewstypeConnection',
		nodes: [
			{
				__typename: 'Newstype',
				news: {
					__typename: 'NewstypeToNewsConnection',
					nodes: restResponse.map((node) => {
						return {
							__typename: 'News',
							title: node?.title?.rendered,
							excerpt: node?.excerpt?.rendered,
							date: node?.date,
							id: node?.id,
							uri: node?.uri,
							locale: {
								__typename: 'Locale',
								locale: node?.wpml_current_locale,
							},
							templateNews: {
								__typename: 'News_Templatenews',
								externalResource: node?.acf?.external_resource ?? null,
								urlOfResource: node?.acf?.url_of_resource ?? null,
								publishDisplayDate: node?.acf?.publish_display_date ?? null,
							},
						};
					}),
				},
			},
		],
	};
}

module.exports = transformRestToJson;
