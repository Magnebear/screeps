var Traveler = require('Traveler');

module.exports = {
    run: function(creep) {
		if(creep.memory.mode == undefined || creep.room != creep.memory.exoRoom){
			creep.memory.mode = "travel"
		} else if (creep.energy == 0) {
			creep.memory.mode = "gather"
		} else {
			var repairTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return(structure.structureType == STRUCTURE_ROAD ||
					structure.structureType == STRUCTURE_CONTAINER) &&
					structure.hits < (structure.hitsMax/2)
				}
			});
			if (repairTarget) {
				creep.memory.target = repairTarget.id
				creep.memory.mode = "repair"
			} else { 	
				var constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			    if(constructionSite) {
					creep.memory.target = constructionSite.id
					creep.memory.mode = "build"
				} else {
					creep.memory.mode = "idle"
				}
			}
		}
		if(creep.memory.target){
			var target = Game.getObjectById(creep.memory.target)
		}

		switch(creep.memory.mode){
			case "travel":
				creep.moveTo(new RoomPosition(25,25,creep.memory.exoRoom))
				break;
			case "repair":
				if(creep.repair(target) != 0) {
					creep.travelTo(target);
				}
				break;
			case "build":
				if(creep.build(target) != 0) {
					creep.travelTo(targets);
				}
				break;
			case "gather":
				var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: (resource) => {return (resource.amount > 200)}});
				if(target){
					creep.moveTo(target);
					creep.pickup(target);
				}
				break;
			case "idle":
				break;
		}
	},
	create: function(creepBody, name, exoRoom, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role:'exoJanitor', exoRoom:exoRoom});
		return newName;
	}
}
