var Traveler = require('Traveler');

module.exports = {
    run: function(creep) {
		if(creep.reserveController(targetController) != 0) {
			creep.travelTo(targetController);
		}
	},
	
	create: function(creepBody, name, targetController, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role:'exoMule', targetController:targetController});
		return newName;
	}
}





