# 13.0 (February 2022)
- Upgrade to Angular v13, involved migration to the Angular CLI for the library build/bundle
- Upgrade to Sentio v6, which includes an upgrade to d3 v7

# 6.0 
- Upgrade to Angular v8

# 5.0 (December 2018)
- Upgrade to Sentio 5.0 - See Sentio's change log for details, includes update to d3 v5
- Upgrade to Angular.io v7 - Includes updates to Rxjs and Angular
- Upgrade to D3 v5

# 3.0 (January 2017)

## Sentio 3.0
See Sentio's change log for details

### ChartReady event
Migrated the ```[configure]``` input binding to be an Output/EventEmitter called ```chartReady```

### Renamed Directives
All of the directives are named using camelCase and prefaced with ```sentio```

 * ```sentioDonutChart```
 * ```sentioMatrixChart```
 * ```sentioVerticalBarChart```
 * ```sentioRealtimeTimeline```
 * ```sentioTimeline```
