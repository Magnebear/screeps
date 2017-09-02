var Traveler = require('Traveler');

var roleExternalBuilder = {
    run: function(creep) {
    	var buildTarget = Game.getObjectById("59aabfdf2654204ec7172ee1");
    	var targetRoomFlag = Game.flags[creep.memory.claimTarget01];
    	var bC = Game.getObjectById("59a7c22c82c55314c9f9a863");
    	
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Gather');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }
    	
        if(creep.memory.building) {
            if(!buildTarget) {
                creep.travelTo(Game.flags.BuilderHolding);
            } else {
                if(creep.build(buildTarget) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(buildTarget);
                }
            }
        } else {
            if(bC.store[RESOURCE_ENERGY] > 50){
    			if(creep.withdraw(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    				creep.travelTo(bC);
    			}
            }
        }
	}
};

module.exports = roleExternalBuilder;
