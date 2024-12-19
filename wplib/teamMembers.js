import { fetchAllResultFromAllLangs, getPublishedOrPreviewData, getPublishedDataBySlug } from './util';
import { transformTeamMemberRestToJson } from '../data-mediators/FormatTeamMemberRestToJson';

export async function getAllTeamMembers() {
	const data = await fetchAllResultFromAllLangs(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/team_member?per_page=100`);

	const teamMembers = transformTeamMemberRestToJson(data, 'list');

	return {
		teamMembers,
	};
}

export async function getPublishedTeamMemberDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('team_member', slug, locale);
	return appendRelativeDataToTeamMember(data, locale);
}

export async function getPreviewTeamMemberDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('team_member', id, isPreview, token, locale); // what will contain the real or preview data
	return appendRelativeDataToTeamMember(data, locale);
}

async function appendRelativeDataToTeamMember(data, locale) {
	if (!data) {
		throw new Error('teamMembers - No data received from WordPress API.');
	}
	const teamMemberData = transformTeamMemberRestToJson(data, 'page');
	const teamMember = teamMemberData?.teamMember;

	return {
		teamMember,
		translated: teamMember?.translated,
	};
}
