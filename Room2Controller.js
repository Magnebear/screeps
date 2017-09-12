var room2Controller = {
    run: function() {
		var maxTransporters2 = 3;
		var maxRepair2 = 3;
		var maxBuilders2 = 1;
		var startCpu = Game.cpu.getUsed();
		
		var claimerCreep = [CLAIM,CLAIM,MOVE,MOVE];

		
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
            var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2');
			console.log(transporters2.length);
			
			console.log('elapsed:', Game.cpu.getUsed() - startCpu);

			if (transporters2.length < maxTransporters2) {
    			var newName = Game.spawns['Spawn2'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, 
    				{role: 'transporter2',
    				room2selector: true
    			});
    			console.log('Spawning new transporter2: ' + newName);
		    } else if(repair2.length < maxRepair2) {
                var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'repair2'});
    			console.log('Spawning new repair2: ' + newName);		        
		    } else if(builders2.length < maxBuilders2) {
                var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'builder2'});
    			console.log('Spawning new builder: ' + newName);		        
		    } 
		    
		}
	}
};

module.exports = room2Controller;
