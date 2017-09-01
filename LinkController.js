var linkControll = {
    run: function(o,d) {
		originLink = Game.getObjectById(o);
		destinationLink = Game.getObjectById(d);

		if(originLink.energy == 800){
			originLink.transferEnergy(destinationLink);
			console.log("Energy transfered!");
		} else {
			console.log("not enough nergy");
		}
	}
};

module.exports = linkControll;
