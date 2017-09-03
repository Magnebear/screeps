var room2Controller = {
    run: function() {
		if(Game.time%5 == 0){
			var tock = true;
		} else {
			var tock = false;
		}
		
		if(tock){
			console.log("Room 2 controller running @ ", Game.time);
			
			var startCpu = Game.cpu.getUsed();

			console.log(Game.spawns["Spawn2"].room.find(FIND_MY_CREEPS));
		
			console.log('elapsed:', Game.cpu.getUsed() - startCpu);
		
		
		
		}
	}
};

module.exports = room2Controller;
