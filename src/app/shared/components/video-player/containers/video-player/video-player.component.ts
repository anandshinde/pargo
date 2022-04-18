import {
	Component,
	OnInit,
	OnDestroy,
	Inject,
	PLATFORM_ID,
	ChangeDetectionStrategy,
} from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import {
	VideoCompoundContentProps,
	VideoCompoundPresentationProps,
} from '@shared/interfaces';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { VideoPlayerService, Eventservice } from '@app/core/services';
import { tap, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Component({
	selector: 'mflooring-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent
	extends SimpleComponent<
		VideoCompoundContentProps,
		VideoCompoundPresentationProps
	>
	implements OnInit, OnDestroy
{
	public _api;
	private unsubscribe$: Subject<any> = new Subject<void>();

	public loadVideo = !isPlatformServer(this.platformId);

	private eventFlags = {
		started: false,
		playing: false,
	};
	private currentTime: number;
	private progressFlags = {
		quarter: false,
		half: false,
		threeQuarters: false,
	};

	constructor(
		@Inject(PLATFORM_ID) private platformId: any,
		private playerState: VideoPlayerService,
		private eventservice: Eventservice
	) {
		super();
	}

	onPlaying(api: VgApiService) {
		this.onProgress(api);
		this._api = api;
		this._api
			?.getDefaultMedia()
			?.subscriptions.play.pipe(
				takeUntil(this.unsubscribe$),
				tap(() => {
					if (!this.eventFlags.started) {
						this.eventservice.videoStarted({
							videoName: this.videoUrl
								?.replace(/%20/g, ' ')
								?.replace('https://mohawk.scene7.com/is/content/', ''),
						});
						this.eventFlags.started = true;
					}
					this.playerState.updatePlayerState(this.videoUrl);
				})
			)
			.subscribe();
	}

	onProgress(api: VgApiService) {
		this._api = api;
		this.currentTime = 0;
		this._api
			?.getDefaultMedia()
			?.subscriptions.progress.pipe(
				takeUntil(this.unsubscribe$),
				tap(() => {
					this.currentTime = (api.currentTime / api.duration) * 100;
					if (
						this.currentTime >= 25 &&
						!this.progressFlags.quarter &&
						this.eventFlags.started &&
						this.eventFlags.playing
					) {
						this.eventservice.videoMilestone({
							milestone: '25',
							videoName: this.videoUrl
								?.replace(/%20/g, ' ')
								?.replace('https://mohawk.scene7.com/is/content/', ''),
						});
						this.progressFlags.quarter = true;
					}
					if (
						this.currentTime >= 50 &&
						!this.progressFlags.half &&
						this.eventFlags.started &&
						this.eventFlags.playing
					) {
						this.eventservice.videoMilestone({
							milestone: '50',
							videoName: this.videoUrl
								?.replace(/%20/g, ' ')
								?.replace('https://mohawk.scene7.com/is/content/', ''),
						});
						this.progressFlags.half = true;
					}
					if (
						this.currentTime >= 75 &&
						!this.progressFlags.threeQuarters &&
						this.eventFlags.started &&
						this.eventFlags.playing
					) {
						this.eventservice.videoMilestone({
							milestone: '75',
							videoName: this.videoUrl
								?.replace(/%20/g, ' ')
								?.replace('https://mohawk.scene7.com/is/content/', ''),
						});
						this.progressFlags.threeQuarters = true;
					}
					this.playerState.updatePlayerState(this.videoUrl);
				})
			)
			.subscribe();
	}

	onPauseVideos() {
		this.playerState.state$
			.pipe(
				takeUntil(this.unsubscribe$),
				filter((currentVideoUrl: string) => !!currentVideoUrl),
				filter((currentVideoUrl: string) => currentVideoUrl !== this.videoUrl),
				tap(() => !!this._api && this._api.pause())
			)
			.subscribe();
	}

	onCompleted() {
		this.eventservice.videoCompleted({
			videoName: this.videoUrl
				?.replace(/%20/g, ' ')
				?.replace('https://mohawk.scene7.com/is/content/', ''),
		});
	}

	setPlaying(val) {
		this.eventFlags.playing = val;
	}

	get videoUrl() {
		return this.content?.url;
	}

	get transcript() {
		return this.content?.transcript || null;
	}

	get widthClass() {
		return `width-${this.presentation?.width || 'full'}`;
	}

	get positionClass() {
		return `position-${this.presentation?.position || 'center'}`;
	}

	get isInset() {
		return this.presentation?.isInset || false;
	}

	ngOnInit(): void {
		this.onPauseVideos();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
