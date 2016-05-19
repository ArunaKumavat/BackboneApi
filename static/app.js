var app = app || {};

$(function( $ ) {
    'use strict';

    app.CounterAppView = Backbone.View.extend({

        el: '#counters',

        input: '',

        events: {
            'click #add_counter': 'addCounter',
            'change input#counterName': 'contentChanged'
        },

        initialize: function() {
            _.bindAll(
                this,
                'render'
            );
             this.listenTo(this.model, "change", this.render);
        },

        contentChanged: function() {
            this.input = $('input#counterName').val();
        },

        render: function() {
            var subElement = [];
            _.each(this.model.models, function (counter) {
                subElement.push(new app.CounterView({model:counter}).render().el);
            }, this);

            this.$el.html(subElement);
        },

        addCounter: function() {
            if(this.input !== ''){
                $('input#counterName').val('');
                var newmodel = new app.Counter();
                newmodel.attributes.title = this.input;
                newmodel.updateModel();
                console.log(newmodel);
                var view = new app.CounterView({ model:newmodel});
                $('#counters').append(view.render().el);
                this.input === '';
            }
            else {
                alert('counter name is empty');
            }
        }

    });
});

$(function( $ ) {
    'use strict';

    app.CounterView = Backbone.View.extend({

        // I believe this is default, but just to be clear...
        tagName: 'div',

        // Cache the template function for a single item.
        template: _.template( $('#counter-template').html() ),

        events: {
            'click .increment': 'incrementCounter',
            'click .decrement': 'decrementCounter',
            'click .remove_counter': 'removeCounter'
        },

        initialize: function() {
            this.model.on( 'change', this.render, this );
            this.model.on( 'destroy', this.remove, this );
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON()));
            return this;
        },

        incrementCounter: function() {
            this.model.updateModelInc();
            this.render();
        },

        decrementCounter: function() {
            this.model.updateModelDec();
            this.render();
        },

        removeCounter: function() {
            this.model.destroy();
        }

    });
});


$(function() {
    'use strict';

    app.Counter = Backbone.Model.extend({
        url  : 'http://localhost:3000/api/v1/counter',
        urlUpdate : 'http://localhost:3000/api/v1/counters',
        urlInc   : 'http://localhost:3000/api/v1/counter/inc',
        urlDec   : 'http://localhost:3000/api/v1/counter/dec',

        defaults: {
            id: null,
            title: '',
            count:0
        },

        updateModel: function(){
            this.save(this.attributes, {
                url: this.url,
            });
        },

        updateModelInc: function() {
            this.fetch({
                data: {id:this.attributes.id},
                type: 'POST',
                url: this.urlInc,
                success: this.fetchSuccess,
                error: this.fetchError
            });
        },

        updateModelDec: function() {
            this.fetch({
                data: {id:this.attributes.id},
                type: 'POST',
                url: this.urlDec,
                success: this.fetchSuccess,
                error: this.fetchError
            });
        },

        fetchSuccess: function (response) {
            // console.log('Counter Collection fetch success', response);
            return response;
        },

        fetchError: function (collection, response) {
            throw new Error("Counter fetch error");
        }

    });

    app.CounterCollection = Backbone.Collection.extend({
        model : app.Counter,
        url : 'http://localhost:3000/api/v1/counters',
    });

});

$(function() {
    'use strict';

    var Workspace = Backbone.Router.extend({
        routes:{
            'index': 'index'
        },

        initialize: function () {
            Backbone.history.start();
        },

        index: function() {
            this.CounterList = new app.CounterCollection();
            var self = this;
            this.CounterList.fetch({
                success:function () {
                    self.CounterListView = new app.CounterAppView({model: self.CounterList});
                    $('#counters').html(self.CounterListView.render());
                }
            });
        }
    });

    app.CounterRouter = new Workspace();

});