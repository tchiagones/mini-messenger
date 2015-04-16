/**
* Models

Messages = new Meteor.Collection('messages');
*/

Meteor.startup(function () {
    // code to run on server at startup
    console.log('Starting mini messenger');
});

Meteor.methods({
  addMessage : function(name, message){
    console.log('Adding message');
    var messageId = Messages.insert({
          'name' : name,
          'message': message,
          'userId' : Meteor.userId(),
          'time': Date.now()
      });
    return messageId;
  },
  incrementYesVotes : function(questionId){
    console.log(questionId);
    Questions.update(questionId,{$inc : {'yes':1}});
  },
  incrementNoVotes : function(questionId){
    console.log(questionId);
    Questions.update(questionId,{$inc : {'no':1}});
  }
});