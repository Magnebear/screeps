var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		
		creep.moveTo(new RoomPosition(creeps.memory.targetFlag.pos.x,creeps.memory.targetFlag.pos.y,creeps.memory.targetFlag.pos.roomName))
	},
	create: function (body, name, targetFlag, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'sapper', targetFlag:targetFlag});
	}

}