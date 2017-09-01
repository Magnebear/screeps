var Traveler = require('Traveler');

var roleClaimer = {
  var cont = Game.getObjectById("59830062b097071b4adc42d7");
  if(creep.reserveController(cont) == ERR_NOT_IN_RANGE) {
    creep.moveTo(cont);
  }
};

module.exports = roleClaimer;
