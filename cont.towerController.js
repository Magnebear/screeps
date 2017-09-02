var towerControll = {
    run: function(tower) {
		twr = Game.getObjectById(tower)	
		
		var closestHostile = twr.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		console.log("Hostile:",closestHostile);
		if(closestHostile) {
			console.log("Attacking!");
			twr.attack(closestHostile);
		} else {
			console.log("No hostiles");
		}
		var closestDamagedStructure = twr.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) =>
			(structure.hits < 2000) && 
			(structure.structureType != STRUCTURE_EXTENSION)
		});
		if(closestDamagedStructure) {
			twr.repair(closestDamagedStructure);
		}
	}
};

module.exports = towerControll;
