import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { VideoPlayerService } from '@app/core/services/video-player.service';
import { Observable } from 'rxjs';
import { CompoundTypes } from '@app/shared/constants';

@Component({
	selector: 'mflooring-rich-content-component-map',
	templateUrl: './rich-content-component-map.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichContentComponentMapComponent implements OnInit {
	playerState$: Observable<string>;
	public types;
	@Input() data;
	constructor(public playerState: VideoPlayerService) {}
	ngOnInit(): void {
		this.types = CompoundTypes;
		this.playerState$ = this.playerState.state$;
	}
}
