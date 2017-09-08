import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'basic-timeline-line-demo',
	templateUrl: 'basic-timeline-line-demo.component.html'
})
export class BasicTimelineLineDemoComponent
implements OnInit {

	model: any[] = [];
	filterEnabled = true;
	filter: [ number, number ] = [ Date.now() - 10000, Date.now() - 5000 ];
	interval = 60000;
	binSize = 1000;
	hwm: number = Date.now();

	eventHandler(msg: string, event: any): void {
		// tslint:disable-next-line:no-console
		console.log({ msg, event });
	}

	update(): void {
		this.hwm = Date.now();
		const newModel: any[] = [];

		['series1', 'series2'].forEach((s) => {
			const k = s;
			const d: any[] = [];

			for (let i = 0; i < this.interval / this.binSize; i++) {
				d.unshift([ this.hwm - (i * this.binSize), Math.random() * 10 ]);
			}

			newModel.push({ key: k, values: d });
		});

		this.model = newModel;
	}

	clearFilter(): void {
		this.filter = null;
	}

	randomFilter(): void {
		const lf: number = this.hwm - Math.random() * this.interval;
		const hf: number = lf + Math.random() * 20000;
		const newFilter: [ number, number ] = [ lf, hf ];
		this.filter = newFilter;
	}

	ngOnInit(): void {
		this.update();
	}
}
