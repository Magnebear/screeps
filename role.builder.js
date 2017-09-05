var Traveler = require('Traveler');

var roleBuilder = {
    run: function(creep) {
		if(creep.memory.container){
			var container = Game.getObjectById(creep.memory.container);
		} else {
			var container = Game.getObjectById("59a833729347b91c822b50ba");
		}
		
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }
       
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets[0]);
                }
                
            } else {
                 creep.travelTo(Game.flags[creep.memory.idelFlag]);
            }
	    } else {
			if(container.store[RESOURCE_ENERGY] > 59){
				if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.travelTo(container);
				}
		    }
		}
	}
};

module.exports = roleBuilder;