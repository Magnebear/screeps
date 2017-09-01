var Traveler = require('Traveler');

var roleExternalHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
	var source = Game.getObjectById(creep.memory.targetSource);
	var destContainer = Game.getObjectById(creep.memory.targetContainer);
	var flag = Game.flags[creep.memory.flag];

		if(creep.memory.harvesting){
			if(source == null){
				creep.travelTo(flag);
			} else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.travelTo(source);
			}
			if (creep.carry.energy == creep.carryCapacity) {
				creep.say("Emptying!")
				creep.memory.harvesting = false;
			}
		} else {
			if(creep.transfer(destContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.travelTo(destContainer);
			}
			
			if(creep.carry.energy==0){
				creep.memory.harvesting = true;
				creep.say("Harvesting!!")

			}
		}
	}
};

module.exports = roleExternalHarvester;
