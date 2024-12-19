import PropTypes from 'prop-types';
import TextLink from '../../atoms/TextLink/TextLink';
import styles from './HeaderMenuColumn.module.scss';
import Button from '../../atoms/Button/Button';
import { removeLastTrailingSlash } from '../../../wplib/util';

const HeaderMenuColumn = ({
	title,
	titleUri,
	column,
	firstRow,
	preRowCount,
	menu,
	className,
	cssClasses,
	menuStyle = 'Primary',
}) => {
	// adds custom class if specified in wordpress backend for custom svg icons
	const customClassNames = cssClasses ? cssClasses[0] : '';
	const customClassName = customClassNames ? styles[customClassNames] : '';
	var columnStartStyle = '';

	if (column === 'one') {
		columnStartStyle = styles.gridColumnStartOne;
	} else if (column === 'two') {
		columnStartStyle = styles.gridColumnStartTwo;
	} else if (column === 'three') {
		columnStartStyle = styles.gridColumnStartThree;
	}

	return (
		<div
			className={`${className} ${columnStartStyle}`}
			style={{ gridRowEnd: `span ${menu.length + 1}`, gridRowStart: firstRow ? 1 : preRowCount }}
		>
			<div className={`${styles.heading} ${customClassName}`}>
				{titleUri !== '#' && titleUri !== '' ? (
					<Button
						buttonStyle="TertiaryDefault"
						buttonText={title}
						link={titleUri}
						className={styles['text-link--button']}
					/>
				) : (
					<p className={styles.title}>{title}</p>
				)}
			</div>

			<ul className={`${styles.column}`}>
				{menu &&
					menu.map((data, index) => {
						// adds custom class if specified in wordpress backend for custom svg icons
						const customLinkClass = data.cssClasses ? data.cssClasses[0] : '';
						const customLinkClassName = customLinkClass ? styles[customClassNames] : '';

						// Remove trailing slashes from the link
						data.uri = removeLastTrailingSlash(data.uri);
						return (
							<div key={index}>
								{data?.buttonStyle !== 'TertiaryDefault' ? (
									<TextLink
										{...data}
										className={`${customLinkClassName} ${styles['text-link']} ${
											menuStyle == 'Secondary' ? styles['text-link__hover'] : false
										}`}
									/>
								) : (
									<Button
										buttonStyle="TertiaryDefault"
										buttonText={data.linkText}
										target={data.target}
										link={data.uri}
										className={styles['text-link--button']}
									/>
								)}

								{menuStyle !== 'Primary' && (
									<p className={styles['description']} dangerouslySetInnerHTML={{ __html: data.description }}></p>
								)}
							</div>
						);
					})}
			</ul>
		</div>
	);
};

HeaderMenuColumn.propTypes = {
	menuStyle: PropTypes.oneOf(['Primary', 'Secondary']),
	firstRow: PropTypes.bool,
	preRowCount: PropTypes.number,
	title: PropTypes.string.isRequired,
	titleUri: PropTypes.string,
	column: PropTypes.string,
	menu: PropTypes.arrayOf(
		PropTypes.shape({
			uri: PropTypes.string,
			target: PropTypes.string,
			linkText: PropTypes.string,
			description: PropTypes.string,
		})
	).isRequired,
};

export default HeaderMenuColumn;
