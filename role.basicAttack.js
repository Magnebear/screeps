var Traveler = require('Traveler');
var body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {

		//Get target by priority
		var closestExtension = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
			filter: (structure) =>
			structure.structureType == STRUCTURE_EXTENSION
		});
		var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

		var closestStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
		
		if(closestExtension){
			if(creep.attack(closestExtension) == ERR_NOT_IN_RANGE){
				creep.travelTo(closestExtension);
			}
		} else if(closestHostile) {
			if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
				creep.travelTo(closestHostile);
			}
		} else if(closestStructure) {
			if(creep.attack(closestStructure) == ERR_NOT_IN_RANGE){
				creep.travelTo(closestStructure);
			}
		} else {
			
		}
		creep.travelTo(Game.flags[creep.memory.targetFlag]);
    },
	create: function (name, flag, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'basicAttack', targetFlag:flag});
	}

}