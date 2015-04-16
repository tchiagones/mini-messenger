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
      var message = document.getElementById('message');
	  var name = document.getElementById('user').value;
	  if(!name)
		  name = 'Anonymous';
 
      if (message.value != '') {
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
        });
 
        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
}