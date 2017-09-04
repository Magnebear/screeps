var room2Controller = {
    run: function() {
		var maxTransporters2 = 2;
		var maxRepair2 = 2;
		
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
			var repair2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair2');

			console.log(transporters2.length);
			
			console.log('elapsed:', Game.cpu.getUsed() - startCpu);

			if (transporters2.length < maxTransporters2) {
    			var newName = Game.spawns['Spawn2'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, 
    				{role: 'transporter2',
    				room2selector: true,
    				container: "59abd2e6c2a9b84dc15448bb"
    			});
    			console.log('Spawning new transporter2: ' + newName);
		    } else if(repair2.length < maxRepair2) {
                var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'repair2'});
    			console.log('Spawning new repair: ' + newName);		        
		    }
		    
		}
	}
};

module.exports = room2Controller;
