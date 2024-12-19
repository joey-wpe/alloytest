export const FooterCTA_SampleData_ImageBackground = {
	title: 'Experience the difference',
	description:
		'Ready to transform the way you test? Try our products out for free and discover the power of automation.',
	ctaFlagOrButtons: 'CtaFlags',
	flagStyle: 'secondary',
	flagCtaUrl: 'https://www.google.com#flag-cta',
	flagCtaTitle: 'Get a demo or trial',
	background: {
		desktopBackgroundImage:
			'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/code-background.jpg',
		mobileBackgroundImage: `https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/footer-sample-background.png`,
		type: 'image',
		color: 'blaze',
	},
};

export const FooterCTA_SampleData_BlueBackground = {
	title: 'Erleben Sie den Unterschied',
	description:
		'Ready to transform the way you test? Try our products out for free and discover the power of automation.',
	ctaFlagOrButtons: 'CtaFlags',
	flagStyle: 'secondary',
	flagCtaUrl: 'https://www.google.com#flag-cta',
	flagCtaTitle: 'Get a demo or trial',
	background: {
		type: 'pattern',
		color: 'blue',
	},
};

export const FooterCTA_SampleData_MidtoneBackground = {
	title: 'Experience the difference',
	description:
		'Ready to transform the way you test? Try our products out for free and discover the power of automation.',
	ctaFlagOrButtons: 'Buttons',
	background: {
		type: 'pattern',
		color: 'warp',
	},
	buttons: [
		{
			alignment: 'center',
			buttonStyle: 'PrimaryReverse',
			buttonText: 'Get started',
			link: 'https://www.google.com#primary',
		},
		{
			alignment: 'center',
			buttonStyle: 'TertiaryReverse',
			buttonText: 'Explore the platform',
			link: 'https://www.google.com#secondary',
		},
	],
};

export const FooterCTA_SampleData_BlueBackgroundWithButton = {
	title: 'See what you can achieve with Tricentis',
	ctaFlagOrButtons: 'Buttons',
	background: {
		type: 'pattern',
		color: 'blue',
	},
	buttons: [
		{
			alignment: 'center',
			buttonStyle: 'PrimaryReverse',
			buttonText: 'Get started',
			link: 'https://www.google.com#primary',
		},
		{
			alignment: 'center',
			buttonStyle: 'TertiaryReverse',
			buttonText: 'Explore the platform',
			link: 'https://www.google.com#secondary',
		},
	],
};

export const FooterCTA_SampleData_Homepage = {
	...FooterCTA_SampleData_ImageBackground,
	verticalSpacingTop: 'none',
	verticalSpacingBottom: 'small',
};

export const FooterCTA_SampleData_LightPattern = {
	title: 'Erleben Sie den Unterschied',
	discription:
		'Ready to transform the way you test? Try our products out for free and discover the power of automation.',
	ctaFlagOrButtons: 'CtaFlags',
	flagStyle: 'secondary',
	flagCtaUrl: 'https://www.google.com#flag-cta',
	flagCtaTitle: 'Get a demo or trial',
	background: {
		type: 'pattern',
		color: 'light',
	},
};

export const FooterCTA_SampleData_WhiteSolid = {
	title: 'Erleben Sie den Unterschied',
	discription:
		'Ready to transform the way you test? Try our products out for free and discover the power of automation.',
	ctaFlagOrButtons: 'CtaFlags',
	flagStyle: 'secondary',
	flagCtaUrl: 'https://www.google.com#flag-cta',
	flagCtaTitle: 'Get a demo or trial',
	background: {
		type: 'solid',
		color: 'white',
	},
};
