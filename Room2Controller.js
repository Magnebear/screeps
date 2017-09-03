var room2Controller = {
    run: function() {
		if(Game.time%5 == 0){
			var tock = true;
		} else {
			var tock = false;
		}
		
		if(tock){
				console.log("Room 2 controller running @ ", Game.time);
		}
		
		Game.spawns["Spawn2"].room.find(FIND_MY_CREEPS);
	}
};

module.exports = room2Controller;
