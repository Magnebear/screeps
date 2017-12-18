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
						return (structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_LAB) &&
						structure.energy < structure.energyCapacity;
					}
				});
			}
			var closestTarget = creep.pos.findClosestByRange(targets)
			
			if(targets.length > 0) {
				if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.travelTo(closestTarget);
				}
			} else {
				if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) != 0) {
						creep.travelTo(creep.room.storage);
				}
				//Transfer to storage if no targets
/* 				if(creep.room.terminal){
				    if(creep.room.terminal.store[RESOURCE_ENERGY] < 20000){
                        if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						    creep.travelTo(creep.room.terminal);
				        }				        
				    } else 
				} else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.travelTo(creep.room.storage);
				} */
			}

            if(creep.carry.energy == 0){
                creep.memory.delivering = false;
            }
        } else {
			
			if(creep.room.storage[RESOURCE_ENERGY]>0){
				if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
			/* else if(creep.room.storage.store[RESOURCE_ENERGY] != 0) {
				 if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(creep.room.storage);
				}  
			} */			
			if(creep.carry.energy > 100){
				creep.memory.delivering = true;
			}
		}
	}
};

module.exports = roleTransporter;
