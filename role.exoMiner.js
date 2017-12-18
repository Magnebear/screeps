var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var startCpu = Game.cpu.getUsed();
		
		rm = creep.memory.room
		src = creep.memory.source
		try{
			creep.harvest(Game.getObjectById(Game.Memory.exoRooms[rm][soruce].id));
		} catch (e) {
			creep.moveto(new RoomPosition(Memory.exoRooms[rm].sources[src].pos.x, Memory.exoRooms[rm].sources[src].pos.y, rm));
		}
		console.log('elapsed :', Game.cpu.getUsed() - startCpu);
		
    },
	create: function (creepBody, name,  rm, src, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'exoMiner',room:rm, source:src});
		return newName;
	}

}