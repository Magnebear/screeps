var Traveler = require('Traveler');

var roleHarvesterTEMP = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var targets = creep.room.findClosestByRange(FIND_DROPPED_RESOURCES);
			if(targets.length) {
				creep.moveTo(targets[0]);
				creep.pickup(targets[0]);
			}
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(
							structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER)
							&& structure.energy < structure.energyCapacity;
                    }
            });
			targets.appe
            if(targets.length > 0) {
                creep.memory.upgrading = false;
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets[0]);
                }
            } else {
                creep.memory.upgrading = true;
                if(creep.memory.upgrading) {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.controller);
                    }
                }
            }
        }
	}
};

module.exports = roleHarvesterTEMP;