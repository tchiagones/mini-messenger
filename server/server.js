Meteor.methods({
    addMessage: function (name, message, roomId) {
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

        console.log("roomId before: " + roomId);

        if (!roomId) {
            var room = Rooms.find({
                name: "global"
            });

            console.log("room id " + room._id, " name " + room.name);

            if (!room) {
                roomId = Rooms.insert({
                    'name': "global",
                    'users': [userId]
                });
            } else {
                roomId = room._id;
            }
        }

        console.log("roomId: " + roomId);

        var messageId = Messages.insert({
            'name': userName,
            'message': message,
            'userId': Meteor.userId(),
            'time': Date.now(),
            'roomId': roomId
        });

        console.log('adicionando ou atualizando room');

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