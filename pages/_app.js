import MunchkinScript from '../components/non-visual/MunchkinScriptEmbed/MunchkinScriptEmbed';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { AccelerateColor } from '../styles/_variables.module.scss';
import IntercomWidget from '../components/molecules/IntercomWidget/IntercomWidget';

import '../styles/sanitize.css/sanitize.css';
import '../styles/sanitize.css/assets.css';
import '../styles/sanitize.css/forms.css';
import '../styles/sanitize.css/reduce-motion.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<MunchkinScript />
			<NextNProgress
				color={AccelerateColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
				options={{ showSpinner: false }}
			/>
			<Component {...pageProps} />
			<IntercomWidget />
		</>
	);
}

export default appWithTranslation(MyApp);
