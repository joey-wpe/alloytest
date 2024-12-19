import PropTypes from 'prop-types';
import React from 'react';
import styles from './TeamMemberTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import AvatarCard from '../../molecules/AvatarCard/AvatarCard';
import SocialMedia from '../../molecules/SocialMedia/SocialMedia';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const TeamMemberTemplate = ({ teamMember, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const { t } = useTranslation('common');

	//Animation up
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const classAnimPlay = inView && styles['anim-play'];
	const mastheadSettings = {
		prehead: t('teamMember.team'),
		title: teamMember.title,
		background: {
			type: 'solid',
			color: 'blue',
		},
	};

	const AvatarData = {
		image: {
			src: teamMember.featuredImage?.node.mediaItemUrl,
			alt: teamMember.title,
		},
		name: teamMember.title,
		position: teamMember.teamMemberDetails.title,
	};

	const socials = [
		{
			link: teamMember.teamMemberDetails.socialMedia?.facebook,
			target: '_blank',
		},
		{
			link: teamMember.teamMemberDetails.socialMedia?.twitter,
			target: '_blank',
		},
		{
			link: teamMember.teamMemberDetails.socialMedia?.linkedin,
			target: '_blank',
		},
	];

	const routerRef = useRouter();
	const locale = useRouter().locale === 'en-US' ? '' : routerRef.locale;
	const home = `${locale}`;
	const teamPagelink = `${home}/team`;

	const breadcrumb = {
		breadcrumbsLinks: [
			{ label: t('breadcrumb.home'), url: home },
			{ label: t('breadcrumb.team'), url: `${teamPagelink}` },
			{ label: teamMember.title, url: `${teamPagelink}/${teamMember.slug}` },
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
			<MastheadMinimal {...mastheadSettings} breadcrumb={breadcrumb} />
			<div className={`${styles['container']} ${styles['team-member']}`} ref={refAnimation}>
				<div
					className={`${styles['team-member__meta']} ${styles['anim-fade-in-up']} ${
						`anim-delay-1`
					} ${classAnimPlay}`}
				>
					<div className={styles['sticky-container']}>
						<AvatarCard {...AvatarData} className={styles['team-member__avatar']} />
						<SocialMedia socials={socials} className={styles['team-member__socials']} />
					</div>
				</div>
				<div
					className={`${styles['team-member__info']} ${styles['anim-fade-in-up']} ${
						`anim-delay-2`
					} ${classAnimPlay}`}
				>
					<h3 className={styles['h3']}>{teamMember.title}</h3>
					<div
						className={`${styles['primary-typography']} ${styles['primary-bullet-style']} ${styles['wysiwyg']} `}
						dangerouslySetInnerHTML={{ __html: teamMember.teamMemberDetails.summary }}
					/>
				</div>
			</div>
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

TeamMemberTemplate.propTypes = {
	teamMember: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default TeamMemberTemplate;
