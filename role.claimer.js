var Traveler = require('Traveler');

var roleClaimer = {
  var c = Game.getObjectById("59830062b097071b4adc42d7");
  if(creep.reserveController(c) == ERR_NOT_IN_RANGE) {
    creep.moveTo(c);
  }
};

module.exports = roleClaimer;
