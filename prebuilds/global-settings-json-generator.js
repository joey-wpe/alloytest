const fetch = require('node-fetch');
const fs = require('fs').promises;
const GlobalConstants = require('../GlobalConstants.js');
const transformGlobalSettingsRestToJson = require('../data-mediators/FormatGlobalSettingsRestToJson.js');

const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

console.log('Running script: global-settings-json-generator.js');

async function fetchAndSaveGlobalSettings() {
	try {
		// Skip the process if it's a Storybook environment
		if (process.env.STORYBOOK_ENV === 'true') {
			console.log('Skipping json-generator on Storybook environment');
			return;
		}

		/* Intentionally not using Promise.all() to improve build stability as this
		   seems to overwhelm the backend if requesting too many REST calls at one time. */
		for (const locale of GlobalConstants.Locales) {
			const globalSettingsEndpoint = `${process.env.BACKEND_SERVER}/wp-json/acf/v3/options/options/?lang=${locale}`;

			try {
				const response = await fetch(globalSettingsEndpoint, {
					method: 'GET',
				});

				if (!response.ok) {
					throw new Error(`Error fetching global settings data for locale ${locale}. Status: ${response.status}`);
				}

				const fileName = locale === 'en' ? 'public/globalSettings.json' : `public/globalSettings-${locale}.json`;
				console.log(`Generating file: ${fileName}`);

				const restResponse = await response.json();
				const jsonResponse = transformGlobalSettingsRestToJson(restResponse);
				const themeGeneralSettingsJSON = JSON.stringify(jsonResponse.themeGeneralSettings);

				await fs.writeFile(fileName, themeGeneralSettingsJSON);
			} catch (error) {
				console.error(`Error fetching global settings data for locale ${locale}:`, error.message);
				throw error; // Re-throw to be caught by the outer try-catch
			}
		}
	} catch (error) {
		console.error('Script execution failed:', error.message);
		process.exit(1); // Exit with a non-zero status code to fail the build
	}
}

// Run the script
fetchAndSaveGlobalSettings();
