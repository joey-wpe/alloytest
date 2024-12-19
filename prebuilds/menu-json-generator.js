const fetch = require('node-fetch');
const fs = require('fs').promises;
const transformMenuPluginRestToJson = require('../data-mediators/FormatMenuPluginAPIRestToJson');

const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

console.log('Running script: menu-json-generator.js');

async function getAllMenus() {
	try {
		const allMenusEndpoint = `${process.env.BACKEND_SERVER}/wp-json/menus/v1/menus`;
		// Fetch all menus
		const response = await fetch(allMenusEndpoint);
		// Check if response is successful
		if (!response.ok) {
			throw new Error(`Failed to fetch all menus. Status: ${response.status}`);
		}
		// Parse and return the results
		const parsedResults = await response.json();
		return parsedResults;
	} catch (error) {
		console.error('Error in [getAllMenus]:', error.message);
		throw new Error(`[getAllMenus]: ${error.message}`);
	}
}

async function getMenuDetailBySlug(menuSlug) {
	try {
		const menuRestAPIEndpoint = `${process.env.BACKEND_SERVER}/wp-json/menus/v1/menus/${menuSlug}`;
		console.log(`Querying menu data for slug: ${menuSlug}`);
		const response = await fetch(menuRestAPIEndpoint);

		if (!response.ok) {
			throw new Error(`Failed to fetch menu data for slug: ${menuSlug}. Status: ${response.status}`);
		}

		const responseJSON = await response.json();
		// Transform data according to previously used GraphQL response.
		const transformedData = transformMenuPluginRestToJson(responseJSON);

		if (
			!transformedData ||
			!transformedData?.menus ||
			transformedData.menus.nodes.length < 1 ||
			!transformedData.menus.nodes[0].locations
		) {
			console.warn('Skipping menu as there are no locations defined for it');
			return null;
		}

		const childNodes = transformedData.menus.nodes[0].menuItems?.nodes?.filter((node) => node?.parentId === null);

		const cloneData = JSON.parse(JSON.stringify(transformedData));
		cloneData.menus.nodes[0].menuItems.nodes = childNodes;

		return cloneData;
	} catch (error) {
		console.error(`Error fetching menu for slug: ${menuSlug}`, error.message);
		throw new Error(`[getMenuDetailBySlug]: ${error.message}`);
	}
}

async function generateMenusData() {
	try {
		// Skip the process if it's a Storybook environment
		if (process.env.STORYBOOK_ENV === 'true') {
			console.log('Skipping json-generator on Storybook environment');
			return;
		}

		const allMenus = await getAllMenus();

		console.log('menu-generator: generating file...');

		/* Intentionally not using Promise.all() to improve build stability as this
		   seems to overwhelm the backend if requesting too many REST calls at one time. */

		// Setup a cloned structure that will be modified with a full menus array (menusCollection)
		// Setup a menusCollection array that we will populate with all menus manually
		const menusCollection = [];
		let clonedStructure = null;

		let promissArr = allMenus.map(async ({ slug }) => {
			// NOTE: This method can return null when no usable menu is found - that method will log out those causes
			let appendingMenu = await getMenuDetailBySlug(slug);

			if (appendingMenu !== null) {
				menusCollection.push(appendingMenu.menus.nodes[0]);

				// We want to get an initial structure to then inject all menus into
				if (clonedStructure === null) {
					clonedStructure = JSON.parse(JSON.stringify(appendingMenu));
				}
			}
		});

		await Promise.all(promissArr);

		// Use the initial structure to then inject all menus into
		clonedStructure.menus.nodes = menusCollection;

		// Write it to disk
		const menusJSON = JSON.stringify(clonedStructure.menus);
		await fs.writeFile('public/menusData.json', menusJSON);

		console.log('menu-generator: generating file completed!');
	} catch (error) {
		console.error('Script execution failed:', error.message);
		process.exit(1); // Exit with a non-zero status code to fail the build
	}
}

// Run the script
generateMenusData();
