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
			
			var transporters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter2');

			console.log(tansporter2);
			
			console.log('elapsed:', Game.cpu.getUsed() - startCpu);

		
		
		}
	}
};

module.exports = room2Controller;
