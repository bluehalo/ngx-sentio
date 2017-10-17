import { Component } from '@angular/core';

@Component({
	selector: 'auto-brush-timeline-line-demo',
	templateUrl: 'auto-brush-timeline-line-demo.component.html'
})
export class AutoBrushTimelineLineDemoComponent {

	now = Date.now();
	brush: [ number, number ] = [ this.now - (90 * 24 * 60 * 60 * 1000), this.now ];
	extent: [ number, number ];

	extentChange(d: [ number, number ]) {
		this.extent = d;
	}

}
