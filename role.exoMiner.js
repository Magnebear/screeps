var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		//var startCpu = Game.cpu.getUsed();
		
		rm = creep.memory.room
		src = creep.memory.source

		if(creep.harvest(Game.getObjectById(Memory.exoRooms[rm].sources[src].id)) != 0){
			creep.moveTo(new RoomPosition(Memory.exoRooms[rm].sources[src].pos.x, Memory.exoRooms[rm].sources[src].pos.y, rm));
		}
		
/* 		try{
			creep.harvest(Game.getObjectById(Memory.exoRooms[rm].sources[src].id));
		} catch (e) {
			console.log("Error: "+e)
			creep.moveTo(new RoomPosition(Memory.exoRooms[rm].sources[src].pos.x, Memory.exoRooms[rm].sources[src].pos.y, rm));
		} finally {
			console.log("Exo miner error")
			console.log(creep.name)
			console.log(rm)
			console.log(src)
		} */
		//console.log('elapsed :', Game.cpu.getUsed() - startCpu);
		
    },
	create: function (creepBody, name, rm, src, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'exoMiner',room:rm, source:src});
		return newName;
	}

} 