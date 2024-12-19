import React, { useEffect, useState } from 'react';
import styles from './FilterBar.module.scss';
import Image from 'next/image';
import SearchIcon from '../../../public/icons/search-icon.png';
import { useTranslation } from 'next-i18next';
import SelectFilter from '../../atoms/SelectFilter/SelectFilter';

const FilterBar = ({ onSelection, onChange, prehead, title, postTypeData, resetFilters }) => {
	const [searchOpen, setSearchOpen] = useState(false);
	const { t } = useTranslation('common');

	const taxonomies = {
		Region: t('taxonomies.Regions'),
		ResourceIndustry: t('taxonomies.Industries'),
		ResourceProduct: t('taxonomies.Products'),
		ResourceTopic: t('taxonomies.Topics'),
		Partnertype: t('taxonomies.Partners'),
		PartnerCertification: t('taxonomies.PartnerCertification'),
		ResourceType: t('taxonomies.ResourceType'),
		Category: t('taxonomies.Category'),
		EventTypes: t('taxonomies.EventTypes'),
		EventMonths: t('taxonomies.EventMonths'),
		LearnType: t('taxonomies.Learntype'),
	};

	const selectDefaults =
		Object.keys(postTypeData)?.length !== 0
			? Object.keys(postTypeData).map((taxonomy) => {
					return `${t('filterBar.selectText')} ${taxonomies[taxonomy]}`;
			  })
			: null;
	const selects = Object.keys(postTypeData)?.length !== 0 ? Object.values(postTypeData) : null;

	const selectsWithOptions = selects?.map((select) =>
		select.map((option) => ({
			realValue: option.taxonomy,
			label: option.term,
			value: option.slug,
		}))
	);

	const optionsDefaults = selectDefaults?.map((option, i) => ({
		realValue: 'all',
		label: option,
		value: selectsWithOptions[i][0].realValue,
	}));

	function reset() {
		for (let index = 0; index < selectDefaults?.length; index++) {
			let tst = document.getElementById(`my_select${index}`);
			if (tst) tst.selectedIndex = 0;
		}
		const search = document.getElementById(`search-field`);
		search.value = '';
	}

	useEffect(() => {
		reset();
	}, [resetFilters]);

	return (
		<form className={styles.container}>
			<div className={styles['content-copy']}>
				<span className={styles.prehead}>{prehead}</span>
				<h2 className={styles.h2}>{title}</h2>
			</div>
			<div className={styles['component-filter']}>
				<div className={styles['subhead-container']}>
					<p className={styles.subhead}>{selects && t('filterBar.titleFilter')}</p>
					{selectsWithOptions &&
						selectsWithOptions?.map((select, i) => {
							const optionDefault = optionsDefaults[i];
							return (
								<SelectFilter
									key={i}
									options={[optionDefault, ...select]}
									isSearchable={false}
									defaultValue={optionDefault}
									action={onSelection}
									reset={resetFilters}
									aria-label={`Filter by ${optionDefault.label}`}
								/>
							);
						})}
				</div>
				<div className={styles['search-bar']}>
					<input
						className={searchOpen ? styles['input-open'] : ''}
						type="text"
						placeholder={t('filterBar.textInputSearch')}
						onChange={onChange}
						id="search-field"
					/>
					<Image
						src={SearchIcon}
						alt={t('filterBar.searchIconAlt')}
						width={24}
						height={24}
						onClick={() => {
							setSearchOpen(!searchOpen);
						}}
					/>
				</div>
			</div>
		</form>
	);
};

export default FilterBar;
