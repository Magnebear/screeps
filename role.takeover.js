var Traveler = require('Traveler');

var roleTakeover = {
  run: function(creep) {
    var targetController = Game.getObjectById("59830070b097071b4adc44ad");
	var targetFlag = Game.flags.t1;

    if(creep.claimController(targetController) != 0) {
      creep.travelTo(targetFlag);
    }
  }
};

module.exports = roleTakeover;