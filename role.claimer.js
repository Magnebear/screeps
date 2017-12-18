var Traveler = require('Traveler');

module.exports = {
    run: function(creep) {
		var targetController = Game.getObjectById(creep.memory.targetController)
		if(creep.reserveController(targetController) != 0) {
			creep.travelTo(targetController);
		}
	},
	
	create: function(creepBody, name, tgtController, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role:'exoMule', targetController:tgtController});
		return newName;
	}
}





