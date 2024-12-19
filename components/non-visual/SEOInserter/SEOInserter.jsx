import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import Head from 'next/head';

import GlobalConstants from '../../../GlobalConstants';

import { getPageType, updateFullHead } from './schemaService';
import { genAlternateHreflang, getHtmlHead, filterHTMLHeadCriteria, mapLocaleToWpmlLocale } from './seoInserterService';

const SEOInserter = ({ title, seoData, modules, translatedPages, schemaListItems }) => {
	const basePath = process.env.BASE_PATH ?? 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com';
	const { asPath, locale } = useRouter();
	const [faq, setFaq] = useState('');
	const [loaded, setLoaded] = useState(false);

	function genFaqSchema(schema, questionsArray) {
		let mainEntity = [];
		const path = asPath.indexOf('#') && asPath.split('#').length === 2 ? asPath.split('#')[0] : asPath;

		questionsArray.map((questions) => {
			questions.faqs.map(({ question, answer }, index) => {
				const id = question
					.replaceAll(' ', '-')
					// regex pattern to convert filter alphanumeric characters
					.replaceAll(/[^a-zA-Z0-9 -]/g, '')
					.toLowerCase();
				const entry = {
					'@type': 'Question',
					position: index + 1,
					name: question,
					answerCount: 1,
					acceptedAnswer: {
						'@type': 'Answer',
						// regex for removing html tags from content
						text: answer.replaceAll(/<([\w\-/]+)( +[\w\-]+(=(('[^']*')|("[^"]*")))?)* *>/g, ''),
						inLanguage: locale,
					},
					inLanguage: locale,
				};

				mainEntity.push(entry);
			});
		});

		return {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: mainEntity,
		};
	}

	useEffect(() => {
		let genFaq = '';

		const faqModules = modules?.filter((obj) => {
			return obj.__typename.endsWith('Modules_Faqs');
		});

		if (faqModules?.length && !loaded) {
			genFaq = faqModules?.length
				? parse(
						`<script id="seo-faq" type="application/ld+json">${JSON.stringify(genFaqSchema('', faqModules))}</script>`
				  )
				: '';
			setFaq(genFaq);
			setLoaded(true);
		}
	}, []);

	if (!seoData?.fullHead) {
		console.warn(`SEO:: Missing SEO Data on page: ${title}`);
		return (
			<Head>
				<title>
					{GlobalConstants.General.SiteTitle} - {title}
				</title>
			</Head>
		);
	}

	// regex pattern and capture group to remove trailing slash from URL
	const regex =
		title == 'Homepage' ? /(<link\s+[^>]*?href="(.*?))(.com)(.*?)(\/("))/ : /(<link\s+[^>]*?href=".*?)(\/("))/;
	const capGroup = title == 'Homepage' ? '$1$3$4$6' : '$1$3';

	let updatedSeo = {
		...seoData,
		canonical: seoData.canonical?.endsWith('/') ? seoData.canonical.replace(regex, capGroup) : seoData.canonical,
		fullHead: seoData.fullHead.replace(regex, capGroup),
	};

	// The length of schemaListItems will be greater than 0 only on the Learn and Blog pages. If it is, update the fullHead.
	if (schemaListItems && schemaListItems?.length > 0) {
		updatedSeo.fullHead = updateFullHead(schemaListItems, updatedSeo?.fullHead);
	}

	const pages = translatedPages.some((page) => page?.locale?.locale?.includes(locale))
		? translatedPages
		: [
				{
					locale: { locale: mapLocaleToWpmlLocale(locale) },
					uri: locale === 'en-US' ? asPath : `/${locale}${asPath}`,
				},
				...translatedPages,
		  ];
	const hreflangTags = genAlternateHreflang(basePath, pages);

	let rawHTMLHead = [updatedSeo.fullHead, hreflangTags].join('\n');

	// NOTE:: `seoData` will be null during preview - be cautious accessing it
	let seoTags = parse(rawHTMLHead) || [];

	const htmlSeoTags = getHtmlHead(seoTags, getPageType(asPath))
		.filter((tag) => filterHTMLHeadCriteria(tag, getPageType(asPath)))
		.join();

	const htmlHead = parse(htmlSeoTags);

	// NOTE:: htmlHead will contain the page title parsed from Yoast
	return (
		<>
			<Head>{htmlHead && htmlHead}</Head>
			{/* FAQ should be rendered in the body - do not move inside head element */}
			{faq}
		</>
	);
};

SEOInserter.propTypes = {
	title: PropTypes.string.isRequired,
	seoData: PropTypes.object,
	modules: PropTypes.array,
	translatedPages: PropTypes.array,
};

export default SEOInserter;
