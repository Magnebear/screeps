var Traveler = require('Traveler');
module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var tgt = creep.memory.targetRoom
		creep.moveTo(new RoomPosition(25, 25, tgt))
		if(Game.rooms[tgt] == undefined){
			
		} else {
			var sources = Game.rooms[tgt].find(FIND_SOURCES);
			sources.forEach(function (source){
				Memory.exoRooms.tgt.sources.source = {}
				Memory.exoRooms.tgt.sources.source.pos = source.RoomPosition
				Memory.exoRooms.tgt.sources.source.pos = source.id
			})
			
		
		}
		
		
    },
	create: function (name, creepBody, target, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'scout', targetRoom:target});
		return newName;
	}
}