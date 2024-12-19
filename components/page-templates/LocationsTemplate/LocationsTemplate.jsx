import PropTypes from 'prop-types';
import React, { useState, useRef, createRef, useEffect } from 'react';
import styles from './LocationsTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import StringConstants from '../../../StringConstants';
import Background from '../../atoms/Background/Background';
import LocationRegionSection from '../../template-parts/LocationRegionSection/LocationRegionSection';

const LocationsTemplate = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	// console.log('locations pagedata', pageData);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState('Select region');
	const sectionsRef = useRef([]);
	const dropDownRef = useRef(null);

	// default Masthead settings
	let mastheadSettings = {
		prehead: StringConstants.PageHeadings.Tricentis,
		title: pageData.title,
		background: {
			type: 'pattern',
			color: 'blaze',
		},
	};

	// pagedata structure:
	//
	// locations pagedata {
	// 	__typename: 'Page',
	// 	isPreview: false,
	// 	id: 'cG9zdDo5MTI=',
	// 	slug: 'locations',
	// 	title: 'Our Locations',
	// 	uri: '/locations/',
	// 	template: {
	// 		__typename: 'LocationsTemplate',
	// 		templateName: 'Locations Template',
	// 		contentBlocksLocations: {
	// 			__typename: 'ContentTemplate_Contentblockslocations',
	// 			regions: [Array]
	// 		}
	// 	}
	// }

	useEffect(() => {
		const options = dropDownRef.current?.querySelector('.options');
		if (!options) {
			console.error('LocationsTemplate.useEffect(open) - options not found');
			return;
		}
		let height = 0;
		[...options.children].map((child) => {
			return (height += child.clientHeight);
		});

		open ? (options.style.maxHeight = `${height}px`) : (options.style.maxHeight = 0);

		document.body.addEventListener(
			'click',
			(e) => {
				// a crash was seen here when current is null, so checking for null
				if (dropDownRef.current?.contains(e.target)) return;
				setOpen(false);
			},
			[]
		);
	}, [open]);

	let regionsData = pageData.template.contentBlocksLocations.regions;

	// Creating array of Refs to assign them when mapping regions
	if (sectionsRef.current) {
		if (sectionsRef.current.length !== regionsData.length) {
			sectionsRef.current = Array(regionsData.length)
				.fill()
				.map((_, i) => sectionsRef.current[i] || createRef());
		}
	}

	const handleClick = (value, index) => {
		const offsetPosition = sectionsRef?.current[index].current.getBoundingClientRect().top + window.scrollY - 150;
		if (!offsetPosition) {
			console.log('LocationsTemplate.handleClick - offsetPosition is null, setting to 0');
			offsetPosition = 0;
		}

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});

		setSelected(value);
		setOpen(false);
	};

	// Set Empty array for options
	const selectOptions = [];
	regionsData.map((region, index) => {
		selectOptions.push({ value: region.regionName });
	});

	const repeaterSectionsBackground = {
		type: 'pattern',
		color: 'light',
	};

	const repeaterSectionsAltBackground = {
		type: 'solid',
		color: 'white',
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={null}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}

			<MastheadMinimal {...mastheadSettings} />
			<div className={`${styles['locations']}`}>
				<div className={`${styles.container} ${styles['locations__select-wrapper']}`}>
					<div ref={dropDownRef} className={styles['locations__select']}>
						<label
							onClick={() => setOpen(!open)}
							className={`${styles['locations__select-label']} ${
								open ? styles['locations__select-label--active'] : ''
							} `}
						>
							{selected}
						</label>
						{selectOptions && (
							<div
								className={`${styles['locations__options']} ${
									open ? styles['locations__options--open'] : ''
								} ${'options'}`}
							>
								{selectOptions.map(({ value }, index) => {
									return (
										<div
											ref={sectionsRef.current[index]}
											onClick={() => handleClick(value, index)}
											key={index}
											className={styles['locations__option']}
										>
											{value}
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
				{regionsData.map((region, index) => {
					const isAltRow = index % 2 != 0 ? true : false;

					return (
						<Background
							key={index}
							type={isAltRow ? repeaterSectionsBackground.type : repeaterSectionsAltBackground.type}
							color={isAltRow ? repeaterSectionsBackground.color : repeaterSectionsAltBackground.color}
						>
							<div ref={sectionsRef.current[index]}>
								<LocationRegionSection
									type={repeaterSectionsBackground}
									color={repeaterSectionsAltBackground}
									region={[region]}
								/>
							</div>
						</Background>
					);
				})}
			</div>
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

LocationsTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default LocationsTemplate;
