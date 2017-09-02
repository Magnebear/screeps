var towerControll = {
    run: function(tower) {
		twr = Game.getObjectById(tower);
		console.log(twr);
		var closestHostile = twr.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

		if(closestHostile) {
			console.log(twr.attack(closestHostile));
		} else {
			console.log("No hostiles");
		}
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) =>twr
			(structure.hits < 2000) && 
			(structure.structureType != STRUCTURE_EXTENSION)
		});
		if(closestDamagedStructure) {
			twr.repair(closestDamagedStructure);
		}
	}
};

module.exports = towerControll;
