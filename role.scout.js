var Traveler = require('Traveler');
module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
		creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom))
    },
	create: function (name, creepBody, target, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'scout', targetRoom:target});
		return newName;
	}
}