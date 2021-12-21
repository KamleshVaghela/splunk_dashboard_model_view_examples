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

            $(this.el).find('.modal-body').append('<div id="div_' + this.options.id + '">' + this.options.display_component.viz_options.template + '</div>');
            $(this.el).find('.modal').css({
                width: '90%',
                height: 'auto',
                left: '5%',
                'margin-left': '0',
                'max-height': '100%'
            });
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
