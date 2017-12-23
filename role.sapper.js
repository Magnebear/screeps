var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var targetRoom = creep.memory.targetRoom;
		//Get target by priority
		creep.heal(creep)
		/* if(creep.hits < creep.hitMax/2){
			creep.moveTo(new RoomPosition (30,46,"E33N38"))
			if(creep.room.name == targetRoom){
				
			}
		} else 
		 */	
		if(creep.room.name != targetRoom && creep.hits == creep.hitsMax){
			//If max healt enter target room
			creep.say("Moving")
			creep.moveTo(new RoomPosition (25,25,targetRoom))
		} else {
			//If low healt, flee!
			if(creep.hits < creep.hitsMax/2){
				if(creep.room.name == targetRoom){
					creep.moveTo(new RoomPosition (25,25,"E32N39"))	
				}
			}
		}
	},
	create: function (body, name, targetRoom, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'sapper', targetRoom:targetRoom});
	}

}