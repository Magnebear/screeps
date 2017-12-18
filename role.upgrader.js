var Traveler = require('Traveler');

var roleUpgrader = {
    run: function(creep) {
		if (typeof creep.memory.idleFlag == "string" && typeof creep.memory.upgradeFlag == "string"){
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
		
		//var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 1000 }});
		
	    if(creep.memory.upgrading) {
			creep.travelTo(upgradeFlag);
            creep.upgradeController(creep.room.controller)
        } else {
			if(creep.room.storage[RESOURCE_ENERGY] > 25000){
				if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) != 0) {
				   creep.travelTo(creep.room.storage);
				}
			} else {
				//Idle
				creep.travelTo(Game.flags.upgradeHolding);
			}
		} 
	}
};

module.exports = roleUpgrader;