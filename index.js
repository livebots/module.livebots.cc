var util = require("util");
var EventEmitter = require("events").EventEmitter;
var request  = require('./lib/request.js');

// url example -> http://localhost:3000
var nextCommand = function (botId, botKey, url) {
  var self = this;
  setInterval(function() {
    request.post({
      uri: url+'/bot/'+botId+'/last',
      json: {
        bot_id: botId,
        bot_key: botKey
      },
    }, function(err, result){
      if (err) {
        self.emit('error', err);
      } else {
        self.emit('next', result);
      }
    });
  }, 3000);
}

util.inherits(nextCommand, EventEmitter);

module.exports = function (botId, botKey, url) {
  return new nextCommand(botId, botKey, url);
}







