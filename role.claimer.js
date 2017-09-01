var Traveler = require('Traveler');

var roleClaimer = {
  run: function(creep) {
    var cont = Game.getObjectById("59830062b097071b4adc42d7");
    if(creep.reserveController(cont) == ERR_NOT_IN_RANGE) {
      creep.travelTo(cont);
    }
  }
};

module.exports = roleClaimer;
