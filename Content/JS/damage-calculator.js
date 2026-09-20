
let pathDatabase = "Content/JS/Databases/";

let pathMedal = 'Content/Graphics/YokaiMedals/';

function calculateStats({ yokaiData, lvl = 60, ivHp = 16, ivStr = 8, ivSpr = 8, ivDef = 8, ivSpd = 8,
                          gymStr = 0, gymSpr = 0, gymDef = 0, gymSpd = 0,
                          evHp = 0, evStr = 0, evSpr = 0, evDef = 0, evSpd = 0 }) {
    let parsedLvl = parseInt(lvl, 10);
    if (isNaN(parsedLvl) || parsedLvl > 99 || parsedLvl < 0) parsedLvl = 60;
    const lvlFactor = (parsedLvl - 1) / 98;

    const baseHp = yokaiData.baseA_HP + (yokaiData.baseB_HP - yokaiData.baseA_HP + (+ivHp))
        * lvlFactor + (evHp * 3 * (1 + parsedLvl / 198));

    const baseStr = yokaiData.baseA_Strength + (yokaiData.baseB_Strength - yokaiData.baseA_Strength + (+ivStr))
        * lvlFactor + (evStr * 1.5 * (1 + parsedLvl / 198)) + ((+gymStr) * 5);

    const baseSpr = yokaiData.baseA_Spirit + (yokaiData.baseB_Spirit - yokaiData.baseA_Spirit + (+ivSpr))
        * lvlFactor + (evSpr * 1.5 * (1 + parsedLvl / 198)) + ((+gymSpr) * 5);

    const baseDef = yokaiData.baseA_Defense
        + (yokaiData.baseB_Defense - yokaiData.baseA_Defense + (+ivDef))
        * lvlFactor + (evDef * 1.5 * (1 + parsedLvl / 198)) + ((+gymDef) * 5) - ((+gymStr) * 2) - ((+gymSpd) * 2);

    const baseSpd = yokaiData.baseA_Speed
        + (yokaiData.baseB_Speed - yokaiData.baseA_Speed + (+ivSpd))
        * lvlFactor + (evSpd * 1.5 * (1 + parsedLvl / 198)) + ((+gymSpd) * 5) - ((+gymSpr) * 2) - ((+gymDef) * 2);

    return { baseHp, baseStr, baseSpr, baseDef, baseSpd };
}

function updateDisplay({side, posX, posY, name, baseHp, baseStr, baseSpr, baseDef, baseSpd}) {
	
	$(`${side}Img`).src = `Content/Graphics/YokaiMedals/y${String(posX + posY * 23).padStart(3, '0')}.webp`;
    $(`${side}Name`).innerText = name;
	$(`${side}-hp`).value = Math.floor(baseHp);
	$(`${side}-str`).value = Math.floor(baseStr);
	$(`${side}-spr`).value = Math.floor(baseSpr);
	$(`${side}-def`).value = Math.floor(baseDef);
	$(`${side}-spd`).value = Math.floor(baseSpd);
}

function validateAndStyleInputs(manager) {
	let ivTotal = 0;
	Object.values(manager.ivs).slice(1).forEach(iv => {
		ivTotal+=iv;
	});
	ivTotal+= Math.floor(manager.ivs.hp / 2);
	const ivValid = ivTotal === 40 && Object.values(manager.ivs).slice(1).every(v => v >= 3 && v <= 16) && (3 <= Math.floor(manager.ivs.hp / 2) <= 16);
	document.querySelectorAll(`.${manager.side}-IV`).forEach(elem => {
		elem.style.color = ivValid ? 'var(--side-buttons-color)' : 'red';
	});

	let gymTotal = 0;
	Object.values(manager.gym).forEach(gymStat => {
		gymTotal+=gymStat;
	});
	const gymValid = gymTotal <= 5 && Object.values(manager.gym).every(v => v >= 0 && v <= 5);
	document.querySelectorAll(`.${manager.side}-gym`).forEach(elem => {
		elem.style.color = gymValid ? 'var(--side-buttons-color)' : 'red';
	});
	let evTotal = 0;
	Object.values(manager.evs).forEach(ev => {
		evTotal +=ev;
	})
	const evValid = evTotal <= 20 && Object.values(manager.evs).every(v => v >= 0);
	document.querySelectorAll(`.${manager.side}-EV`).forEach(elem => {
		elem.style.color = evValid ? 'var(--side-buttons-color)' : 'red';
	});
	//let attiduteSelect = $('attitude-select');
	//$('attitude-display').innerHTML = `HP Boost: ${attiduteDatabase[attiduteSelect.value].boost[0]} | STR Boost: ${attiduteDatabase[attiduteSelect.value].boost[1]} | SPR Boost: ${attiduteDatabase[attiduteSelect.value].boost[2]} | DEF Boost: ${attiduteDatabase[attiduteSelect.value].boost[3]} | SPD Boost: ${attiduteDatabase[attiduteSelect.value].boost[4]}`;
}

function setYokaiData(yokai, manager){
	manager.yokaiData = yokai;
	manager.onUpdate();
}

function getRandomNumberWithTwoDecimals() {
  const min = 0.9;
  const max = 1.1;
  const range = max - min;
  const randomValue = Math.random() * range + min;
  return parseFloat(randomValue.toFixed(2));
}

function getAttack({moveData, yokaiAttackerData, yokaiDefenderData}) {
	let attackerStats = yokaiAttackerData.getStats();
	let defenderStats = yokaiDefenderData.getStats();
	
	let isMoxie = $('isMoxie');
	let isCrit = $("isCrit");
	let isCritSkill = $("isCritSkill");
	let isDefending = $('isDefending');
	let isDefenseSkill = $("isDefenseSkill");
	//let moveTypeInput = parseInt($("move-type"));
	let attackerStatValue;
	let power = Math.floor(moveData?.SkillConfig.BasePower * moveGrowthList[moveData.SkillConfig.SkillGrowthIndex - 1].powerLevelMulti[9]/100); // Power set to lvl 10 by default
	
	let moveEl = moveData?.SkillConfig.Element ?? 0;
	let elementResist= moveEl == 0 ? 1 : yokaiDefenderData.yokaiData[`${elementList[moveEl]}AttributeMultiplier`];
	
	let hitAmount = moveData.HitsPerTarget;
	
	let critMultiplier = 1; // Critical Hit: 1.25; Critical Hit with amplified skill: 1.875
	let defenceScale = 0.25; // Physical attack: 0.25; Technique: 0.15; Critical Hit: 0.1
	let defenceMultiplier = 1; // Guard: 0.5; Guard with amplified skill: 0.25
	
	let effectID = steffInfoDatabase[moveData?.Steff1].EffectID;
	
	if (effectID == "0x7E496729") attackerStatValue = parseInt($("attacker-str").value);
	else if (effectID == "0x094E57BF") attackerStatValue = parseInt($("attacker-spr").value);
		
	RandMulti = getRandomNumberWithTwoDecimals();
	
	if (isDefending.checked == true){
		defenceMultiplier = 0.5;
		if (isDefenseSkill.checked == true) defenceMultiplier *= 0.5;
	}
	
	console.log("---")
	console.log("STR or SPR ",attackerStatValue)
	console.log("Power ",power)
	console.log("Defence ", parseInt($("defender-def").value))
	console.log("Random Multiplier ",RandMulti)
	console.log("Hit amount ", hitAmount)
	console.log("Element Resist ", elementResist)
	console.log("---")
	if (isCrit.checked == true){
		defenceScale = 0.1;
		critMultiplier = 1.25;
		if (isCritSkill.checked == true) critMultiplier *= 1.5;
	}
	
	let MoxieMulti = 1;
	
	if (isMoxie.checked == true && isMoxie.disabled == false) MoxieMulti = 2;
	
	//let rawDamage = Math.max(((attackerStatValue + power)/2 - defenderStats.baseDef*defenceScale),1);
	let rawDamage = Math.max(((attackerStatValue + power)/2 - parseInt($("defender-def").value)*defenceScale),1);
	let totalDamage = rawDamage*RandMulti*defenceMultiplier*elementResist*critMultiplier*MoxieMulti;
	let minTotalDamage = rawDamage*0.9*defenceMultiplier*elementResist*critMultiplier*MoxieMulti;
	let maxTotalDamage = rawDamage*1.1*defenceMultiplier*elementResist*critMultiplier*MoxieMulti;
	//console.log("Raw Damage: ", rawDamage)
	totalDamage = Math.floor(totalDamage) ;
	$("DamageOutput").innerText = `Minimum Damage: ${minTotalDamage}\nMaximum Damage: ${maxTotalDamage}\nRandom Damage: ${totalDamage}`;
	//$('HitsDiv').innerText = Math.ceil(defenderStats.baseHp / totalDamage);
	$('HitsDiv').innerText = Math.ceil(parseInt($("defender-hp").value) / totalDamage);
}

function loadYokaiList(yokais, attackerMng, defenderMng) {
    const defenderContainer = $('defender-div');
    const attackerContainer = $('attacker-div');

    let defenderHTML = '';
    let attackerHTML = '';
	
	const sortedEntries = Object.entries(yokais)
    .filter(([, yokai]) => yokai.InMedallium === 1 && yokai.LegalAlliances != 0)
    .sort((a, b) => a[1].MedalliumOffset - b[1].MedalliumOffset);

    for (const [key, yokai] of sortedEntries) {
		
		//console.debug(key, yokai);

        const stats = calculateStats({yokaiData: yokai});

        const imgSrc = `Content/Graphics/YokaiMedals/y${String(yokai.MedalPosX + yokai.MedalPosY * 23).padStart(3, '0')}.webp`;

        const medalId = String(yokai.MedalliumOffset).padStart(3, '0');
        const name = yokai.Name;
        const hp = Math.round(stats.baseHp);
        const str = Math.round(stats.baseStr);
        const spr = Math.round(stats.baseSpr);
        const def = Math.round(stats.baseDef);
        const spd = Math.round(stats.baseSpd);

        const itemHTML = `
            <div class="MiniYokaiInfo-div" style="width:93%;height:120px;margin:5px;border:1px solid #c6c0ff;display:flex;justify-content:flex-start;align-items:center;flex-direction:row;flex-wrap:wrap;">
                <div style="width:12%;justify-self:center;">NO. ${medalId}</div>
                <img class="defender-list-img" src="${imgSrc}" alt="${name}" style="cursor:pointer;width:50px;height:auto;" data-role="defender" data-yokai-key="${key}">
                <div style="width:12%;justify-self:center;" paramID="${key}">${name}</div>
                <div style="width:12%;justify-self:center;">HP:${hp}</div>
                <div style="width:12%;justify-self:center;">STR:${str}</div>
                <div style="width:12%;justify-self:center;">SPR:${spr}</div>
                <div style="width:12%;justify-self:center;">DEF:${def}</div>
                <div style="width:12%;justify-self:center;">SPD:${spd}</div>
            </div>
        `;

        defenderHTML += itemHTML;
        let attackerItemHTML = itemHTML
            .replace(/defender-list-img/g, 'attacker-list-img')
            .replace(/data-role="defender"/g, 'data-role="attacker"');
        attackerHTML += attackerItemHTML;
    }

    defenderContainer.innerHTML = defenderHTML;
    attackerContainer.innerHTML = attackerHTML;

    defenderContainer.querySelectorAll('.defender-list-img').forEach(img => {
        img.addEventListener('click', function(e) {
            const key = this.dataset.yokaiKey;
            const yokai = yokais[key];
            if (yokai) {
                setYokaiData(yokai, defenderMng);
            } else {
                console.warn('Defender: Yokai not found for key', key);
            }
        });
    });

    attackerContainer.querySelectorAll('.attacker-list-img').forEach(img => {
        img.addEventListener('click', function(e) {
            const key = this.dataset.yokaiKey;
            const yokai = yokais[key];
            if (yokai) {
                setYokaiData(yokai, attackerMng);
            } else {
                console.warn('Attacker: Yokai not found for key', key);
            }
        });
    });

    const defaultYokai = yokais['0x79F3AA36'];
    if (defaultYokai) {
        setYokaiData(defaultYokai, defenderMng);
        setYokaiData(defaultYokai, attackerMng);
    }
}

class YokaiStatsManager {
	constructor({yokaiData, side = `defender`}) {
    this.yokaiData = yokaiData;
    this.level = 60;
    this.ivs = { hp: 16, str: 8, spr: 8, def: 8, spd: 8 };
    this.gym = { str: 0, spr: 0, def: 0, spd: 0 };
    this.attitudeIndex = 0;
    this.evs = { hp: 0, str: 0, spr: 0, def: 0, spd: 0 };
	this.side = side;
	}
	
	getStats() {
		return calculateStats({
			yokaiData: this.yokaiData, lvl: this.level,

			ivHp: this.ivs.hp, ivStr: this.ivs.str, ivSpr: this.ivs.spr, ivDef: this.ivs.def, ivSpd: this.ivs.spd,

			gymStr: this.gym.str, gymSpr: this.gym.spr, gymDef: this.gym.def, gymSpd: this.gym.spd, 

			evHp: this.evs.hp, evStr: this.evs.str, evSpr: this.evs.spr, evDef: this.evs.def, evSpd: this.evs.spd
		});
	}

	updateIV(stat, value) {
		const num = parseInt(value, 10);
		if (isNaN(num) || num < 0 || ((3 >= num || num > 16) && stat != "hp") || ((6 >= num || num > 31) && stat == "hp")) return null; // (IV can't be higher than 16 legally and can't be lower than 3 in comp, though possible in game)
		this.ivs[stat] = num;
		this.onUpdate();
	}
	updateEV(stat, value) {
		const num = parseInt(value, 10);
		if (isNaN(num) || num < 0) return null;
		this.evs[stat] = num;
		this.onUpdate();
	}
	updateGym(stat, value) {
		const num = parseInt(value, 10);
		if (isNaN(num) || num < 0 || num > 5) return null; // Yokai can have only 5 Gym Trainings
		this.gym[stat] = num;
		this.onUpdate();
	}
	updateLevel(value) {
		const num = parseInt(value, 10);
		if (isNaN(num) || num < 0 || num > 255) return 60; // Added 255 level cap since it's max level value in the game
		this.level = num;
		this.onUpdate();
	}

	onUpdate() {
		const stats = this.getStats();
		updateDisplay({
			side: this.side, 
			name: this.yokaiData.Name, 
			posX: this.yokaiData.MedalPosX, 
			posY: this.yokaiData.MedalPosY, 
			baseHp: stats.baseHp, 
			baseStr: stats.baseStr, 
			baseSpr: stats.baseSpr, 
			baseDef: stats.baseDef, 
			baseSpd: stats.baseSpd
		});
		validateAndStyleInputs(this);
	}
};

function setupEventListeners(){
	const attackerManager = new YokaiStatsManager({ yokaiData: yokaiDatabase["0x79F3AA36"], side: 'attacker' });
	const defenderManager = new YokaiStatsManager({ yokaiData: yokaiDatabase["0x79F3AA36"], side: 'defender' });
	const moveTypeInput = $("move-type");
	let selectedDatabase = attackDatabase;
	
	loadYokaiList(yokaiDatabase, attackerManager, defenderManager);
		
	moveTypeInput.addEventListener('change', function(event){
		if (moveTypeInput.value == "soultimate") $("isMoxie").disabled = false;
		else $("isMoxie").disabled = true;
		switch (moveTypeInput.value){
			case "AttackID":
				selectedDatabase = attackDatabase;
				break;
			case "TechniqueID":
				selectedDatabase = techniqueDatabase;
				break;
			case "SoultimateBtlCommandID":
				selectedDatabase = soultimateDatabase;
				break;
			default:
				selectedDatabase = attackDatabase;
		}
	});
	
	
	$("calcButton").addEventListener("click", () => getAttack({
		moveData: selectedDatabase[attackerManager.yokaiData[moveTypeInput.value]], 
		yokaiAttackerData: attackerManager, 
		yokaiDefenderData: defenderManager}));
		
	$('defender-lvl-input').addEventListener('input', function(e) {
		defenderManager.updateLevel(this.value);
	});
	
	$('attacker-lvl-input').addEventListener('input', function(e) {
		attackerManager.updateLevel(this.value);
	});


	document.querySelectorAll('.defender-IV').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('defender-iv-', '').toLowerCase();
		  defenderManager.updateIV(stat, this.value);
		});
	});
	
	document.querySelectorAll('.defender-gym').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('defender-gym-', '').toLowerCase();
		  defenderManager.updateGym(stat, this.value);
		});
	});
	
	document.querySelectorAll('.defender-EV').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('defender-ev-', '').toLowerCase();
		  defenderManager.updateEV(stat, this.value);
		});
	})
	
	document.querySelectorAll('.attacker-IV').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('attacker-iv-', '').toLowerCase();
		  attackerManager.updateIV(stat, this.value);
		});
	});
	
	document.querySelectorAll('.attacker-gym').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('attacker-gym-', '').toLowerCase();
		  attackerManager.updateGym(stat, this.value);
		});
	});
	
	document.querySelectorAll('.attacker-EV').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('attacker-ev-', '').toLowerCase();
		  attackerManager.updateEV(stat, this.value);
		});
	})
};

const elementList = [
	"None",
	"Fire",
	"Water",
	"Lightning",
	"Earth",
	"Ice",
	"Wind",
	"Drain"
];

window.addEventListener('load', function (){
	//yokaiDatabase;
	//(STRorSPR/2 + BP/2)*0.9or1.1*ElementalWeaknessResistance*SkillMultiplier*Guard
	
    console.log("All databases loaded. Initializing game...");
	setupEventListeners();
});