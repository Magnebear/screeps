var Traveler = require('Traveler');
module.exports  = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById(creep.memory.srcID);
		console.log("Source: "+source)
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.travelTo(source);
		}
    },
	create: function (name, creepBody, sourceID, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'dropMiner', srcID:sourceID});
		return newName;
	}
}