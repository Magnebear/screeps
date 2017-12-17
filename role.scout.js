var Traveler = require('Traveler');
module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var tgt = creep.memory.targetRoom
		creep.moveTo(new RoomPosition(25, 25, tgt))
		if(Game.rooms[tgt] == undefined){
			
		} else {
			console.log("Saving sources")
			var srcs = Game.rooms[tgt].find(FIND_SOURCES);
			console.log(sources)
			srcs.forEach(function (src){
				Memory.exoRooms[tgt].sources.source = {}
				Memory.exoRooms[tgt].sources.source.rPos = src.RoomPosition
				Memory.exoRooms[tgt].sources.source.sID = src.id
			})
			
		
		}
		
		
    },
	create: function (name, creepBody, target, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'scout', targetRoom:target});
		return newName;
	}
}