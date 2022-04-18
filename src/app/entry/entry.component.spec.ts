import { ComponentFactoryResolver } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CMS_BASE_URL, EntryComponent, SPA_BASE_URL } from './entry.component';
import { MockComponents } from 'ng-mocks';
import { BrPageComponent } from '@bloomreach/ng-sdk';

describe('EntryComponent', () => {
	let component: EntryComponent;
	let fixture: ComponentFixture<EntryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EntryComponent, MockComponents(BrPageComponent)],
			imports: [RouterTestingModule],
			providers: [
				ComponentFactoryResolver,
				{
					provide: CMS_BASE_URL,
					useValue: 'abc',
				},
				{
					provide: SPA_BASE_URL,
					useValue: 'cba',
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EntryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
