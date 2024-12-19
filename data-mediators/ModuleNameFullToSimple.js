import StringConstants from '../StringConstants';

export function simplifyModuleName(moduleName) {
	if (moduleName.endsWith(StringConstants.ModuleNames.BasicTabber)) {
		return StringConstants.ModuleNames.BasicTabber;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.CardGrid)) {
		return StringConstants.ModuleNames.CardGrid;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.CaseStudySlider)) {
		return StringConstants.ModuleNames.CaseStudySlider;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.ComparisonChart)) {
		return StringConstants.ModuleNames.ComparisonChart;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.CrossLinkTiles)) {
		return StringConstants.ModuleNames.CrossLinkTiles;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.DataBoxLarge)) {
		return StringConstants.ModuleNames.DataBoxLarge;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.DataBoxSmall)) {
		return StringConstants.ModuleNames.DataBoxSmall;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.Disruptor)) {
		return StringConstants.ModuleNames.Disruptor;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.FaqAccordion)) {
		return StringConstants.ModuleNames.FaqAccordion;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.FooterCTA)) {
		return StringConstants.ModuleNames.FooterCTA;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.Form)) {
		return StringConstants.ModuleNames.Form;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.GlobalAlert)) {
		return StringConstants.ModuleNames.GlobalAlert;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.IconFlipCard)) {
		return StringConstants.ModuleNames.IconFlipCard;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.IconGrid)) {
		return StringConstants.ModuleNames.IconGrid;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.LeftRight)) {
		return StringConstants.ModuleNames.LeftRight;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.Logos)) {
		return StringConstants.ModuleNames.Logos;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.Masthead)) {
		return StringConstants.ModuleNames.Masthead;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.PlainText)) {
		return StringConstants.ModuleNames.PlainText;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.ProductTabber)) {
		return StringConstants.ModuleNames.ProductTabber;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.ResourcesGrid)) {
		return StringConstants.ModuleNames.ResourcesGrid;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.TestimonialSlider)) {
		return StringConstants.ModuleNames.TestimonialSlider;
	}
	if (moduleName.endsWith(StringConstants.ModuleNames.Video)) {
		return StringConstants.ModuleNames.Video;
	}

	return null;
}
