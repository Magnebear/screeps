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
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 1000}});
			if(target){
				creep.moveTo(target);
				creep.pickup(target);
			} else if (container){ 
				if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(container);
				}
			} else {
			//Idle
				creep.travelTo(Game.flags.HoldingArea);
			}
		} 
		
		
		
		
		
		
/* 		 */
	}
};

module.exports = roleUpgrader;


/* else if(creep.room.storage.store[RESOURCE_ENERGY] > 50000) {
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.travelTo(creep.room.storage);
            }
        } */