import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import styles from './Pagination.module.scss';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';
import { ChevronDoubleLeftSVG } from '../../atoms/svg/ChevronDoubleLeft';
import { ChevronDoubleRightSVG } from '../../atoms/svg/ChevronDoubleRight';
import GlobalConstants from '../../../GlobalConstants';

const Pagination = ({
	pageLinks,
	currentPage = 1,
	inactivePrevNextShown = GlobalConstants.Archive.DefaultPrevNextShown,
	linkId,
}) => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const pathArray = router.query.slug;
	// noindex any page other than the root archive page
	const noIndex = pathArray.length >= 2 && pathArray[pathArray.length - 2] === 'page';

	const showPrevSpacer = currentPage > inactivePrevNextShown + 2;
	const showNextSpacer = currentPage < pageLinks?.length - inactivePrevNextShown - 2;

	const displayedPageLinks = pageLinks?.filter((link, index) => {
		if (index === 0) return false;
		if (index === pageLinks.length - 1) return false;
		if (index >= currentPage - inactivePrevNextShown - 1 && index <= currentPage + inactivePrevNextShown) return true;
		return false;
	});

	return (
		<>
			<Head>
				{noIndex && <meta name="robots" content="noindex" />}
				{currentPage > 1 && <link rel="prev" href={pageLinks[currentPage - 2].link} />}
				{currentPage < pageLinks.length && <link rel="next" href={pageLinks[currentPage].link} />}
			</Head>
			<ul className={styles.pagination}>
				<li>
					{/* Prev button, index before current page */}
					<Button
						disabled={currentPage <= 1}
						isDecorative={currentPage <= 1}
						link={pageLinks[currentPage - 2]?.link ? `${pageLinks[currentPage - 2]?.link}#${linkId}` : null}
						action={pageLinks[currentPage - 2]?.action}
						buttonText=""
						buttonIcon={<ChevronDoubleLeftSVG />}
						className={`${styles['pagination-button']} ${styles['prev-link']}`}
					/>
				</li>
				<li>
					{/* First page button, index 0 */}
					<Button
						link={pageLinks[0].link ? `${pageLinks[0].link}#${linkId}` : null}
						action={pageLinks[0].action}
						buttonText={pageLinks[0].label}
						className={`${styles['pagination-button']} ${currentPage === 1 ? styles.active : ''}`}
					/>
				</li>
				{showPrevSpacer && <li>...</li>}
				{/* All pages within the inactivePrevNextShown range of current page */}
				{displayedPageLinks?.map((pageLink) => (
					<li key={pageLink.index}>
						<Button
							link={pageLink.link ? `${pageLink.link}#${linkId}` : null}
							action={pageLink.action}
							buttonText={pageLink.label}
							className={`${styles['pagination-button']} ${pageLink.index === currentPage - 1 ? styles.active : ''}`}
						/>
					</li>
				))}
				{showNextSpacer && <li>...</li>}
				<li>
					{/* Last page, index pageLinks.length - 1 */}
					<Button
						link={pageLinks[pageLinks.length - 1].link ? `${pageLinks[pageLinks.length - 1].link}#${linkId}` : null}
						action={pageLinks[pageLinks.length - 1].action}
						buttonText={pageLinks[pageLinks.length - 1].label}
						className={`${styles['pagination-button']} ${currentPage === pageLinks?.length ? styles.active : ''}`}
					/>
				</li>
				<li>
					{/* Next page, index after current pages index */}
					<Button
						disabled={currentPage >= pageLinks?.length}
						isDecorative={currentPage >= pageLinks?.length}
						link={pageLinks[currentPage]?.link ? `${pageLinks[currentPage]?.link}#${linkId}` : null}
						action={pageLinks[currentPage]?.action}
						buttonText=""
						buttonIcon={<ChevronDoubleRightSVG />}
						className={`${styles['pagination-button']} ${styles['next-link']}`}
					/>
				</li>
			</ul>
		</>
	);
};

Pagination.propTypes = {
	pageLinks: PropTypes.array, // array of page link urls
	currentPage: PropTypes.number, // current page rendered, not 0 based (index 0 is page 1)
	inactivePrevNextShown: PropTypes.number, // number of pages to show before and after current page
	linkId: PropTypes.string, // id of the element to scroll to when pagination is clicked
};

export default Pagination;
