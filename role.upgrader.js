var Traveler = require('Traveler');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller)
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var c = Game.getObjectById("59a833729347b91c822b50ba")
            if(creep.withdraw(c, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.travelTo(c);
            }
        }
	}
};

module.exports = roleUpgrader;
