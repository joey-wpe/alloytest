// Transform data according to previously used GraphQL response.
function transformMenuPluginRestToJson(responseJSON) {
	if (!responseJSON || !responseJSON.items || !responseJSON.locale_info || !responseJSON.location_info) {
		return null;
	}

	const { items = [], acf = {}, locale_info: { language_code = null } = {}, location_info = '' } = responseJSON || {};

	function emptyReturnNull(data) {
		if (data === '' || data == false) data = null;
		return data;
	}

	function convertToUpperSnakeCase(str) {
		// Replace hyphens with underscores
		let convertedStr = str.replace(/-/g, '_');
		// Convert to uppercase
		convertedStr = convertedStr.toUpperCase();
		return convertedStr;
	}

	const FeaturedArticle = {
		__typename: 'Menu_Featuredarticle',
		manualFields: {
			__typename: 'Menu_Featuredarticle_ManualFields',
			excerpt: acf?.manual_fields?.excerpt || null,
			prehead: acf?.manual_fields?.prehead || null,
			title: acf?.manual_fields?.title || null,
			url: acf?.manual_fields?.url || null,
			backgroundImage: acf?.manual_fields?.background_image?.url
				? {
						__typename: 'MediaItem',
						altText: acf?.manual_fields?.background_image?.alt || null,
						mediaItemUrl: acf?.manual_fields?.background_image?.url || null,
				  }
				: null,
		},
	};

	const MenusACF = {
		__typename: 'Menu_Menusacf',
		globalCta: acf?.global_cta?.url
			? {
					__typename: 'AcfLink',
					target: acf?.global_cta?.target || null,
					title: acf?.global_cta?.title || null,
					url: acf?.global_cta?.url || null,
			  }
			: null,
		columnsType: acf?.columns_type || 'three_columns',
	};

	function arrayWithOnlyEmptyReturnsEmptyArray(data) {
		if (Array.isArray(data)) {
			if (data.length === 0) {
				return [];
			}
			if (data.length === 1 && data[0] === '') {
				return [];
			}
		}
		return data;
	}

	const nodes = [
		{
			__typename: 'Menu',
			language: language_code,
			locations: [convertToUpperSnakeCase(location_info)],
			menuItems: {
				__typename: 'MenuToMenuItemConnection',
				nodes:
					items && items.length > 0
						? items.map((node) => ({
								__typename: 'MenuItem',
								parentId: null,
								label: node?.title || node?.post_title || null,
								url: node.url || null,
								childItems: {
									__typename: 'MenuItemToMenuItemConnection',
									nodes:
										node && node.child_items && node.child_items.length > 0
											? node.child_items?.map((menuItem) => ({
													__typename: 'MenuItem',
													url: menuItem?.url,
													label: menuItem?.title || menuItem?.post_title || null,
													target: emptyReturnNull(menuItem?.target) || null,
													megaMenuItemLocation: {
														__typename: 'MenuItem_Megamenuitemlocation',
														column: menuItem?.acf?.column || 'default',
													},
													cssClasses: arrayWithOnlyEmptyReturnsEmptyArray(menuItem?.classes),
													childItems: {
														__typename: 'MenuItemToMenuItemConnection',
														nodes:
															menuItem && menuItem.child_items && menuItem.child_items.length > 0
																? menuItem?.child_items?.map((childItem) => ({
																		__typename: 'MenuItem',
																		url: childItem.url,
																		label: childItem?.title || childItem?.post_title || null,
																		target: emptyReturnNull(childItem?.target) || null,
																		ProductMenuLinkDescription: {
																			__typename: 'MenuItem_Productmenulinkdescription',
																			description: childItem?.acf?.description || null,
																		},
																		cssClasses: arrayWithOnlyEmptyReturnsEmptyArray(childItem?.classes),
																  }))
																: [],
													},
											  }))
											: [],
								},
						  }))
						: [],
			},
			FeaturedArticle,
			MenusACF,
		},
	];

	return {
		menus: {
			__typename: 'RootQueryToMenuConnection',
			nodes,
		},
	};
}

module.exports = transformMenuPluginRestToJson;
