import { IconFillColorResponseToIconFillColor } from './IconColorResponseToIconColor';
export const IconColorSelectorFromBackground = (data) => {
	/* 
		We have total 3 sets of icon colors
				backgroundIconColor1
				backgroundIconColor2
				backgroundIconColor3
		They will be used on the base of background color selected.
		for example
		=> If BG color is Blaze, Blaze Pattern, Tricentis Blue or Tricentis blue pattern. then you will choose color from backgroundIconColor1
		=> if BG color is None then you have to choose color from backgroundIconColor2
		=> if BG color is Warp then you have to choose color from backgroundIconColor3
	
	*/
	let fillColor = ' ';
	if (data.backgroundColor === 'none' || data.backgroundPattern === 'none') {
		fillColor = IconFillColorResponseToIconFillColor(data.backgroundIconColor2);
	}
	if (
		data.backgroundColor === 'blaze' ||
		data.backgroundPattern === 'blaze' ||
		data.backgroundColor === 'blaze_pattern' ||
		data.backgroundPattern === 'blaze_pattern' ||
		data.backgroundColor === 'tricentis_blue' ||
		data.backgroundPattern === 'tricentis_blue' ||
		data.backgroundColor === 'tricentis_blue_pattern' ||
		data.backgroundPattern === 'tricentis_blue_pattern'
	) {
		fillColor = IconFillColorResponseToIconFillColor(data.backgroundIconColor1);
	}
	if (data.backgroundColor === 'warp') {
		fillColor = IconFillColorResponseToIconFillColor(data.backgroundIconColor3);
	}

	return fillColor;
};
