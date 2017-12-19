var towerControll = {
    run: function(tower) {
		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) {
			tower.attack(closestHostile);
		} else {
			var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) =>
				(structure.hits < 4000 &&
				structure.hits != structure.hitsMax)
			});
			if(closestDamagedStructure) {
				tower.repair(closestDamagedStructure);
			} else {
				var closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
					filter: (creep) => (creep.hits < creep.hitsMax)
				});
				if(closestDamagedCreep){
					tower.heal(closestDamagedCreep)
				}
			}
		}
	}
};

module.exports = towerControll;
