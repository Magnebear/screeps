var Traveler = require('Traveler');

//TEMP
var roleHarvesterTEMP = require('role.harvester.TEMP');
var roleUpgraderTEMP = require('role.upgrader.TEMP');
var roleBuilderTEMP = require('role.builder.TEMP');

var roleHarvester = require('role.harvester');
var roleDropMiner = require('role.dropMiner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMegaMiner = require('role.megaMiner');
var roleTransporter = require('role.transporter');
var roleRepair = require('role.repair');
var roleClaimer = require('role.claimer');
var roleExternalHarvester = require('role.externalHarvester');
var roleExternalBuilder = require('role.externalBuilder');
var roleSuperTransporter = require('role.superTransporter');
var roleTakeover = require('role.takeover');
var roleBasicAttack = require('role.basicAttack');
var roleExoMiner = require('role.exoMiner');
var roleExoMule = require('role.exoMule');

var towerController = require("TowerController");
var linkController = require("LinkController");



var defaultCreep = [WORK,CARRY,MOVE,MOVE];
var dropMinerCreep = [WORK,WORK,MOVE,MOVE];
var defaultCreep2 = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
var upgradeCreep = [MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY];
var megaMiner = [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY];
var megaMinerAlt = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
var megaMineralMinerCreep = [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK];
var claimerCreep = [CLAIM,CLAIM,MOVE,MOVE];
var miniMegaMiner = [WORK,WORK,CARRY,MOVE];
var transporterCreep = [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY]
var repairCreep = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
var externalHarvesterCreep = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
var externalBuilderCreep = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
var superTransporterCreep = [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]

var exoMinerCreep = [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK]
var exoMuleCreep = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]

var maxHarvester = 3;
var maxBuilders = 1;
var maxUpgraders = 4;
var maxRepair = 2;
var maxTransporters = 3;


var maxSuperTransporters = 1;
var maxExternalHarvesters1 = 4;
var maxExternalHarvesters2 = 5;
var maxBasicAttackers = 1;

var maxTransporters2 = 4;
var maxRepair2 = 2;
var maxBuilders2 = 1;
var maxExternalHarvesters3 = 3;
var maxExternalHarvesters4 = 3;
//"E27N34"
var externalMiningRooms = ("E26N33")

// var startCpu = Game.cpu.getUsed();
// console.log('elapsed:', Game.cpu.getUsed() - startCpu);


module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

	var sources = Game.spawns["Spawn1"].room.find(FIND_SOURCES);
	
	var source = sources[0]
	if(Game.creeps[source.id+"dropMiner"] == undefined){
		console.log("create new dropMiner")
		var newName = roleDropMiner.create(source.id+"dropMiner", dropMinerCreep, source.id, "Spawn1");
		
		
	}
	var source = sources[1]
	if(Game.creeps[source.id+"dropMiner"] == undefined){
		//var newName = roleDropMiner.create(source.id+"dropMiner", "dropMiner", source.id, "Spawn1");
		//console.log("create new dropMiner")
		
	}
	
	
    if (Memory.clock < 5){
        Memory.clock++;
    } else {		
		var roles = {}
		console.log('-------------------------------')		
		for(var name in Game.creeps) {
			if(roles[Game.creeps[name].memory.role]){
				roles[Game.creeps[name].memory.role] ++
			} else {
				roles[Game.creeps[name].memory.role] = 1
			}
		}
		for(var role in roles) {
			console.log(role,":\t\t",roles[role])
		}	
        console.log('-------------------------------')
		
		//Controlls creeps spawning
		creepControll();
		
		Memory.clock = 0;
    }
	
    

    //Hardcoded link and towwer controls
	//towerController.run(Game.getObjectById('5a337d5ad362a801f184c350'));
    
	//linkController.run("59aea243daa30c78a13596a1", "59a9ca4e83bd410897a24445");
    
	for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		switch(Game.creeps[name].memory.role) {
			//TEMP cases for transittion
			case "harvester":
				roleHarvesterTEMP.run(creep);				
				break;
			case "builder":
				roleBuilderTEMP.run(creep);
				break;
			case "harvester":
				roleHarvester.run(creep);
				break;
			case "upgrader":
				roleUpgrader.run(creep);
				break;
			case "dropMiner":
				roleDropMiner.run(creep);
				break;
			case "builder":
			case "builder2":
				roleBuilder.run(creep);
				break;
			case "externalBuilder":
				roleExternalBuilder.run(creep);
				break;
			case "megaMiner":	
				roleMegaMiner.run(creep);
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
			case "externalHarvester3":
			case "externalHarvester4":				    
				roleExternalHarvester.run(creep);
				break;
			case "superTransporter":
				roleSuperTransporter.run(creep)
				break;
			case "transporter":
			case "transporter2":
				roleTransporter.run(creep);
				break;
			case "basicAttack":
				roleBasicAttack.run(creep);
				break;
			case "takeover":
				roleTakeover.run(creep);
				break;
		}
    }
	
/* 	for(var exoRoom in externalMiningRooms) {
		//Controll the external mining activities for a specific target room
		console.log(exoRoom)
		
		if(Game.creeps[exoRoom+"exoMiner1"] == undefined){
			console.log("create new "+exoRoom+"exoMiner1");
			//var newName = Game.spawns['Spawn1'].createCreep(exoMinerCreep, exoRoom+"exoMiner1", {role: 'exoMiner'});
		} else {
			if(Game.rooms[exoRoom] == undefined){
				console.log("test!")
			}
			
			
			
		}
		
		if(Game.creeps[exoRoom+"exoMiner2"] == undefined){
			console.log("create new "+exoRoom+"exoMiner2");
		}
			
		if(Game.creeps[exoRoom+"exoMule1"] == undefined){
			console.log("create new "+exoRoom+"exoMule1");
			
		}
	}	
 */
 }

function creepControll(){
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var externalBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalBuilder');
	var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
	var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
	var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
	var externalHarvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalHarvester1');
	var externalHarvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalHarvester2');		
	var externalHarvesters3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalHarvester3');
	var externalHarvesters4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'externalHarvester4');		
	
	var superTransporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'superTransporter');
	var basicAttackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'basicAttack');
	
	//R2
	var transporters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter2');
	var repair2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair2');
	var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2');
	
	if (harvesters.length < maxHarvester) {
		var newName = Game.spawns['Spawn1'].createCreep(defaultCreep, undefined, {role: 'harvester'});
		console.log('Spawning new harvesters: ' + newName);
		
	} else if (upgraders.length < maxUpgraders) {
		var newName = Game.spawns['Spawn1'].createCreep(defaultCreep, undefined, {role: 'upgrader'});
		console.log('Spawning new upgrader: ' + newName);
		
	} else if (builders.length < maxBuilders) {
		var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,WORK,CARRY], undefined, {role: 'builder'});
		console.log('Spawning new builder: ' + newName);
		
	}

/* 	else if(Game.creeps["megaMiner1"] == undefined) {
		var newName = roleMegaMiner.create("megaMiner1", megaMiner, "59f1a4d582100e1594f3d9c2", "5a328e9fac100464eb4ad0b6", "Spawn1");
		console.log('Spawning new MegaMiner1: ' + newName);
		
	} else if (transporters.length < maxTransporters) {
		var newName = Game.spawns['Spawn1'].createCreep(transporterCreep, undefined, {role: 'transporter'});
		console.log('Spawning new transporter: ' + newName);
		
	} else if (builders.length < maxBuilders) {
		var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY], undefined, {role: 'builder'});
		console.log('Spawning new builder: ' + newName);
		
	} else if (repairs.length < maxRepair) {
		var newName = Game.spawns['Spawn1'].createCreep([MOVE,CARRY,CARRY,WORK], undefined, {role: 'repair'});
		console.log('Spawning new repair: ' + newName);
		
	} else if(Game.creeps["megaMiner2"] == undefined) {
		var newName = roleMegaMiner.create("megaMiner2", megaMiner, "59f1a4d582100e1594f3d9c1", "5a33cb149d04b82fad4af560", "Spawn1");
		console.log('Spawning new MegaMiner2: ' + newName);
		
	} else if(basicAttackers.length < maxBasicAttackers) {
		var newName = roleBasicAttack.create(undefined, "target1", "Spawn1");
		console.log('Spawning new attacker: ' + newName);
		
	}
 */	
	
	
/* 	//--------------------ROOM 1--------------------
	if(Game.creeps["megaMiner1"] == undefined) {
		var newName = roleMegaMiner.create("megaMiner1", megaMiner, "59830055b097071b4adc418f", "59a5d22932ef987c0f96bf3b", "Spawn1");
		console.log('Spawning new MegaMiner1: ' + newName);
	}  else if(Game.creeps["megaMiner2"] == undefined) {
		var newName = Game.spawns['Spawn1'].createCreep(megaMiner, "megaMiner2", 
			{role: 'megaMiner',
			srcID:'59830055b097071b4adc4190',
			contID:'59aea243daa30c78a13596a1'
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
			targetContainer:"59aea243daa30c78a13596a1",
			flag:"externalSource02"
		});
		console.log('Spawning new externalHarvester2: ' + newName);
	} else if(Game.creeps["megaMiner5"] == undefined && (Game.getObjectById("598342fa641acf0573578ea5").mineralAmount != 0)) {
		var newName = Game.spawns['Spawn1'].createCreep(megaMineralMinerCreep, "megaMiner5", 
			{role: 'megaMiner',
			srcID:'598342fa641acf0573578ea5',
			contID:'59b059c06e986e7f983deca7'
		});
		console.log('Spawning new MegaMiner5: ' + newName);
	} else if (superTransporters.length < maxSuperTransporters) {
		var newName = Game.spawns['Spawn1'].createCreep(superTransporterCreep, undefined, 
			{role: 'superTransporter',
			containerId:"59aea243daa30c78a13596a1",
			flag:"HoldingArea"
		});
		console.log('Spawning new superTransporter: ' + newName);
	} else if (Game.creeps["claimer1"] == undefined && Game.flags.claim1.room.controller.reservation.ticksToEnd < 1000){
			//Spawn new claimer 1
			var newName = Game.spawns['Spawn1'].createCreep(claimerCreep, "claimer1", 
				{role: "claimer",
				targetController: "59830062b097071b4adc42d7",
				targetFlag:"claim1"
			});
			console.log("Spawning new claimer 1");
	} else if (Game.creeps["claimer2"] == undefined && Game.flags.claim2.room.controller.reservation.ticksToEnd < 1000){
			//Spawn new claimer 2
			var newName = Game.spawns['Spawn1'].createCreep(claimerCreep, "claimer2", 
				{role: "claimer",
				targetController: "59830055b097071b4adc4192",
				targetFlag:"claim2"
			});
			console.log("Spawning new claimer 2");
	} else if(basicAttackers.length < maxBasicAttackers) {
		var newName = roleBasicAttack.create(undefined, "target0", "Spawn1");
		console.log('Spawning new attacker: ' + newName);
	}
 */
	
/* 	//--------------------ROOM 2--------------------
	if (harvesters.length < maxHarvester) {
		var newName = Game.spawns['Spawn2'].createCreep(defaultCreep2, undefined, 
			{role: 'harvester',
			containerId: "59ac2dc842200e583074dad8",
			sourceId: "59830062b097071b4adc42d9"
		});
		console.log('Spawning new harvester: ' + newName);
	} else if(Game.creeps["megaMiner3"] == undefined) {
		var newName = Game.spawns['Spawn2'].createCreep(megaMinerAlt, "megaMiner3", 
			{role: 'megaMiner',
			srcID:'59830062b097071b4adc42da',
			contID:'59b79f83e835542779c49fbc'
		});
		console.log('Spawning new MegaMiner3: ' + newName);
	} else if(Game.creeps["megaMiner4"] == undefined) {
		var newName = Game.spawns['Spawn2'].createCreep(megaMinerAlt, "megaMiner4", 
			{role: 'megaMiner',
			srcID:'59830062b097071b4adc42d9',
			contID:'59ac2dc842200e583074dad8'
		});
		console.log('Spawning new MegaMiner4: ' + newName);
	} else if (transporters2.length < maxTransporters2) {
		var newName = Game.spawns['Spawn2'].createCreep(transporterCreep, undefined, 
			{role: 'transporter2',
			room2selector: true
		});
		console.log('Spawning new transporter2: ' + newName);
	} else if(repair2.length < maxRepair2) {
		var newName = Game.spawns['Spawn2'].createCreep(repairCreep, undefined, {role: 'repair2'});
		console.log('Spawning new repair2: ' + newName);		        
	} else if(builders2.length < maxBuilders2) {
		var newName = Game.spawns['Spawn2'].createCreep(defaultCreep, undefined, {role: 'builder2'});
		console.log('Spawning new builder: ' + newName);		        
	} else if (Game.creeps["claimer3"] == undefined && Game.flags.claim3.room.controller.reservation.ticksToEnd < 1000){
		var newName = Game.spawns['Spawn2'].createCreep(claimerCreep, "claimer3", 
			{role: "claimer",
			targetController: "59830063b097071b4adc42df",
			targetFlag:"claim3"
		});
		console.log("Spawning new claimer 3");
	} else if (externalHarvesters3.length < maxExternalHarvesters3) {
		var newName = Game.spawns['Spawn2'].createCreep(externalHarvesterCreep, undefined, 
			{role: 'externalHarvester3',
			targetSource:"59830063b097071b4adc42dd",
			targetContainer:"59adf5d36a4b6643c42b3abc",
			flag:"externalSource3"
		});
		console.log('Spawning new externalHarvester2: ' + newName);
	} else if (externalHarvesters4.length < maxExternalHarvesters4) {
		var newName = Game.spawns['Spawn2'].createCreep(externalHarvesterCreep, undefined, 
			{role: 'externalHarvester4',
			targetSource:"59830063b097071b4adc42de",
			targetContainer:"59adf5d36a4b6643c42b3abc",
			flag:"externalSource4"
		});
		console.log('Spawning new externalHarvester4: ' + newName);
	} */  
}
