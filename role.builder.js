var Traveler = require('Traveler');

var roleBuilder = {

    run: function(creep) {
		if(creep.memory.container){
			var c = Game.getObjectById(creep.memory.container);
		} else {
			var c = Game.getObjectById("59a833729347b91c822b50ba");
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
            if(bC.store[RESOURCE_ENERGY] > 50){
				if(creep.withdraw(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.travelTo(bC);
				}
            } else {
				if(c.store[RESOURCE_ENERGY] > 59){
					if(creep.withdraw(c, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.travelTo(c);
					}
				}
			}
	    }
	}
};

module.exports = roleBuilder;
