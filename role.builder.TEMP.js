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
			var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 500 }});

			if(target) {
				creep.moveTo(target);
				creep.pickup(target);
			} else if(creep.room.storage.store[RESOURCE_ENERGY]>15000){
				if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) != 0) {
					   creep.travelTo(creep.room.storage);
				}
			} else if (container){
				if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(container);
				}
			}
		}
	}
};

module.exports = roleBuilderTEMP;