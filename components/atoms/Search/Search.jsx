import React, { useState } from 'react';
import styles from './Search.module.scss';
import { useRouter } from 'next/router';
import GlobalConstants from '../../../GlobalConstants';
import { SearchIcon } from '../../atoms/IconSocial/SearchIcon';

const Search = ({ className }) => {
	const [searchValue, setSearchValue] = useState('');

	const router = useRouter();
	const locale = router.locale === 'en-US' ? '' : `/${router.locale}`;

	function handleSubmit(event) {
		event.preventDefault();

		// router.push({ pathname: `/${GlobalConstants.FrontendRoutes.Search}`, query: { search: searchValue } });
		window.location.href = `/${GlobalConstants.FrontendRoutes.Search}?search=${searchValue}`;
	}

	return (
		<div className={`${styles['search']} ${className ?? ''}`}>
			<div className={styles['search__container']}>
				<form onSubmit={handleSubmit} className={styles['search__form']}>
					<input
						className={`${styles['search__field']}`}
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search"
						type="text"
					/>
					<button type="submit" className={styles['search__submit']} aria-label="Submit search"></button>
				</form>

				<a
					className={styles['search__cta']}
					href={`${locale}/${GlobalConstants.FrontendRoutes.Search}`}
					aria-label="Search page"
				>
					{<SearchIcon />}
				</a>
			</div>
		</div>
	);
};

export default Search;
