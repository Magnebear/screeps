var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var targetRoom = creep.memory.targetRoom;
		//Get target by priority
		
		creep.heal(creep)
		
		if(creep.room.name != targetRoom){
			//If max healt enter target room
			if(creep.hits == creep.hitsmax){
				creep.moveTo(new RoomPosition (25,25,targetRoom))
			}
		} else {
			//If low healt, flee!
			if(creep.hits < creep.hitsmax/2){
				creep.moveTo(new RoomPosition (25,25,"E32N39"))
			}
		}
	},
	create: function (body, name, targetRoom, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'sapper', targetRoom:targetRoom});
	}

}