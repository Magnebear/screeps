var Traveler = require('Traveler');

var roleBuilder = {

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
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets[0]);
                }
            } else {
                 creep.travelTo(Game.flags.BuilderHolding);
            }
	    }
	    else {
			var bC = Game.getObjectById("59a7c22c82c55314c9f9a863");
            if(creep.withdraw(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.travelTo(bC);
            }
	    }
	}
};

module.exports = roleBuilder;
