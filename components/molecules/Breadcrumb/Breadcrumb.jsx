import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './Breadcrumb.module.scss';
import ArrowWhite from '../../../public/icons/tricentis-white-carets.svg';
import ArrowBlue from '../../../public/icons/tricentis-blaze-carets.svg';
import Image from 'next/image';
import { decodeHtmlEntities } from '../../../wplib/util';

const Breadcrumb = ({ background, breadcrumb, title }) => {
	const foregroundColor = background === 'light' ? 'light' : 'dark';
	const isLast = (index) => index === breadcrumbsLinks.length - 1;
	let breadcrumbsLinks;
	const router = useRouter();
	let slugs = router.asPath;

	breadcrumb && breadcrumb.hasOwnProperty('breadcrumbsLinks')
		? (breadcrumbsLinks = breadcrumb.breadcrumbsLinks)
		: (breadcrumbsLinks = generateBreadcrumbFallback(slugs));

	// generates breadcrumbs when defined breadcrumbs is not provided
	function generateBreadcrumbFallback(slugs) {
		let path = '';

		return slugs.split('/').map((url, index, paths) => {
			let label = title;

			if (index + 1 < paths.length) {
				label = url
					.toLowerCase()
					.split('-')
					.map((path) => path.charAt(0).toUpperCase() + path.substring(1))
					.join(' ');
			}

			if (index !== 0) path += `/${url}`;

			return {
				label: label,
				url: path,
			};
		});
	}

	return (
		<ol className={`${styles['content-breadcrumb']}`}>
			{breadcrumbsLinks.map(({ label, url }, index) => {
				const disabled = isLast(index) && 'disabled';

				if (index === 0 && !breadcrumb.breadcrumbsLinks) {
					url = '/';
					label = 'Home';
				} else if (index === 0 && breadcrumb.breadcrumbsLinks) {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					url = useRouter().locale === 'en-US' ? '/' : `/${useRouter().locale}`;
				}

				return (
					<li
						key={index}
						className={`${styles[`breadcrumb-${foregroundColor}`]} ${
							disabled && styles[`breadcrumb-${foregroundColor}--active`]
						}`}
					>
						<div className={`${styles['breadcrumb-list']}`}>
							<a className={`${disabled && styles[`content-breadcrumb--${disabled}`]}`} disabled={disabled} href={url}>
								{decodeHtmlEntities(label)}
							</a>
							<span className={`${styles['breadcrumb-list-caret']}`}>
								{foregroundColor == 'dark' ? (
									<Image src={ArrowWhite} width={10} height={11} alt="Arrow Icon" />
								) : (
									<Image src={ArrowBlue} width={10} height={11} alt="Arrow Icon" />
								)}
							</span>
						</div>
					</li>
				);
			})}
		</ol>
	);
};

Breadcrumb.propTypes = {
	background: PropTypes.string,
	breadcrumb: PropTypes.object,
	title: PropTypes.string,
};

export default Breadcrumb;
