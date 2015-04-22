/*
Routes
*/
Router.route('/', function () {
    this.render('index');
});

Router.route('/index', function () {
    this.render('index');
});

Router.route('/about', function () {
    this.render('about');
});

Router.route('/contact', function () {
    this.render('contact');
});


/**
 * Templates
 */

Template.messages.helpers({
    messages: function () {
        return Messages.find({}, {
            sort: {
                time: -1
            }
        });
    }
})

Template.input.events = {
    'keydown input#message': function (event) {
        if (event.which == 13) { // 13 is the 'enter' key event
            var message = document.getElementById('message').value;
            var name = document.getElementById('user').value;
            if (!name)
                name = 'Anonymous';

            if (!message) return alert('escreva uma mensagem.');

            Meteor.call("addMessage", name, message, function (error, messageId) {
                console.log('message Id: ' + messageId);
            });

            document.getElementById('message').value = '';
            message.value = '';
        }
    }
}

Template.deleteButton.events = {
    'click': function (event) {
        Meteor.call("removeMessage", this._id,
            function (error) {
                console.log('Message removed');
            });
    }

}

Template.registerHelper('formatDate', function (date) {
    var data = new Date(date);
    var formated = data.toString
    return moment(date).format('DD/MM/YYYY hh:mm');
});