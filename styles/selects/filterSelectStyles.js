import { WhiteColor, CharcoalColor, BlazeColor, TricentisColor, AccelerateColor } from '../_variables.module.scss';

export const filterSelectStyles = (menuIsOpen) => {
	return {
		container: (provided) => ({
			...provided,
			'@media only screen and (max-width: 992px)': {
				width: '100%',
			},
		}),
		control: (provided) => ({
			...provided,
			padding: '5px 11px',
			border: 'none !important',
			backgroundColor: 'transparent',
			fontWeight: 400,
			fontSize: '14px',
			lineHeight: '21px',
			outline: 'none !important',
			boxShadow: 'none !important',
		}),
		valueContainer: (provided) => ({
			...provided,
			padding: 'initial',
		}),
		placeholder: (provided) => ({
			...provided,
			color: CharcoalColor,
		}),
		singleValue: (provided) => ({
			...provided,
			color: menuIsOpen ? TricentisColor : CharcoalColor,
		}),
		menu: (provided) => ({
			...provided,
			outline: 'none !important',
			border: '1px solid #F1F1F1',
			boxShadow: '2px 2px 10px rgba(6, 39, 57, 0.12)',
			minWidth: '237px',
			paddingRight: '0.5px;',
			zIndex: 2,
		}),
		menuList: (provided) => ({
			...provided,
			padding: '0 1px 0 0',

			// WebKit scrollbar - with border radius
			'::-webkit-scrollbar': {
				width: '5px',
				background: 'rgba(90, 137, 178, 0.15)',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: TricentisColor,
				borderRadius: '50px',
			},

			// Firefox scrollbar
			scrollbarWidth: 'thin',
			scrollbarColor: `${TricentisColor} rgba(90, 137, 178, 0.15)`,
		}),
		option: (provided, { isSelected }) => ({
			...provided,
			backgroundColor: isSelected ? `${TricentisColor} !important` : WhiteColor,
			color: isSelected ? WhiteColor : BlazeColor,
			cursor: 'pointer',
			fontFamily: 'Open Sans',
			padding: '10px 15px',
			fontWeight: 400,
			letterSpacing: '0.2px',
			fontSize: '14px',
			'&:hover': {
				backgroundColor: AccelerateColor,
				color: WhiteColor,
			},
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			transform: menuIsOpen ? 'rotate(180deg)' : 'initial',
			color: menuIsOpen ? AccelerateColor : CharcoalColor,
		}),
	};
};
