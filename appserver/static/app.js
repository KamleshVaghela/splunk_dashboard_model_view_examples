require([
    'underscore',
    '../app/splunk_dashboard_model_view_examples/components/ModalViewComponent',
    'splunkjs/mvc',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/ready!'
], function(_, ModalViewComponent, mvc, SearchManager) {
    $('#btn_table').on("click", function() {
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_1",
            search: new SearchManager({
                // id: "search_model_1",
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: "index=_internal | timechart count"
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/tableview'),
                viz_options: {
                    pageSize: '10',
                    data: "events",
                    drilldown: "row",
                },
                drilldown: (e) => {
                    console.log(e);
                }
            }
        });
        modal.show();
    });
    $('#btn_chart_bar').on("click", function() {
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_2",
            search: new SearchManager({
                // id: "search_model_1",
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: "index=_internal | timechart count"
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/chartview'),
                viz_options: {
                    type: "bar",
                    "charting.chart.stackMode": "stacked", // Place complex property names within quotes
                    "charting.legend.placement": "bottom",
                }
            }
        });
        modal.show();
    });
    $('#btn_chart_area').on("click", function() {
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_3",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: "index=_internal | timechart count"
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/chartview'),
                viz_options: {
                    type: "area",
                    "charting.chart.stackMode": "stacked", // Place complex property names within quotes
                    "charting.legend.placement": "bottom",
                }
            }
        });
        modal.show();
    });
    $('#btn_custom_chart').on("click", function() {
        var VisualizationRegistry = require('splunkjs/mvc/visualizationregistry');
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_4",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: '| inputlookup splunk-release-dates.csv | rename Category as group | eval tooltip=group . ": " . label | eval color=case(match(label, ".conf"), "#009933", match(label, "8.2"), "#29b6f6", 1==1, null()) | table group, color, label, start, data,tooltip'
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: VisualizationRegistry.getVisualizer('event-timeline-viz', 'event-timeline-viz'),
                viz_options: {
                    drilldown: "none",
                    showPager: false,
                    "link.openSearch.visible": "false",
                    "link.exportResults.visible": "false",
                    "link.inspectSearch.visible": "false",
                    "refresh.link.visible": "false",
                    "showLastUpdated": false
                }
            }
        });
        modal.show();
    });
    $('#btn_timelineview').on("click", function() {
        // "splunkjs/mvc/timelineview",
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_5",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: "index=_internal "
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/timelineview'),
                viz_options: {},
            }
        });
        modal.show();

    });
    $('#btn_DataTemplateView').on("click", function() {
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_5",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: "index=_internal | stats count by sourcetype"
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/datatemplateview'),
                viz_options: {
                    template: `
                    <table>
                        <tr>
                            <th>Source Type</th>
                            <th>Count</th>
                        </tr>
                        <% _.forEach(results, function (result) { %>
                        <tr>
                            <td> <%= result.sourcetype %> </td>
                            <td> <%= result.count %> </td>
                            </tr>
                        <% }) %>
                    </table>
                    `,
                },
            }
        });
        modal.show();

    });
    $('#btn_EventsViewer').on("click", function() {
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_5",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: "index=_internal | stats count by sourcetype"
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/eventsviewerview'),
                viz_options: {
                    type: "table",
                    "table.drilldown": true, // Place complex property names within quotes
                    drilldownRedirect: false,
                    "table.sortColumn": "sourcetype",
                    "table.sortDirection": "asc",
                    "table.wrap": true,
                    count: 5,
                    pagerPosition: "top",
                    rowNumbers: false,
                },
                drilldown: (e) => {
                    console.log(e);
                }
            }
        });
        modal.show();

    });
    $('#btn_SearchBarView').on("click", function() {
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_5",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: true,
                cache: true,
                autostart: false,
                search: "index=_internal | head 500"
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/searchbarview'),
                viz_options: {}
            }
        });
        modal.show();
    });
    $('#btn_SplunkMapView').on("click", function() {
        var modal = new ModalViewComponent({
            title: "Kamlesh",
            id: "model_table_5",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: true,
                cache: true,
                autostart: false,
                search: "index=_internal | head 500"
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/splunkmapview'),
                viz_options: {
                    drilldown: true,
                    drilldownRedirect: true,
                    tileSource: "splunk",
                    "mapping.map.zoom": 6, // Place complex property names within quotes
                    "mapping.map.center": "(47.5,-120)", // Center on Washington state
                    "mapping.markerLayer.markerOpacity": 0.6,
                    "mapping.markerLayer.markerMinSize": 15,
                },
                viz_click_marker: (e) => {
                    console.log(e);
                }
            }
        });
        modal.show();
    });
});

/* Model View on Table Drildown */

require([
    'underscore',
    '../app/splunk_dashboard_model_view_examples/components/ModalViewComponent',
    'splunkjs/mvc',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/ready!'
], function(_, ModalViewComponent, mvc, SearchManager) {
    var tableElement = mvc.Components.getInstance("tbl_1");
    tableElement.on("click", function(e) {
        console.log(e.data);
        console.log(e.data['row.sourcetype']);
        var modal = new ModalViewComponent({
            title: "Demo Table View",
            id: "model_table_1",
            search: new SearchManager({
                earliest_time: "-15m",
                latest_time: "now",
                preview: false,
                cache: false,
                search: 'index=_internal sourcetype="' + e.data['row.sourcetype'] + '" | stats count by source'
            }, { tokens: true, tokenNamespace: "submitted" }),
            display_component: {
                viz_model: require('splunkjs/mvc/tableview'),
                viz_options: {
                    pageSize: '10',
                    data: "events",
                    drilldown: "row",
                },
                drilldown: (e) => {
                    console.log(e);
                }
            }
        });
        modal.show();
    });
});
