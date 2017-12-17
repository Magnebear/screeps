var Traveler = require('Traveler');
module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var tgt = creep.memory.targetRoom
		creep.moveTo(new RoomPosition(25, 25, tgt))
		if(Game.rooms[tgt] == undefined){
			
		} else {
			console.log("Saving sources")
			Memory.exoRooms[tgt].sources = Game.rooms[tgt].find(FIND_SOURCES);
			Memory.exoRooms[tgt].isScouted = true
		}
		
		
    },
	create: function (name, creepBody, target, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'scout', targetRoom:target});
		return newName;
	}
}