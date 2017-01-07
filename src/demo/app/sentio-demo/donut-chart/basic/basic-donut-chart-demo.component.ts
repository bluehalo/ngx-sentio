import { Component, OnInit } from '@angular/core';

import * as sentio from '@asymmetrik/sentio';
import * as d3 from 'd3';

@Component({
	selector: 'basic-donut-chart-demo',
	templateUrl: './basic-donut-chart-demo.component.html'
})
export class BasicDonutChartDemoComponent
implements OnInit {

	model: any[] = [];

	configure(chart: any): void {
		chart.color(d3.scaleOrdinal().range(['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c']));
		chart.label(function(d: any) { return d.key + ' (' + d.value + ')'; });
	};

	update(): void {
		let samples = 5;
		let newModel: Object[] = [];
		for (let i: number = 0; i < samples; i++) {
			newModel.push({
				key: `key: ${i}`,
				value: Math.floor(Math.random() * samples)
			});
		}
		this.model = newModel;
	};

	ngOnInit(): void {
		this.update();
	}
}
