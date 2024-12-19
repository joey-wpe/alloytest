import React from 'react';
import styles from './ColumnItems.module.scss';
import check from '../../../public/icons/compare-check-warp.png';
import deleteIcon from '../../../public/icons/compare-x-gray.png';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';

const ColumnItems = ({ items, buttons, type, className }) => {
	return (
		<>
			{items?.map(({ item }, index) => {
				const isAltBackground = index % 2 != 0;

				return (
					<div
						key={index}
						className={`
							${styles['table-item']} 
							${isAltBackground && styles['item-table-background']}
							${type != 'list' && styles['table-check']}
							${index == 0 && styles['item-top']}
							${type == 'list' && index == 0 ? styles['item-top-list'] : ''}
						`}
					>
						{typeof item == 'boolean' ? (
							item == false ? (
								<div className={styles['icon-check']}>
									<Image src={deleteIcon} width={25} height={24} alt="Icon Check" />
								</div>
							) : (
								<Image src={check} width={25} height={24} alt="Icon Check" />
							)
						) : (
							item && <div dangerouslySetInnerHTML={{ __html: item }} />
						)}
					</div>
				);
			})}
			{buttons ? (
				<div className={styles['content-button']}>
					{buttons.map(({ buttonStyle, buttonText, link, adaText, seoText }, index) => {
						if (buttonText === null) return;
						return (
							<Button
								className={styles['button']}
								key={index}
								buttonStyle={buttonStyle}
								buttonText={buttonText}
								link={link}
								adaText={adaText}
								seoText={seoText}
							/>
						);
					})}
				</div>
			) : (
				<div className={`${styles['spacer']}`}></div>
			)}
		</>
	);
};

export default ColumnItems;
