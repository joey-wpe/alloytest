import HeaderMenuColumn from '../HeaderMenuColumn/HeaderMenuColumn';
import PropTypes from 'prop-types';
import styles from './HeaderMegaMenu.module.scss';
import { useState } from 'react';
import FeaturedPost from '../FeaturedPost/FeaturedPost';
import Button from '../../atoms/Button/Button';
import { removeLastTrailingSlash } from '../../../wplib/util';

const HeaderMegaMenu = ({
	mainTitle,
	headerMenuColumn,
	className,
	featuredPostData,
	menuStyle,
	globalCTA = '',
	columnsType = '',
	onClick,
}) => {
	const [openMegamenu, setOpenMegaMenu] = useState(false);
	// Remove trailing slashes from the link
	mainTitle.href = removeLastTrailingSlash(mainTitle.href);
	return (
		<div
			className={`${styles['primary-item']} ${className ?? ''} ${
				headerMenuColumn && headerMenuColumn.length > 0 ? '' : styles['primary-item--static']
			}`}
		>
			<div
				className={`${styles.title}`}
				onClick={(e) => {
					onClick();
					setOpenMegaMenu(true);
				}}
			>
				{headerMenuColumn && headerMenuColumn.length > 0 ? (
					<p>{mainTitle?.label}</p>
				) : (
					<a href={mainTitle?.href ? mainTitle?.href : ''}>{mainTitle?.label ? mainTitle?.label : ''}</a>
				)}
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M6.175 7.15002L10 10.975L13.825 7.15002L15 8.33336L10 13.3334L5 8.33336L6.175 7.15002Z"
						fill="#FF6C0E"
					/>
				</svg>
			</div>
			<div className={`${styles['mega-menu']} ${openMegamenu ? styles['mega-menu-show'] : ''}`} style={{ opacity: 0 }}>
				<button
					className={styles['back-button']}
					onClick={(e) => {
						setOpenMegaMenu(false);
					}}
				>
					<svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M-4.37114e-07 5L5 4.37114e-07L5 2.82881L2.82859 5.00022L5 7.17163L5 10L-4.37114e-07 5Z"
							fill="#8596AA"
						/>
					</svg>
					Back
				</button>

				{headerMenuColumn && headerMenuColumn.length > 0 ? (
					<div className={styles['mega-menu__title']}>{mainTitle?.label}</div>
				) : (
					<a href={mainTitle?.href ? mainTitle?.href : ''}>{mainTitle?.label ? mainTitle?.label : ''}</a>
				)}

				<div className={`${styles['header-menu-column']} `}>
					<ul
						className={`${styles.columns} ${columnsType == 'four_columns' ? styles['columns--secondary'] : ''} ${
							globalCTA?.uri ? styles['columns--with-global'] : ''
						}`}
					>
						{headerMenuColumn &&
							headerMenuColumn.map((data, index) => {
								const preRowCount =
									headerMenuColumn
										?.filter((col, colIndex) => col.column === data.column && colIndex < index)
										?.map((item) => item.menu?.length)
										?.reduce((prevSum, next) => prevSum + next + 1, 0) + 1;

								return (
									<HeaderMenuColumn
										className={styles.column}
										key={index}
										{...data}
										menuStyle={menuStyle}
										firstRow={headerMenuColumn.find((col) => col.column === data.column).title === data.title}
										preRowCount={preRowCount}
										cssClasses={data.cssClasses}
									/>
								);
							})}
						{globalCTA?.uri ? (
							<Button
								buttonStyle={'TertiaryDefault'}
								buttonText={globalCTA?.title ?? ''}
								target={globalCTA?.target ?? ''}
								link={globalCTA?.uri ?? ''}
								className={styles['button']}
							/>
						) : (
							false
						)}
					</ul>
					{featuredPostData && (
						<div className={styles.featured}>
							<FeaturedPost
								prehead={featuredPostData.prehead}
								title={featuredPostData.title}
								excerpt={featuredPostData.excerpt}
								image={featuredPostData.image}
								link={featuredPostData.link}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

HeaderMegaMenu.propTypes = {
	mainTitle: PropTypes.shape({
		label: PropTypes.string,
		href: PropTypes.string,
	}),
	menuStyle: PropTypes.oneOf(['Primary', 'Secondary']),
	globalCTA: PropTypes.shape({
		title: PropTypes.string,
		uri: PropTypes.string,
		target: PropTypes.string,
	}),
	columnsType: PropTypes.string,
	headerMenuColumn: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			menu: PropTypes.arrayOf(
				PropTypes.shape({
					linkText: PropTypes.string,
					target: PropTypes.string,
					uri: PropTypes.string,
					description: PropTypes.string,
				})
			),
		})
	),
	featuredPostData: PropTypes.shape({
		image: PropTypes.shape({
			src: PropTypes.string,
			alt: PropTypes.string,
		}),
		prehead: PropTypes.string,
		title: PropTypes.string,
		excerpt: PropTypes.string,
		link: PropTypes.shape({
			href: PropTypes.string,
			text: PropTypes.string,
		}),
	}),
};

export default HeaderMegaMenu;
