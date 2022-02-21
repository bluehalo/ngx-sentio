import { Component } from '@angular/core';

@Component({
	selector: 'basic-vertical-bar-chart-demo',
	templateUrl: 'basic-vertical-bar-chart-demo.component.html'
})
export class BasicVerticalBarChartDemoComponent {

	data: any[] = [];

	chartReady(chart: any): void {
		chart.label((d: any) => `${d.key}&lrm; (${d.value})`);
	}

	update(): void {
		const newData: any[] = [];
		const samples = 20;

		for (let i: number = 0; i < samples; i++) {
			newData.push({
				key: `key: ${i}`,
				value: Math.floor(Math.random() * 100)
			});
		}
		this.data = newData
			.sort((a: any, b: any) => b.value - a.value)
			.slice(0, 12);
	}

	ngOnInit(): void {
		this.update();
	}
}
