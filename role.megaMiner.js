var Traveler = require('Traveler');

var roleMegaMiner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var container = Game.getObjectById(creep.memory.contID);
		console.log(container);
		if(container.store[RESOURCE_ENERGY] < 2000){
			if(creep.harvest(Game.getObjectById(creep.memory.srcID)) == ERR_NOT_IN_RANGE) {
				creep.travelTo(container);
			}
		}
		if(container.hits < container.hitsMax){
            creep.repair(container);
        }
    }
};

module.exports = roleMegaMiner;
