var Traveler = require('Traveler');

var roleExternalBuilder = {
    run: function(creep) {
	var buildTarget = Game.getObjectById("59aabfdf2654204ec7172ee1");
	var targetRoomFlag = Game.flags[creep.memory.targetRoomFlag];
	var bC = Game.getObjectById("59a7c22c82c55314c9f9a863");
	
	if(creep.memory.building)
	
	
	if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
		creep.travelTo(targets[0]);
	}

	
	}
};

module.exports = roleExternalBuilder;
