const CachedGlobalSettingsResponse = {
	themeGeneralSettings: {
		__typename: 'ThemeGeneralSettings',
		settingsAlerts: {
			__typename: 'ThemeGeneralSettings_Settingsalerts',
			globalAlertDisplay: null,
			alertGroup: {
				__typename: 'ThemeGeneralSettings_Settingsalerts_AlertGroup',
				globalAlertContentMessage: 'Global alert message',
				globalAlertContentAlertType: 'company_alerts',
				globalAlertContentActions: [
					{
						__typename: 'ThemeGeneralSettings_Settingsalerts_AlertGroup_globalAlertContentActions',
						adaText: 'Alert global ada Text 3',
						function: 'default',
						seoText: 'Alert global SEO text 3',
						link: {
							__typename: 'AcfLink',
							target: '',
							title: 'Dino Flintstone',
							url: 'https://triapinenew.wpenginepowered.com/?post_type=team_member&p=776',
						},
					},
				],
			},
		},
		settingsSocial: {
			__typename: 'ThemeGeneralSettings_Settingssocial',
			globalSocialChannels: [
				{
					__typename: 'ThemeGeneralSettings_Settingssocial_globalSocialChannels',
					title: 'Twitter',
					website: 'https://twitter.com/Tricentis?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
				},
				{
					__typename: 'ThemeGeneralSettings_Settingssocial_globalSocialChannels',
					title: 'Facebook',
					website: 'https://www.facebook.com/TRICENTIS/',
				},
				{
					__typename: 'ThemeGeneralSettings_Settingssocial_globalSocialChannels',
					title: 'LinkedIn',
					website: 'https://www.linkedin.com/company/tricentis-technology-&-consulting-gmbh/',
				},
			],
		},
		settingsFooter: {
			__typename: 'ThemeGeneralSettings_Settingsfooter',
			globalFooterCtaDisplay: true,
			callToActionGroup: {
				__typename: 'ThemeGeneralSettings_Settingsfooter_CallToActionGroup',
				titleText: 'Get started with Tricentis',
				backgroundColor: 'none',
				backgroundPattern: 'blaze_pattern',
				backgroundType: 'pattern',
				backgroundImage: {
					__typename: 'ThemeGeneralSettings_Settingsfooter_CallToActionGroup_BackgroundImage',
					image: null,
					mobileImage: null,
				},
				description: null,
				paddingBottom: 'default',
				paddingTop: 'default',
				actions: [
					{
						__typename: 'ThemeGeneralSettings_Settingsfooter_CallToActionGroup_actions',
						adaText: 'CTA ada',
						seoText: 'CTA seo',
						display: 'button--outline',
						function: 'default',
						link: {
							__typename: 'AcfLink',
							target: '',
							title: 'Get started',
							url: '/software-testing-tool-trial-demo/',
						},
					},
				],
			},
			footerGroup: {
				__typename: 'ThemeGeneralSettings_Settingsfooter_FooterGroup',
				adaText: null,
				seoText: null,
				footerDescription: 'Send your testing into overdrive',
				function: 'default',
				link: {
					__typename: 'AcfLink',
					target: '',
					title: 'Get a demo or trial',
					url: '/software-testing-tool-trial-demo/',
				},
			},
		},
		settingsHeader: {
			__typename: 'ThemeGeneralSettings_Settingsheader',
			globalHeaderColorLogo: {
				__typename: 'MediaItem',
				mediaItemUrl: 'https://triapinenew.wpenginepowered.com/wp-content/uploads/2022/08/tricentis-Logo.png',
				altText: 'logo',
			},
			globalHeaderLogo: {
				__typename: 'MediaItem',
				altText: 'logo',
				mediaItemUrl: 'https://triapinenew.wpenginepowered.com/wp-content/uploads/2022/08/tricentis-Logo.png',
			},
			flagCta: {
				__typename: 'AcfLink',
				target: '',
				title: '[Preview]',
				url: '/software-testing-tool-trial-demo/',
			},
		},
	},
	menus: {
		__typename: 'RootQueryToMenuConnection',
		nodes: [
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['FOOTER_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Unternehmen',
							url: '/de/unternehmen/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/de/unternehmen/careers/',
										label: 'Karriere',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/de/unternehmen/newsroom/?tax-term=pressemitteilungen',
										label: 'Neuigkeiten',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/company/management-team/',
										label: 'Management',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/partner-overview/',
										label: 'Partner',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/company/community-projects/',
										label: 'Community',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/company/security/',
										label: 'Sicherheit',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Support und Services',
							url: '/de/customer-experience/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: 'https://support-hub.tricentis.com/open',
										label: 'Customer Support',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/academy/',
										label: 'Training',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/transformation/',
										label: 'Transformation Toolkit',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: 'https://feedback.tricentis.com/',
										label: 'Produkt-Feedback',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Ressourcen',
							url: '/de/ressourcen/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/de/kundenreferenzen/',
										label: 'Kunden',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Guides & White Papers',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Webinare & Videos',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/podcast/',
										label: 'Podcasts',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/de/blog/',
										label: 'Blog',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: 'https://virtualsummit.tricentis.com/',
										label: 'Virtual Summit',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Veranstaltungen',
							url: '/events/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/virtual-summit-highlights/',
										label: 'Veranstaltungs-Highlights',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Kunden:Forum 2022',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Kontakt',
							url: '/de/kontakt/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/de/software-testing-tool-trial-demo/',
										label: 'Demos & Testversionen',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/locations/',
										label: 'Standorte',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['FOOTER_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Company',
							url: '/company/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/company/careers/',
										label: 'Careers',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/news/',
										label: 'News',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/team/',
										label: 'Team',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/partners/',
										label: 'Partners',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/company/community-projects/',
										label: 'Community projects',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/company/security/',
										label: 'Security',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Services & Support (p)',
							url: '/customer-experience/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: 'https://support-hub.tricentis.com/open',
										label: 'Customer support',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/academy/',
										label: 'Training',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/transformation/',
										label: 'Transformation toolkit',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: 'https://feedback.tricentis.com/',
										label: 'Product feedback',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Resources',
							url: '/resources/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/case-studies/',
										label: 'Case studies',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/resources/?tri-resource-type=white-papers#archive-results',
										label: 'Guides & White Papers',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/resources/?tri-resource-type=webinars#archive-results',
										label: 'Webinars & Videos',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/podcast/',
										label: 'Podcast',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'eBooks',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/blog/',
										label: 'Blog',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Events',
							url: '/events/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: 'https://events.tricentis.com/roadshows2022',
										label: 'Roadshow',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Upcoming webinars',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/virtual-summit-highlights/',
										label: 'Recent conference highlights',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Contact us',
							url: '/contact-us/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/software-testing-tool-trial-demo/',
										label: 'Demos & Trials',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: 'https://triapinenew.wpenginepowered.com/locations/',
										label: 'Locations',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['PRICING_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Contact',
							url: '/contact-us/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Customer awards',
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['PRICING_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Kontakt',
							url: '/de/kontakt/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Contact us',
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'fr',
				locations: ['PRICING_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Contact',
							url: '/fr/nous-contacter/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Contact',
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['PRODUCT_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Products',
							url: '/products/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Test automation',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/products/automate-continuous-testing-tosca/',
													label: 'Tricentis Tosca',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Intelligent test automation',
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/products/data-integrity/',
													label: 'Tricentis Data Integrity',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Data integrity testing',
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/products/test-automation-web-apps-testim/',
													label: 'Tricentis Testim',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Custom web app testing',
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/products/test-automation-servicenow/',
													label: 'Tricentis Test Automation',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'for ServiceNow',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Performance testing',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/products/performance-testing-neoload/',
													label: 'Tricentis NeoLoad',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Performance testing',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Test management',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/products/unified-test-management-qtest/',
													label: 'Tricentis qTest',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Unified test management',
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/products/test-management-for-jira/',
													label: 'Tricentis Test Management',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'for Jira',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Data validation',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/products/digital-validation-vera/',
													label: 'Tricentis Vera',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Data Validation for Life Sciences',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Smart impact analysis',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/products/impact-analysis-livecompare/',
													label: 'Tricentis LiveCompare',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Smart impact analysis',
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt:
							'Read our product updates blog to learn about the coolest and newest features in our product releases.',
						prehead: 'What’s New',
						title: 'Product release updates',
						url: 'https://fe-live.tricentis.com/product-updates/',
						backgroundImage: null,
					},
				},
				MenusACF: {
					__typename: 'Menu_Menusacf',
					globalCta: { __typename: 'AcfLink', target: '', title: 'Explore the platform', url: '/products/' },
				},
			},
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['PRODUCT_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Produkte',
							url: '/de/plattform/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Test automation',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/plattform/automate-continuous-testing-tosca/',
													label: 'Tricentis Tosca',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Intelligente Testautomatisierung',
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/plattform/datenintegritaetstests/',
													label: 'Tricentis Data Integrity',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Data Integrity Tests',
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/plattform/test-automation-servicenow/',
													label: 'Tricentis für ServiceNow',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'App-native Tests',
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/products/test-automation-web-apps-testim/',
													label: 'Tricentis Testim',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Testen von benutzerdefinierten Webanwendungen',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Performance tests',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/plattform/performancetests-neoload/',
													label: 'Tricentis NeoLoad',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Performance-Tests',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'SMART IMPACT ANALYSE',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/plattform/ai-powered-impact-analysis-for-sap/',
													label: 'Tricentis LiveCompare',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Intelligente Auswirkungsanalyse',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'TESTMANAGEMENT',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/plattform/agile-dev-testing-qtest-ubersichtsseite/',
													label: 'Tricentis qTest',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: 'Testmanagement und Analytik',
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '/de/plattform/digitale-validierung-vera/',
										label: 'DIGITALE VALIDIERUNG',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/plattform/digitale-validierung-vera/',
													label: 'Tricentis Vera',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: 'Featured',
						title: 'Product updates',
						url: 'https://fe-live.tricentis.com/product-updates/',
						backgroundImage: null,
					},
				},
				MenusACF: {
					__typename: 'Menu_Menusacf',
					globalCta: { __typename: 'AcfLink', target: '', title: 'Explore all products', url: '/de/plattform/' },
				},
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['RESOURCES_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Resources',
							url: '/resources/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Resources',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/case-studies/',
													label: 'Case studies',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-type=white-papers#archive-results',
													label: 'Guides & white papers',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-type=webinars#archive-results',
													label: 'Webinars & videos',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/podcast/',
													label: 'Podcasts',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/blog/',
													label: 'Blog',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/',
													label: 'Explore more',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: ['Secondary'],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Popular Topics',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=professional-trends#archive-results',
													label: 'Best practices',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=devops-testing#archive-results',
													label: 'DevOps',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=transformation#archive-results',
													label: 'Transformations',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=testing-scalability-efficiency#archive-results',
													label: 'Scalability & efficiency',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=future-of-testing#archive-results',
													label: 'The future of testing',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Events',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: 'https://events.tricentis.com/roadshows2022',
													label: 'Roadshow 2022',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/events/',
													label: 'Upcoming webinars',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://virtualsummit.tricentis.com/',
													label: 'Virtual summit',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/virtual-summit-highlights/',
													label: 'Past conference highlights',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/events/',
													label: 'View all events',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: ['Secondary'],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt:
							'Watch a video of our recent Virtual Summit, where we shared the latest from top thinkers in Agile, DevOps, cloud migration, enterprise applications, and more.',
						prehead: 'Featured Event',
						title: 'Tricentis Virtual Summit',
						url: 'https://google.com',
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['RESOURCES_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Ressourcen',
							url: '/de/ressourcen/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'RESSOURCEN',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/kundenreferenzen/',
													label: 'Kunden',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/ressourcen/?tri-resource-type=whitepaper#archive-results',
													label: 'Guides & White Papers',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-type=webinars#archive-results',
													label: 'Webinare & Videos',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/podcast/',
													label: 'Podcasts',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/blog/',
													label: 'Blog',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'BELIEBTE THEMEN',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/ressourcen/?tri-resource-topics=devops-testing-de#archive-results',
													label: 'DevOps',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '#',
													label: 'Transformation',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=testing-scalability-efficiency#archive-results',
													label: 'Skalierbarkeit & Effizienz',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=future-of-testing#archive-results',
													label: 'Die Zukunft des Testens',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=professional-trends#archive-results',
													label: 'Best practices',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Veranstaltungen',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '#',
													label: 'Geplante Webinare',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://virtualsummit.tricentis.com/',
													label: 'Virtual Summit',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/ressourcen/?tri-resource-type=kunden-forum#archive-results',
													label: 'Kunden:Forum 2022',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/virtual-summit-highlights/',
													label: 'Virtual Summit Highlights',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/events/',
													label: 'Alle Veranstaltungen >',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Learn more about resources',
						url: 'https://fe-live.tricentis.com/de/ressourcen/',
						backgroundImage: null,
					},
				},
				MenusACF: {
					__typename: 'Menu_Menusacf',
					globalCta: { __typename: 'AcfLink', target: '', title: 'Mehr erfahren', url: '/de/ressourcen/' },
				},
			},
			{
				__typename: 'Menu',
				language: 'fr',
				locations: ['RESOURCES_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Ressources',
							url: '/fr/ressources',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'RESSOURCES',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/case-studies/',
													label: 'Études de cas',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/ressources/?tri-resource-type=white-papers-fr#archive-results',
													label: 'Guides & livres blancs',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-type=webinars#archive-results',
													label: 'Webinaires & vidéos',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/podcast/',
													label: 'Podcasts (En)',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/blog/',
													label: 'Blog (En)',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: "SUJETS D'ACTUALITÉ",
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=devops-testing#archive-results',
													label: 'DevOps',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '#',
													label: 'Transformations',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=testing-scalability-efficiency#archive-results',
													label: 'Montée en charge et efficacité',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=future-of-testing#archive-results',
													label: "L'avenir des tests",
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/resources/?tri-resource-topics=professional-trends#archive-results',
													label: 'Bonnes pratiques',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Événements',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '#',
													label: 'Prochains webinaires',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/virtual-summit-highlights/',
													label: 'Événements passés marquants',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://virtualsummit.tricentis.com/',
													label: 'Virtual Summit',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/events/',
													label: 'Tous les événements',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Learn more about resources',
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: {
					__typename: 'Menu_Menusacf',
					globalCta: { __typename: 'AcfLink', target: '', title: 'Aller plus loin', url: '/fr/ressources/' },
				},
			},
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['SECONDARY_FOOTER_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Privacy Policy',
							url: '/de/privacy-policy/#kontakt',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Datenschutzbestimmungen',
							url: 'http://Datenschutzbestimmungen%20/de/privacy-policy/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Impressum',
							url: '/legal-information/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Rechtliche Hinweise',
							url: '/legal-information/contracts/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Sitemap',
							url: '/sitemap/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'fr',
				locations: ['SECONDARY_FOOTER_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Ne pas vendre mes données personnelles',
							url: '/fr/privacy-policy/#contact',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Confidentialité',
							url: '/fr/privacy-policy/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Mentions légales (En)',
							url: '/legal-information/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Conditions générales',
							url: '/legal-information/contracts/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Plan du site',
							url: '/sitemap/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['SECONDARY_FOOTER_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Do Not Sell My Personal Information',
							url: '/legal-information/privacy-policy/#contact',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Privacy Policy (live data)',
							url: '/legal-information/privacy-policy/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Legal Information',
							url: '/legal-information/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Terms and Conditions',
							url: '/legal-information/contracts/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Sitemap',
							url: '/sitemap/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['SERVICE_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Services & Support',
							url: '/customer-experience/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Get started',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/customer-experience/consulting/',
													label: 'Consulting services',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/business-value-calculator/',
													label: 'Calculate business value',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/',
													label: 'Transformation toolkit',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/continuous-testing-maturity-assessment/',
													label: 'Maturity assessment',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/framework/',
													label: 'Follow a framework',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Build skills',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/academy/',
													label: 'Academy training',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/academy/training-certifications/',
													label: 'Certifications',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://academy.tricentis.com/page/live-events',
													label: 'Training events',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Get support',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: 'https://support-hub.tricentis.com/open',
													label: 'Customer support',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/customer-experience/success/',
													label: 'Customer success team',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://documentation.tricentis.com/',
													label: 'Documentation',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://feedback.tricentis.com/',
													label: 'Product feedback',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt:
							'When you modernize your current software testing practices and tools, you enable greater speed to market, reduced risk, and lower costs. Here are 8 steps to help you modernize your testing organization.',
						prehead: 'Featured ',
						title: 'Modernize testing in 8 steps',
						url: 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com/transformation/framework/modernizing-testing-in-8-steps/',
						backgroundImage: null,
					},
				},
				MenusACF: {
					__typename: 'Menu_Menusacf',
					globalCta: { __typename: 'AcfLink', target: '', title: 'View more services', url: '/customer-experience/' },
				},
			},
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['SERVICE_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Support und Services',
							url: '/de/customer-experience/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'LOSLEGEN',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/transformation/business-value-calculator/',
													label: 'Geschäftswert berechnen',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/customer-experience/consulting/',
													label: 'Consulting',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/',
													label: 'Transformation-Toolkit',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/continuous-testing-maturity-assessment/',
													label: 'Maturity assessment',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/framework/',
													label: 'Framework folgen',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'KOMPETENZEN ERWEITERN',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/academy/',
													label: 'Academy-Kurse',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/academy/training-certifications/',
													label: 'Zertifizierungen',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://academy.tricentis.com/page/live-events',
													label: 'Training & Events',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'SUPPORT ERHALTEN',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: 'https://support-hub.tricentis.com/open',
													label: 'Customer support portal',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://documentation.tricentis.com/',
													label: 'Dokumentation',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://feedback.tricentis.com/',
													label: 'Produkt-Feedback',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/customer-experience/success/',
													label: 'Customer success team',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Learn more about support and services',
						url: 'https://support-hub.tricentis.com/open',
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'fr',
				locations: ['SERVICE_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Support et services',
							url: '/fr/experience-client-de-tricentis/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'COMMENCER',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/transformation/business-value-calculator/',
													label: 'Calculer la valeur commerciale',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/experience-client-de-tricentis/conseil/',
													label: 'Services de conseil',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/',
													label: 'Kit de transformation',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/continuous-testing-maturity-assessment/',
													label: 'Évaluation de la maturité',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/transformation/framework/',
													label: 'Suivre un framework',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'MONTER EN COMPÉTENCES',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/academy/',
													label: 'Tricentis Academy',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/academy/training-certifications/',
													label: 'Certifications (En)',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: null,
													label: 'Formation en direct (En)',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'GET SUPPORT',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: 'https://support-hub.tricentis.com/open',
													label: 'Portail de support (En)',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://documentation.tricentis.com/',
													label: 'Documentation',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'https://feedback.tricentis.com/',
													label: 'Commentaires sur les produits',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/experience-client-de-tricentis/succes/',
													label: 'Équipe de la réussite client',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Support et services',
						url: 'https://fe-live.tricentis.com/fr/experience-client-de-tricentis/',
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['SOLUTIONS_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Solutions',
							url: '#',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'By Industry',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/solutions/energy/',
													label: 'Energy & Utilities',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/solutions/financial-services/',
													label: 'Financial Services & Insurance',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/solutions/government/',
													label: 'Government',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/solutions/healthcare/',
													label: 'Healthcare & Life Sciences',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/solutions/technology/',
													label: 'Technology',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/solutions/telecom/',
													label: 'Telecom',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'By Application',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/sap/',
													label: 'SAP',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/salesforce/',
													label: 'Salesforce',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/enterprise-applications/servicenow-testing/',
													label: 'ServiceNow',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/enterprise-applications/oracle-testing/',
													label: 'Oracle',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/enterprise-applications/snowflake-testing/',
													label: 'Snowflake',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/enterprise-applications/workday-testing/',
													label: 'Workday',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/enterprise-applications/',
													label: 'View more apps',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: ['Secondary'],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'By Use case',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/hp-micro-focus-migration/',
													label: 'Replace legacy tools',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/solutions/cloud-migration/',
													label: 'Cloud migration & delivery',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/why-tricentis/speed/',
													label: 'Improve speed',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/why-tricentis/save/',
													label: 'Reduce cost',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt:
							'How leading organizations are extending quality strategies across the enterprise application landscape, from SAP to Salesforce and beyond',
						prehead: 'Featured Article',
						title: 'The rise of enterprise application testing',
						url: 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com/resources/enterprise-application-testing-trends/',
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['SOLUTIONS_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Lösungen',
							url: '/solutions/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Branchen',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/solutions/energy/',
													label: 'Energie & Versorgungswirtschaft',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/financial-services/',
													label: 'Finanzdienstleistungen',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/oeffentlicher-sektor/',
													label: 'Öffentlicher Sektor',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/gesundheitswesen/',
													label: 'Gesundheitswesen',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/technologie/',
													label: 'Technologie',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/telecom/',
													label: 'Telekommunikation',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Enterprise Apps',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/sap/',
													label: 'SAP',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/salesforce/',
													label: 'Salesforce',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/servicenow-testing/',
													label: 'ServiceNow',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/snowflake-testing/',
													label: 'Snowflake',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/oracle-testing/',
													label: 'Oracle',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/solutions/workday-testing/',
													label: 'Workday',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Nach Anwendung',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/de/hp-micro-focus-migration/',
													label: 'Veraltete Tools ersetzen',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/solutions/cloud-migration/',
													label: 'Cloud-Migration & Bereitstellung',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/warum-tricentis/geschwindigkeit/',
													label: 'Geschwindigkeit verbessern',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/de/warum-tricentis/save/',
													label: 'Kosten senken',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Learn more about our enterprise apps',
						url: 'https://fe-live.tricentis.com/de/enterprise-applications/',
						backgroundImage: null,
					},
				},
				MenusACF: {
					__typename: 'Menu_Menusacf',
					globalCta: {
						__typename: 'AcfLink',
						target: '',
						title: 'Alle Unternehmensanwendungen >',
						url: '/de/enterprise-applications/',
					},
				},
			},
			{
				__typename: 'Menu',
				language: 'fr',
				locations: ['SOLUTIONS_MEGAMENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Solutions',
							url: '/fr/solutions/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '#',
										label: 'Par secteur',
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/fr/solutions/energie/',
													label: 'Eau, énergie et assainissement',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/solutions/services-financiers/',
													label: 'Services financiers',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/solutions/gouvernement/',
													label: 'Secteur public',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/solutions/sante/',
													label: 'Santé et sciences de la vie',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/solutions/technologie/',
													label: 'Technologie',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/solutions/telecom/',
													label: 'Télécom',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: "Par application d'entreprise",
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/fr/sap/',
													label: 'SAP',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/salesforce/',
													label: 'Salesforce',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/enterprise-applications/tests-servicenow',
													label: 'ServiceNow',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: 'http://ServiceNow%20/fr/enterprise-applications/tests-servicenow%20Snowflake%20/fr/enterprise-applications/tests-snowflake',
													label: 'Snowflake',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/enterprise-applications/tests-oracle/',
													label: 'Oracle',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/enterprise-applications/workday-testing/',
													label: 'Workday',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/enterprise-applications/',
													label: 'Voir toutes les applications >',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
									{
										__typename: 'MenuItem',
										url: '#',
										label: "Par cas d'usage",
										target: null,
										childItems: {
											__typename: 'MenuItemToMenuItemConnection',
											nodes: [
												{
													__typename: 'MenuItem',
													url: '/fr/migration-micro-focus/',
													label: 'Remplacer les outils hérités',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/solutions/cloud-migration/',
													label: 'Migrer vers le Cloud',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/pourquoi-tricentis/vitesse/',
													label: 'Gagner en rapidité',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
												{
													__typename: 'MenuItem',
													url: '/fr/pourquoi-tricentis/sauver/',
													label: 'Réduire les coûts',
													target: null,
													ProductMenuLinkDescription: {
														__typename: 'MenuItem_Productmenulinkdescription',
														description: null,
													},
													cssClasses: [],
												},
											],
										},
									},
								],
							},
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: 'Learn more about solutions',
						url: 'https://fe-live.tricentis.com/fr/solutions/',
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'en',
				locations: ['TOP_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Company',
							url: '/company/',
							childItems: {
								__typename: 'MenuItemToMenuItemConnection',
								nodes: [
									{
										__typename: 'MenuItem',
										url: '/team/',
										label: 'Management team',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/company/careers/',
										label: 'Careers',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/news/',
										label: 'News',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/locations/',
										label: 'Locations',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
									{
										__typename: 'MenuItem',
										url: '/partners/',
										label: 'Partners',
										target: null,
										childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
									},
								],
							},
						},
						{
							__typename: 'MenuItem',
							label: 'Academy',
							url: '/academy/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Customer Portal',
							url: 'https://support-hub.tricentis.com/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'fr',
				locations: ['TOP_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Entreprise',
							url: '/fr/entreprise/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Academy',
							url: '/academy/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Contact',
							url: '/fr/nous-contacter/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Portail client',
							url: 'https://support-hub.tricentis.com/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
			{
				__typename: 'Menu',
				language: 'de',
				locations: ['TOP_MENU'],
				menuItems: {
					__typename: 'MenuToMenuItemConnection',
					nodes: [
						{
							__typename: 'MenuItem',
							label: 'Unternehmen',
							url: '/de/unternehmen/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Academy',
							url: '/academy/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Kontakt',
							url: '/de/kontakt/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
						{
							__typename: 'MenuItem',
							label: 'Kundenportal',
							url: 'https://support-hub.tricentis.com/',
							childItems: { __typename: 'MenuItemToMenuItemConnection', nodes: [] },
						},
					],
				},
				FeaturedArticle: {
					__typename: 'Menu_Featuredarticle',
					manualFields: {
						__typename: 'Menu_Featuredarticle_ManualFields',
						excerpt: null,
						prehead: null,
						title: null,
						url: null,
						backgroundImage: null,
					},
				},
				MenusACF: { __typename: 'Menu_Menusacf', globalCta: null },
			},
		],
	},
};

export default CachedGlobalSettingsResponse;
