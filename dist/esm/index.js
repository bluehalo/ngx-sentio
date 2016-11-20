(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './components/vertical-bar-chart.directive', './components/donut-chart.directive', './components/matrix-chart.directive', './components/timeline-line.directive', './components/realtime-timeline.directive'], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(require('./components/vertical-bar-chart.directive'));
    __export(require('./components/donut-chart.directive'));
    __export(require('./components/matrix-chart.directive'));
    __export(require('./components/timeline-line.directive'));
    __export(require('./components/realtime-timeline.directive'));
});

//# sourceMappingURL=index.js.map
