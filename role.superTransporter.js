var Traveler = require('Traveler');

var roleSuperTransporter = {
    run: function(creep) {
        var storage = creep.room.storage;
	    var container = Game.getObjectById("59b059c06e986e7f983deca7");
	    var lab = Game.getObjectById("59ae9edb4c5f1d59562176dc");
	    var terminal = creep.room.terminal;
	    
	    
	    
    	if(creep.memory.delivering == true){
    	    if(lab.mineralAmount < lab.mineralCapacity){
    	        if(creep.transfer(lab, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
    	            creep.travelTo(lab);
    	        }
    	    } else {
    	        if(creep.transfer(terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
    	            creep.travelTo(terminal);
    	        }    	        
    	    }
    	    if(_.sum(creep.carry) == 0){
    	        creep.memory.delivering = false;
    	    }
    	} else {
        	if(container.store[RESOURCE_LEMERGIUM] > 500){
        	    if(creep.withdraw(container, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
        	        creep.travelTo(container)
        	    }
        	} else {
        	    //creep.travelTo(Game.flags.STholding];
        	}
        	if(_.sum(creep.carry) == creep.carryCapacity){
    	        creep.memory.delivering = true;
    	    }
    	}
	
	
		
    }
};

module.exports = roleSuperTransporter;
