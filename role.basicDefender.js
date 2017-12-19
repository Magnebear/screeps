var Traveler = require('Traveler');


module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var target = undefined;
		//Get target by priority
		var closestExtension = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
			filter: (structure) =>
			structure.structureType == STRUCTURE_EXTENSION
		});
		var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		var closestStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
		
		if(closestExtension){
			target = closestExtension;
		} else if(closestHostile) {
			target = closestHostile;
		} else if(closestStructure) {
			target = closestStructure;
		} else {
			target = false;
		}
		if(target){
			if(creep.attack(target) != 0){
				creep.moveTo(target);
			}
			if(creep.rangedattack(target) == ERR_NOT_IN_RANGE){
				creep.moveTo(target);
			}
			creep.memory.targetId = target.id;
		} else {
			creep.travelTo(new RoomPosition(25,25,creep.memory.targetRoom));
		}			
	},
	create: function (body, name, room, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'basicAttack', targetRoom:room});
	}

}