Meteor.startup(function () {
    // code to run on server at startup
    console.log('Starting mini messenger');
});

Meteor.methods({
    addMessage: function (name, message, sessionId) {
        console.log('Adding message');
        var messageId = Messages.insert({
            'name': name,
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