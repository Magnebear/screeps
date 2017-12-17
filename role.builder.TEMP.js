var Traveler = require('Traveler');

var roleBuilderTEMP = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
				creep.travelTo(Game.flags.holdingArea);
			}
	    } else {
			var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			var containers = creep.pos.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 100 }});

			if(target) {
				creep.moveTo(target);
				creep.pickup(target);
			}else if (containers.length > 0){
				if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(containers[0]);
				}
			}
		}
	}
};

module.exports = roleBuilderTEMP;