export const BreadcrumbsMapper = (rawData: any) => ({
	includeCrumbs: showBreadcrumbs(rawData),
});
const showBreadcrumbs = (args: string) => {
	const showCrumbs = !!args['include-breadcrumbs'] ? true : null;

	return showCrumbs;
};
