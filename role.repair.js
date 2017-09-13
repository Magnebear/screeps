var Traveler = require('Traveler');
const maxHits = 10000;
var roleRepair = {
    run: function(creep) {
        if(creep.memory.repairTarget==null || !creep.memory.repairTarget) {
            var repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_ROAD ||
                    structure.structureType == STRUCTURE_CONTAINER) &&
					structure.hits < (structure.hitsMax/2)
                }
            });
			
            if(repairTargets.length > 0){
                creep.memory.repairTarget = _.sample(repairTargets);
            } else {
				var repairTargets = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return(structure.structureType == STRUCTURE_WALL ||
							structure.structureType == STRUCTURE_RAMPART) &&
							(structure.hits < maxHits)
						}
				});			
				if(repairTargets.length > 0){
					if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
						creep.travelTo(repairTargets[0]);
					}
				} else {					
					//Idle state
					if(creep.memory.role = "repair"){
						creep.travelTo(Game.flags.repairHolding);    
					} else {
						creep.travelTo(Game.flags.repair2Holding);    
					}
				}
            }
        } else if (creep.carry.energy < 5) {
            var roomContainers = Game.rooms[creep.room.name].find(FIND_STRUCTURES, {
                filter: (structure) => { return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0)) }
            });
            if(creep.withdraw(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.travelTo(roomContainers[0]);
            }
        } else {
            var t= Game.getObjectById(creep.memory.repairTarget.id);
            creep.say("Repping!")
            if(creep.repair(t) == ERR_NOT_IN_RANGE) {
                   creep.travelTo(t);
            }
			if (t == null){
				creep.memory.repairTarget = null;
			} else if(t.hits == t.hitsMax || t.hits > maxHits){
                creep.memory.repairTarget = null;
				creep.say("Repp complete!");
            }	
        }
    }
};

module.exports = roleRepair;
