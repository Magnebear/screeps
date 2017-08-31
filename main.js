var Traveler = require('Traveler');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMegaMiner = require('role.megaMiner');
var roleTransporter = require('role.transporter');
var roleRepair = require('role.repair');

var maxHarvester = 1;
var maxBuilders = 2;
var maxUpgraders = 6;
var maxMegaMiners = 1
var maxTransporters = 4;
var maxRepair = 2;

//var Memory.clock = 0;
//Test commit!

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var megaMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'megaMiner');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');

    if (Memory.clock < 25){
        Memory.clock++;
    } else {
        console.log('-------------------------------')
        console.log('Builders: ' + builders.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Harvesters: ' + harvesters.length);
        console.log('MegaMiners: ' + megaMiners.length);
        console.log('transporters: ' + transporters.length);
        console.log('repair: ' + repairs.length);
        console.log('-------------------------------')
        Memory.clock = 0;
    }

    var defaultCreep = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    var upgradeCreep = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    var megaMiner = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
    var transporterCreep = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
    var repairCreep = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]

    //megaMiner dispatch and controll

    //var test = _.filter(Game.creeps, (creep) => creep.memory.srcId == '59830055b097071b4adc418f');
   // console.log(Game.getObjectById(Memory.megaMinerSrc0.id).ticksToLive);
    //if(Game.getObjectById(Memory.megaMinerSrc0.id).ticksToLive < 100){
    //  console.log("dying!");
   // }


    if(megaMiners.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep(megaMiner, undefined, {role:'megaMiner',posX:11,posY:43,srcID:'59830055b097071b4adc418f'});
        console.log('Spawning new MegaMiner: ' + newName);
    } else if (harvesters.length < maxHarvester) {
        var newName = Game.spawns['Spawn1'].createCreep(defaultCreep, undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    } else if (transporters.length < maxTransporters) {
        var newName = Game.spawns['Spawn1'].createCreep(transporterCreep, undefined, {role: 'transporter'});
        console.log('Spawning new transporter: ' + newName);
    } else if(upgraders.length < maxUpgraders) {
        var newName = Game.spawns['Spawn1'].createCreep(upgradeCreep, undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }else if (repairs.length < maxRepair) {
        var newName = Game.spawns['Spawn1'].createCreep(repairCreep, undefined, {role: 'repair'});
        console.log('Spawning new builder: ' + newName);
    }else if (builders.length < maxBuilders) {
        var newName = Game.spawns['Spawn1'].createCreep(defaultCreep, undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }



    if(harvesters.length == 0){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        Memory.TestVariable = newName
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            'ð ï¸' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    var tower = Game.getObjectById('59a48e720033416e2fa8ea27');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < 2000) && (structure.structureType != STRUCTURE_EXTENSION)
        });
        //console.log(closestDamagedStructure)
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'megaMiner') {
            roleMegaMiner.run(creep);
        }
        if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }
}
