process.env.MAIL_URL = "smtp://xxxxxx%40gmail.com:yyyyy@smtp.gmail.com:465/";

Meteor.methods({
    addMessage: function (name, message, roomId) {
        console.log('Adding message');

        var userId = Meteor.userId();
        var userName = getUserNameOrNickName(name, userId);

        var messageId = Messages.insert({
            'name': userName,
            'message': message,
            'userId': userId,
            'time': Date.now(),
            'roomId': roomId
        });

        return messageId;
    },
    removeMessage: function (id) {
        console.log('Removing message');
        Messages.remove({
            _id: id
        });
    },
    addRoom: function (roomName) {
        Rooms.insert({
            'name': roomName
        });
    },
    sendEmail: function (recipient) {
        sendSMTPEmail("enzoelement@gmail.com");
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


var sendSMTPEmail = function (recipient) {
    Email.send({
        from: "neves.thiago7@gmail.com",
        to: recipient,
        subject: "Meteor Can Send Emails via Gmail",
        text: "Its pretty easy to send emails via gmail with meteor."
    });
}

var getUserNameOrNickName = function (nickname, userId) {
    var userName = nickname;

    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId.toString()
        });
        if (!user.username)
            userName = user.profile.name;
        else
            userName = user.username;
    }

    return userName;
}