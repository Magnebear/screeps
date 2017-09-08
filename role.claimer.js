var Traveler = require('Traveler');

var roleClaimer = {
  run: function(creep) {
    var targetController = Game.getObjectById(creep.memory.targetController);
	var targetFlag = Game.flags[creep.memory.targetFlag]
	console.log(creep.reserveController(targetController))
    if(creep.reserveController(targetController) != 0) {
      creep.travelTo(targetFlag);
    }
  }
};

module.exports = roleClaimer;