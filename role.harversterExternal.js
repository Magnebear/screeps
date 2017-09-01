var Traveler = require('Traveler');

var roleHarvesterExternal = {
    /** @param {Creep} creep **/
    run: function(creep) {
      var source = Game.getObjectById("59830062b097071b4adc42d6");
      var 
      if(source == null){
        creep.travelTo(Game.flags.externalSource01);
      } else if (creep.carry.energy == creep.energyCapacity) {
        creep.memory.harevesting = false;
      } 
      
      
      else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.travelTo(source);
      } 
            }
            if(creep.carry.energy==creep.carryCapacity){
                creep.memory.harvesting = false;
            }
        } else {
            if(creep.carry.energy==0){
                creep.memory.harvesting = true;
            }
	        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
                        && structure.energy < structure.energyCapacity;
                    }
            });
            targets.sort();
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets[0]);
                }
            } else {
                creep.travelTo(Game.flags.HoldingArea);
            }
        }
	}
};

module.exports = roleHarvesterExternal;
