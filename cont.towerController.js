var towerControll = {
    run: function(tower) {
		console.log("Staring tower code.", tower)
		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		console.log("Hostile:",closestHostile);
		if(closestHostile) {
			console.log("Attacking!");
			console.log(tower.attack(closestHostile);
		}
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) =>
			(structure.hits < 2000) && 
			(structure.structureType != STRUCTURE_EXTENSION)
		});
		if(closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}
	}
};

module.exports = towerControll;
