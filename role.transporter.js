var Traveler = require('Traveler');

var roleTransporter = {
    run: function(creep) {
        var bC = creep.room.storage;
		var room2selector = creep.memory.room2selector;
		
		var c = Game.getObjectById("59a5d22932ef987c0f96bf3b");
		var c2 = Game.getObjectById("59a833729347b91c822b50ba");
		var l = Game.getObjectById("59a9ca4e83bd410897a24445");		
		
		if (creep.memoroom2selector) {
			l = Game.getObjectById("59b15c08a6e4ec01b7ef900c");		
		}
		
		if(creep.memory.container){
		    var c1 = Game.getObjectById(creep.memory.container);
		} else {
			var c1 = c;
		}		

		if(!(room2selector === true)){
			room2selector = false;
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
			} else if ((room2selector == false && c1.store[RESOURCE_ENERGY] > 200)   || c.store[RESOURCE_ENERGY] > 200){
				//Transfer to storage if no targets
				if(creep.room.terminal){
				    if(creep.room.terminal.store[RESOURCE_ENERGY] < 20000){
                        if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						    creep.travelTo(creep.room.terminal);
				        }				        
				    } else if (creep.transfer(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.travelTo(bC);
				    }
				} else if (creep.transfer(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.travelTo(bC);
				}
			} else {
				//Idle
				if (l.energy > 0){
					if(creep.withdraw(l, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(l);
					}
				} else {
					creep.travelTo(Game.flags.transportHolding);
				}
			}

            if(creep.carry.energy == 0){
                creep.memory.delivering = false;
            }
        } else {

			
			if(room2selector == false){
				if (l.energy > 0){
					if(creep.withdraw(l, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(l);
					}
				} else if(c.store[RESOURCE_ENERGY] > 100){
					if(creep.withdraw(c, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(c);
					}
				} else if(c2.store[RESOURCE_ENERGY] > 200) {
					if(creep.withdraw(c2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(c2);
					}
				} else if(bC.store[RESOURCE_ENERGY] > 0) {
					if(creep.withdraw(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(bC);
					}
				}
			} else {
				
				if (l.energy > 0){
					if(creep.withdraw(l, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(l);
					}
				} else if (c1.store[RESOURCE_ENERGY] > 0)
					if(creep.withdraw(c1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   creep.travelTo(c1);
					}
				} else if(c1.store[RESOURCE_ENERGY] == 0) {
    				 if(creep.withdraw(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    					   creep.travelTo(bC);
    				}  
				}			
			}
			if(creep.carry.energy == creep.carryCapacity){
				creep.memory.delivering = true;
			}
		}
    }
};

module.exports = roleTransporter;
