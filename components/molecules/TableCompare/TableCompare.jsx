import React, { useState } from 'react';
import Image from 'next/image';

import styles from './TableCompare.module.scss';
import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import { useInView } from 'react-intersection-observer';
import ColumnItems from '../ColumnItems/ColumnItems';
import ColumnItemMobile from '../ColumnItemMobile/ColumnItemMobile';
import ArrowDown from '../../../public/icons/arrow-down-blue.svg';

const TableCompare = ({ table, btnTab, setBtnTab }) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const [dropDown, setDropDown] = useState(false);

	const classAnimPlay = inView && styles['anim-play'];

	return (
		<Background type={'solid'} color={'light'} className={styles['m-pricing-table']}>
			{table.tabs?.items?.length > 0 && table.tabs?.items[0] && (
				<div className={`${styles['table-tabs']}  ${styles['table-tabs-mobile']}`}>
					<div className={`${styles['tab-container']}`}>
						<div className={`${styles['tab-list']} ${dropDown ? styles['expanded'] : ''}`}>
							{table.tabs?.items.map((tab, index) => {
								return (
									<div
										className={`${styles['tab-item']} ${btnTab === index ? styles['active'] : ''}`}
										key={index}
										onClick={() => {
											setBtnTab(index);
											setDropDown(!dropDown);
										}}
									>
										<span>{tab}</span>
									</div>
								);
							})}
						</div>
						<div className={`${styles['arrow-down']} ${dropDown && styles['arrow-down--active']}`}>
							<Image src={ArrowDown} alt="Icon Arrow" width={10} height={16} />
						</div>
					</div>
				</div>
			)}
			<div className={`${styles.container}`} ref={refAnimation}>
				{table.tabs?.items && (
					<div className={`${styles['table-tabs']} ${styles['table-tabs-desktop']}`}>
						<div className={`${styles['spacer']}`}></div>
						{table.tabs?.items.map((tab, index) => {
							return (
								<div className="h4" key={index}>
									{tab}
								</div>
							);
						})}
					</div>
				)}
				<div
					className={`${styles['table-check-desktop']}`}
					style={{
						gridTemplateRows: `repeat(${table.bodies[0].items.length + 1}, auto)`,
					}}
				>
					<ColumnItems
						className={`${styles['table-list']} ${styles['anim-fade-in-up']} ${classAnimPlay}`}
						{...table.headTable}
					/>

					{table.bodies.map((items, index) => {
						const classAnimDelay = `anim-delay-${+index + 2}`;
						return (
							<ColumnItems
								key={index}
								className={`${styles['table']} ${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
								{...items}
							/>
						);
					})}
				</div>
				<div
					className={styles['table-tablet']}
					style={{
						gridTemplateRows: `repeat(${table.bodies[0].items.length + 1}, auto)`,
					}}
				>
					{table.bodies.map((items, index) => {
						const classAnimDelay = `anim-delay-${+index + 2}`;
						return (
							<ColumnItems
								key={index}
								className={`${styles['table']} ${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
								{...items}
							/>
						);
					})}
				</div>
				<div className={`${styles['table-mobile']}`}>
					<ColumnItemMobile
						headTable={table.headTable}
						currentTable={table.bodies[btnTab]}
						className={`${!dropDown ? styles['anim-fade-in-up'] : ''} ${!dropDown ? classAnimPlay : ''}`}
					/>
				</div>
			</div>
		</Background>
	);
};

export default TableCompare;
