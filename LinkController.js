var linkControll = {
    run: function(o,d) {
		originLink = Game.getObjectById(o) 
		destinationLink = Game.getObjectById(d)
		console.log(o.energy)
				console.log(o.store)

		if(o.energy == 800){
			o.transferEnergy(d);
			console.log("Energy transfered!");
		} else {
			console.log("not enough nergy");
		}
	}
};

module.exports = linkControll;
