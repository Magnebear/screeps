var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById(creep.memory.srcID);
        
		if(container.store[RESOURCE_ENERGY] < 2000){
			if(creep.harvest(Game.getObjectById(creep.memory.srcID)) == ERR_NOT_IN_RANGE) {
			}
		}
		creep.travelTo(container);
		if(container.hits < container.hitsMax){
			creep.repair(container);
		}
    },
	create: function (name, creepBody, src, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'megaMiner', source:src});
		return newName;
	}

}