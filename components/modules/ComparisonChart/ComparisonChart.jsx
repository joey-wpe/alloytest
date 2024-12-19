import React from 'react';
import styles from './ComparisonChart.module.scss';
import Background from '../../atoms/Background/Background';
import { useState } from 'react';
import TableCompare from '../../molecules/TableCompare/TableCompare';

const ComparisonChart = (comparisonChartData) => {
	const [btnTab, setBtnTab] = useState(0);
	return (
		<Background type={'solid'} color={'light'} className={styles['m-pricing-table']}>
			<div className={`${styles['comparison-chart']}`}>
				<TableCompare {...comparisonChartData.tableCompare} btnTab={btnTab} setBtnTab={setBtnTab} />
			</div>
		</Background>
	);
};

export default ComparisonChart;
