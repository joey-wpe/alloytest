import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Background from '../../atoms/Background/Background';
import CardPress from '../../molecules/CardPress/CardPress';
import styles from './News.module.scss';
import ArrowDown from '../../../public/icons/arrow-down-blue.svg';
import Loader from '../../atoms/Loader/Loader';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import { formatDate, formatNewsDate } from '../../../wplib/dateFormatter';

const News = ({ type, years }) => {
	let locale = useRouter().locale;
	if (locale === 'en-US') locale = 'en';

	const [btnTab, setBtnTab] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const { t } = useTranslation('common');
	const classAnimPlay = inView && styles['anim-play'];

	const defaultArgs = {
		slug: type,
		language: locale,
		posts_per_page: 20,
		page: 1,
		year: null,
	};
	const [args, setArgs] = useState({ ...defaultArgs });
	const [results, setResults] = useState([]);
	const [firstLoad, setFirstLoad] = useState(false);
	const btnDisplayed = args.page !== results?.max_pages && results?.total_posts_found > 10;

	//Prepare params
	const params = new URLSearchParams(args);

	const url = `/api/news/?${params}`;

	useEffect(() => {
		const requestAPI = async () => {
			try {
				setIsLoading(true);
				const fetchResponse = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const response = await fetchResponse.json();
				if (args.page > 1) {
					setResults((prevResults) => ({
						...prevResults,
						news: [...prevResults.news, ...response.news],
					}));
				} else {
					setResults(response);
				}
			} catch (error) {
				console.log('Error in fetching data', error);
			} finally {
				setIsLoading(false);
			}
		};
		requestAPI();
		setFirstLoad(true);
	}, [args]);

	// active dropdown in event onClick
	const [dropDown, setDropDown] = useState(false);

	return (
		<Background type="solid">
			<div className={`${styles['content-press-releases']} ${styles.container}`}>
				<div className={styles['date-archive']}>
					<h6 className={styles.h6}>{t('pressReleases.dateArchiveTitle')}</h6>
					<div
						className={`${styles['date-content-num']} ${dropDown && styles['dropdow']}`}
						onClick={() => {
							setDropDown(!dropDown);
						}}
					>
						{Array.from(years).map((year, index) => {
							return (
								<button
									key={index}
									className={`${btnTab === index && styles['date-active']} ${dropDown && styles['dropdow--active']} ${
										styles.date
									}`}
									onClick={(e) => {
										setBtnTab(index);

										setArgs((prevArgs) => ({
											...prevArgs,
											year: e.target.value,
											page: 1,
										}));
									}}
									value={year}
								>
									{year}
								</button>
							);
						})}

						<div className={`${styles['arrow-down']} ${dropDown && styles['arrow-down--active']}`}>
							<Image src={ArrowDown} alt="Icon Arrow" width={10} height={16} />
						</div>
					</div>
				</div>

				<div className={styles['article--active']}>
					<div className={styles['article__items']}>
						{isLoading && (
							<div className={styles['load-wrapper']}>
								<Loader className={styles['article__loader']} />
							</div>
						)}
						<div className={styles['archive-item']} ref={refAnimation}>
							{results.news?.length > 0 &&
								results.news?.map((news, index) => {
									const classAnimDelay = `anim-delay-${index + 1}`;
									const url = news?.templateNews?.externalResource ? news?.templateNews?.urlOfResource : news.uri;
									const {
										date,
										templateNews: { publishDisplayDate },
									} = news;

									return (
										<CardPress
											date={formatNewsDate(publishDisplayDate) ?? formatDate(date) ?? null}
											title={news.title}
											subTitle={news.templateNews.resourceInfo}
											description={news.excerpt}
											button={{
												buttonStyle: 'TertiaryDefault',
												buttonText: t('generic.readMore'),
												link: mediateUrlPath(url),
												target: (type === 'news' && news?.templateNews?.externalResource) ? '_blank' : '_self',
											}}
											id={news.id}
											key={news.id}
											className={`${styles['anim-fade-in-up']} ${styles['card']} ${classAnimDelay} ${classAnimPlay}`}
										/>
									);
								})}
							{firstLoad && results.news?.length <= 0 && <div className={styles.h3}>{t('generic.noResultsFound')}</div>}
						</div>
					</div>
					{btnDisplayed && (
						<div className={styles['button-container']}>
							<div className={styles['button_wrapper']}>
								<button
									className={styles['button']}
									disabled={results.max_pages === args.page}
									onClick={() => {
										setArgs((prevState) => ({
											...prevState,
											page: prevState.page + 1,
										}));
									}}
								>
									{t('generic.loadMore')}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</Background>
	);
};

export default News;
