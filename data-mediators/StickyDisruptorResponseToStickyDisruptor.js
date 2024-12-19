export const stickyDisruptorData = (data) => {
	return  ({
		title: data.stickyDisruptorTitle,
		description: data.stickyDisruptorContent,
		titleType: 'h5',
		buttons: {
			alignment: 'right',
			buttons: [
				{
					buttonStyle: 'TertiaryReverse',
					buttonText: data.stickyDisruptorLink.title,
					link: data.stickyDisruptorLink.url,
					target: data.stickyDisruptorLink.target,
				},
			],
		},
		background: {
			type: 'gradient',
			color: 'warp',
		},
	});
};
