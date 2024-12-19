import React, { useEffect, useState } from 'react';
import styles from './ROICalculatorResult.module.scss';
import Timmer from '../../../public/icons/timer.svg';
import Coins from '../../../public/icons/coins.svg';
import Medal from '../../../public/icons/medal.svg';
import Image from 'next/image';
import Background from '../../atoms/Background/Background';
import LineChartGraph from '../../molecules/LineChartGraph/LineChartGraph';
import { useRouter } from 'next/router';
import GlobalConstants from '../../../GlobalConstants';
import FlexibleContentArea from '../../molecules/FlexibleContentArea/FlexibleContentArea';

const ROICalculatorResult = ({ pageData, postTypeData }) => {
	const [dataGraphics, setDataGraphics] = useState(null);
	const [loading, setLoading] = useState(true);
	const { query } = useRouter();

	const background = {
		type: 'pattern',
		color: 'blaze',
	};

	// TODO:: FUTURE:: Add multi-language support to ROI calculator
	const informationCopy = {
		prehead: 'Tricentis',
		title: 'Expected results',
		description:
			'According to industry metrics and Tricentis’ results with similar organizations, you can gain the following benefits by automating testing with Tricentis:',
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const { slug, ...queryParams } = query;

		if (queryParams.apps) {
			const params = new URLSearchParams({ ...queryParams, id: GlobalConstants.ROIResultsPageID });
			const url = `/api/roi-calculator?${params}`;

			fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((response) => {
					console.log('RESPONSE', response);
					const labels = ['After 6-months', 'After 1-years', 'After 2-years', 'After 3-years'];

					//Speed Data
					const { cycles, days } = response.speed[0];
					const speedGraphic = {
						dataPoints: [cycles['6_months'], cycles['1_year'], cycles['2_years'], cycles['3_years']],
						scores: [days['6_months'], days['1_year'], days['2_years'], days['3_years']],
						labels,
					};

					//Cost Data
					const { savings, efficiency } = response.cost[0];
					const costGraphic = {
						dataPoints: [
							'$' + efficiency['6_months'],
							'$' + efficiency['1_year'],
							'$' + efficiency['2_years'],
							'$' + efficiency['3_years'],
						],
						scores: [savings['6_months'], savings['1_year'], savings['2_years'], savings['3_years']],
						labels,
						stepsPoint: 50,
					};

					//Quality Data
					const { risk, defects } = response.quality[0];

					const qualityGraphic = {
						dataPoints: [
							risk['6_months'].toFixed(2),
							risk['1_year'].toFixed(2),
							risk['2_years'].toFixed(2),
							risk['3_years'].toFixed(2),
						],
						scores: [defects['6_months'], defects['1_year'], defects['2_years'], defects['3_years']],
						labels,
						stepsPoint: 5,
					};

					setDataGraphics({
						speedGraphic,
						costGraphic,
						qualityGraphic,
					});
					setLoading(false);
				})
				.catch((error) => console.error('Error:', error))
				.finally(() => {
					setLoading(false);
				});
		}
	}, [query]);

	const roundNumber = (number, decimals) => {
		const float = parseFloat(number);
		return Math.round(float * Math.pow(10, decimals)) / Math.pow(10, decimals);
	};

	const copyURL = () => {
		// variable content to be copied
		let copyText = window.location;
		// create an input element
		let input = document.createElement('input');
		// setting it's type to be text
		input.setAttribute('type', 'text');
		// setting the input value to equal to the text we are copying
		input.value = copyText;
		// appending it to the document
		document.body.appendChild(input);
		// calling the select, to select the text displayed
		// if it's not in the document we won't be able to
		input.select();
		// calling the copy command
		document.execCommand('copy');
		alert('Copied Share URL to clipboard');
		// removing the input from the document
		document.body.removeChild(input);
	};

	return (
		<div>
			<div className="tri-roi-calculator">
				<div className="tri-roi-calculator__masthead wp-block-narwhal-background alignfull has-background">
					<Background {...background}>
						<div className={`${styles.container} ${styles['content-copy']}`}>
							<div className={styles['content-copy__information']}>
								<span className={styles['sub-p']}>{informationCopy.prehead}</span>
								<h2 className={styles.h1}>{informationCopy.title}</h2>
								<p className={styles.p}>{informationCopy.description}</p>
							</div>
							<div
								className={styles['content-copy__button-share']}
								onClick={() => {
									copyURL();
								}}
							>
								<span>Share results</span>
							</div>
						</div>
					</Background>
				</div>
				{!loading && (
					<div className={`${styles.container} ${styles['container-results-cards']}`}>
						<div className={styles['container-results-cards__card']}>
							<div className={styles['container-results-cards__card__heading']}>
								<Image className={styles.icon} src={Timmer} alt="Icon Timer" width={24} height={24} />
								<h2>Speed</h2>
							</div>
							<div className={styles['container-results-cards__card__result-content']}>
								<div className="tri-roi-calculator__result-area__section">
									<h3>{Math.round(dataGraphics?.speedGraphic.dataPoints[3])}X</h3>
									<h4>Faster Testing Cycles*</h4>
								</div>
								<div className={styles['line-separator']}></div>
								<div className={styles['second-result']}>
									<h3>{dataGraphics?.speedGraphic.scores[3]}</h3>
									<h4>Work Days Saved*</h4>
								</div>
								<LineChartGraph {...dataGraphics?.speedGraphic} labelDay={'day'} />
							</div>
						</div>
						<div className={styles['container-results-cards__card']}>
							<div className={styles['container-results-cards__card__heading']}>
								<Image className={styles.icon} alt="Icon Coins" src={Coins} width={24} height={24} />
								<h2>Cost</h2>
							</div>
							<div className={styles['container-results-cards__card__result-content']}>
								<div className="tri-roi-calculator__result-area__section">
									<h3>{Math.round(dataGraphics?.costGraphic.dataPoints[3].slice(1))} %</h3>
									<h4>Efficiency Gain in Testing*</h4>
								</div>
								<div className={styles['line-separator']}></div>
								<div className={styles['second-result']}>
									<h3>${dataGraphics?.costGraphic.scores[3].toLocaleString()}</h3>
									<h4>Savings*</h4>
								</div>
								<LineChartGraph {...dataGraphics?.costGraphic} labelIcon={'$'} />
							</div>
						</div>
						<div className={styles['container-results-cards__card']}>
							<div className={styles['container-results-cards__card__heading']}>
								<Image className={styles.icon} alt="Icon Medal" src={Medal} width={24} height={24} />
								<h2>Quality</h2>
							</div>
							<div className={styles['container-results-cards__card__result-content']}>
								<div className="tri-roi-calculator__result-area__section">
									<h3>{Math.round(dataGraphics?.qualityGraphic.dataPoints[3] * 100)}%</h3>
									<h4>Risk Reduction*</h4>
								</div>
								<div className={styles['line-separator']}></div>
								<div className={styles['second-result']}>
									<h3>{roundNumber(dataGraphics?.qualityGraphic.scores[3], 1)}</h3>
									<h4>Defects per KLOC*</h4>
								</div>
								<LineChartGraph {...dataGraphics?.qualityGraphic} functionCalc={false} />
							</div>
						</div>
					</div>
				)}
				<div className={`${styles.container} ${styles['info-estimated']}`}>
					<p>*Estimated results over 3 years</p>
				</div>
			</div>
			{pageData.contentBlocksModules?.modules && pageData.contentBlocksModules?.modules.length > 0 && (
				<FlexibleContentArea
					modules={pageData.contentBlocksModules?.modules}
					resourceGridQuery={postTypeData?.resourcesQuery}
				/>
			)}
		</div>
	);
};

export default ROICalculatorResult;
