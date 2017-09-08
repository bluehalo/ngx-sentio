import { NgModule } from '@angular/core';
import { DonutChartDirective } from './charts/donut/donut-chart.directive';
import { MatrixChartDirective } from './charts/matrix/matrix-chart.directive';
import { RealtimeTimelineDirective } from './charts/timeline/realtime/realtime-timeline.directive';
import { TimelineDirective } from './charts/timeline/timeline.directive';
import { VerticalBarChartDirective } from './charts/vertical-bar/vertical-bar-chart.directive';
var SentioModule = /** @class */ (function () {
    function SentioModule() {
    }
    SentioModule.forRoot = function () {
        return { ngModule: SentioModule, providers: [] };
    };
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
    return SentioModule;
}());
export { SentioModule };
//# sourceMappingURL=sentio.module.js.map