import React from 'react';
import styles from './LineChartGraph.module.scss';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChartGraph = ({
	scores,
	labels,
	functionCalc = true,
	labelIcon = '',
	labelDay = '',
	dataPoints,
	stepsPoint,
}) => {
	const numberWithCommas = (value) => Math.round(value);
	const options = {
		animation: {
			textAlign: 'center',
			textBaseline: 'bottom',
			fillStyle: '#59C8E6',
		},
		plugins: {
			tooltip: {
				enabel: false,
			},
			responsive: false,
			legend: {
				display: false,
			},

			datalabels: {
				display: true,
				color: '#0087AE',
				align: 'top',
				offset: 5,
				font: {
					weight: 'bold',
				},

				formatter: function (value, context) {
					if (functionCalc && labelIcon) {
						return labelIcon + numberWithCommas(value);
					}
					if (functionCalc && labelDay) {
						return numberWithCommas(value) + ' ' + labelDay;
					}
				},
			},
		},
		layout: {
			padding: {
				right: 25,
			},
		},
		legend: {
			display: false,
		},
		scales: {
			x: {
				maxHeight: 64,
				maxIndex: 0,
				maxWidth: 158.505625,
				drawBorder: false,
				grid: {
					display: false,
					borderColor: false,
				},
				ticks: {
					top: 32,
					align: 'center',
					color: 'black',
					font: {
						weight: 600,
						size: 12,
						family: 'Open Sans',
					},
					callback: function (value, index, values) {
						return labels[index].split('-');
					},
					autoSkip: false,
					maxRotation: 0,
					minRotation: 0,
					labelOffset: 0,
				},
			},
			y: {
				grid: {
					color: 'rgba(0,0,0,0.25)',
					zeroLineColor: 'red',
					borderDash: [0, 0],
					borderColor: 'white',
					tickColor: false,
				},

				ticks: {
					maxTicksLimit: 5,
					stepSize: stepsPoint,
					color: 'black',
					font: {
						weight: 600,
						size: 12,
						family: 'Open Sans',
					},
				},
			},
		},
	};
	const data = {
		datasets: [
			{
				data: scores,
				backgroundColor: '#FF6C0E',
				borderColor: '#FF6C0E',
				showLine: true,
				pointBorderColor: '#FF6C0E',
				pointBackgroundColor: '#FF6C0E',
				pointRadius: 5,
				pointHoverRadius: 10,
				pointHitRadius: 3,
				pointBorderWidth: 3,
				pointStyle: false,
			},
		],
		labels,
	};
	return <Line data={data} plugins={[ChartDataLabels]} options={options} />;
};

export default LineChartGraph;
