var Traveler = require('Traveler');

var roleTransporter = {
    run: function(creep) {
		var origin = creep.memory.origin
		var exoRoom = creep.memory.exoRoom
		
		if(creep.memory.delivering == true){    
			if(creep.transfer(Game.rooms[origin].storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.travelTo(Game.rooms[origin].storage);
			}
			if(creep.carry.energy == 0){
				creep.memory.delivering = false;
			}
        } else {
			if(creep.room.name != exoRoom){
				creep.travelTo(new RoomPosition(25,25,exoRoom))
			} else {
				var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
				if(target){
					creep.moveTo(target);
					creep.pickup(target);
				}	
			}
			
			if(creep.carry.energy == creep.carryCapacity){
				creep.memory.delivering = true;
			}
		}
	}
};

module.exports = roleTransporter;
