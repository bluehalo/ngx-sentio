"use strict";
var core_1 = require('@angular/core');
var donut_chart_directive_1 = require('./components/donut-chart.directive');
var matrix_chart_directive_1 = require('./components/matrix-chart.directive');
var realtime_timeline_directive_1 = require('./components/realtime-timeline.directive');
var timeline_directive_1 = require('./components/timeline.directive');
var vertical_bar_chart_directive_1 = require('./components/vertical-bar-chart.directive');
var SentioModule = (function () {
    function SentioModule() {
    }
    SentioModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [
                donut_chart_directive_1.DonutChartDirective,
                matrix_chart_directive_1.MatrixChartDirective,
                realtime_timeline_directive_1.RealtimeTimelineDirective,
                timeline_directive_1.TimelineDirective,
                vertical_bar_chart_directive_1.VerticalBarChartDirective
            ],
            declarations: [
                donut_chart_directive_1.DonutChartDirective,
                matrix_chart_directive_1.MatrixChartDirective,
                realtime_timeline_directive_1.RealtimeTimelineDirective,
                timeline_directive_1.TimelineDirective,
                vertical_bar_chart_directive_1.VerticalBarChartDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SentioModule);
    return SentioModule;
}());
exports.SentioModule = SentioModule;

//# sourceMappingURL=sentio.module.js.map
