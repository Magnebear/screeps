var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {	
		mineral = creep.room.find(RESOURCE_MINERAL)[0]
		if(_.sum(creep.carry) < creep.carryCapacity && mineral.mineralAmount > 0){
			if(creep.harvest(mineral) != 0){
				creep.travelTo(mineral)
			}
		} else {
			if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.travelTo(creep.room.terminal);
			}
		}
    },
	create: function (creepBody, name, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'mineralMiner'});
		return newName;
	}
} 