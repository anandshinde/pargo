import { CaptureClicksDirective } from './capture-clicks.directive';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '@shared/utilities/window';

describe('CaptureClicksDirective', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	it('should create an instance', inject(
		[Router, ActivatedRoute, WINDOW, DOCUMENT],
		(
			router: Router,
			route: ActivatedRoute,
			windowRef: Window,
			document: Document
		) => {
			const directive = new CaptureClicksDirective(
				router,
				route,
				windowRef,
				document
			);

			expect(directive).toBeTruthy();
		}
	));
});
