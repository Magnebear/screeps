var Traveler = require('Traveler');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting){
            var source = Game.getObjectById("59830062b097071b4adc42d9");
            if(!source){
                creep.travelTo(Game.flags.claimTarget01);
            } else if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source);
            }
            if(creep.carry.energy==creep.carryCapacity){
                creep.memory.harvesting = false;
            }
        } else {
            if(creep.carry.energy==0){
                creep.memory.harvesting = true;
            }
	        var target = Game.getObjectById("59830062b097071b4adc42db");
            if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(target);
            }
        }
	}
};

module.exports = roleHarvester;
