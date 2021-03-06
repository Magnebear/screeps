var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {	
		rm = creep.memory.room
		src = creep.memory.source

		if(creep.harvest(Game.getObjectById(Memory.exoRooms[rm].sources[src].id)) != 0){
			creep.moveTo(new RoomPosition(Memory.exoRooms[rm].sources[src].pos.x, Memory.exoRooms[rm].sources[src].pos.y, rm));
		}
		
    },
	create: function (creepBody, name, rm, src, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'exoMiner',room:rm, source:src});
		return newName;
	}

} 