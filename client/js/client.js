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
    },
    users: function () {
        return Meteor.users.find();
    }
})

Template.input.events = {
    'keydown input#message': function (event) {
        if (event.which == 13) { // 13 is the 'enter' key event
            var message = document.getElementById('message').value;
            var name = document.getElementById('user').value;
            var currentSessionId = Meteor.default_connection._lastSessionId;

            if (!message) return alert('escreva uma mensagem.');

            if (!Meteor.userId()) name = 'Anonymous';

            Meteor.call("addMessage", name, message, currentSessionId, function (error, messageId) {
                /*console.log('message Id: ' + messageId);*/
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

/*
Meteor.authenticate = function (password, callback) {
    //create a login request with admin: true, so our loginHandler can handle this request
    debugger;
    var loginRequest = {
        admin: true,
        password: password
    };

    //send the login request
    Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback: callback
    });
};
*/