MyDocumentsController = BaseController.extend({
    layoutTemplate: 'baseLayout',
    yieldTemplates: {
        'userMenu': {
            to: 'menu'
        }
    },


    waitOn: function () {
        return Meteor.subscribe('waitingFor');
    },


    data: function () {
        data = {
            waitingFor: AllwaysLate.find()
        };
        return data;
    },


    onBeforeAction: function () {

    },


    onAfterAction: function () {


    },

    action: function () {
        this.render();
    }
});