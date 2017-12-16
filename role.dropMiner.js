var Traveler = require('Traveler');
module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById(creep.memory.srcID);
		if(creep.harvest(Game.getObjectById(source)) == ERR_NOT_IN_RANGE) {
				creep.travelTo(source);
		}

    },
	create: function (name, creepBody, sourceID, spawn){
		var newName = Game.spawns["Spawn1"].createCreep(creepBody, name, {role: 'dropminer', srcID:sourceID});
		return newName;
	}
}