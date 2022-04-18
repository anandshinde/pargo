export const CleanFormValues = (formValues: any) => {
	const { chips, ...filters } = formValues;

	return Object.entries(filters)
		.filter(([_, value]: [string, string]) => !!value)
		.reduce(
			(prev: any, [key, value]: [string, string]) => ({
				...prev,
				[key]: value,
			}),
			{}
		);
};
