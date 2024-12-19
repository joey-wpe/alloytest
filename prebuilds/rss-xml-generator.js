// Need to run last .....

const RSS = require('rss');
const fs = require('fs').promises;
const path = require('path');
const GlobalConstants = require('../GlobalConstants');

const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

console.log('Running script: rss-xml-generator.js');

// Constants
const postPerPage = 10;
const feUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
const supportedLanguages = GlobalConstants.Locales;

async function generateRssFeed(locale) {
	const language = locale === 'en' ? '' : `-${locale}`;

	try {
		// Fetching posts from JSON files
		const jsonFilePath = path.resolve(__dirname, `../public/posts${language}.json`);

		const jsonFile = require(jsonFilePath);

		const results = {
			posts: jsonFile.nodes.filter((post) => JSON.stringify(post).toLowerCase()),
		};
		results.total_posts_found = results.posts.length;
		results.posts = results.posts.slice(0, postPerPage);
		const allPosts = results.posts;

		// RSS feed options
		const langPath = locale === 'en-US' ? '' : `${locale}/`;
		const feedOptions = {
			title: 'Blog posts | RSS Feed',
			description: 'Tricentis recent posts!',
			site_url: feUrl,
			feed_url: `${feUrl}/${langPath}feed`,
			image_url: 'tricentis.com/logo.png',
			pubDate: new Date(),
		};

		const feed = new RSS(feedOptions);

		// Adding posts to feed
		allPosts.forEach((post) => {
			feed.item({
				title: post.title,
				description: post.excerpt,
				url: `${feUrl}${post.uri}`,
				date: post.date,
				custom_elements: [{ language: post.locale.locale }, { category: post.terms.nodes[0].name }],
			});
		});

		const feedXML = feed.xml();

		console.log(`Feed XML: Generating RSS feed for ${locale}`);

		// Write the RSS feed to disk
		await fs.writeFile(`public/feed${language}.xml`, feedXML);

		// Update redirects
		return {
			from: locale === 'en' ? '/feed' : `/${locale}/feed`,
			to: `/feed${language}.xml`,
			status: '200',
			force: true,
		};
	} catch (error) {
		console.error(`RSS XML Generator - generateRssFeed - Error for ${locale}:`, error.message);
		throw error;
	}
}

async function runGenerateRssFeed() {
	// Skip the process if it's a Storybook environment
	if (process.env.STORYBOOK_ENV === 'true') {
		console.log('Skipping RSS feed generation on Storybook environment');
		return;
	}

	try {
		console.log('Generating RSS feeds...');

		const redirects = [];
		const rssFeedPromises = supportedLanguages.map(async (lang) => {
			const redirect = await generateRssFeed(lang);
			if (redirect) {
				redirects.push(redirect);
			}
		});

		await Promise.all(rssFeedPromises);

		// Output redirects or handle them as needed
		console.log('Redirects to be added:', redirects);
	} catch (error) {
		console.error('Script execution failed:', error.message);
		process.exit(1); // Exit with a non-zero status code to fail the build
	}
}

// Run the script
runGenerateRssFeed();
