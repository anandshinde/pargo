import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { MockModule } from 'ng-mocks';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

describe('VideoPlayerComponent', () => {
	let component: VideoPlayerComponent;
	let fixture: ComponentFixture<VideoPlayerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [VideoPlayerComponent],
			imports: [
				MockModule(VgCoreModule),
				MockModule(VgControlsModule),
				MockModule(VgOverlayPlayModule),
				MockModule(VgBufferingModule),
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(VideoPlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
