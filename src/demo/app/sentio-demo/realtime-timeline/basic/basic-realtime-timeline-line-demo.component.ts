import { Component, HostListener, OnInit } from '@angular/core';

import * as sentio from '@asymmetrik/sentio';

@Component({
	selector: 'basic-realtime-timeline-line-demo',
	templateUrl: './basic-realtime-timeline-line-demo.component.html'
})
export class BasicRealtimeTimelineLineDemoComponent
implements OnInit {

	chart: any;
	model: any[] = [];
	bins: any = sentio.controller.realtimeBins({ binCount: 60, binSize: 1000 });
	markers: any[] = [];
	hwm: number = Date.now();

	chartReady(chart: any): void {
		chart.margin({ top: 16, right: 10, bottom: 20, left: 40 });
		this.chart = chart;

		this.play();
	};

	eventHandler(msg: string, event: any): void {
		// tslint:disable-next-line:no-console
		console.log({ msg, event });
	};

	play(): void {
		this.chart.start();
	};

	pause(): void {
		this.chart.stop();
	};

	@HostListener('mouseup', ['$event'])
	onMouseUp(): void {
		this.markers.push([ Date.now(), 'Click' ]);

		// Remove old markers
		let markers = this.markers;
		let hwm = this.bins.model().hwm();
		let binCount = this.bins.model().count();
		let binSize = this.bins.model().size();

		while (markers.length > 0 && markers[0][0] < hwm - (binCount * binSize)) {
			this.markers.shift();
		}
	}

	@HostListener('mousemove', ['$event'])
	onMouseMove(): void {
		this.bins.add([Date.now()]);
	}

	ngOnInit(): void {
		this.bins.model()
			.updateBin((bin: any[]) => { bin[1] += 1; })
			.createSeed(() => { return 0; });

		this.model = [
			{ key: 'series1', values: this.bins.bins() }
		];

	}
}
