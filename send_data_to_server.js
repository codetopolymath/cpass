const { createSession } = require('shorty');

const smppOptions = {
  host: '52.43.101.239',
  port: 2775,
  systemId: 'username',
  password: 'password',
  systemType: 'SHORTY'
};

const smppSession = createSession(smppOptions);

smppSession.on('connect', function() {
  smppSession.bind(function(bindErr) {
    if (bindErr) {
      console.error('Error binding to SMPP server:', bindErr);
      return;
    }

    console.log('Successfully bound to SMPP server.');

    // The bind was successful, so we can now send a message.
    const message = {
      source_addr: 'your-source-addr',
      destination_addr: 'destination-phone-number',
      short_message: 'Your message goes here'
    };

    smppSession.submit(message, function(submitErr, submitResp) {
      if (submitErr) {
        console.error('Error submitting message:', submitErr);
        return;
      }

      console.log('Message submitted successfully:', submitResp);
    });
  });
});

smppSession.connect();

