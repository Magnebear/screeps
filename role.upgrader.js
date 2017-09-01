var Traveler = require('Traveler');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var c = Game.getObjectById("59a833729347b91c822b50ba")
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('Collecting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('Uppgrading');
	    }

	    if(creep.memory.upgrading) {
			creep.travelTo((32,14));
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          
            }
        }
        else if(c.store[RESOURCE_ENERGY] > 100) {
            if(creep.withdraw(c, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.travelTo(c);
            }
        } else {
            creep.travelTo(Game.flags.upgradeHolding);

        }
	}
};

module.exports = roleUpgrader;
