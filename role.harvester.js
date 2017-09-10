var Traveler = require('Traveler');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {	
        if(creep.memory.harvesting){
			if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.travelTo(creep.room.storage);
            }	
            
            if(creep.carry.energy==creep.carryCapacity){
                creep.memory.harvesting = false;
            }
        } else {
            if(creep.carry.energy==0){
                creep.memory.harvesting = true;
				creep.say("Harvesting!");
            }
	        var target = creep.room.controller;
            if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(target);
            }
        }
	}
};

module.exports = roleHarvester;
 