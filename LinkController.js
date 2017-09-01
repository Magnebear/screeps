var linkControll = {
    run: function(o,d) {
		originLink = Game.getObjectById(o) 
		destinationLink = Game.getObjectById(d)
		
		if(o.energy == 800){
			o.transferEnergy(d);
			console.log("Energy transfered!")
		}
	}
};

module.exports = linkControll;
