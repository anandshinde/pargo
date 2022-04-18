import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';

export interface StarRatingPresentationProps {
	color?: 'black' | 'gold';
	hideReviewsNum?: boolean;
	showRatingNum?: boolean;
}

export interface StarRatingContentProps {
	rating: number;
	serviceUrl?: string;
	totalReviews?: number;
}

@Component({
  selector: 'mflooring-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class StarRatingComponent
	extends SimpleComponent<StarRatingContentProps, StarRatingPresentationProps>
	{
	public totalStars = Array(5);

	constructor() {
		super();
	}

	get rating() {
		return `${this.content?.rating * 20}%`;
	}

	get hideReviewsNum() {
		return this.presentation?.hideReviewsNum;
	}
	get showRatingNum() {
		return this.presentation?.showRatingNum;
	}

	get colorClass() {
		return `color-${this.presentation?.color || 'black'}`;
	}

	
}
