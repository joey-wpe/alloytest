const { i18n } = require('./next-i18next.config');
//const redirects = require('./public/redirects.json');

// default to limiting cpu count to 1 (least pressure on backend gql service)
// cpu tests on 6/27/2022
// 1 - 447 seconds => 7.45m
// 2 - 215s, 225s, 226s => ~3.65m
// 3 - build failed, build failed, build failed
// 4 - build failed
var cpuCount = parseInt(process.env.CPU_COUNT);
if (isNaN(cpuCount)) {
	cpuCount = 1; // default to 1 if we cant read it in (as lower level environments cant handle more)
}

// set the cpu limit if it's not set to -1
var experimentalSettings = {};
if (cpuCount !== -1) {
	experimentalSettings = {
		cpus: cpuCount,
	};
}

// try and read in the CSPer.io report-to url from environment vars - we default to a non-prod instance if not provided
// prod: https://65eb3282bc57ae1120bf66ab.endpoint.csper.io
var cspReportToUrl = 'https://6421d973622ceaeaddd41ec4.endpoint.csper.io'; // default to non-prod instance
if (process.env.CSP_REPORT_TO_URL && process.env.CSP_REPORT_TO_URL !== '') {
	cspReportToUrl = process.env.CSP_REPORT_TO_URL;
}

// read in if the CSP is in report-only mode or not
var cspReportOnly = true;
if (process.env.CSP_REPORT_ONLY && process.env.CSP_REPORT_ONLY === 'false') {
	cspReportOnly = false;
}

// the CSP version (used for filtering to specific versions in CSPer.io dashboard tool)
const cspVersion = '25'; // NOTE:: this version should change with each CSP release

// NOTE:: example of Csper.io tracking (version changes with each release): report-uri https://6421d973622ceaeaddd41ec4.endpoint.csper.io?v=22;
// - report-uri goes before worker-src

// google tracking pixels need both 'connect-src' and 'img-src'. We cannot wildcard them with something like google.* as that could allow something like google.badactor.com, so they must be explicitly spelled out:
const cspGoogleDomains =
	'https://www.google.ae https://www.google.al https://www.google.am https://www.google.at https://www.google.az https://www.google.ba https://www.google.be https://www.google.bf https://www.google.bg https://www.google.bj https://www.google.bt https://www.google.by https://www.google.ca https://www.google.ch https://www.google.ci https://www.google.cl https://www.google.cm https://www.google.cn https://www.google.co.ao https://www.google.co.cr https://www.google.co.id https://www.google.co.il https://www.google.co.in https://www.google.co.jp https://www.google.co.ke https://www.google.co.kr https://www.google.co.ls https://www.google.co.ma https://www.google.co.mz https://www.google.co.nz https://www.google.co.th https://www.google.co.tz https://www.google.co.ug https://www.google.co.uk https://www.google.co.uz https://www.google.co.ve https://www.google.co.vi https://www.google.co.za https://www.google.co.zm https://www.google.com https://www.google.com.ar https://www.google.com.au https://www.google.com.bd https://www.google.com.bh https://www.google.com.bn https://www.google.com.bo https://www.google.com.br https://www.google.com.co https://www.google.com.cy https://www.google.com.do https://www.google.com.ec https://www.google.com.eg https://www.google.com.et https://www.google.com.fj https://www.google.com.gh https://www.google.com.gt https://www.google.com.hk https://www.google.com.jm https://www.google.com.kh https://www.google.com.kw https://www.google.com.mt https://www.google.com.mx https://www.google.com.my https://www.google.com.ng https://www.google.com.np https://www.google.com.om https://www.google.com.pa https://www.google.com.pe https://www.google.com.ph https://www.google.com.pk https://www.google.com.pr https://www.google.com.py https://www.google.com.qa https://www.google.com.sa https://www.google.com.sg https://www.google.com.sv https://www.google.com.tr https://www.google.com.tw https://www.google.com.ua https://www.google.com.uy https://www.google.com.vn https://www.google.cz https://www.google.de https://www.google.dk https://www.google.dz https://www.google.ee https://www.google.es https://www.google.fi https://www.google.fr https://www.google.ge https://www.google.gl https://www.google.gr https://www.google.gy https://www.google.hn https://www.google.hr https://www.google.hu https://www.google.ie https://www.google.im https://www.google.is https://www.google.it https://www.google.je https://www.google.jo https://www.google.kg https://www.google.kz https://www.google.la https://www.google.li https://www.google.lk https://www.google.lt https://www.google.lu https://www.google.lv https://www.google.md https://www.google.me https://www.google.mg https://www.google.mk https://www.google.ml https://www.google.mn https://www.google.mu https://www.google.ne https://www.google.nl https://www.google.no https://www.google.pl https://www.google.ps https://www.google.pt https://www.google.ro https://www.google.rs https://www.google.ru https://www.google.rw https://www.google.sc https://www.google.se https://www.google.sk https://www.google.sn https://www.google.sr https://www.google.tg https://www.google.tn https://www.google.tt';

// csp broken into portions for easier editing and comparing
const cspDefaultSrc = "default-src 'self' blob: *.tricentis.com";
const cspScriptSrc =
	"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.intercom.io https://widget.intercom.io https://js.intercomcdn.com *.adsrvr.org *.bing.com *.bizible.com *.cookielaw.org *.demandbase.com *.doubleclick.net *.facebook.net *.googleoptimize.com *.googletagmanager.com *.licdn.com *.marketo.net *.mountain.com https://dx.mountain.com https://px.mountain.com https://gs.mountain.com *.tricentis.com *.trustradius.com *.vimeo.com *.wistia.com *.youtube.com *.zoominfo.com https://js.adsrvr.org https://bat.bing.com https://cdn.bizible.com https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js https://api.company-target.com https://cdn.cookielaw.org https://tag.demandbase.com https://googleads.g.doubleclick.net https://connect.facebook.net https://www.google.com https://*.google-analytics.com https://www.googleadservices.com https://ajax.googleapis.com https://fonts.googleapis.com https://www.googleoptimize.com https://*.googlesyndication.com https://www.googletagmanager.com https://www.gstatic.com https://cdn.jsdelivr.net/npm/countup@1.8.2/dist/countUp.min.js https://snap.licdn.com https://munchkin.marketo.net https://cdn.mouseflow.com https://eu.mouseflow.com https://netlify-cdp-loader.netlify.app https://*.tricentis.com https://affiliates.tricentis.com https://fast.wistia.com https://fast.wistia.net https://ws.zoominfo.com https://www.youtube.com/iframe_api https://www.trustradius.com https://d30ia583fbtg8i.cloudfront.net/trustquotes https://b.6sc.co https://j.6sc.co https://*.optimizely.com https://optimizely.s3.amazonaws.com https://cdn-assets-prod.s3.amazonaws.com https://*.onetrust.com https://js.sentry-cdn.com https://www.redditstatic.com/ads/pixel.js";
const cspStyleSrc =
	"style-src 'self' 'unsafe-inline' 'report-sample' *.marketo.net *.tricentis.com https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com https://api.company-target.com https://cdnjs.cloudflare.com https://fonts.googleapis.com https://www.googletagmanager.com https://www.gstatic.com https://pages.tricentis.com https://lps.tricentis.com https://www.trustradius.com https://*.typekit.net https://d30ia583fbtg8i.cloudfront.net https://*.onetrust.com";
const cspObjectSrc = "object-src 'none'";
const cspChildSrc =
	"child-src 'self' https://intercom-sheets.com https://www.intercom-reporting.com  https://www.youtube.com https://player.vimeo.com https://fast.wistia.net";
const cspConnectSrc = `connect-src 'self' https://via.intercom.io https://api.intercom.io https://api.au.intercom.io https://api.eu.intercom.io https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io https://api-ping.intercom.io https://nexus-websocket-a.intercom.io wss://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-b.intercom.io https://nexus-europe-websocket.intercom.io wss://nexus-europe-websocket.intercom.io https://nexus-australia-websocket.intercom.io wss://nexus-australia-websocket.intercom.io https://uploads.intercomcdn.com https://uploads.intercomcdn.eu  https://uploads.au.intercomcdn.com  https://uploads.intercomusercontent.com *.doubleclick.net http://ad.doubleclick.net *.mktoresp.com *.mktoutil.com *.google.com https://analytics.google.com https://adservice.google.com https://www.googleadservices.com https://region1.analytics.google.com https://cdn.cookielaw.org https://cdn.linkedin.oribi.io *.company-target.com https://ws.zoominfo.com bat.bing.com *.google-analytics.com *.demandbase.com *.wistia.com *.onetrust.com *.facebook.com pages.tricentis.com lps.tricentis.com be.tricentis.com  tricstaging.wpenginepowered.com tribedevelop.wpenginepowered.com *.googlesyndication.com *.googletagmanager.com *.mouseflow.com https://eu.mouseflow.com https://o2.mouseflow.com https://www.trustradius.com https://dudodiprj2sv7.cloudfront.net dx.mountain.com px.mountain.com gs.mountain.com 44.238.122.172 100.20.58.101 35.85.84.151 44.228.85.26 34.215.155.61 35.160.46.251 52.71.121.170 18.210.229.244 44.212.189.233 3.212.39.155 52.22.50.55 54.156.2.105 *.litix.io https://px.ads.linkedin.com https://ipv6.6sc.co https://c.6sc.co https://logx.optimizely.com https://*.optimizely.com https://*.6sense.com https://eps.6sc.co https://v.eps.6sc.co ${cspGoogleDomains}`;
const cspFontSrc =
	"font-src 'self' https://js.intercomcdn.com https://fonts.intercomcdn.com data: https://cdn.mouseflow.com https://fast.wistia.com https://fonts.gstatic.com https://use.typekit.net https://dudodiprj2sv7.cloudfront.net/font/glyphicons/ https://*.onetrust.com";
const cspFrameAncestors =
	"frame-ancestors 'self' https://www.tricentis.com https://be-develop.tricentis.com https://triapinenew.wpenginepowered.com https://tricstaging.wpenginepowered.com https://tribedevelop.wpenginepowered.com https://be-test.tricentis.com https://be.tricentis.com";
const cspFrameSrc =
	'frame-src *.adsrvr.org *.facebook.com *.tricentis.com https://*.analytics.google.com https://*.google-analytics.com https://*.googletagmanager.com https://bid.g.doubleclick.net https://datainsights-cdn.dm.aws.gartner.com https://td.doubleclick.net https://tpc.googlesyndication.com https://www.buzzsprout.com https://www.google.com https://player.vimeo.com https://fast.wistia.net *.wistia.com https://www.youtube.com https://app.netlify.com https://s.company-target.com https://capture.navattic.com https://tricentis.navattic.com https://a26508490611.cdn.optimizely.com https://a26508490611.cdn-pci.optimizely.com';
const cspImgSrc = `img-src 'self' blob: data: tribedevelop.wpenginepowered.com tricstaging.wpenginepowered.com triapinenew.wpenginepowered.com https://js.intercomcdn.com https://static.intercomassets.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com https://uploads.intercomusercontent.com https://gifs.intercomcdn.com  https://video-messages.intercomcdn.com https://messenger-apps.intercom.io https://messenger-apps.eu.intercom.io https://messenger-apps.au.intercom.io https://*.intercom-attachments-1.com https://*.intercom-attachments.eu https://*.au.intercom-attachments.com https://*.intercom-attachments-2.com https://*.intercom-attachments-3.com https://*.intercom-attachments-4.com https://*.intercom-attachments-5.com https://*.intercom-attachments-6.com https://*.intercom-attachments-7.com https://*.intercom-attachments-8.com https://*.intercom-attachments-9.com https://static.intercomassets.eu https://static.au.intercomassets.com *.doubleclick.net http://ad.doubleclick.net https://pubads.g.doubleclick.net https://*.google-analytics.com https://analytics.google.com https://region1.analytics.google.com https://adservice.google.com https://*.googletagmanager.com https://fonts.gstatic.com *.tricentis.com https://www.tricentis.com https://cdn.bizible.com https://cdn.bizibly.com *.capterra.com *.wistia.com *.linkedin.com https://px.ads.linkedin.com *.cookielaw.org *.googlesyndication.com https://www.google.com www.googletagmanager.com https://bat.bing.com https://id.rlcdn.com https://www.facebook.com https://segments.company-target.com https://capterra.s3.amazonaws.com https://eu.mouseflow.com chart.googleapis.com wingify-assets.s3.amazonaws.com https://media.trustradius.com https://d30ia583fbtg8i.cloudfront.net https://px.ads.linkedin.com https://b.6sc.co https://cdn.optimizely.com ${cspGoogleDomains}`;
const cspMediaSrc =
	"media-src 'self' https://js.intercomcdn.com blob: https://*.wistia.com https://embedwistia-a.akamaihd.net";
const cspReportUri = `report-uri ${cspReportToUrl}?v=${cspVersion}`;
const cspWorkerSrc = "worker-src 'self' blob:";

var securityHeaders = [
	{
		key: cspReportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
		value: `${cspDefaultSrc}; ${cspScriptSrc}; ${cspStyleSrc}; ${cspObjectSrc}; ${cspChildSrc}; ${cspConnectSrc}; ${cspFontSrc}; ${cspFrameAncestors}; ${cspFrameSrc}; ${cspImgSrc}; ${cspMediaSrc}; ${cspReportUri}; ${cspWorkerSrc};`,
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	// was removed as it was breaking previews with "Refused to display 'https://fe-test.tricentis.com/'
	// in a frame because it set 'X-Frame-Options' to 'sameorigin'", should be fixed with "frame-ancestors" CSP
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
];

console.log('next.config.js - setting experimental options to: ', experimentalSettings);

var nextConfig = {
	// NOTE:: The build fails when using all CPU cores avaialable - the backend responds with a
	// '502 Bad Gateway' error. For now we force a limit of 2 CPUs so the builds more reliably succeed (albeit slower).
	// ref: https://docs.uniform.dev/sitecore/deploy/how-tos/how-to-control-nextjs-threads/
	experimental: experimentalSettings,
	reactStrictMode: true,
	swcMinify: true, // use Rust compiler for minifications - 7x faster than Terser
	//async redirects() {
	//	return redirects;
	//},
	// trailingSlash: true,
	images: {
		domains: [
			'via.placeholder.com',
			'triapinenew.wpenginepowered.com',
			'tricstaging.wpenginepowered.com',
			'tribedevelop.wpenginepowered.com'
		],
		formats: ['image/webp'], // could add 'image/avif', but they are slower to generate and pop-in is more noticible (ex: on product tabber) (ref: https://nextjs.org/blog/next-12)
	},
	i18n,
	headers: async () => {
		return [
			{
				source: '/:path*',
				headers: securityHeaders,
			},
		];
	},
};

// @next/bundle-analyzer to analyze bundle size | Run with the command 'ANALYZE=true yarn build'
if (process.env.ANALYZE === 'true') {
	const withNextBundleAnalyzer = require('@next/bundle-analyzer')({
		/* options come there */
		enabled: true,
	});
	nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;

// Test comment to create a PR for testing the (PR) deploy preview feature