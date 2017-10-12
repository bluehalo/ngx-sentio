import { Component, OnInit } from '@angular/core';

import { Series } from '@asymmetrik/sentio';

@Component({
	selector: 'basic-timeline-line-demo',
	templateUrl: 'basic-timeline-line-demo.component.html'
})
export class BasicTimelineLineDemoComponent
implements OnInit {

	data: any[] = [];
	series: Series[] = [
		{ key: 'series1', label: 'Series 1', getValue: (d: any) => d.s1},
		{ key: 'series2', label: 'Series 2', getValue: (d: any) => d.s2}
	];

	brushEnabled = true;
	brush: [ number, number ] = [ Date.now() - 10000, Date.now() - 5000 ];

	interval = 60000;
	binSize = 1000;
	hwm: number = Date.now();

	eventHandler(msg: string, event: any): void {
		// tslint:disable-next-line:no-console
		console.log({ msg, event });
	}

	update(): void {
		this.hwm = Date.now();
		const newData: any[] = [];

		for (let i = 0; i < this.interval / this.binSize; i++) {
			newData.unshift({
				0: this.hwm - (i * this.binSize),
				s1: Math.random() * 10,
				s2: Math.random() * 5
			});
		}

		this.data = newData;
	}

	clearBrush(): void {
		this.brush = null;
	}

	randomBrush(): void {
		const lf: number = this.hwm - Math.random() * this.interval;
		const hf: number = lf + Math.random() * 20000;
		const newBrush: [ number, number ] = [ lf, hf ];
		this.brush = newBrush;
	}

	ngOnInit(): void {
		this.update();
	}
}
