var Traveler = require('Traveler');

var roleMegaMiner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var container = Game.getObjectById(creep.memory.contID);
        var source = Game.getObjectById(creep.memory.srcID);
        if(creep.memory.role == "megaMiner2"){
            
            if (Game.getObjectById("59aea243daa30c78a13596a1").energy < 750){
				creep.harvest(Game.getObjectById("59aea243daa30c78a13596a1"));
            }
			if (creep.carry.energy > 40) {
                creep.transfer(Game.getObjectById("59aea243daa30c78a13596a1"), RESOURCE_ENERGY)
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
    }
};

module.exports = roleMegaMiner;
