import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthApiService } from '@app/core/http';
import { AuthService, StorageService } from '@app/core/services';
import { UtilityActionsComponent } from './utility-actions.component';

describe('UtilityActionsComponent', () => {
	let component: UtilityActionsComponent;
	let fixture: ComponentFixture<UtilityActionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UtilityActionsComponent],
			providers: [
				AuthService,
				RouterTestingModule,
				StorageService,
				BreakpointObserver,
				AuthApiService,
				HttpClient,
				HttpHandler,
			],
			imports: [MatDialogModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UtilityActionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
