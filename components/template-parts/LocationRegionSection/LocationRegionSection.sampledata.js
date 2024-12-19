const card = {
	country: 'Austria',
	city: 'vienna',
	locationName: 'Tricentis GmbH',
	address: 'Address block',
	email: 'email@email.com',
	phone: '+43 1 263 24 09 – 0',
	fax: '+43 1 263 24 09 – 15',
};

export const LocationsSampleData = {
	region: [{
			regionName: 'EMEA',
			locations: [{
					...card
				},
				{
					...card,
					country: 'Belgium'
				},
				{
					...card,
					country: 'Czech Republic'
				},
				{
					...card,
					country: 'Denmark'
				},
				{
					...card,
					country: 'France'
				},
				{
					...card,
					country: 'Belgium'
				},
				{
					...card,
					country: 'Germany'
				},
				{
					...card,
					country: 'Hungary'
				},
				{
					...card,
					country: 'Israel'
				},
				{
					...card,
					country: 'Poland'
				},
				{
					...card,
					country: 'Sweden'
				},
				{
					...card,
					country: 'Switzerland'
				},
				{
					...card,
					country: 'The Netherlands'
				},
				{
					...card,
					country: 'United Kingdomum'
				},
			]
		},
		{
			regionName: 'North America',
			locations: [{
					...card,
					country: 'Denmark'
				},
				{
					...card,
					country: 'France'
				},
				{
					...card,
					country: 'Belgium'
				},
				{
					...card,
					country: 'Germany'
				},
				{
					...card,
					country: 'Hungary'
				},
				{
					...card,
					country: 'Israel'
				},
				{
					...card,
					country: 'Poland'
				},
				{
					...card,
					country: 'Sweden'
				},
				{
					...card,
					country: 'Switzerland'
				},
				{
					...card,
					country: 'The Netherlands'
				},
				{
					...card,
					country: 'United Kingdomum'
				},
			]
		}
	]
}