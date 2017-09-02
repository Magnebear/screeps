var Traveler = require('Traveler');

var roleClaimer = {
  run: function(creep) {
    var cont = Game.getObjectById("59830062b097071b4adc42db");
    if(creep.claimController(cont) == ERR_NOT_IN_RANGE) {
      creep.travelTo(Game.flags.claimTarget01);
    }
  }
};

module.exports = roleClaimer;
