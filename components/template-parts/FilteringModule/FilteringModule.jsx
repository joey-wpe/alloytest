import React, { useEffect, useRef, useState } from 'react';
import FilterBar from '../../molecules/FilterBar/FilterBar';
import styles from './FilteringModule.module.scss';
import Loader from '../../atoms/Loader/Loader';
import CardSelector from '../../molecules/CardSelector/CardSelector';
import Pagination from '../../molecules/Pagination/Pagination';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import GlobalConstants from '../../../GlobalConstants';

const FilteringModule = ({ postTypeData, requestData, paginatedPosts, filterCopy, className }) => {
	var locale = useRouter().locale;
	const pathArray = useRouter().asPath.split('/');

	if (locale === 'en-US') locale = 'en';

	const defaultArgs = {
		post_type: JSON.stringify([requestData.post_type]),
		language: locale,
		posts_per_page: GlobalConstants.Archive.ResultsPerPage,
		page: 1,
		taxonomies: JSON.stringify(requestData.taxonomies),
		search: '',
		fields: JSON.stringify(requestData.fields),
	};

	const [args, setArgs] = useState({
		...defaultArgs,
		isNewRequest: true,
	});
	const [resetFilters, setResetFilters] = useState(false);
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [firstPageLoad, setFirstPageLoad] = useState(true);
	const [apiResponse, setApiResponse] = useState(paginatedPosts);
	const firstRender = useRef(true);
	const [searchResults, setSearchResults] = useState([]);
	const [totalPosts, setTotalPosts] = useState(paginatedPosts.total_posts_found ?? 0);
	const [currentPage, setCurrentPage] = useState(paginatedPosts.currentPage);
	const [pageLinks, setPageLinks] = useState(
		Array.from({ length: paginatedPosts.max_pages }, (_, i) => {
			let pathLink =
				pathArray[pathArray.length - 2] === 'page'
					? [...pathArray.slice(0, pathArray.length - 1), i + 1].join('/')
					: [...pathArray, 'page', i + 1].join('/');

			if (locale !== 'en') {
				pathLink = `/${locale}${pathLink}`;
			}

			return {
				index: i,
				label: i + 1,
				link: pathLink,
			};
		})
	);
	const { t } = useTranslation('common');
	const paginationDisplayed = apiResponse?.total_posts_found > GlobalConstants.Archive.ResultsPerPage;
	const linkId = 'filter-area'; // ID for top of filter area to scroll to on pagination click

	// const env = process.env.NEXT_PUBLIC_BACKEND_SERVER;
	const data = JSON.parse(args.taxonomies);
	const handleClearResults = () => {
		setArgs(() => ({
			...defaultArgs,
		}));
		setResetFilters(!resetFilters);
		setDebouncedSearch('');
	};

	useEffect(() => {
		// Avoid changing args on first render.
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		setArgs((prevState) => ({
			...prevState,
			search: debouncedSearch,
			page: 1,
		}));
	}, [debouncedSearch]);

	//Prepare params
	const params = new URLSearchParams(args);

	//Setup URL
	const url = `/api/filter?${params}`;

	useEffect(() => {
		// don't fetch page data if first page load with static data
		if (firstPageLoad) {
			setFirstPageLoad(false);
			return;
		}

		const requestAPI = async () => {
			setLoading(true);
			try {
				await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then((res) => res.json())
					.catch((error) => error)
					.then((response) => {
						setApiResponse({ ...response });
						setTotalPosts(response.total_posts_found);
						setCurrentPage(args.page);
						setPageLinks(
							Array.from({ length: response?.max_pages }, (_, i) => ({
								index: i,
								label: i + 1,
								action: () => {
									setArgs((prevState) => ({
										...prevState,
										page: i + 1,
										isNewRequest: true,
									}));
									document.getElementById(linkId).scrollIntoView({ behavior: 'smooth' });
								},
							}))
						);
					});
			} catch (error) {
				console.log('Error in fetching data', error);
			}
			setLoading(false);
		};

		requestAPI();
	}, [args]);

	const onChange = (event) => {
		let e = event;
		const delayTime = 1000;

		// Delays setting debouncedSearch so it doesn't run fetch every time you time a char.
		clearTimeout(delayedSearch);
		let delayedSearch = setTimeout(
			(e) => {
				setDebouncedSearch(e.target.value);
			},
			delayTime,
			e
		);
	};

	const onSelection = (opt) => {
		const option = {
			value: opt.realValue,
			label: opt.value,
		};
		let newArray = [];
		let tax = JSON.parse(args.taxonomies);

		// Removing taxonomy from filter when the selected option has index equals to 0
		if (opt.realValue === 'all') {
			newArray = tax.filter((selection) => selection.taxonomy !== opt.value);

			setArgs((prevState) => ({
				...prevState,
				taxonomies: JSON.stringify(!newArray.length ? [] : newArray),
				page: 1,
			}));
			return;
		}

		// Selecting option from same taxonomy will remove that taxonomy and add the new one
		if (tax.filter((selection) => selection.taxonomy === option.value) && tax.length !== 0) {
			newArray = tax.filter((selection) => selection.taxonomy !== option.value);
			setArgs((prevState) => ({
				...prevState,
				taxonomies: JSON.stringify([
					...newArray,
					{
						taxonomy: option.value,
						term: option.label,
					},
				]),
				page: 1,
			}));
			return;
		}

		setArgs((prevState) => ({
			...prevState,
			taxonomies: JSON.stringify([
				...tax,
				{
					taxonomy: option.value,
					term: option.label,
				},
			]),
			page: 1,
		}));
	};

	return (
		<div id={linkId} className={`${styles.container} ${styles['content-filter']} ${className}`}>
			<FilterBar
				resetFilters={resetFilters}
				setResetFilters={setResetFilters}
				onChange={onChange}
				onSelection={onSelection}
				postTypeData={postTypeData}
				{...filterCopy}
			/>
			<div className={styles['loader__wrapper']}>
				{loading && (
					<div className={styles.loader}>
						<Loader />
					</div>
				)}
			</div>
			{apiResponse?.posts && (
				<>
					{(JSON.parse(args.taxonomies).length > 0 || debouncedSearch) && totalPosts > 0 && (
						<div className={`${styles['error-message']} ${styles['container']}`}>
							<h6 className={`${styles.h6}`}>
								About {totalPosts} results for {''}
								{data &&
									!loading &&
									data.map((item, i) => (i === data.length - 1 ? `"${item.term}"` : `"${item.term}" ,`))}
								{args.search && (data.length > 0 ? ` and "${args.search}"` : `: "${args.search}"`)}
							</h6>
							<button className={styles['clear-search']} onClick={handleClearResults}>
								{t('searchPage.clearSearchResults')}
							</button>
						</div>
					)}
					<CardSelector postType={requestData.post_type} cardData={apiResponse?.posts} />
					{paginationDisplayed && <Pagination pageLinks={pageLinks} currentPage={currentPage} linkId="filter-area" />}
				</>
			)}
		</div>
	);
};

export default FilteringModule;
