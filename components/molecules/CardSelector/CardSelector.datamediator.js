import { shorten } from '../../../wplib/util';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
const placeholderImageUri = '/img/resource-placeholder.png';

export function cardSetter(t, postType, cardData) {
	let cardInfo = {};
	switch (postType) {
		case 'case_study':
			cardInfo = caseStudiesCardBuilder(t, cardData);
			break;
		case 'partner':
			cardInfo = partnersCardBuilder(t, cardData);
			break;
		default:
			cardInfo = resourceCardBuilder(t, cardData);
			break;
	}

	return cardInfo;
}

function caseStudiesCardBuilder(t, data) {
	const cardCta = t('cardSelector.cardCTA');
	const { acf, core, taxonomies } = data;
	const { permalink, title, excerpt, post_thumbnail_url, id } = core;

	// the description is the excerpt if available, otherwise falls back to title
	var descriptionToUse = title;
	if (excerpt && excerpt.length > 0) {
		descriptionToUse = excerpt;
	}

	if (taxonomies) {
		// Creating array only with industry taxonomies
		const industryTax = data.taxonomies.filter((taxonomy) => taxonomy.taxonomyName === 'tri_industry');

		if (industryTax?.length > 0) {
			// Destructuring first position of industries taxonomies array
			const [firstArrayElement] = industryTax;

			// Destructuring the taxonomy object to grab term name and renaming it to tax
			if (firstArrayElement) {
				var { termName: tax = '' } = firstArrayElement;
			}
		}
	}

	const cardInfo = {
		id: id,
		logoImage: {
			src: post_thumbnail_url ?? null,
			alt: post_thumbnail_url?.alt ?? '',
		},
		backgroundImage: {
			src: placeholderImageUri,
			alt: '',
		},
		prehead: tax ?? t('caseStudySlider.postPreHead'),
		description: descriptionToUse,
		button: {
			buttonStyle: 'TertiaryDefault',
			buttonText: cardCta,
			link: mediateUrlPath(permalink),
		},
	};

	return cardInfo;
}

function partnersCardBuilder(t, data) {
	const cardCta = t('cardSelector.cardCTA');
	const { core, taxonomies = [] } = data;
	const { permalink, title, excerpt, post_thumbnail_url, id } = core;

	if (taxonomies?.length > 0) {
		// Destructuring first position of taxonomies array
		const [firstArrayElement] = taxonomies;
		// Destructuring the taxonomy object to grab term name and renaming it to tax
		if (firstArrayElement) {
			var { termName: tax = '' } = firstArrayElement;
		}
	}

	// Create Array of partner certifications
	const partnerCertificate = (taxonomies || []).reduce((cert, term) => {
		if (term.taxonomyName === 'partner_cert') {
			cert.push(term.termName);
		}

		return cert;
	}, []);

	const cardInfo = {
		id: id,
		logoImage: {
			src: post_thumbnail_url ?? null,
			alt: post_thumbnail_url?.alt ?? '',
		},
		backgroundImage: {
			src: placeholderImageUri,
			alt: post_thumbnail_url?.alt ?? '',
		},
		prehead: tax ?? null,
		title: title ?? null,
		description: excerpt ?? null,
		uri: mediateUrlPath(permalink),
		button: {
			buttonStyle: 'TertiaryReverse',
			buttonText: cardCta,
			link: mediateUrlPath(permalink),
		},
		partnerCertificate: partnerCertificate.length > 0 ? partnerCertificate : null,
	};

	return cardInfo;
}

function resourceCardBuilder(t, data) {
	const { core, taxonomies, acf, post_type } = data;
	const { permalink, title, excerpt, post_thumbnail_url, id, primary_category_id } = core;
	const { exclude_from_archive_page = null } = acf;
	if (exclude_from_archive_page === 'yes') return null;
	var prehead = '';

	if (taxonomies?.length > 0) {
		const primaryCategory = data.taxonomies.find((taxonomy) => taxonomy?.term?.termId === primary_category_id);

		if (post_type === 'post') {
			// Creating array only with category taxonomies
			const categoryTax = data.taxonomies.filter((taxonomy) => taxonomy.taxonomyName === 'category');
			// Destructuring first position of taxonomies array
			const [firstArrayElement] = categoryTax;
			// Destructuring the taxonomy object to grab term name and renaming it to tax

			if (primaryCategory) {
				var { termName: prehead = '' } = primaryCategory;
			} else if (firstArrayElement) {
				var { termName: prehead = '' } = firstArrayElement;
			}
		} else if (post_type === 'learn') {
			// Creating array only with category taxonomies
			const categoryTax = data.taxonomies.filter((taxonomy) => taxonomy.taxonomyName === 'learntype');
			// Destructuring first position of taxonomies array
			const [firstArrayElement] = categoryTax;
			// Destructuring the taxonomy object to grab term name and renaming it to tax

			if (firstArrayElement) {
				var { termName: prehead = '' } = firstArrayElement;
			}
		} else if (post_type === 'resource') {
			// Creating array only with resource type taxonomies
			const categoryTax = data.taxonomies.filter((taxonomy) => taxonomy.taxonomyName === 'resource_type');
			// Destructuring first position of taxonomies array
			const [firstArrayElement] = categoryTax;
			// Destructuring the taxonomy object to grab term name and renaming it to tax

			if (primaryCategory) {
				var { termName: prehead = '' } = primaryCategory;
			} else if (firstArrayElement) {
				var { termName: prehead = '' } = firstArrayElement;
			}
		} else {
			var prehead = post_type;
		}
	}

	const cardInfo = {
		id: id,
		prehead: post_type === 'events' ? null : prehead,
		title: title ?? null,
		description: excerpt ?? null,
		featuredImage: {
			src: post_thumbnail_url ?? placeholderImageUri,
			alt: t('cardSelector.featuredImageAlt'),
		},
		uri: mediateUrlPath(permalink),
	};

	return cardInfo;
}
