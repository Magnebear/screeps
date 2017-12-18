var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var startCpu = Game.cpu.getUsed();
		
		rm = creep.memory.room
		src = creep.memory.source
		
		console.log(creep.name)
		console.log(rm)
		console.log(src)
		
		try{
			creep.harvest(Game.getObjectById(Memory.exoRooms[rm].sources[src].id));
		} catch (e) {
			creep.moveTo(new RoomPosition(Memory.exoRooms[rm].sources[src].pos.x, Memory.exoRooms[rm].sources[src].pos.y, rm));
		}
		console.log('elapsed :', Game.cpu.getUsed() - startCpu);
		
    },
	create: function (creepBody, name,  rm, src, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'exoMiner',room:rm, source:src});
		return newName;
	}

}