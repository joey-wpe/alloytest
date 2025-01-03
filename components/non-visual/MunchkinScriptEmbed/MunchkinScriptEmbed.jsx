import Script from 'next/dist/client/script';
const MunchkinScriptEmbed = () => {
	return (
		<Script id="munchkin-script">
			{` 
				(function() {
					var didInit = false;
					function initMunchkin() {
						if(didInit === false) {
							didInit = true;
							Munchkin.init('070-PYT-570');
						}
					}
					var s = document.createElement('script');
					s.type = 'text/javascript';
					s.async = true;
					s.src = 'https://munchkin.marketo.net/munchkin.js';
					s.onreadystatechange = function() {
						if (this.readyState == 'complete' || this.readyState == 'loaded') {
							initMunchkin();
						}
					};
					s.onload = initMunchkin;
					document.getElementsByTagName('head')[0].appendChild(s);
				 })();
			`}
		</Script>

	);
};
export default MunchkinScriptEmbed;