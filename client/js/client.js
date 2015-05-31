Meteor.subscribe("Messages");

Meteor.users.deny({
    update: function () {
        return true;
    }
});

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
});

Template.message.helpers({
    isOwner: function () {
        var response = false;

        if (!this.userId) return;

        if (this.userId == Meteor.userId()) response = true;

        return response;
    }
});

Template.input.events = {
    'keydown input#message': function (event) {
        if (event.which == 13) { // 13 is the 'enter' key event
            var message = document.getElementById('message').value;

            if (!message) return alert('escreva uma mensagem.');
            debugger;
            var name = document.getElementById('user').value;

            var userId = Meteor.userId();

            if (!Meteor.userId() &&
                name == "") name = 'Anonymous';

            Meteor.call("addMessage", name, message, userId, function (error, messageId) {
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

Template.registerHelper('formatMessageDate', function (date) {
    var messageDate = new Date(date).setHours(0, 0, 0, 0, 0);
    var today = new Date().setHours(0, 0, 0, 0, 0);
    if (today === messageDate) var messageDate = 'today ' + moment(date).format('hh:mm');
    else messageDate = moment(date).format('DD/MM/YYYY hh:mm');

    return messageDate;
});