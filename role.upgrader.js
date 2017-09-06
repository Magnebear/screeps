var Traveler = require('Traveler');

var roleUpgrader = {
    run: function(creep) {
		if (typeof creep.memory.contianerId == "string" && typeof creep.memory.idleFlag == "string" && typeof creep.memory.upgradeFlag == "string"){
			var container = Game.getObjectById(creep.memory.contianerId);
			var idleFlag = creep.memory.idleFlag;
			var upgradeFlag = Game.flags.upgradeFlag
		} else {
			var container = Game.getObjectById("59a833729347b91c822b50ba");
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
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          
            }
        } else if(creep.room.storage.store[RESOURCE_ENERGY] > 50000) {
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.travelTo(creep.room.storage);
            }
        } else {
			//Idle
            creep.travelTo(Game.flags[idleFlag]);
        }
	}
};

module.exports = roleUpgrader;
