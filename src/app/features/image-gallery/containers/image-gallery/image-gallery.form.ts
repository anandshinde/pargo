import { FormControl, FormGroup } from '@angular/forms';

export const ImageGalleryForm = () =>
	new FormGroup({
		floorColor: new FormControl(),
		floorLook: new FormControl(),
		floorType: new FormControl(),
		roomType: new FormControl(),
		style: new FormControl(),
		chips: new FormControl(),
	});
