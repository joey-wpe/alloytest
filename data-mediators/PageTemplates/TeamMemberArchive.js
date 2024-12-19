import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
	formatWPTranslated,
	formatActions,
} from '../PageTemplateHelpers/moleculeHelpers';

const createModuleAvatarGrid = (acf = {}) => {
	const { avatars } = acf;
	return {
		__typename: 'Template_TeamMemberArchive_Moduleavatargrid',
		avatars:
			avatars && avatars.length > 0
				? avatars.map((avatar) => {
						return {
							__typename: 'Template_TeamMemberArchive_Moduleavatargrid_avatars',
							prehead: avatar?.prehead || null,
							sectionTitle: avatar?.section_title || null,
							anchor: avatar?.anchor || null,
							teamMembers: avatar?.team_members
								?.filter(({ status }) => status === 'publish')
								?.map((member) => {
									return {
										__typename: 'TeamMember',
										id: member?.id ?? null,
										slug: member?.slug ?? null,
										title: member?.title?.rendered ?? null,
										featuredImage: {
											__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
											node: {
												__typename: 'MediaItem',
												mediaItemUrl: member?.featured_media_src?.url ?? null,
											},
										},
										teamMemberDetails: {
											__typename: 'TeamMember_Teammemberdetails',
											title: member?.acf?.title ?? null,
											biography: member?.acf?.biography ?? null,
											socialMedia: {
												__typename: 'TeamMember_Teammemberdetails_SocialMedia',
												facebook: member?.acf?.social_media?.facebook || null,
												linkedin: member?.acf?.social_media?.linkedin || null,
												twitter: member?.acf?.social_media?.twitter || null,
											},
											externalLink: null,
										},
									};
								}),
						};
				  })
				: [],
	};
};

const createTeamModules = (acf = {}) => {
	const { modules } = acf;
	return {
		__typename: 'ContentNode_Contentblocksmodules',
		modules:
			modules && modules.length > 0
				? modules.map((module) => {
						return {
							__typename: 'ContentNode_Contentblocksmodules_Modules_CrossTiles',
							paddingTop: module?.padding_top || null,
							paddingBottom: module?.padding_bottom || null,
							anchor: module?.anchor || null,
							additionalClasses: module?.additional_classes || null,
							backgroundColor: module?.background_color || null,
							backgroundPattern: module?.background_pattern || null,
							backgroundType: module?.background_type || null,
							tiles:
								module?.tiles && module?.tiles.length > 0
									? module?.tiles.map((tile) => {
											return {
												__typename: 'ContentNode_Contentblocksmodules_Modules_CrossTiles_tiles',
												description: tile?.description || null,
												titleText: tile?.title_text || null,
												titleType: tile?.title_type || null,
												image: {
													__typename: 'MediaItem',
													altText: '',
													mediaItemUrl: tile?.image || null,
												},
												actions: formatActions(
													tile.actions,
													'ContentNode_Contentblocksmodules_Modules_CrossTiles_tiles_actions'
												),
											};
									  })
									: [],
						};
				  })
				: [],
	};
};

export const formatTeamMemberArchiveTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero, alert_settings, call_to_action_settings, call_to_action_group, hero_type, hero_minimal } = acf || {};
	return {
		page: {
			__typename: 'Page',
			seo: createSeoObject(yoast_head_json, yoast_head),
			pageHeader: {
				__typename: 'Page_Pageheader',
				alertSettings: alert_settings ?? null,
				alertgroup: createAlertGroupObject(acf),
				heroType: hero_type ?? null,
				hero: createHeroObject(hero),
				heroMinimal: createHeroMinimalObject(hero_minimal, title, hero_type),
			},
			pageFooter: createPageFooterObject(call_to_action_settings, call_to_action_group),
			isPreview: false,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_TeamMemberArchive',
				templateName: template,
				moduleAvatarGrid: createModuleAvatarGrid(acf),
			},
			contentBlocksModules: createTeamModules(acf),
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
