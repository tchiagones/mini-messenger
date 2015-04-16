/*var signInBtn = document.getElementsByClassName("login-link-and-dropdown-list");
debugger;
signInBtn.classList.add('btn');*/
/**
* Templates
*/

Template.messages.helpers({
    messages: function() {
        return Messages.find({}, { sort: { time: -1}});
    }
})

Template.input.events = {
  'keydown input#message' : function (event) {
	  debugger;
    if (event.which == 13) { // 13 is the enter key event
      var message = document.getElementById('message').value;
	  var name = document.getElementById('user').value;
	  if(!name)
		  name = 'Anonymous';
 
      if(!message)
          alert('escreva uma mensagem.');

        Meteor.call("addMessage",name,message,function(error , messageId){
          console.log('message Id: ' + messageId);
        });
 
        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }

Template.registerHelper('formatDate', function(date) {
    var data = new Date(date);
    var formated = data.toString
  return moment(date).format('DD/MM/YYYY hh:mm:ss');
});