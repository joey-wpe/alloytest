import PropTypes from 'prop-types';
import React, { useRef, createRef } from 'react';
import dynamic from 'next/dynamic';
import GlobalConstants from '../../../GlobalConstants';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import AvatarGrid from '../../modules/AvatarGrid/AvatarGrid';
import SecondaryNav from '../../template-parts/SecondaryNav/SecondaryNav';
import MastheadSwitcher from '../../non-visual/MastheadSwitcher/MastheadSwitcher';
import { useTranslation } from 'next-i18next';

const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));

const TeamMemberArchiveTemplate = ({
	pageData,
	postTypeData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
}) => {
	// console.log('team member pagedata', pageData);
	const { t } = useTranslation('common');

	const TeamMemberDetailRoute = (teamMemberSlug) => `/${GlobalConstants.FrontendRoutes.TeamMembers}/${teamMemberSlug}`;

	const avatarsRawResponse = pageData.template.moduleAvatarGrid.avatars;
	// console.log('avatarsRawResponse', avatarsRawResponse);
	// console.log('avatarsRawResponse.person1', avatarsRawResponse[0].teamMembers[0]);

	const avatarSections = avatarsRawResponse.map((avatarSection, index) => {
		return {
			copy: {
				prehead: avatarSection.prehead,
				title: avatarSection.sectionTitle,
			},
			anchor: avatarSection.anchor,
			avatars: avatarSection.teamMembers?.map((teamMember) => {
				// console.log(teamMember.teamMemberDetails.biography);
				return {
					image: {
						src: teamMember.featuredImage?.node?.mediaItemUrl,
						alt: teamMember.title,
					},
					name: teamMember.title,
					position: teamMember.teamMemberDetails.title,
					button: {
						buttonStyle: 'TertiaryDefault',
						buttonText: t('generic.view'),
						target: teamMember.teamMemberDetails.biography === 'external' ? '_blank' : '',
						link:
							teamMember.teamMemberDetails.biography === 'external'
								? teamMember?.teamMemberDetails?.externalLink?.url
								: TeamMemberDetailRoute(teamMember.slug),
					},
				};
			}),
		};
	});

	const navigation = avatarSections?.map((avatarSection, index) => {
		return {
			linkText: avatarSection.copy.title,
			target: '',
			uri: `#${avatarSection.anchor}`,
		};
	});

	const logo = {
		mobile: 'Tricentis Team',
	};
	const sectionsRefs = useRef([]);
	if (sectionsRefs.current.length !== avatarSections.length) {
		sectionsRefs.current = Array(avatarSections.length)
			.fill()
			.map((_, i) => sectionsRefs.current[i] || createRef());
	}
	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}
			<MastheadSwitcher pageHeader={pageData.pageHeader} />
			<SecondaryNav logo={logo} navigation={navigation} sectionRefs={sectionsRefs} />

			{avatarSections.map((avatarSection, index) => {
				// set the background colors to alternate for even rows (solid white on odd, pattern light on even)
				let avatarGridBackground = {
					type: index % 2 === 0 ? 'solid' : 'pattern',
					color: index % 2 === 0 ? 'white' : 'light',
				};

				return (
					<AvatarGrid
						key={index}
						{...avatarSection}
						background={avatarGridBackground}
						scrollRefChild={sectionsRefs.current[index]}
					/>
				);
			})}

			{pageData?.contentBlocksModules?.modules && pageData?.contentBlocksModules?.modules.length > 0 && (
				<FlexibleContentArea
					modules={pageData?.contentBlocksModules?.modules}
					resourceGridQuery={postTypeData?.resourcesQuery}
				/>
			)}
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

TeamMemberArchiveTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default TeamMemberArchiveTemplate;
