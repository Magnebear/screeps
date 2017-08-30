var Traveler = require('Traveler');

var roleMegaMiner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var container = Game.getObjectById('59a5d22932ef987c0f96bf3b');
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.travelTo(container);
        } else if(container.hits < container.hitsMax){
            creep.repair(container);
        }
    }
};

module.exports = roleMegaMiner;
