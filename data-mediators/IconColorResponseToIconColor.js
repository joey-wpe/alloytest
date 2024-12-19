// import ColorVariables from '../sstyles/_variables.module.scss';
// import styles from '../styles/pages/Home.module.scss';
export const IconFillColorResponseToIconFillColor = (iconColor) => {
	// console.log(ColorVariables);
	let iconFill = '';
	if (iconColor === 'tricentis_blue' || iconColor === 'blue') {
		iconFill = 'blue';
	}
	if (iconColor === 'warp') {
		iconFill = 'warp';
	}
	if (iconColor === 'blaze') {
		iconFill = 'blaze';
	}
	if (iconColor === 'accelerate') {
		iconFill = 'accelerate';
	}
	if (iconColor === 'thruster') {
		iconFill = 'thruster';
	}
	if (iconColor === 'bolt') {
		iconFill = 'bolt';
	}
	if (iconColor === 'white') {
		iconFill = 'white';
	}
	return iconFill;
};
