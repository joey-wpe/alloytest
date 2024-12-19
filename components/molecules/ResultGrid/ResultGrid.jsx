import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResultGrid.module.scss';
import Card from '../Card/Card';
import Background from '../../atoms/Background/Background';
const ResultGrid = ({ modules, background }) => {
	return (
		<Background {...background}>
			<div className={`${styles.container}`}>
				{modules.map(({ cards, categories }, indexCategories) => {
					return (
						<div key={indexCategories}>
							<div>{categories}</div>
							<div className={`${styles['content-grid']}`}>
								{cards.map((card, index) => {
									return <Card key={index} {...card} />;
								})}
							</div>
						</div>
					);
				})}
			</div>
		</Background>
	);
};

export default ResultGrid;
