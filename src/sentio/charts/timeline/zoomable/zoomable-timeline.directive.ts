import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import * as sentio from '@asymmetrik/sentio';

import { ChartWrapper } from '../../../util/chart-wrapper.util';
import { ResizeDimension, ResizeUtil } from '../../../util/resize.util';


@Directive({
	selector: 'sentioZoomableTimeline'
})
export class ZoomableTimelineDirective
	implements OnChanges, OnDestroy, OnInit {

	constructor(el: ElementRef) {
		// Nothing
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		// Nothing
	}

	ngOnInit() {
		// Nothing
	}

	ngOnDestroy() {
		// Nothing
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		// Nothing
	}

}
