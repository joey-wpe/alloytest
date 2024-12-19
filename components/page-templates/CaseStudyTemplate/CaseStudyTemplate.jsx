import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './CaseStudyTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import { useInView } from 'react-intersection-observer';
import ArrowDouble from '../../../public/icons/arrow-double-right-thruster.png';
import ArrowSimple from '../../../public/icons/arrow-simple-thruster.png';
import Background from '../../atoms/Background/Background';
import { gqlCaseStudyTemplateResponseToCaseStudyTemplate } from './CaseStudyTemplate.datamediator';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import HighlightsSections from '../../molecules/HighlightsSections/HighlightsSections';

const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));
const CountUp = dynamic(() => import('react-countup'), {
	loading: () => <div />,
});

const CaseStudyTemplate = ({ caseStudy, postTypeData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const { mastheadSettings, keyOutcomes, companyFacts, repeaterItems, logoCompany } =
		gqlCaseStudyTemplateResponseToCaseStudyTemplate(caseStudy);
	let checkImage = false;
	const { t } = useTranslation('common');
	const overviewSectionBackground = {
		type: 'solid',
		color: 'light',
	};

	const repeaterSectionsBackground = {
		type: 'pattern',
		color: 'blue',
	};

	const repeaterSectionsAltBackground = {
		type: 'solid',
		color: 'white',
	};

	const [refMasthead, inViewMasthead] = useInView({
		threshold: 0,
	});

	const classAnimPlay = inViewMasthead && styles['anim-play'];
	const classFadeInUp = styles['anim-fade-in-up'];

	const companyOverview = caseStudy?.caseStudyFields?.overviewTitle ?? t('caseStudy.companyOverview');
	const companyIndustryString = t('caseStudy.companyIndustryString');
	const companyLocationString = t('caseStudy.companyLocationString');
	const companySizeString = t('caseStudy.companySizeString');
	const companyProductString = t('caseStudy.companyProductString');
	const companyUseCaseString = t('caseStudy.companyUseCaseString');

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const locale = useRouter().locale === 'en-US' ? '' : `/${useRouter().locale}`;

	const breadcrumb = {
		breadcrumbsLinks: [
			{ label: t('breadcrumb.home'), url: `/${locale}` },
			{ label: t('breadcrumb.caseStudies'), url: `${locale}/case-studies` },
			{ label: caseStudy.title, url: `${locale}/case-studies/${caseStudy.slug}` },
		],
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}

			<MastheadMinimal {...mastheadSettings} breadcrumb={breadcrumb}>
				{keyOutcomes && (
					<div className={styles.keyOutcomeSection}>
						{keyOutcomes.length > 0 &&
							keyOutcomes.map((keyOutcome, index) => {
								// console.log(typeof keyOutcome.stat);
								return (
									<div key={index} className={styles['content-information']}>
										<div className={`${styles.stat} ${classAnimPlay} ${classFadeInUp}`}>
											<CountUp end={keyOutcome.stat} duration={2} separator="," useEasing={true}></CountUp>
											{keyOutcome.statTrailingCharacter ? <span>{keyOutcome.statTrailingCharacter}</span> : null}
										</div>
										<div className={`${styles['content-copy']} ${classAnimPlay} ${classFadeInUp}`}>
											<p className={`${styles.text} `}>{keyOutcome.text}</p>
											<p className={`${styles.seo}`}>{keyOutcome.type}</p>
											<p className={`${styles.description} ${styles['sub-p']}`}>{keyOutcome.description}</p>
										</div>
									</div>
								);
							})}
					</div>
				)}
			</MastheadMinimal>
			<div className={`${styles['case-study']}`}>
				<Background type={overviewSectionBackground.type} color={overviewSectionBackground.color}>
					<div
						className={`${styles['container']} ${styles['content-overviewSection']} ${classAnimPlay} ${classFadeInUp}`}
						ref={refMasthead}
					>
						<div className={styles.overviewSection}>
							{logoCompany?.src && (
								<Image
									className={styles.logo}
									src={logoCompany.src}
									alt={logoCompany.alt ?? 'Company Logo'}
									layout="fill"
								/>
							)}

							<h3 className={styles.h3}>{companyOverview}</h3>
							<div
								className={`${styles['p']} ${styles['primary-bullet-style']}`}
								dangerouslySetInnerHTML={{ __html: caseStudy.caseStudyFields?.overview }}
							/>
						</div>
						{(companyFacts.industry ||
							companyFacts.size ||
							companyFacts.location ||
							companyFacts.useCase ||
							companyFacts.companyProducts) && (
							<div className={`${styles.railSection} ${classAnimPlay} ${classFadeInUp}`}>
								<ul className={styles['list']}>
									{companyFacts.industry && (
										<li>
											<span>
												<Image src={ArrowDouble} alt="Arrow Icon" width={10} height={10} />
											</span>
											<div className={styles['list-text']}>
												<b>{companyIndustryString}</b>
												{companyFacts.industry}
											</div>
										</li>
									)}
									{companyFacts.size && (
										<li>
											<span>
												<Image src={ArrowDouble} alt="Arrow Icon" width={10} height={10} />
											</span>
											<div>
												<b>{companyLocationString}</b>
												{companyFacts.size}
											</div>
										</li>
									)}
									{companyFacts.location && (
										<li>
											<span>
												<Image src={ArrowDouble} alt="Arrow Icon" width={10} height={10} />
											</span>
											<div>
												<b>{companySizeString}</b>
												{companyFacts.location}
											</div>
										</li>
									)}
									{companyFacts.useCase && companyFacts.useCase.length > 0 && (
										<li className={styles['content-sub-lis']}>
											<div className={styles['title-sub-list']}>
												<span>
													<Image src={ArrowDouble} alt="Arrow Icon" width={10} height={10} />
												</span>
												<b>{companyUseCaseString}</b>
											</div>
											<ul className={styles['sub-list']}>
												{companyFacts.useCase.map((useCase, index) => {
													return (
														<li key={index}>
															<span>
																<Image src={ArrowSimple} alt="Arrow Icon" width={5} height={10} />
															</span>
															{useCase.example}
														</li>
													);
												})}
											</ul>
										</li>
									)}

									{companyFacts.companyProducts && (
										<li className={styles['content-sub-lis']}>
											<div className={styles['title-sub-list']}>
												<span>
													<Image src={ArrowDouble} alt="Arrow Icon" width={10} height={10} />
												</span>
												<b>{companyProductString}</b>
											</div>

											<ul className={styles['sub-list']}>
												{companyFacts.companyProducts.map((product, productIndex) => {
													return (
														<li key={productIndex}>
															<span>
																<Image src={ArrowSimple} alt="Arrow Icon" width={5} height={10} />
															</span>

															{product?.products && (
																<a href={product.products.url} target={product.products.target}>
																	{product.products.title}
																</a>
															)}
														</li>
													);
												})}
											</ul>
										</li>
									)}
								</ul>
							</div>
						)}
					</div>
				</Background>

				<div className={`${styles.repeaterSections}`}>
					{repeaterItems &&
						repeaterItems.length > 0 &&
						repeaterItems.map((repeaterItem, repeaterIndex) => {
							if (repeaterIndex !== repeaterItems.length - 1 && !repeaterItems[repeaterIndex + 1]?.image) {
								checkImage = true;
							} else {
								checkImage = false;
							}
							const isAltRow = repeaterIndex % 2 == 0 ? true : false;
							return (
								<Background
									key={repeaterIndex}
									type={isAltRow ? repeaterSectionsBackground.type : repeaterSectionsAltBackground.type}
									color={isAltRow ? repeaterSectionsBackground.color : repeaterSectionsAltBackground.color}
								>
									<HighlightsSections repeaterItem={repeaterItem} checkImage={checkImage} />
								</Background>
							);
						})}
				</div>
				{caseStudy.contentBlocksModules?.modules && caseStudy.contentBlocksModules?.modules.length > 0 && (
					<FlexibleContentArea
						modules={caseStudy.contentBlocksModules?.modules}
						resourceGridQuery={postTypeData?.resourcesQuery}
					/>
				)}
			</div>
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

CaseStudyTemplate.propTypes = {
	caseStudy: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default CaseStudyTemplate;
