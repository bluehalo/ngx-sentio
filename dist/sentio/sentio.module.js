var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { DonutChartDirective } from './components/donut-chart.directive';
import { MatrixChartDirective } from './components/matrix-chart.directive';
import { RealtimeTimelineDirective } from './components/realtime-timeline.directive';
import { TimelineDirective } from './components/timeline.directive';
import { VerticalBarChartDirective } from './components/vertical-bar-chart.directive';
var SentioModule = (function () {
    function SentioModule() {
    }
    return SentioModule;
}());
SentioModule = __decorate([
    NgModule({
        imports: [],
        exports: [
            DonutChartDirective,
            MatrixChartDirective,
            RealtimeTimelineDirective,
            TimelineDirective,
            VerticalBarChartDirective
        ],
        declarations: [
            DonutChartDirective,
            MatrixChartDirective,
            RealtimeTimelineDirective,
            TimelineDirective,
            VerticalBarChartDirective
        ]
    })
], SentioModule);
export { SentioModule };

//# sourceMappingURL=sentio.module.js.map
