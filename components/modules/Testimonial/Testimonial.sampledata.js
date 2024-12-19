const testimonial = {
	testimonialText: `"We've now used Tricentis test automation for 3 years for many enhancement pack and support pack upgrades, as well as for our SAP S/4HANA migration. With the need to release more frequently across different applications in the landscape, it is imperative that you have an automation framework that lets you accelerate testing. Manual testing is simply not scalable. Test automation reduced testing time 93% and reduced testing costs 35%."`,
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/CustomerSuccessExampleImage1.jpg',
		alt: 'Customer Success Image',
	},
	logo: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/image-18.png',
		alt: 'Customer Success Logo',
	},
	authorName: 'Arnab Mukherjee',
	authorTitle: 'Manager Enterprise Applications',
	authorCompany: 'Varian',
	buttons: {
		alignment: 'left',
		buttons: [
			{
				buttonStyle: 'TertiaryReverse',
				buttonText: 'View success story',
				link: 'https://www.google.com#primary',
			},
		],
	},
};

export const Testimonial_Basic = {
	testimonials: [
		{
			testimonialText: `"We've now used Tricentis test automation for 3 years for many enhancement pack and support pack upgrades, as well as for our SAP S/4HANA migration. With the need to release more frequently across different applications in the landscape, it is imperative that you have an automation framework that lets you accelerate testing. Manual testing is simply not scalable. Test automation reduced testing time 93% and reduced testing costs 35%."`,
		},
	],
};

export const Testimonial_Slider = {
	testimonials: [
		{ ...testimonial },
		{
			...testimonial,
			testimonialText: `"With NeoLoad frameworks, the 'rules' change the parameters automatically and correctly for each test iteration. So the [update maintenance] effort is not as great as with JMeter. We have reduced the maintenance for each test set from 20 man-days to four to five hours. We’ve gone from executing four test cases a year to about 365 — a 90X increase. And we now cover 7X more systems."`,
		},
	],
};
