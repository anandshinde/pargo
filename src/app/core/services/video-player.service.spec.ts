import { TestBed } from '@angular/core/testing';
import { VideoPlayerService } from './video-player.service';

describe('VideoService', () => {
	let service: VideoPlayerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [VideoPlayerService],
		});
		service = TestBed.inject(VideoPlayerService);
	});

	it('should be created', () => {
		const playerStateMock = 'paused';
		service.updatePlayerState(playerStateMock);

		expect(service).toBeTruthy();
	});
});
