var Traveler = require('Traveler');

var roleExternalBuilder = {
    run: function(creep) {
    	var buildTarget = Game.getObjectById("59abcdbcced44a55c468a239");
    	var targetRoomFlag = Game.flags[creep.memory.claimTarget01];
    	var c = Game.getObjectById("59abd2e6c2a9b84dc15448bb");

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Gather');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets[0]);
                }
            }
        } else {
			if(c.store[RESOURCE_ENERGY] > 1000){
				if(creep.withdraw(c, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(c);
				}
			}
		}
	}
};

module.exports = roleExternalBuilder;
