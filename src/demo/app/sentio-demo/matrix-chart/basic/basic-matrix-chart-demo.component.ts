import { Component, OnInit } from '@angular/core';

import * as sentio from '@asymmetrik/sentio';
import * as d3 from 'd3';

@Component({
	selector: 'basic-matrix-chart-demo',
	templateUrl: './basic-matrix-chart-demo.component.html'
})
export class BasicMatrixChartDemoComponent
implements OnInit {

	model: any[] = [];

	configure(chart: any): void {
		chart.key((d: any, i: number) => {
			return i;
		})
		.value((d: any) => {
			return d;
		})
		.margin({ top: 20, right: 2, bottom: 2, left: 80 });
	};

	update(): void {
		let data: number[] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		let series: any[] = [];

		series.push({
			key: 'increasing', label: 'Increasing', values: data.map((d: any, i: number) => {
				return i;
			})
		});
		series.push({
			key: 'decreasing', label: 'Decreasing', values: data.map((d: any, i: number, arr: any[]) => {
				return arr.length - i - 1;
			})
		});
		series.push({
			key: 'upAndDown', label: 'Up and Down', values: data.map((d: any, i: number, arr: any[]) => {
				return arr.length / 2 - Math.abs(-i + arr.length / 2);
			})
		});
		series.push({
			key: 'flatHigh', label: 'Flat High', values: data.map((d: any, i: number) => {
				return 19;
			})
		});
		series.push({
			key: 'flatLow', label: 'Flat Low', values: data.map((d: any, i: number) => {
				return 0;
			})
		});
		series.push({
			key: 'flatMid', label: 'Flat Mid', values: data.map((d: any, i: number) => {
				return 10;
			})
		});
		series.push({
			key: 'spikeHigh', label: 'Spike High', values: data.map((d: any, i: number) => {
				return (Math.random() > 0.1) ? 1 : 19;
			})
		});
		series.push({
			key: 'spikeLow', label: 'Spike Low', values: data.map((d: any, i: number) => {
				return (Math.random() > 0.1) ? 19 : 1;
			})
		});
		series.push({
			key: 'random', label: 'random', values: data.map((d: any, i: number) => {
				return Math.random() * 19;
			})
		});

		// Remove a couple things
		series.splice(Math.floor(Math.random() * series.length), 1);
		series.splice(Math.floor(Math.random() * series.length), 1);

		// Swap a couple things
		let swap = (i: number, j: number, arr: any[]) => {
			let t = arr[j];
			arr[j] = arr[i];
			arr[i] = t;
		};
		swap(Math.floor(Math.random() * series.length), Math.floor(Math.random() * series.length), series);
		swap(Math.floor(Math.random() * series.length), Math.floor(Math.random() * series.length), series);

		this.model = series;
	};

	ngOnInit(): void {
		this.update();
	}
}
