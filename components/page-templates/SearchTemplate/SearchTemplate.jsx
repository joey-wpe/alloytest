import PropTypes from 'prop-types';
import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './SearchTemplate.module.scss';
import GlobalConstants from '../../../GlobalConstants';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import Background from '../../atoms/Background/Background';
import Loader from '../../atoms/Loader/Loader';
import SearchResultItem from '../../molecules/SearchResultItem/SearchResultItem';
import Button from '../../atoms/Button/Button';
import { useRouter } from 'next/router';

const SearchTemplate = ({ globalAlertData, headerMenuData, footerMenu }) => {
	const { t } = useTranslation('common');
	const { query } = useRouter();

	const ResultsPerPage = GlobalConstants.Search.ResultsPerPage;

	// we read these in from the page query if possible, otherwise default
	const [searchTerm, setSearchTerm] = useState(useRouter().query.search || '');
	const [submittedSearchTerm, setSubmittedSearchTerm] = useState(query.search || '');
	const [resultsLanguage, setResultLanguage] = useState(useRouter().locale);

	const [searchResults, setSearchResults] = useState([]);
	const [totalResultCount, setTotalResultCount] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [resultsSearchText, setResultsSearchText] = useState('');
	const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
	const [showNoResultsMessaging, setShowNoResultsMessaging] = useState(false);

	useEffect(async () => {
		// console.log('submittedSearchTerm is set to', submittedSearchTerm);
		if (submittedSearchTerm && submittedSearchTerm !== '') {
			console.log(submittedSearchTerm);
			await doSearch(true);
		}
	}, [submittedSearchTerm]);

	// anytime the totalPages changes we should evaluate if the 'load more' button should be shown
	useEffect(() => {
		let showLoadMore = false;
		// console.log({ totalPages, currentPage });
		if (totalPages !== 0 && currentPage < totalPages) {
			showLoadMore = true;
		}

		// console.log('SearchTemplate.totalPages - showLoadMore', showLoadMore);
		setShowLoadMoreButton(showLoadMore);
	}, [totalPages, currentPage]);

	useEffect(() => {
		setSubmittedSearchTerm(query.search);
	}, [query.search]);

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		setSubmittedSearchTerm(searchTerm);
	};

	const doSearch = async (isNewRequest) => {
		// if it's a new request we're getting the first page, otherwise we're getting the next page after our current one
		const pageToRequest = isNewRequest ? 1 : currentPage + 1;

		setIsLoading(true);
		// console.log('doing search for page number', pageToRequest);
		try {
			const response = await fetch(
				`/api/search?q=${submittedSearchTerm}&resultsPerPage=${ResultsPerPage}&page=${pageToRequest}&lang=${resultsLanguage}`
			);
			const parsedResults = await response.json();

			setResultsSearchText(submittedSearchTerm);
			setTotalResultCount(parsedResults.totalResults);
			setTotalPages(parsedResults.totalPages);
			setShowNoResultsMessaging(parsedResults.totalResults === 0);

			// we always want to append our results (unless this is a new request)
			let newSearchResults = isNewRequest ? [] : searchResults;
			newSearchResults.push(...parsedResults.results);

			setSearchResults(newSearchResults);
		} catch (err) {
			console.error('SearchTemplate.handleSubmit', err);
		} finally {
			setCurrentPage(pageToRequest);
			setIsLoading(false);

			// TODO:: scroll the window to the results area
		}
	};

	const handleClearResults = (evt) => {
		setSearchResults([]);
		setTotalResultCount(0);
		setTotalPages(0);
		setSearchTerm('');
		setSubmittedSearchTerm('');
		setResultsSearchText('');
		setCurrentPage(1);
		setShowNoResultsMessaging(false);
	};

	const loadMoreOnClick = (evt) => {
		// hide the button straight away - we'll evaluate if it's shown again after we get results
		setShowLoadMoreButton(false);

		doSearch(false); // run this after the current page is updated
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={null}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}
			<Background type={'pattern'} color={'blaze'}>
				<div className={`${styles.container} ${styles.heading}`}>
					<h1 className={`${styles['heading__title']} ${styles.h1}`}>{t('searchPage.pageTitle')}</h1>
					<form className={styles['heading__search']} onSubmit={handleSubmit}>
						<label className={styles['heading__label']}>
							<input
								className={styles['heading__input']}
								placeholder={t('searchPage.searchPlaceholderText')}
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							{isLoading && (
								<div>
									<Loader className={styles['results__loader']} />
								</div>
							)}
						</label>
						<button className={styles['heading__submit']} type="submit">
							{t('searchPage.searchButtonText')}
						</button>
					</form>
				</div>
			</Background>
			<div>
				<div className={styles['results__container']}>
					{/* when there are results to show */}
					{searchResults && searchResults.length > 0 && (
						<div className={styles.results}>
							<div className={styles['content-information']}>
								<h6 className={`${styles['results__meta']} ${styles.h6}`}>
									About {totalResultCount} results for &quot;{resultsSearchText}&quot;
								</h6>
								<button className={styles['results__button']} onClick={handleClearResults}>
									{t('searchPage.clearSearchResults')}
								</button>
							</div>

							<div className={styles['results__list']}>
								{searchResults.map((result, resultIndex) => {
									return <SearchResultItem key={resultIndex} {...result} />;
								})}
							</div>
						</div>
					)}
					{/* when there are no results to show */}
					{showNoResultsMessaging && (
						<div className={styles.container}>
							<p className={styles.noResults}>{t('searchPage.noSearchResultsText')}</p>
						</div>
					)}
				</div>
				<div className={`${styles.centeredArea} light-theme`}>
					{/* 'show more' section that optionally shows */}
					{showLoadMoreButton && (
						<Button
							className={styles['btn-shwo-more']}
							buttonStyle={'SecondaryReverse'}
							buttonText={t('generic.showMore')}
							link={null}
							action={() => loadMoreOnClick()}
						/>
					)}

					{/* Loading indicator where 'show more' is */}
					{isLoading && (
						<div>
							<Loader className={styles['centeredArea__loader']} />
						</div>
					)}
				</div>
			</div>

			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

SearchTemplate.propTypes = {
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default SearchTemplate;
