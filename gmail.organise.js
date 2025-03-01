function organizeEmailsByDomain() {
  var threads = GmailApp.getInboxThreads();
  
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var sender = message.getFrom();
      var email = sender.replace(/^.+<(.+)>$/, '$1'); // Extract email address
      var domain = email.split('@')[1]; // Extract domain
      
      if (domain) {
        var labelName = "Domain - " + domain; // Prefix to avoid conflicts
        var label = getOrCreateLabel(labelName);
        
        // Apply label to the thread
        thread.addLabel(label);
        
        Logger.log('Labeled thread with: ' + labelName);
      }
    }
  }
}

// Function to check if a label exists; if not, create it
function getOrCreateLabel(labelName) {
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }
  return label;
}
