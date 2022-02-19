import { Component, OnInit } from '@angular/core';

import { MatrixChart, Series } from '@asymmetrik/sentio';

@Component({
	selector: 'basic-matrix-chart-demo',
	templateUrl: 'basic-matrix-chart-demo.component.html'
})
export class BasicMatrixChartDemoComponent
implements OnInit {

	data: any[] = [];
	series: Series[] = [];

	swap(i: number, j: number, arr: any[]): void {
		const t = arr[j];
		arr[j] = arr[i];
		arr[i] = t;
	}


	chartReady(chart: MatrixChart): void {
		chart.key((d: any, i: number) => `${i}`)
			.margin({ top: 20, right: 2, bottom: 2, left: 80 });
	}

	update(): void {

		const series: any[] = [
			{ key: 'increasing', label: 'Increasing', value: (i: number) => i },
			{ key: 'decreasing', label: 'Decreasing', value: (i: number, size: number) => size - i - 1 },
			{ key: 'upAndDown', label: 'Up and Down', value: (i: number, size: number) => (size / 2) - Math.abs(-i + (size / 2)) },
			{ key: 'flatHigh', label: 'Flat High', value: () => 19 },
			{ key: 'flatLow', label: 'Flat Low', value: () => 0 },
			{ key: 'flatMid', label: 'Flat Mid', value: () => 10 },
			{ key: 'spikeHigh', label: 'Spike High', value: () => (Math.random() > 0.1) ? 1 : 19 },
			{ key: 'spikeLow', label: 'Spike Low', value: () => (Math.random() > 0.1) ? 19 : 1 },
			{ key: 'random', label: 'random', value: () => Math.random() * 19 }
		];

		// Remove a couple things
		series.splice(Math.floor(Math.random() * series.length), 1);
		series.splice(Math.floor(Math.random() * series.length), 1);

		// Swap a couple things
		this.swap(Math.floor(Math.random() * series.length), Math.floor(Math.random() * series.length), series);
		this.swap(Math.floor(Math.random() * series.length), Math.floor(Math.random() * series.length), series);

		// Create the data
		const data = [];
		for (let i = 0; i < 24; i++) {
			const entry = { key: i };
			series.forEach((s) => {
				entry[s.key] = s.value(i, 24);
				s.getValue = (d: any) => d[s.key];
			});
			data.push(entry);
		}

		this.series = series;
		this.data = data;
	}

	ngOnInit(): void {
		this.update();
	}
}
