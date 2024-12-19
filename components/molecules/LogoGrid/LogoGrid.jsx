import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../../atoms/Logo/Logo';
import styles from './LogoGrid.module.scss';

const LogoGrid = ({ alignment, Grid, logosPerRow, carouselOrGrid }) => {
	return (
		<div
			className={`${styles[`slider-wrapper`]} ${styles[`justify-${alignment}`]} 
			}`}
		>
			{Grid
				? Grid.map((item, index) => {
						return (
							<Logo
								logoURL={item.url}
								image_width="150"
								image_height="69"
								image_path={item.image_path}
								alt={item.alt}
								key={index}
								logosPerRow={parseInt(logosPerRow)}
								classGrid={carouselOrGrid}
							/>
						);
				  })
				: null}
		</div>
	);
};

LogoGrid.propTypes = {
	alignment: PropTypes.oneOf(['left', 'center', 'right']),
	logosPerRow: PropTypes.oneOf([2, 3, 4, 5]),
	Grid: PropTypes.array,
};

export default LogoGrid;
