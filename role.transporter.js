var Traveler = require('Traveler');

var roleTransporter = {
    run: function(creep) {
		if(creep.memory.room2selector){
			var l = Game.getObjectById("59b15c08a6e4ec01b7ef900c")
			var c = Game.getObjectById("59b79f83e835542779c49fbc")
		} else {
			var l = Game.getObjectById("59a9ca4e83bd410897a24445")
			var c = Game.getObjectById("59a5d22932ef987c0f96bf3b")
		}

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
				//Transfer to storage if no targets
				if(creep.room.terminal){
				    if(creep.room.terminal.store[RESOURCE_ENERGY] < 20000){
                        if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						    creep.travelTo(creep.room.terminal);
				        }				        
				    } else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.travelTo(creep.room.storage);
				    }
				} else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.travelTo(creep.room.storage);
				}
			}

            if(creep.carry.energy == 0){
                creep.memory.delivering = false;
            }
        } else {
			if (l.energy > 0){
				if(creep.withdraw(l, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(l);
				}
			} else if (!creep.memory.room2Selector && c){
			    if(c.store[RESOURCE_ENERGY] > 0) {
    				if(creep.withdraw(c, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    				   creep.travelTo(c);
    				}
			    }
			} else if(creep.room.storage.store[RESOURCE_ENERGY] != 0) {
				 if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(creep.room.storage);
				}  
			}			
			if(creep.carry.energy == creep.carryCapacity){
				creep.memory.delivering = true;
			}
		}
	}
};

module.exports = roleTransporter;
