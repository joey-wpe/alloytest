// Tax selector recives the post type selected, all of the post types taxonomies and the taxonomies acf from the BE. Depending on the post type it will deleted the post types (from the object) not used by the selected post type and if theres a tax comming from the acf it will add it so it filters directly by that taxonomy on the fron end.
export function taxSelector(postType, taxonomies, taxAcf) {
	let taxFilterBy = [];
	switch (postType) {
		case 'events':
			eventsTaxFilter(taxonomies, taxAcf, taxFilterBy);
			break;
		case 'post':
			blogTaxFilter(taxonomies, taxAcf, taxFilterBy);
			break;
		default:
			resourceTaxFilter(taxonomies, taxAcf, taxFilterBy);
			break;
	}

	return taxFilterBy;
}

function eventsTaxFilter(tax, taxAcf, taxFilterBy) {
	if (taxAcf?.regions) {
		taxFilterBy.push({ taxonomy: taxAcf.regions?.taxonomyName, term: taxAcf.regions.slug });
		delete tax.Region;
	}

	if (taxAcf?.eventType) {
		taxFilterBy.push({ taxonomy: taxAcf.eventType?.taxonomyName, term: taxAcf.eventType.slug });
		delete tax.EventTypes;
	}

	if (taxAcf?.months) {
		taxFilterBy.push({ taxonomy: taxAcf.months?.taxonomyName, term: taxAcf.months.slug });
		delete tax.EventMonths;
	}

	return taxFilterBy;
}

function blogTaxFilter(tax, taxAcf, taxFilterBy) {
	if (taxAcf?.categories) {
		taxFilterBy.push({ taxonomy: taxAcf.categories?.taxonomyName, term: taxAcf.categories.slug });
		delete tax.Category;
	}

	if (taxAcf?.products) {
		taxFilterBy.push({ taxonomy: taxAcf.products?.taxonomyName, term: taxAcf.products.slug });
		delete tax.ResourceProduct;
	}

	return taxFilterBy;
}

function resourceTaxFilter(tax, taxAcf, taxFilterBy) {
	if (taxAcf?.resourceType) {
		taxFilterBy.push({ taxonomy: taxAcf.resourceType?.taxonomyName, term: taxAcf.resourceType.slug });
		delete tax.ResourceType;
	}

	if (taxAcf?.products) {
		taxFilterBy.push({ taxonomy: taxAcf.products?.taxonomyName, term: taxAcf.products.slug });
		delete tax.ResourceProduct;
	}

	if (taxAcf?.resourceTopic) {
		taxFilterBy.push({ taxonomy: taxAcf.resourceTopic?.taxonomyName, term: taxAcf.resourceTopic.slug });
		delete tax.ResourceTopic;
	}

	return taxFilterBy;
}

export function parsePostTypes(data, selectedPostType) {
	if (selectedPostType === null) return;

	const postTypes = data.postTypes;
	let filteredPostTypes = {};

	if (selectedPostType === 'post') {
		filteredPostTypes = {
			...(postTypes.ResourceProduct ? { ResourceProduct: postTypes.ResourceProduct } : {}),
			...(postTypes.Category ? { Category: postTypes.Category } : {}),
		};
	} else if (selectedPostType === 'events') {
		filteredPostTypes = {
			...(postTypes?.EventType ? { EventTypes: postTypes?.EventType } : {}),
			...(postTypes?.EventMonth ? { EventMonths: postTypes?.EventMonth } : {}),
			...(postTypes?.Region ? { Region: postTypes?.Region } : {}),
		};
	} else if (selectedPostType === 'case_study') {
		filteredPostTypes = {
			...(postTypes.ResourceProduct ? { ResourceProduct: postTypes.ResourceProduct } : {}),
			...(postTypes?.ResourceIndustry ? { ResourceIndustry: postTypes?.ResourceIndustry } : {}),
			...(postTypes?.Region ? { Region: postTypes?.Region } : {}),
		};
	} else if (selectedPostType === 'partner') {
		filteredPostTypes = {
			...(postTypes.Partnertype ? { Partnertype: postTypes.Partnertype } : {}),
			...(postTypes?.Region ? { Region: postTypes?.Region } : {}),
			...(postTypes?.PartnerCertification ? { PartnerCertification: postTypes?.PartnerCertification } : {}),
		};
	} else if (selectedPostType === 'resource') {
		filteredPostTypes = {
			...(postTypes.ResourceTopic ? { ResourceTopic: postTypes.ResourceTopic } : {}),
			...(postTypes.ResourceProduct ? { ResourceProduct: postTypes.ResourceProduct } : {}),
			...(postTypes?.ResourceType ? { ResourceType: postTypes?.ResourceType } : {}),
		};
	} else if (selectedPostType === 'learn') {
		filteredPostTypes = postTypes.Learntype ? { LearnType: postTypes.Learntype } : {};
	}

	return filteredPostTypes;
}
