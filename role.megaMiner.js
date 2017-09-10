var Traveler = require('Traveler');
module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var container = Game.getObjectById(creep.memory.contID);
        var source = Game.getObjectById(creep.memory.srcID);
        if(creep.name == "megaMiner2"){
            
            if (Game.getObjectById("59aea243daa30c78a13596a1").energy < 750){
				creep.harvest(source);
            }
			if (creep.carry.energy > 40) {
                creep.transfer(Game.getObjectById("59aea243daa30c78a13596a1"), RESOURCE_ENERGY)
            }
            creep.travelTo(source);
        } else if (creep.name == "megaMiner5") {
            creep.travelTo(container);
            creep.harvest(source);
            
        } else if (creep.name == "megaMiner4") {
            if (Game.getObjectById("59b15a5a59a2a537e2656960").energy < 750){
				creep.harvest(source);
            }
			if (creep.carry.energy > 40) {
                creep.transfer(Game.getObjectById("59b15a5a59a2a537e2656960"), RESOURCE_ENERGY)
            }
            creep.travelTo(source);

        } else {
            if(container.store[RESOURCE_ENERGY] < 2000){
    			if(creep.harvest(Game.getObjectById(creep.memory.srcID)) == ERR_NOT_IN_RANGE) {
    			}
    		}
    		creep.travelTo(container);
    		if(container.hits < container.hitsMax){
                creep.repair(container);
            }
        }
    },
	create: function (name, creepBody, sourceID, containerID, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'megaMiner', srcID:sourceID, contID:containerID});
		return newName;
	}

}