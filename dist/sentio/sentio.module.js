import { NgModule } from '@angular/core';
import { DonutChartDirective } from './components/donut-chart.directive';
import { MatrixChartDirective } from './components/matrix-chart.directive';
import { RealtimeTimelineDirective } from './components/realtime-timeline.directive';
import { TimelineDirective } from './components/timeline.directive';
import { VerticalBarChartDirective } from './components/vertical-bar-chart.directive';
var SentioModule = (function () {
    function SentioModule() {
    }
    SentioModule.forRoot = function () {
        return { ngModule: SentioModule, providers: [] };
    };
    return SentioModule;
}());
export { SentioModule };
SentioModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
/** @nocollapse */
SentioModule.ctorParameters = function () { return []; };
//# sourceMappingURL=sentio.module.js.map