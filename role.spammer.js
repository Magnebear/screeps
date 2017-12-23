var Traveler = require('Traveler');

module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		creep.moveTo(Game.flags[creeps.memory.targetFlag])
	},
	create: function (body, name, targetFlag, spawn){
		return Game.spawns[spawn].createCreep(body, name, {role: 'sapper', targetFlag:targetFlag});
	}

}