var Traveler = require('Traveler');

var roleHarvesterExternal = {
    /** @param {Creep} creep **/
    run: function(creep) {
	var source = Game.getObjectById("59830062b097071b4adc42d6");
	var destContainer = Game.getObjectById("59a7c22c82c55314c9f9a863");
	
	if(creep.memory.harvesting){
		if(source == null){
			creep.travelTo(Game.flags.externalSource01);
		} else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.travelTo(source);
		}
		if (creep.carry.energy == creep.energyCapacity) {
			creep.memory.harevesting = false;
		}
	} else {
		if(creep.transfer(destContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.travelTo(destContainer);
		}  
		if(creep.carry.energy==0){
			creep.memory.harvesting = true;
		}
	}
	}
};

module.exports = roleHarvesterExternal;
