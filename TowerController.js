var towerControll = {
    run: function(tower) {
		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) {
			tower.attack(closestHostile);
		} else {
			var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) =>
				(structure.hits < 4500 &&
				structure.hits != structure.hitsMax)
			});
			if(closestDamagedStructure) {
				tower.repair(closestDamagedStructure);
			}
		}
	}
};

module.exports = towerControll;
