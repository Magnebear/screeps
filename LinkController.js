var linkControll = {
    run: function(o,d) {
		originLink = Game.getObjectById(o);
		destinationLink = Game.getObjectById(d);
		
		if(originLink.energy == 800 && originLink.cooldown == 0){
			originLink.transferEnergy(destinationLink);
			console.log("Energy transfered!");
		}
	}
};

module.exports = linkControll;
