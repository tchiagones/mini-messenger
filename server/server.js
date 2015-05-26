Meteor.startup(function () {
    // code to run on server at startup
    console.log('mini messenger has started');
});

Meteor.publish('groupUsers', function (groupId) {
    check(groupId, String);
    var group = Groups.findOne(groupId);
    var selector = {
        _id: {
            $in: group.members
        }
    };
    var options = {
        fields: {
            username: 1
        }
    };
    return Meteor.users.find(selector, options);
});

Meteor.publish('Messages', function () {
    return Messages.find();
});

Meteor.methods({
    addMessage: function (name, message, sessionId) {
        console.log('Adding message');
        var userName = name;
        var userId = Meteor.userId();

        if (userId) {
            var user = Meteor.users.findOne({
                _id: userId.toString()
            });
            userName = user.profile.name;
        }
        var messageId = Messages.insert({
            'name': userName,
            'message': message,
            'userId': Meteor.userId(),
            'time': Date.now(),
            'sessionId': sessionId
        });

        return messageId;
    },
    removeMessage: function (id) {
        console.log('Removing message');
        Messages.remove({
            _id: id
        });
    },
    getUser: function (userId) {
        var user = Meteor.users.find({
            _id: userId
        });
        return user;
    },
    incrementYesVotes: function (questionId) {
        console.log(questionId);
        Questions.update(questionId, {
            $inc: {
                'yes': 1
            }
        });
    },
    incrementNoVotes: function (questionId) {
        console.log(questionId);
        Questions.update(questionId, {
            $inc: {
                'no': 1
            }
        });
    }
});


var getUser = function (userId) {
    var user = Meteor.users.find({
        id: userId
    })
    return user;
}