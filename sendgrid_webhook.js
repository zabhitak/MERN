var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'zabhitakytyyu' }, function(err, tunnel) {
  console.log('LT running')
});