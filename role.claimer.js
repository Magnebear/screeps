var Traveler = require('Traveler');

var roleClaimer = {
  if(creep.room.controller) {
      if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
      }
}};

module.exports = roleClaimer;
