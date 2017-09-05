var Traveler = require('Traveler');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMegaMiner = require('role.megaMiner');
var roleTransporter = require('role.transporter');
var roleRepair = require('role.repair');
var roleClaimer = require('role.claimer');
var roleExternalHarvester = require('role.externalHarvester');
var roleExternalBuilder = require('role.externalBuilder');

var towerController = require("TowerController");
var linkController = require("LinkController");

var room2Controller = require("Room2Controller");

var maxHarvester = 4;
var maxBuilders = 4;
var maxBuilders2 = 0;
var maxExternalBuilders = 2;
var maxUpgraders = 5;
var maxMegaMiners1 = 1;
var maxMegaMiners2 = 1;
var maxMegaMiners3 = 1;
var maxTransporters = 3;
var maxRepair = 2;
var maxExternalHarvesters1 = 4;
var maxExternalHarvesters2 = 4;

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (Memory.clock < 5){
        Memory.clock++;
    } else {
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
		var externalBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalBuilder');
		var megaMiners1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'megaMiner1');
		var megaMiners2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'megaMiner2');
		var megaMiners3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'megaMiner3');
		var megaMiners4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'megaMiner4');
		var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
		var repairs1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair' && creep.room.name == "E42S26");
		var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
		var externalHarvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalHarvester1');
		var externalHarvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalHarvester2');		
	
	
        console.log('-------------------------------')
        console.log('Builders: ' + builders.length);
        console.log('externalBuilders: ' + externalBuilders.length);		
        console.log('Upgraders: ' + upgraders.length);
        console.log('Harvesters: ' + harvesters.length);
        console.log('MegaMiners1: ' + megaMiners1.length);
		console.log('MegaMiners2: ' + megaMiners2.length);
        console.log('transporters: ' + transporters.length);
        console.log('repair: ' + repairs1.length);
		console.log('externalHarvesters1: ' + externalHarvesters1.length);
		console.log('externalHarvesters2: ' + externalHarvesters2.length);
		console.log('-------------------------------')

		creepControll();
		Memory.clock = 0;
		
    }

	
    function creepControll(){
		var defaultCreep = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
		var defaultCreep2 = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
		var upgradeCreep = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
		var megaMiner = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];
		var megaMinerAlt = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
		var miniMegaMiner =[WORK,WORK,CARRY,MOVE];
		var transporterCreep = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
		var repairCreep = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
		var externalHarvesterCreep = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
		var externalBuilderCreep = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
		
	
	    // || Game.creeps[Memory.megaMiner1Name].ticksToLive < 50) && !Game.creeps[Memory.megaMiner1Name].spawning
		if(megaMiners1.length < maxMegaMiners1) {
			var newName = Game.spawns['Spawn1'].createCreep(megaMiner, undefined, 
				{role: 'megaMiner1',
				srcID:'59830055b097071b4adc418f',
				contID:'59a5d22932ef987c0f96bf3b'
			});
				console.log('Spawning new MegaMiner1: ' + newName);
				if(newName != (-1 || -3 || -4 || -6 || -10 || -14)){
					console.log()
					Memory.megaMiner1Name = newName;
				}
		} else if (Game.creeps[Memory.megaMiner1Name].spawning){
			//Stop rest of spawn checks
		} else if (transporters.length < maxTransporters) {
			var newName = Game.spawns['Spawn1'].createCreep(transporterCreep, undefined, 
				{role: 'transporter',
				room2selector: false
			});
			console.log('Spawning new transporter: ' + newName);
		} else if(megaMiners2.length < 1) {
			var newName = Game.spawns['Spawn1'].createCreep(megaMiner, undefined, 
				{role: 'megaMiner2',
				srcID:'59830055b097071b4adc4190',
				contID:'59a833729347b91c822b50ba'
			});
			console.log('Spawning new MegaMiner2: ' + newName);
		} else if(upgraders.length < maxUpgraders) {
			var newName = Game.spawns['Spawn1'].createCreep(upgradeCreep, undefined, {role: 'upgrader'});
			console.log('Spawning new upgrader: ' + newName);
		} else if(claimers.length < 0) {
			var newName = Game.spawns['Spawn1'].createCreep([CLAIM,MOVE], undefined, {role: 'claimer'});
			console.log('Spawning new Claimer: ' + newName);
		} else if (repairs1.length < maxRepair) {
			var newName = Game.spawns['Spawn1'].createCreep(repairCreep, undefined, {role: 'repair'});
			console.log('Spawning new repair1: ' + newName);
		} else if (builders.length < maxBuilders) {
			var newName = Game.spawns['Spawn1'].createCreep(defaultCreep, undefined, {role: 'builder'});
			console.log('Spawning new builder: ' + newName);
		} else if (externalBuilders.length < maxExternalBuilders) {
			var newName = Game.spawns['Spawn1'].createCreep(externalBuilderCreep, undefined, 
				{role: 'externalBuilder',
				
			});
			console.log('Spawning new externalBuilder: ' + newName);
		} else if (externalHarvesters1.length < maxExternalHarvesters1) {
			var newName = Game.spawns['Spawn1'].createCreep(externalHarvesterCreep, undefined, 
				{role: 'externalHarvester1',
				targetSource:"59830062b097071b4adc42d6",
				targetContainer:"59a9d6c7901b9f6272a9c69a",
				flag:"externalSource01"
			});
			console.log('Spawning new externalHarvester1: ' + newName);
		} else if (externalHarvesters2.length < maxExternalHarvesters2) {
			var newName = Game.spawns['Spawn1'].createCreep(externalHarvesterCreep, undefined, 
				{role: 'externalHarvester2',
				targetSource:"59830055b097071b4adc4193",
				targetContainer:"59a833729347b91c822b50ba",
				flag:"externalSource02"
			});
			console.log('Spawning new externalHarvester2: ' + newName);
		}
		//Backup harvester spawning
		if(Game.creeps.length < 2){
			Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'transporter',room2selector: false
			});
		}
		
        if (harvesters.length < maxHarvester) {
			var newName = Game.spawns['Spawn2'].createCreep(defaultCreep2, undefined, 
			{role: 'harvester',
			containerId: "59ac2dc842200e583074dad8",
			sourceId: "59830062b097071b4adc42d9"
		});
			console.log('Spawning new harvester: ' + newName);
		} else if(megaMiners3.length < 1) {
			var newName = Game.spawns['Spawn2'].createCreep(megaMinerAlt, undefined, 
				{role: 'megaMiner3',
				srcID:'59830062b097071b4adc42da',
				contID:'59abd2e6c2a9b84dc15448bb'
			});
			console.log('Spawning new MegaMiner3: ' + newName);
		} else if(megaMiners4.length < 1) {
			var newName = Game.spawns['Spawn2'].createCreep(megaMinerAlt, undefined, 
				{role: 'megaMiner4',
				srcID:'59830062b097071b4adc42d9',
				contID:'59ac2dc842200e583074dad8'
			});
			console.log('Spawning new MegaMiner4: ' + newName);
		} 
		
		
		
	}	
	
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    

	towerController.run(Game.getObjectById('59a9bd8b58bf8523b6247f27'));
	towerController.run(Game.getObjectById('59aa6fc87073420285cddfe8'));
	towerController.run(Game.getObjectById('59ac591cd00bbd1ef4dbf699'));

	linkController.run("59a9d6c7901b9f6272a9c69a", "59a9ca4e83bd410897a24445");
	
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		switch(Game.creeps[name].memory.role) {
				case "harvester":
					roleHarvester.run(creep);
					break;
				case "upgrader":
					roleUpgrader.run(creep);
					break;
				case "builder":
				case "builder2":
					roleBuilder.run(creep);
					break;
				case "externalBuilder":
					roleExternalBuilder.run(creep);
					break;
				case "megaMiner1":
				case "megaMiner2":
				case "megaMiner3":
				case "megaMiner4":
					roleMegaMiner.run(creep);
					break;
				case "transporter":
				case "transporter2":
					roleTransporter.run(creep);
					break;
				case "repair":
					roleRepair.run(creep);
					break;
				case "claimer":
					roleClaimer.run(creep);
					break;
				case "externalHarvester":
				case "externalHarvester1":
				case "externalHarvester2":
					roleExternalHarvester.run(creep);
					break;
		}
    }
	
	room2Controller.run();
}
