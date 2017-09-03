var Traveler = require('Traveler');

var roleTransporter = {
    run: function(creep) {
		var c = Game.getObjectById("59a5d22932ef987c0f96bf3b");
		var c2 = Game.getObjectById("59a833729347b91c822b50ba");
		var l = Game.getObjectById("59a9ca4e83bd410897a24445");
        var bC = Game.getObjectById("59a7c22c82c55314c9f9a863");
		
		if(creep.memory.delivering == true){
            var startCpu = Game.cpu.getUsed()
			var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER)
                    && structure.energy < structure.energyCapacity;
                }
            });
			
			console.log("Used Cpu: ", Game.cpu.getUsed()-startCpu);
			var closestTarget = creep.pos.findClosestByRange(targets)
			
            if(targets.length > 0) {
                    if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(closestTarget);
                    }
            } else if(c.store[RESOURCE_ENERGY] > 750 || l.energy > 0 || c2.store[RESOURCE_ENERGY] > 750 ){
				//Transfer to big storage...
				 if(creep.transfer(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(bC);
                    }
            } else {
				//Idle
                 creep.travelTo(Game.flags.transportHolding);
			}
            if(creep.carry.energy == 0){
                creep.memory.delivering = false;
            }
        } else {
			if (l.energy > 0){
				if(creep.withdraw(l, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(l);
				}
			} else if(c.store[RESOURCE_ENERGY] > 100){
				if(creep.withdraw(c, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(c);
				}
			} else if(c2.store[RESOURCE_ENERGY] > 100) {
				if(creep.withdraw(c2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(c2);
				}
			} else if(bC.store[RESOURCE_ENERGY] > 0) {
				if(creep.withdraw(bC, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				   creep.travelTo(bC);
				}
			} 
			if(creep.carry.energy == creep.carryCapacity){
				creep.memory.delivering = true;
			}
		}
    }
};

module.exports = roleTransporter;
