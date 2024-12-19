const GlobalConstants = {
	General: {
		SiteTitle: 'Tricentis',
		CopyrightYear: '2023', // for footer
	},
	ROIResultsPageID: 14434,

	/**
	 * Language section start
	 * When adding a new language, make sure to update all of the language-related constants
	 */

	Languages: {
		English: 'En',
		German: 'De',
		France: 'Fr',
		Korean: 'Ko',
		Japanese: 'Ja',
	},

	LanguageCodeMap: {
		En: {
			wpmlLanguage: 'en',
		},
		De: {
			wpmlLanguage: 'de',
		},
		Fr: {
			wpmlLanguage: 'fr',
		},
		Ko: {
			wpmlLanguage: 'ko',
		},
		Ja: {
			wpmlLanguage: 'ja',
		},
	},

	LanguageMappings: {
		'en-US': 'en-US',
		de_DE: 'de',
		fr_FR: 'fr',
		ko_KO: 'ko',
		ja_JA: 'ja',
	},

	Locales: ['en', 'de', 'fr', 'ko', 'ja'],

	LangCodeList: {
		En: 'en-US',
		De: 'de',
		Fr: 'fr',
		Ko: 'ko',
		Ja: 'ja',
	},

	LangDbCodeList: {
		En: 'en_US',
		De: 'de_DE',
		Fr: 'fr_FR',
		Ko: 'ko_KO',
		Ja: 'ja_JA',
	},

	/**
	 * Language section end
	 */

	DefaultLocale: 'en',
	postType: {
		news: {
			PressReleases: 'Press releases',
			InTheNews: 'In the news',
		},
		taxonomies: {
			Region: 'Regions',
			ResourceIndustry: 'Industries',
			ResourceProduct: 'Products',
			ResourceTopic: 'Topics',
			Partnertype: 'Partners',
			PartnerCertification: 'Partners Certificates',
			ResourceType: 'Resource Type',
			Learntype: 'Topics',
		},
	},
	Options: {
		BuildDevPages: false, // This should be false for production
		QuerySEOFields: true,
		UseCachedGlobalSettingsForPreviews: true,

		// NOTE:: backend will override the `first` query count if it is greater than graphql_connection_max_query_amount
		// so we should set this to match the backend limit
		MaxQuerySize: 3000,

		// for some content types we only render the XX most recent (ex: blogs, resources)
		BlogPartialLimit: 20,
		ResourcePartialLimit: 20,
		ExploreProductPartialLimit: 20,
	},
	Archive: {
		ResultsPerPage: 24, // how many results to show per page
		DefaultPrevNextShown: 2, // default for how many prev/next links to show around current page
	},
	Search: {
		ResultsPerPage: 20,
		MinSearchQueryLength: 3,
	},
	FrontendRoutes: {
		Blog: 'blog',
		BlogCategory: 'blog/category',
		CaseStudies: 'case-studies',
		Events: 'events',
		ExploreProducts: 'explore-products',
		FormPreferenceCenter: 'preference-center',
		FormContactUs: 'contact-us',
		LandingPages: 'lp',
		Learn: 'learn',
		LearnTopic: 'learn/topic',
		News: 'news',
		Partners: 'partners',
		Products: 'products',
		ProductTours: 'product-tours',
		Resources: 'resources',
		ROICalculatorMain: 'test-automation-roi-results',
		Search: 'search',
		TeamMembers: 'team',
		TrialsDemo: 'software-testing-tool-trial-demo',
		NewsArchive: 'all-news',
		ToscaCheckUser: 'tosca/check-user',
		ToscaCreateUser: 'tosca/create-user',
		ToscaEmailVerification: 'tosca/email-verification',
		ToscaStartTrial: 'tosca/start-trial',
		ServiceObjectsEmailVerification: 'service-objects/email',
		ServiceObjectsPhoneVerification: 'service-objects/phone-number',
		// qTest endpoints
		qTestValidateDomain: 'qTest/rest/validate-domain',
		qTestSignupTrial: 'qTest/rest/signup-trial',
	},
	BackendRoutes: {},
	// if we match on any of these we adjust the link to be relative and remove the host portion
	BackendHostUrls: [
		// 'https://tricentis.local/',
		// 'https://dev-tricentis-backend.pantheonsite.io/',
		// 'https://develop-tricentis-backend.pantheonsite.io/',
		// 'https://test-tricentis-backend.pantheonsite.io/',
		// 'https://live-tricentis-backend.pantheonsite.io/',
		// 'https://be-develop.tricentis.com/',
		// 'https://be-dev.tricentis.com/',
		// 'https://be-test.tricentis.com/',
		// 'https://be.tricentis.com/',
		'https://triapinenew.wpenginepowered.com/',
		'https://tricstaging.wpenginepowered.com/',
		'https://tribedevelop.wpenginepowered.com'
	],
	Footer: {
		FooterLogo: '/tricentis-logo.svg',
		CTAFallbackLink: '/',
		TwitterFallbackUrl: 'https://www.twitter.com/tricentis',
		FacebookFallbackUrl: 'https://www.facebook.com/tricentis',
		LinkedInFallbackUrl: 'https://www.linkedin.com/company/tricentis',
		ShiftsyncFallbackUrl: 'https://shiftsync.tricentis.com/',
		YoutubeFallbackUrl: 'https://www.youtube.com/user/Tricentis',
	},
	ServiceNow: {
		// ClientId: 'cff2aa1abc58e9103e7e928c5a9d2d8e',
		// ClientSecret: 'B3,-evR*T9',
		url: process.env.SERVICE_NOW_URL,
		ClientId: process.env.SERVICE_NOW_CLIENT_ID,
		ClientSecret: process.env.SERVICE_NOW_CLIENT_SECRET,
	},
	Marketo: {
		// ClientId: 'c742de46-5e8b-4894-b5b6-47f0ca03412f',
		// ClientSecret: 'RLU5MP56AWw8ecY93vOpIQw7bQUNIVbZ',
		ClientId: process.env.MARKETO_CLIENT_ID,
		ClientSecret: process.env.MARKETO_CLIENT_SECRET,
	},
	intercomURLs: ['/', '/products/automate-continuous-testing-tosca'],
	VideoBaseUrl: 'https://tricentis-video.wistia.com/medias/',
};

module.exports = GlobalConstants;
