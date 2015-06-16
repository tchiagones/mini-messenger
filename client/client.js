Session.setDefault('roomId', null)

Meteor.subscribe("Messages");
Meteor.subscribe("Rooms");

//Meteor.startup(function () {
//if ($('section#main').hasClass('postlist')) {
//    Session.set('pageTitle', 'Posts list');
//};
//$('.button-collapse').sideNav();
//$('.modal-trigger').leanModal();

//$('.modal-trigger').on('click', function () {
//    $('#modal1').openModal();
//});
//});

Meteor.users.deny({
    update: function () {
        return true;
    }
});

Template.messages.helpers({
    messages: function () {
        var roomId = Session.get('roomId');
        return Messages.find({
            roomId: roomId
        }, {
            sort: {
                time: -1
            }
        });
    },
    users: function () {
        return Meteor.users.find();
    }
});

Template.rooms.helpers({
    rooms: function () {
        return Rooms.find();
    }
});

Template.room.events = {
    'click .room-item': function (event) {
        Session.set('roomId', this.roomId);
        Meteor.call("getRoomMessages", roomId, function (error) {
            console.log('erro: ' + error);
        });
    }
}

Template.room.rendered = function () {
    $('.collapsible').collapsible({
        accordion: false
    });
}

Template.globalRoom.rendered = function () {
    $('.collapsible').collapsible({
        accordion: false
    });
}

Template.globalRoom.events = {
    'click .room-item': function (event) {
        Session.set('roomId', null);
        Meteor.call("getRoomMessages", null, function (error) {
            console.log('erro: ' + error);
        });
    }
}

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
            var roomId = Session.get('roomId');;
            var userId = Meteor.userId();

            if (!Meteor.userId() &&
                name == "") name = 'Anonymous';

            Meteor.call("addMessage", name, message, roomId, function (error, messageId) {
                if (messageId) document.getElementById('message').value = '';
            });

            materialAlert('got ya!');
        }
    }
}

Template.messageContact.rendered = function () {
    $('.modal-trigger').leanModal();
}

Template.confirmNewRoom.rendered = function(){
    $('.modal-trigger').leanModal();
}

Template.messageContact.events = {
    'click .contact': function (event) {
        debugger;
        if (this.contactId == Meteor.userId())
            materialAlert('forever alone...');
        else
            materialAlert('get a room you two ;)');
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

/*
Template.confirmNewRoom.events = {
    'click': function (event) {
        Meteor.call("addRoom", function (error) {
            console.log('Message removed');
        });
    }
}
*/

Template.registerHelper('formatMessageDate', function (date) {
    var messageDate = new Date(date).setHours(0, 0, 0, 0, 0);
    var today = new Date().setHours(0, 0, 0, 0, 0);
    if (today === messageDate) var messageDate = 'today ' + moment(date).format('hh:mm');
    else messageDate = moment(date).format('DD/MM/YYYY hh:mm');

    return messageDate;
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

var materialAlert = function (message) {
    Materialize.toast(message, 3000);
}