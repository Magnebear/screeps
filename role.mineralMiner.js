var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {	
		mineral = creep.room.find(FIND_MINERALS)[0]
/* 		container = mineral.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => {structure.structureType == STRUCTURE_CONTAINER}
		}); */
/* 		
		creep.travelTo(container)
		if(container.store[RESOURCE_ENERGY] < 2000
		
		 */
		if(_.sum(creep.carry) < creep.carryCapacity && mineral.mineralAmount > 0){
			if(creep.harvest(mineral) != 0){
				creep.travelTo(mineral)
			}
		} else {
			if(creep.transfer(creep.room.terminal, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
				creep.travelTo(creep.room.terminal);
			}
		}
    },
	create: function (creepBody, name, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'mineralMiner'});
		return newName;
	}
} 