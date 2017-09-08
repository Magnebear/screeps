var Traveler = require('Traveler');

var roleClaimer = {
  run: function(creep) {
    var targetController = Game.getObjectById(creep.memory.targetController);
	var targetFlag = Game.flags[creep.memory.targetFlag]
	
    if(creep.claimController(targetController) != 0) {
      creep.travelTo(targetFlag);
    }
  }
};

module.exports = roleClaimer;
