var Traveler = require('Traveler');

var roleExternalBuilder = {
    run: function(creep) {
    	var buildTarget = Game.getObjectById("59abc531ced44a55c468a0d3");
    	var targetRoomFlag = Game.flags[creep.memory.claimTarget01];
    	var source = Game.getObjectById("59830062b097071b4adc42da");
    	
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
    			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
    				creep.travelTo(source);
    			}
            }
        }
	}
};

module.exports = roleExternalBuilder;
