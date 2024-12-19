export const simpleDTOSetup = () => {
	/*
 @author Sanford Whiteman, TEKNKL (blog.teknkl.com / sandy@teknkl.com)
 @version v2.0.4
 @copyright Copyright 2016, 2017, 2018, 2019 FigureOne, Inc.
 @license MIT License: You must include this license and the above credits in all uses & reproductions of this software.
*/
	if (!window.SimpleDTO) {
		function SimpleDTO(a) {
			var l = getSelection.call.bind([].slice),
				f = FormsPlus.util.URI.URI().origin(),
				g = FormsPlus.util.URI.URI(a.dataSrc).origin(),
				h = document.referrer ? FormsPlus.util.URI.URI(document.referrer).origin() : null,
				m = FormsPlus.util.Cookies.get('_mkto_trk');
			switch (a.transport) {
				case 'document':
					try {
						a.debug && console.log('SimpleDTO: Unifying domains ' + [document.domain, a.documentDomain].join(', ')),
							(document.domain = a.documentDomain);
					} catch (n) {
						throw 'SimpleDTO: Domain unification failed, domain: ' + a.documentDomain;
					}
					break;
				case 'message':
					if ('receive' == a.mode && (-1 == [].concat(a.messageTarget).indexOf(f) || g != a.messageSource))
						throw (
							'SimpleDTO: Message receive preflight failed, origin: ' + f + ' and ' + g + ' cannot exchange messages'
						);
			}
			if ('receive' == a.mode) {
				var b = document.createElement('iframe');
				this.setSource = function (a) {
					b.src = a;
				};
				this.getSource = function () {
					return c;
				};
				switch (a.transport) {
					case 'document':
						b.addEventListener('load', function () {
							this.data || this.src
								? (a.debug && console.log('SimpleDTO: running callback'), a.cb && a.cb.call(this, k))
								: a.debug && console.log('SimpleDTO: skipping load event due to empty data src or callback');
						});
						break;
					case 'message':
						window.addEventListener('message', function (b) {
							b.origin == a.messageSource &&
								'1.3.6.1.4.1.26100.messages.simpledto' == b.data.oid &&
								(a.debug && console.log('SimpleDTO: running callback'), a.cb && a.cb.call(this, k, b.data.payload));
						});
				}
				b.setAttribute('data-transfer-object', 'true');
				[
					['visibility', 'hidden'],
					['position', 'absolute'],
					['height', '0'],
				].forEach(function (a) {
					b.style.setProperty.apply(b.style, a);
				});
				var c = document.createElement('a');
				c.href = a.dataSrc || '';
				a.noReplaceQuery || (c.search = document.location.search);
				window.__mktTokVal && (c.search += '&mkt_tok=' + window.__mktTokVal);
				'message' == a.transport && (c.search += '&_mkt_trk=' + encodeURIComponent(m));
				a.noInit || this.setSource(c.href);
				document.body.appendChild(b);
			}
			var k = this;
			return {
				getGlobal: function () {
					return b.contentWindow;
				},
				cleanup: function () {
					b.parentNode.removeChild(b);
				},
				parse: function (b) {
					(function () {
						var c = document.querySelector('.dto-xml[data-field-collection="' + b + '"]').text;
						c = new DOMParser().parseFromString(c, 'application/xml');
						var d = c.querySelector('mktoPreFillFields');
						d = d.getAttribute('varName') || d.tagName;
						var e = {};
						l(c.querySelectorAll('mktoPreFillFields mktoField')).forEach(function (a) {
							e[a.getAttribute('inputName')] = a.textContent;
						});
						switch (a.transport) {
							case 'document':
								self[d] = e;
								break;
							case 'message':
								window.parent.postMessage(
									{ oid: '1.3.6.1.4.1.26100.messages.simpledto', payload: e },
									-1 != [].concat(a.messageTarget).indexOf(h) ? h : null
								);
						}
					})();
				},
			};
		}
		window.SimpleDTO = SimpleDTO;
	}
};
