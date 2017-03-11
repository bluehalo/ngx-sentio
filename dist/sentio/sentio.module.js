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
var SentioModule = SentioModule_1 = (function () {
    function SentioModule() {
    }
    SentioModule.forRoot = function () {
        return { ngModule: SentioModule_1, providers: [] };
    };
    return SentioModule;
}());
SentioModule = SentioModule_1 = __decorate([
    NgModule({
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
var SentioModule_1;
//# sourceMappingURL=sentio.module.js.map