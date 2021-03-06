var Traveler = require('Traveler');

var roleTransporter = {
    run: function(creep) {
		if(creep.memory.delivering == true){    
			var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER &&
					structure.energy < structure.energyCapacity;
                }
            });
			if (towers.length > 0) {
				var targets = towers;
			} else {	
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return ((structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_LAB) &&
						structure.energy < structure.energyCapacity)
						|| (structure.structureType == STRUCTURE_TERMINAL
						&& structure.store[RESOURCE_ENERGY] < 25000);
					}
				});
			}
			//targets.push(Game.getObjectById("5a38e5d1a73fd951a613dca8"))
			var closestTarget = creep.pos.findClosestByRange(targets)
			
			if(targets.length > 0) {
				if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.travelTo(closestTarget);
				}
			} else {
				if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) != 0) {
						creep.travelTo(creep.room.storage);
				}
/* 				if(creep.room.terminal){
				    if(creep.room.terminal.store[RESOURCE_ENERGY] < 20000){
                        if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						    creep.travelTo(creep.room.terminal);
				        }				        
				    }
				}
*/				
			}

            if(creep.carry.energy == 0){
                creep.memory.delivering = false;
            }
        } else {
			var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 1000 }});			if (container){
					if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(container);
					}
			} else if(creep.room.storage.store[RESOURCE_ENERGY]>0){
				if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) != 0) {
					   creep.travelTo(creep.room.storage);
				}
			} else {
				var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0 }});
				if (container){
					if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(container);
					}
				}
			} 
			
			if(creep.carry.energy > 200){
				creep.memory.delivering = true;
			}
		}
	}
};

module.exports = roleTransporter;
