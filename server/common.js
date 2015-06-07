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

Meteor.publish('Rooms', function () {
    return Rooms.find();
});