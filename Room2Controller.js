var room2Controller = {
    run: function() {
		var startCpu = Game.cpu.getUsed();
		
		if(Game.time%5 == 0){
			var tock = true;
		} else {
			var tock = false;
		}
		
		if(tock){
			console.log("Room 2 controller running @ ", Game.time);
			
			

			var room2creeps = Game.spawns["Spawn2"].room.find(FIND_MY_CREEPS);
			
			console.log(room2creeps[0].memory.role);
		
			console.log('elapsed:', Game.cpu.getUsed() - startCpu);
		
		
		
		}
	}
};

module.exports = room2Controller;
