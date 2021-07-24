define([
    'underscore',
    'backbone',
    'jquery',
    'splunkjs/mvc'
], function(_, Backbone, $, mvc) {

    var modalTemplate = `
        <div class="modal">
            <div class="modal-header"><h3><%- title %></h3><button class="close">Close</button></div>
            <div class="modal-body"></div>
            <div class="modal-footer"></div>
        </div>
        <div class="modal-backdrop"></div>
    `;

    var ModalView = Backbone.View.extend({
        defaults: {
            title: 'Not set'
        },
        initialize: function(options) {
            this.options = options;
            this.options = _.extend({}, this.defaults, this.options);
            this.childViews = [];
            this.template = _.template(modalTemplate);
        },

        events: {
            'click .close': 'close',
            'click .modal-backdrop': 'close'
        },

        render: function() {
            var data = { title: this.options.title };
            this.$el.html(this.template(data));
            return this;
        },

        show: function() {
            $(document.body).append(this.render().el);

            $(this.el).find('.modal-body').append('<div id="div_' + this.options.id + '"/>');
            $(this.el).find('.modal').css({
                width: '90%',
                height: 'auto',
                left: '5%',
                'margin-left': '0',
                'max-height': '100%'
            });

            if (this.options.display_component.viz_model) {

                var search = mvc.Components.get(this.options.search.id);
                this.options.display_component.viz_options = _.extend({}, this.options.display_component.viz_options, {
                    managerid: search.name,
                    el: $('#div_' + this.options.id)
                })

                var display_component = new this.options.display_component.viz_model(
                    this.options.display_component.viz_options
                ).render();
                var drilldown_func = this.options.display_component.drilldown;
                if (drilldown_func) {
                    display_component.on("click", function(e) {
                        e.preventDefault();
                        drilldown_func(e);
                    });
                }
                var viz_click_marker_func = this.options.display_component.viz_click_marker;
                console.log(display_component.moduleId)
                switch (display_component.moduleId) {
                    case 'splunkjs/mvc/timelineview':
                        display_component.on("change", function() {
                            search.settings.set(display_component.val());
                        });
                        break;
                    case 'splunkjs/mvc/searchbarview':
                        display_component.on("change", function() {
                            // Reset the search query (allows the search to run again,
                            // even when the query is unchanged)
                            search.settings.unset("search");
                            // Update the search query
                            search.settings.set("search", display_component.val());
                            // Run the search (because autostart=false)
                            search.startSearch();
                        });
                        // Listen for changes to the built-in timerange portion of the searchbar
                        display_component.timerange.on("change", function() {
                            // Update the time range of the search
                            search.settings.set(display_component.timerange.val());

                            // Run the search (because autostart=false)
                            search.startSearch();
                        });
                        break;
                    case 'splunkjs/mvc/splunkmapview':
                        if (viz_click_marker_func) {
                            display_component.on("click:marker", function(e) {
                                e.preventDefault();
                                viz_click_marker_func(e);
                            });
                        }
                        break;
                }
                this.childViews.push(display_component);
                this.options.search.startSearch();
            } else {
                console.error("this.options.display_component.viz_model Not found.")
            }
        },

        close: function() {
            this.unbind();
            this.remove();
            _.each(this.childViews, function(childView) {

                childView.unbind();
                childView.remove();

            });
        }

    });

    return ModalView;

});