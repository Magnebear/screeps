var Traveler = require('Traveler');

module.exports = {
    run: function(creep) {
		var idleFlag = Game.flags.upgradeHolding;
		var upgradeFlag = Game.flags.upgradeFlag;
		var lnk = Game.getObjectById(creep.memory.linkId)
		
        if(creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('Collecting');
	    } else if(creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('Uppgrading');
	    }
		
	    if(creep.memory.upgrading) {
			creep.travelTo(lnk);
            creep.upgradeController(creep.room.controller)
        } else {
			if(lnk.energy > 0){
				if(creep.withdraw(lnk, RESOURCE_ENERGY) != 0) {
					   creep.travelTo(lnk);
				}
			}
		} 
	}
};