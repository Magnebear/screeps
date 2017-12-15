var Traveler = require('Traveler');

var roleHarvesterTEMP = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.travelTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(
							structure.structureType == STRUCTURE_TOWER)
							&& structure.energy < structure.energyCapacity;
                    }
            });
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