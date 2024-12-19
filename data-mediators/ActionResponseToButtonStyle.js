export function transformToButtonStyle(gqlAction) {
	// sanity check input
	if (!gqlAction) {
		console.error('ERROR: transformToButtonStyle: gqlAction is undefined');
		return 'PrimaryDefault';
	}

	// console.log('---------- gqlAction -------------');
	// console.log(gqlAction);
	// console.log('----------------------------------');

	let fillType = 'Primary';
	let colorType = 'Default';
	//                           display | color
	// solid default   => button--default, button--default
	// solid reverse   => button--default, button--reverse
	// outline default => button--outline, button--default
	// outline reverse => button--outline, button--reverse
	// text default    => button--link, button--default
	// text reverse    => button--link, button--reverse

	if (gqlAction.display === 'button--default') {
		fillType = 'Primary';
	} else if (gqlAction.display === 'button--outline') {
		fillType = 'Secondary';
	} else if (gqlAction.display === 'button--link') {
		fillType = 'Tertiary';
	} else {
		console.error('ERROR: transformToButtonStyle: gqlAction.display is not a known type', gqlAction.display);
	}

	if (gqlAction.color === 'button--default') {
		colorType = 'Default';
	} else if (gqlAction.color === 'button--reverse') {
		colorType = 'Reverse';
	} else {
		console.error('ERROR: transformToButtonStyle: gqlAction.color is not a known type', gqlAction.color);
	}

	let buttonStyle = `${fillType}${colorType}`;

	return buttonStyle;
}
