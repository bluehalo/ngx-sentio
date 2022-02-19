import { Component, OnInit } from '@angular/core';

import { Series } from '@asymmetrik/sentio';

@Component({
	selector: 'resize-timeline-line-demo',
	templateUrl: 'resize-timeline-line-demo.component.html'
})
export class ResizeTimelineLineDemoComponent
implements OnInit {

	data: any[] = [];
	series: Series[] = [
		{ key: 'series1', getValue(d: any) { return d.s1; } },
		{ key: 'series2', getValue(d: any) { return d.s2; } }
	];

	interval = 60000;
	binSize = 1000;
	hwm: number = Date.now();

	update(): void {
		this.hwm = Date.now();
		const newData: any[] = [];

		for (let i = 0; i < this.interval / this.binSize; i++) {
			newData.unshift({
				0: this.hwm - (i * this.binSize),
				s1: Math.random() * 10,
				s2: Math.random() * 8
			});
		}

		this.data = newData;
	}

	ngOnInit(): void {
		this.update();
	}
}
