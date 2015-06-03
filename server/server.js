Meteor.methods({
    addMessage: function (name, message) {
        console.log('Adding message');
        var userName = name;
        var userId = Meteor.userId();

        if (userId) {
            var user = Meteor.users.findOne({
                _id: userId.toString()
            });
            if (!user.username)
                userName = user.profile.name;
            else
                userName = user.username;
        }

        //if (!chatRoomId)
        //  ChatRooms.find({
        //    name: 'global'
        //});

        var messageId = Messages.insert({
            'name': userName,
            'message': message,
            'userId': Meteor.userId(),
            'time': Date.now()
        });

        //console.log('adicionando ou atualizando chatroom');

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

/*
var AddChatRoom = function (messageId, userId) {
    ChatRooms.insert({
        messageId: messageId,
        userId: userId
    });
}

*/