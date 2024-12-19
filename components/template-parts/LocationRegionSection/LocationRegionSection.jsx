import React, { useState, useRef, createRef, useEffect } from 'react';
import styles from './LocationRegionSection.module.scss';
import PropTypes from 'prop-types';
import LocationCard from '../../molecules/LocationCard/LocationCard';
import { useInView } from 'react-intersection-observer';

const LocationRegionSection = ({ region }) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const repeaterSectionsBackground = {
		type: 'pattern',
		color: 'light',
	};

	const repeaterSectionsAltBackground = {
		type: 'solid',
		color: 'white',
	};
	const classAnimPlay = inView && styles['anim-play'];

	return (
		<>
			{region &&
				region.map(({ regionName, locations }, indexRegion) => {
					return (
						<div key={indexRegion} className={styles.container} ref={refAnimation}>
							<div className={`${styles['content-location-block']}`}>
								<div className={`${styles['location-title']} ${styles['anim-fade-in-up']} ${classAnimPlay}`}>
									<h6 className={styles.h6}>{regionName}</h6>
								</div>
								<div className={styles['location-card-grid']}>
									{locations.map((card, indexCard) => {
										const classAnimDelay = `anim-delay-${indexCard + 1}`;

										return (
											<LocationCard
												className={`${styles['location-card']} ${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
												key={indexCard}
												{...card}
											/>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
		</>
	);
};

export default LocationRegionSection;
