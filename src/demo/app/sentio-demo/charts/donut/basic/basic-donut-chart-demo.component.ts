import { Component, OnInit } from '@angular/core';

import { DonutChart } from '@asymmetrik/sentio';
import { scaleOrdinal as d3_scaleOrdinal} from 'd3';

@Component({
	selector: 'basic-donut-chart-demo',
	templateUrl: 'basic-donut-chart-demo.component.html'
})
export class BasicDonutChartDemoComponent
implements OnInit {

	data: any[] = [];

	chartReady(chart: DonutChart): void {
		chart.colorScale(d3_scaleOrdinal().range([ '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c' ]));
		chart.label((d: any) => `${d.key} (${d.value})`);
	}

	update(): void {
		const samples = 5;

		const newData: any[] = [];
		for (let i: number = 0; i < samples; i++) {
			newData.push({
				key: `key: ${i}`,
				value: Math.floor(Math.random() * samples)
			});
		}

		this.data = newData;
	}

	ngOnInit(): void {
		this.update();
	}
}
