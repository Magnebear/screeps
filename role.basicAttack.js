var Traveler = require('Traveler');
//var body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
var body = [MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK];

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
		var closestStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
			filter: (structure) =>
			structure.structureType != STRUCTURE_CONTROLLER
		});
		
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
			if(creep.attack(target) == ERR_NOT_IN_RANGE){
				creep.moveTo(target);
			}
			
			creep.memory.targetId = target.id;
		} else {
			creep.moveTo(Game.flags[creep.memory.targetFlag]);
		}			
	},
	create: function (name, flag, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'basicAttack', targetFlag:flag});
	}

}