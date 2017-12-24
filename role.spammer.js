var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		
		creep.moveTo(new RoomPosition(creep.memory.targetFlag.pos.x,creep.memory.targetFlag.pos.y,creep.memory.targetFlag.pos.roomName))
	},
	create: function (body, name, targetFlag, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'spammer', targetFlag:targetFlag});
	}

}