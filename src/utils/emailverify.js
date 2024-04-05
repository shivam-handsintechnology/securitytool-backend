'use strict';

let dns = require('dns');
let net = require('net');

const defaultOptions = {
  port: 25,
  sender: 'name@example.org',
  timeout: 0,
  fqdn: 'mail.example.org',
  ignore: false
};

const errors = {
  missing: {
    email: 'Missing email parameter',
    options: 'Missing options parameter',
    callback: 'Missing callback function'
  },
  invalid: {
    email: 'Invalid Email Structure'
  },
  exception: {}
};

function optionsDefaults(options) {
  if (!options) options = {};
  Object.keys(defaultOptions).forEach(function (key) {
    if (options && !options[key]) options[key] = defaultOptions[key];
  });
  return options;
}

function dnsConfig(options) {
  try {
    if (Array.isArray(options.dns)) dns.setServers(options.dns);
    else dns.setServers([options.dns]);
  } catch (e) {
    throw new Error('Invalid DNS Options');
  }
}

module.exports.verify = function verify(email, options, callback) {
  let params = {};
  let args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);

  args.forEach(function (arg) {
    if (typeof arg === 'string') {
      params.email = arg;
    } else if (typeof arg === 'object') {
      params.options = arg;
    } else if (typeof arg === 'function') {
      params.callback = arg;
    }
  });

  if (!params.email && params.options.email && typeof params.options.email === 'string')
    params.email = params.options.email;
  params.options = optionsDefaults(params.options);

  if (!params.email) throw new Error(errors.missing.email);
  if (!params.options) throw new Error(errors.missing.options);
  if (!params.callback) throw new Error(errors.missing.callback);

  if (params.options.dns) dnsConfig(params.options);

  //console.log('# Verifying ' + params.email);

  startDNSQueries(params);
};

function startDNSQueries(params) {
  let domain = params.email.split(/[@]/).splice(-1)[0].toLowerCase();

  //console.log('Resolving DNS... ' + domain);
  dns.resolveMx(domain, (err, addresses) => {
    if (err || typeof addresses === 'undefined') {
      params.callback(err, null);
    } else if (addresses && addresses.length <= 0) {
      params.callback(null, { success: false, info: 'No MX Records' });
    } else {
      params.addresses = addresses;

      // Find the lowest priority mail server
      let priority = 10000;
      let lowestPriorityIndex = 0;

      for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].priority < priority) {
          priority = addresses[i].priority;
          lowestPriorityIndex = i;
          //console.log('MX Records ' + JSON.stringify(addresses[i]));
        }
      }

      params.options.smtp = addresses[lowestPriorityIndex].exchange;
      //console.log('Choosing ' + params.options.smtp + ' for connection');
      beginSMTPQueries(params);
    }
  });
}

function beginSMTPQueries(params) {
  let stage = 0;
  let success = false;
  let response = '';
  let completed = false;
  let ended = false;
  let tryagain = false;

  //console.log('Creating connection...');
  let socket = net.createConnection(params.options.port, params.options.smtp);
  let callback = (err, object) => {
    callback = () => {}; // multiple sources could call the callback, replace the function immediately to prevent it from being called twice
    ended = true;
    return params.callback(err, object);
  };

  let advanceToNextStage = () => {
    stage++;
    response = '';
  };

  if (params.options.timeout > 0) {
    socket.setTimeout(params.options.timeout, () => {
      callback(null, { success: false, info: 'Connection Timed Out', addr: params.email });
      socket.destroy();
    });
  }

  socket.on('data', function (data) {
    response += data.toString();
    completed = response.slice(-1) === '\n';
    if (completed) {
      switch (stage) {
        case 0:
          if (response.indexOf('220') > -1 && !ended) {
            // Connection Worked
            var cmd = 'EHLO ' + params.options.fqdn + '\r\n';
            socket.write(cmd, function () {
              stage++;
              response = '';
            });
          } else {
            if (
              response.indexOf('421') > -1 ||
              response.indexOf('450') > -1 ||
              response.indexOf('451') > -1
            )
              tryagain = true;
            socket.end();
          }
          break;
        case 1:
          if (response.indexOf('250') > -1 && !ended) {
            // Connection Worked
            var cmd = 'MAIL FROM:<' + params.options.sender + '>\r\n';
            socket.write(cmd, function () {
              stage++;
              response = '';
            });
          } else {
            socket.end();
          }
          break;
        case 2:
          if (response.indexOf('250') > -1 && !ended) {
            // MAIL Worked
            var cmd = 'RCPT TO:<' + params.email + '>\r\n';
            socket.write(cmd, function () {
              stage++;
              response = '';
            });
          } else {
            socket.end();
          }
          break;
        case 3:
          if (
            response.indexOf('250') > -1 ||
            (params.options.ignore && response.indexOf(params.options.ignore) > -1)
          ) {
            // RCPT Worked
            success = true;
          }
          stage++;
          response = '';
          // close the connection cleanly.
          if (!ended) {
            var cmd = 'QUIT\r\n';
            socket.write(cmd);
          }
          break;
        case 4:
          socket.end();
      }
    }
  });

  socket.on('connect', function (data) {
    //console.log('Connected');
  });

  socket.on('error', function (err) {
    console.error('Connection error:', err);
    callback(err, { success: false, info: null, addr: params.email });
  });

  socket.on('end', function () {
    //console.log('Closing connection');
    callback(null, {
      success: success,
      info: params.email + ' is ' + (success ? 'a valid' : 'an invalid') + ' address',
      addr: params.email,
    });
  });
};

