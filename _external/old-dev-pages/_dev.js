import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head';
import ErrorPage from 'next/error';

import ColorVariables from '../styles/_variables.module.scss';
import GlobalConstants from '../GlobalConstants';

import Button from '../components/atoms/Button/Button';
import ButtonGroup from '../components/molecules/ButtonGroup/ButtonGroup';
import styles from '../styles/pages/Home.module.scss';

export default function DevPage() {
	// this page should only render when in dev mode, otherwise it should return a 404
	if (GlobalConstants.Options.BuildDevPages !== true) {
		return <ErrorPage statusCode={404} />;
	}

	const renderButtonCollection = () => {
		return (
			<>
				<ButtonGroup
					alignment="left"
					buttons={[
						{
							buttonStyle: 'PrimaryDefault',
							buttonText: 'Primary Default',
							link: 'https://www.google.com#primary',
						},
						{
							buttonStyle: 'SecondaryDefault',
							buttonText: 'Secondary Default',
							link: 'https://www.google.com#secondary',
						},
						{
							buttonStyle: 'TertiaryDefault',
							buttonText: 'Tertiary Default',
							link: 'https://www.google.com#primary',
						},
					]}
				/>
				<ButtonGroup
					alignment="left"
					buttons={[
						{
							buttonStyle: 'PrimaryReverse',
							buttonText: 'Primary Reverse',
							link: 'https://www.google.com#primary',
						},
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: 'Secondary Reverse',
							link: 'https://www.google.com#secondary',
						},
						{
							buttonStyle: 'TertiaryReverse',
							buttonText: 'Tertiary Reverse',
							link: 'https://www.google.com#primary',
						},
					]}
				/>
			</>
		);
	};

	return (
		<>
			<div className={styles.container}>
				<Head>
					<title>{GlobalConstants.General.SiteTitle} - Home</title>
				</Head>
				<main className={styles.main}>
					<h1 className={styles.h1}>{GlobalConstants.General.SiteTitle}</h1>

					<hr className={styles.hr} />

					<h2 className={styles.h2}>Referencing colors by CSS style or programatically</h2>
					<p className={styles.lineItem} style={{ color: ColorVariables.PrimaryColor }}>
						Sample text in PrimaryColor (via JS object reference)
					</p>
					<p className={`${styles.lineItem} ${styles.secondaryColoredText}`}>
						Sample text in SecondaryColor (via CSS variable reference)
					</p>

					<hr className={styles.hr} />

					<h2 className={styles.h2}>Heading Styles</h2>
					<h1 className={styles.h1}>Heading 1</h1>
					<h2 className={styles.h2}>Heading 2</h2>
					<h3 className={styles.h3}>Heading 3</h3>
					<h4 className={styles.h4}>Heading 4</h4>
					<h5 className={styles.h5}>Heading 5</h5>
					<h6 className={styles.h6}>Heading 6</h6>

					<hr className={styles.hr} />

					<h2 className={styles.h2}>Button Styles</h2>

					{renderButtonCollection()}

					<div className="midtone-theme" style={{ backgroundColor: '#0087ae', padding: '10px 5px' }}>
						{renderButtonCollection()}
					</div>

					<div className="dark-theme" style={{ backgroundColor: '#1b365d', padding: '10px 5px' }}>
						{renderButtonCollection()}
					</div>

					<h2 className={styles.h2}>Sample Pages</h2>
					<Button buttonText={'Homepage'} buttonStyle={'TertiaryDefault'} link={'/'} />
					<Button buttonText={'Locations'} buttonStyle={'TertiaryDefault'} link={'/locations'} />
					<Button buttonText={'Search'} buttonStyle={'TertiaryDefault'} link={'/search'} />
					<Button buttonText={'Sample Page'} buttonStyle={'TertiaryDefault'} link={'/sample-page'} />

					<h2 className={styles.h2}>Template Sample Pages</h2>
					<p>BE = Backend, MW = Middleware, FE = Frontend</p>
					<Button
						buttonText={'Basic One Column (stubbed out for FE)'}
						buttonStyle={'TertiaryDefault'}
						link={'/basic-one-column'}
					/>
					<Button
						buttonText={'Case Study Detail (BE/MW)'}
						buttonStyle={'TertiaryDefault'}
						link={'/case-studies/twinformatics'}
					/>
					<Button buttonText={'Newsroom Main (stubbed out for FE)'} buttonStyle={'TertiaryDefault'} link={'/news'} />
					<Button buttonText={'Pricing Main (stubbed out for FE)'} buttonStyle={'TertiaryDefault'} link={'/pricing'} />
					<Button
						buttonText={'Pricing Detail (stubbed out for FE)'}
						buttonStyle={'TertiaryDefault'}
						link={'/pricing-detail-example-page'}
					/>
					<Button
						buttonText={'Product Login Form (stubbed out for FE)'}
						buttonStyle={'TertiaryDefault'}
						link={'/product-login'}
					/>
					<Button
						buttonText={'Product Demo Form (stubbed out for FE)'}
						buttonStyle={'TertiaryDefault'}
						link={'/product-demo-form'}
					/>
					<Button
						buttonText={'Team Member Archive Template (BE/MW/FE)'}
						buttonStyle={'TertiaryDefault'}
						link={'/team'}
					/>
					<Button
						buttonText={'Modular Template with Secondary Nav (BE/MW)'}
						buttonStyle={'TertiaryDefault'}
						link={'/modular-with-secondary-nav'}
					/>
					<Button
						buttonText={'Partners Main Landing Page Template (BE/MW)'}
						buttonStyle={'TertiaryDefault'}
						link={'/partners'}
					/>
					<Button
						buttonText={'Marketing Basic Landing Page Template (FE/MW)'}
						buttonStyle={'TertiaryDefault'}
						link={'/lp/landing-page'}
					/>
					<Button
						buttonText={'Resource detail (Gated/Ungated) Template (FE/MW)'}
						buttonStyle={'TertiaryDefault'}
						link={'/resources/optio-earum-et-facere-vitae-deleniti'}
					/>
					<Button
						buttonText={'Event detail Template (FE/MW)'}
						buttonStyle={'TertiaryDefault'}
						link={'/events/1994-2'}
					/>
				</main>

			</div>
		</>
	);
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
