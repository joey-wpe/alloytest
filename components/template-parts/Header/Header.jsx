import PropTypes from 'prop-types';
import HeaderMainMenu from '../../molecules/HeaderMainMenu/HeaderMainMenu';
import styles from './Header.module.scss';

const Header = ({ headerTopData, headerMegaMenu, translatedPages, logos, flag, reduced, className }) => {
	return (
		<header className={`${styles.header} ${className ?? ''}`}>
			<nav className={`${styles.container}`}>
				<HeaderMainMenu
					logos={logos}
					headerMegaMenu={headerMegaMenu}
					headerTopData={headerTopData}
					translatedPages={translatedPages}
					flag={flag}
					reduced={reduced}
				/>
			</nav>
		</header>
	);
};

Header.propTypes = {
	headerTopData: PropTypes.shape({
		languages: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
			})
		),
		menu: PropTypes.arrayOf(
			PropTypes.shape({
				linkText: PropTypes.string,
				target: PropTypes.string,
				uri: PropTypes.string,
			})
		),
	}),
	headerMegaMenu: PropTypes.arrayOf(
		PropTypes.shape({
			mainTitle: PropTypes.shape({
				label: PropTypes.string,
				href: PropTypes.string,
			}),
			menuStyle: PropTypes.oneOf(['Primary', 'Secondary']),
			globalCTA: PropTypes.shape({
				title: PropTypes.string,
				uri: PropTypes.string,
				target: PropTypes.string,
			}),
			headerMenuColumn: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string,
					menu: PropTypes.arrayOf(
						PropTypes.shape({
							linkText: PropTypes.string,
							target: PropTypes.string,
							uri: PropTypes.string,
							description: PropTypes.string,
						})
					),
				})
			),
			featuredPostData: PropTypes.shape({
				image: PropTypes.shape({
					src: PropTypes.string,
					alt: PropTypes.string,
				}),
				prehead: PropTypes.string,
				title: PropTypes.string,
				excerpt: PropTypes.string,
				link: PropTypes.shape({
					href: PropTypes.string,
					text: PropTypes.string,
				}),
			}),
		})
	),
};

export default Header;
