import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'resize-timeline-line-demo',
	templateUrl: 'resize-timeline-line-demo.component.html'
})
export class ResizeTimelineLineDemoComponent
implements OnInit {

	model: any[] = [];
	filterEnabled = true;
	filter: [ number, number ] = [ Date.now() - 10000, Date.now() - 5000 ];
	interval = 60000;
	binSize = 1000;
	hwm: number = Date.now();

	update(): void {
		this.hwm = Date.now();
		let newModel: any[] = [];

		['series1', 'series2'].forEach((s) => {
			let k = s;
			let d: any[] = [];

			for (let i = 0; i < this.interval / this.binSize; i++) {
				d.unshift([ this.hwm - (i * this.binSize), Math.random() * 10 ]);
			}

			newModel.push({ key: k, values: d });
		});

		this.model = newModel;
	}

	ngOnInit(): void {
		this.update();
	}
}
