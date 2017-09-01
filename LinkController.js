var linkControll = {
    run: function(o,d) {
		originLink = Game.getObjectById("59a9d6c7901b9f6272a9c69a");
		destinationLink = Game.getObjectById("59a9ca4e83bd410897a24445");

		if(o.energy == 800){
			o.transferEnergy(d);
			console.log("Energy transfered!");
		} else {
			console.log("not enough nergy");
		}
	}
};

module.exports = linkControll;
