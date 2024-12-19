import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Html, Head, Main, NextScript } from 'next/document';
import { isProductionEnvironment } from '../wplib/util';

export default function Document() {
	if (!process.env.GTM_CODE) {
		console.error('ERROR: GTM_CODE is not set. Please add as environment variable.');
	}

	return (
		<Html>
			<Head>
				<script
					dangerouslySetInnerHTML={{
						__html: `

							// Optimizely script load
							const optimizelyScript = document.createElement('script');
							optimizelyScript.type = 'text/javascript';
							optimizelyScript.src = 'https://cdn.optimizely.com/js/${process.env.OPTIMIZELY_ID}.js';
							// Check cookie manually for initial state after load
							optimizelyScript.onload = function() {
								const optanonCookieValue = document.cookie.split('&').find(row => row.startsWith('groups='));
								const optanonCookieAccepted = optanonCookieValue && optanonCookieValue.includes('C0002%3A1');

								if (optanonCookieAccepted) {
										initOptimizely();
								}
							};
							document.head.appendChild(optimizelyScript);
							
							// OneTrust script load
							const onetrustScript = document.createElement('script');
							onetrustScript.type = 'text/javascript';
							onetrustScript.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
							onetrustScript.type = 'text/javascript';
							onetrustScript.setAttribute('data-domain-script', '${process.env.ONETRUST_SCRIPT_ID}');
							onetrustScript.setAttribute('charset', 'UTF-8');

							document.head.appendChild(onetrustScript);

							function initOptimizely() {
								window["optimizely"].push({
									"type": "activate"
								});
							}

							function OptanonWrapper() { 
								window.dataLayer.push({event: 'OneTrustGroupsUpdated'});

								if (window.OnetrustActiveGroups && window.OnetrustActiveGroups.indexOf('C0002') > -1) {
									initOptimizely();
								}
							}

						`,
					}}
				></script>

				{/* <!-- Google Tag Manager --> */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','${process.env.GTM_CODE}');`,
					}}
				></script>
				{/* <!-- End Google Tag Manager --> */}

				{/* NOTE: if this font include changes, be sure to update it in storybook.scss as well */}
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
					rel="stylesheet"
				/>

				{/* Conditionally add "noindex, nofollow" meta tag for non-production environments */}
				{!isProductionEnvironment() && <meta name="robots" content="noindex, nofollow" />}
			</Head>
			<body>
				{/* <!-- Google Tag Manager (noscript) --> */}
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CODE}`}
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
					></iframe>
				</noscript>
				{/* <!-- End Google Tag Manager (noscript) --> */}
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
