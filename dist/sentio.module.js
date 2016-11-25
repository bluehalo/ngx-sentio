"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var donut_chart_directive_1 = require('./components/donut-chart.directive');
var matrix_chart_directive_1 = require('./components/matrix-chart.directive');
var realtime_timeline_directive_1 = require('./components/realtime-timeline.directive');
var timeline_line_directive_1 = require('./components/timeline-line.directive');
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
                timeline_line_directive_1.TimelineLineDirective,
                vertical_bar_chart_directive_1.VerticalBarChartDirective
            ],
            declarations: [
                donut_chart_directive_1.DonutChartDirective,
                matrix_chart_directive_1.MatrixChartDirective,
                realtime_timeline_directive_1.RealtimeTimelineDirective,
                timeline_line_directive_1.TimelineLineDirective,
                vertical_bar_chart_directive_1.VerticalBarChartDirective
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], SentioModule);
    return SentioModule;
}());
exports.SentioModule = SentioModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbnRpby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6QyxzQ0FBb0Msb0NBQW9DLENBQUMsQ0FBQTtBQUN6RSx1Q0FBcUMscUNBQXFDLENBQUMsQ0FBQTtBQUMzRSw0Q0FBMEMsMENBQTBDLENBQUMsQ0FBQTtBQUNyRix3Q0FBc0Msc0NBQXNDLENBQUMsQ0FBQTtBQUM3RSw2Q0FBMEMsMkNBQTJDLENBQUMsQ0FBQTtBQXFCdEY7SUFBQTtJQUE0QixDQUFDO0lBbkI3QjtRQUFDLGVBQVEsQ0FBQztZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFO2dCQUNSLDJDQUFtQjtnQkFDbkIsNkNBQW9CO2dCQUNwQix1REFBeUI7Z0JBQ3pCLCtDQUFxQjtnQkFDckIsd0RBQXlCO2FBQ3pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNiLDJDQUFtQjtnQkFDbkIsNkNBQW9CO2dCQUNwQix1REFBeUI7Z0JBQ3pCLCtDQUFxQjtnQkFDckIsd0RBQXlCO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRCxDQUFDOztvQkFBQTtJQUMwQixtQkFBQztBQUFELENBQTVCLEFBQTZCLElBQUE7QUFBaEIsb0JBQVksZUFBSSxDQUFBIiwiZmlsZSI6InNlbnRpby5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEb251dENoYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2RvbnV0LWNoYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRyaXhDaGFydERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9tYXRyaXgtY2hhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlYWx0aW1lVGltZWxpbmVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVhbHRpbWUtdGltZWxpbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRpbWVsaW5lTGluZURpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lbGluZS1saW5lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbEJhckNoYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL3ZlcnRpY2FsLWJhci1jaGFydC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbXSxcblx0ZXhwb3J0czogW1xuXHRcdERvbnV0Q2hhcnREaXJlY3RpdmUsXG5cdFx0TWF0cml4Q2hhcnREaXJlY3RpdmUsXG5cdFx0UmVhbHRpbWVUaW1lbGluZURpcmVjdGl2ZSxcblx0XHRUaW1lbGluZUxpbmVEaXJlY3RpdmUsXG5cdFx0VmVydGljYWxCYXJDaGFydERpcmVjdGl2ZVxuXHRdLFxuXHRkZWNsYXJhdGlvbnM6IFtcblx0XHREb251dENoYXJ0RGlyZWN0aXZlLFxuXHRcdE1hdHJpeENoYXJ0RGlyZWN0aXZlLFxuXHRcdFJlYWx0aW1lVGltZWxpbmVEaXJlY3RpdmUsXG5cdFx0VGltZWxpbmVMaW5lRGlyZWN0aXZlLFxuXHRcdFZlcnRpY2FsQmFyQ2hhcnREaXJlY3RpdmVcblx0XSxcblx0cHJvdmlkZXJzOiBbXG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgU2VudGlvTW9kdWxlIHsgfVxuIl19
