import { FormControl, FormGroup } from '@angular/forms';

export const TabbedContentForm = () =>
	new FormGroup({
		search: new FormControl(),
	});
