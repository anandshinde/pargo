export const checkIsParent = (parent, child) => {
	let node = child?.parentNode;

	// keep iterating unless null
	while (node != null) {
		if (node === parent) {
			return true;
		}
		node = node?.parentNode;
	}
	return false;
};
