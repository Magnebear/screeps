var creepConstructors = {

	MegaMiner: function (name, creepBody, sourceID, containerID, spawn){
		var newName = Game.spawns[spawn].createCreep(creepBody, name, {role: 'megaMiner', srcID:sourceID, contID:containerID});
		return newName;
	}










}

module.exports = creepConstructors;