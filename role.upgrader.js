var Traveler = require('Traveler');

var roleUpgrader = {
    run: function(creep) {
		if (typeof typeof creep.memory.idleFlag == "string" && typeof creep.memory.upgradeFlag == "string"){
			var idleFlag = creep.memory.idleFlag;
			var upgradeFlag = Game.flags.upgradeFlag
		} else {
			var idleFlag = Game.flags.upgradeHolding;
			var upgradeFlag = Game.flags.upgradeFlag;
		}	

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('Collecting');
	    } else if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('Uppgrading');
	    }

	    if(creep.memory.upgrading) {
			creep.travelTo(upgradeFlag);
            creep.upgradeController(creep.room.controller)
        } else if(creep.room.storage.store[RESOURCE_ENERGY] > 50000) {
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.travelTo(creep.room.storage);
            }
        } else {
			//Idle
            creep.travelTo(Game.flags.HoldingArea);
        }
	}
};

module.exports = roleUpgrader;
