var Traveler = require('Traveler');

var roleTransporter = {
    run: function(creep) {
        if(creep.memory.delivering == true){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER)
                    && structure.energy < structure.energyCapacity;
                }
            });
            targets.sort();
            //console.log(targets);
            if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(targets[0]);
                        //console.log(targets);
                    }
            } else {
                 creep.travelTo(Game.flags.transportHolding);
            }
            if(creep.carry.energy == 0){
                creep.memory.delivering = false;
            }
        } else {
            var roomContainers = Game.rooms[creep.room.name].find(FIND_STRUCTURES, { filter: (structure) => { return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0)) } } );
            if(creep.withdraw(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.travelTo(roomContainers[0]);
            }
            if(creep.carry.energy == creep.carryCapacity){
                creep.memory.delivering = true;
            }
            
            
        }
        
    }    
};

module.exports = roleTransporter;
