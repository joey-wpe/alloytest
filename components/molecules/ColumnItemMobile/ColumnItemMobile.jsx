import React from 'react';
import styles from './ColumnItemMobile.module.scss';
import check from '../../../public/icons/compare-check-warp.png';
import deleteIcon from '../../../public/icons/compare-x-gray.png';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';

const ColumnItemMobile = ({ headTable, currentTable, className }) => {
	const buttons = currentTable.buttons;
	return (
		<div className={`${styles['anim-fade-in-up']} ${styles['anim-play']}`}>
			{headTable.items.map(({ item }, index) => {
				const currentTablePros = currentTable.items[index];
				const isAltBackground = index % 2 != 0;
				return (
					<div key={index} className={`${styles['content-table-compare']} ${className ?? ''}`}>
						<div
							className={`
							${styles['table-list']} 
							${isAltBackground && styles['item-bg-color']} 
							${index == 0 && styles['table-first-item']}
						`}
						>
							{item && <div dangerouslySetInnerHTML={{ __html: item }} />}
							<div className={`${styles['table-check']}`}>
								{typeof currentTablePros.item == 'boolean' ? (
									currentTablePros.item == false ? (
										<Image src={deleteIcon} width={10} height={10} alt="Icon Check" />
									) : (
										<Image src={check} width={10} height={10} alt="Icon Check" />
									)
								) : (
									currentTablePros.item && <div dangerouslySetInnerHTML={{ __html: currentTablePros.item }} />
								)}
							</div>
						</div>
					</div>
				);
			})}
			<div className={`${styles['container-buttons-table-mobile']} ${className ?? ''}`}>
				{buttons
					?.filter(({ buttonText }) => buttonText !== null)
					?.map(({ buttonStyle, buttonText, link, adaText, seoText }, index) => {
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
		</div>
	);
};

export default ColumnItemMobile;
