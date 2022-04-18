import {
	animate,
	query,
	stagger,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

export const animateHorizontal = trigger('animateHorizontal', [
	state(
		'outview',
		style({
			transform: 'translateX({{distance}}%)',
			opacity: 0,
		}),
		{ params: { distance: '20' } }
	),
	state(
		'inview',
		style({
			transform: 'translateX(0)',
			opacity: 1,
		}),
		{ params: { distance: 0 } }
	),
	transition('outview => inview', [animate('500ms')]),
	transition('inview => outview', [animate('200ms')]),
]);

export const animateVertical = trigger('animateVertical', [
	state(
		'outview',
		style({
			transform: 'translateY({{distance}}%)',
			opacity: 0,
		}),
		{ params: { distance: '20' } }
	),
	state(
		'inview',
		style({
			transform: 'translateY(0)',
			opacity: 1,
		}),
		{ params: { distance: 0 } }
	),
	transition('outview => inview', [animate('500ms')]),
	transition('inview => outview', [animate('200ms')]),
]);


export const animateLoopHorizontalOnEnter = trigger(
	'animateLoopHorizontalOnEnter',
	[
		transition('* => *', [
			query(
				':enter',
				[
					style({ opacity: 0, transform: 'translateX({{distance}}%)' }),
					stagger(500, [
						animate(
							'{{speed}}ms',
							style({ opacity: 1, transform: 'translateX(0)' })
						),
					]),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					stagger(100, [
						animate(
							'0.1s',
							style({ opacity: 0, transform: 'translateX({{distance}}%)' })
						),
					]),
				],
				{ optional: true }
			),
		]),
	]
);

export const animateHoverBanner = trigger('animateHoverBanner', [
	state(
		'inactive',
		style({
			height: '90px',
		})
	),
	state(
		'active',
		style({
			height: '100%',
		})
	),
	transition('* => *', animate('250ms')),
]);