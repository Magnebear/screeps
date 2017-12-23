var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var targetRoom = creep.memory.targetRoom;
		//Get target by priority
		
		
		
		if(creep.room.name != targetRoom){
			//If max healt enter target room
			if(creep.hits == creep.hitsmax){
				creep.moveTo(new RoomPosition (25,25,targetRoom))
			}
		} else {
			//If low healt, flee!
			if(creep.hits < creep.hitsmax/2){
				if(creep.room.name == targetRoom){
					creep.moveTo(new RoomPosition (25,25,"E32N39"))
					
				}
			}
			
			
		}
		creep.heal(creep)
	},
	create: function (body, name, targetRoom, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'sapper', targetRoom:targetRoom});
	}

}