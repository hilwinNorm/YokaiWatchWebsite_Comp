
var pathDatabase = "Content/JS/Databases/";

var Path_Medal = 'Content/Graphics/YokaiMedals/';

const Databases = ['YoKaiDataBase.js', 'AttackDatabase.js', 'TechniqueDatabase.js', 'SoultimateDatabase.js']

function loadScripts(scripts, callback) {
    const promises = scripts.map(name => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            // Ensure pathDatabase is defined globally or passed in
            script.src = pathDatabase + name;
            script.async = true;

            script.onload = () => {
                console.log(`${name} loaded successfully.`);
                resolve();
            };

            // Capture the error event object
            script.onerror = (event) => {
                const errorMsg = `Error loading script: ${name}`;
                console.error(errorMsg, {
                    url: script.src,
                    event: event // This contains the technical details of the failure
                });
                reject(new Error(errorMsg));
            };
			//console.log(script)
            document.head.appendChild(script);
        });
    });

    Promise.all(promises)
        .then(() => {
            if (callback) callback();
        })
        .catch(err => {
            console.error("Script batch failed:", err.message, err.stack);
        });
}

function CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, LVL, STR_Gym=0, SPR_Gym=0, DEF_Gym=0, SPD_Gym=0, HP_EV=0, STR_EV=0, SPR_EV=0, DEF_EV=0, SPD_EV=0) {
    if (LVL == NaN || LVL > 99 || LVL <= 0) {
        LVL = 60
    }
	LVL=parseInt(LVL)
	
    var BHP = yokai.baseA_HP + (yokai.baseB_HP - yokai.baseA_HP + parseInt(HP_IV)*2) * (LVL - 1) / 98 + HP_EV * (1+LVL/198);
    var BSTR = yokai.baseA_Strength + (yokai.baseB_Strength - yokai.baseA_Strength + parseInt(STR_IV)) * (LVL - 1) / 98 + STR_EV * (1+LVL/198) + (parseInt(STR_Gym)*5);
    var BSPR = yokai.baseA_Spirit + (yokai.baseB_Spirit - yokai.baseA_Spirit + parseInt(SPR_IV)) * (LVL - 1) / 98 + SPR_EV * (1+LVL/198) + (parseInt(SPR_Gym)*5);
    var BDEF = yokai.baseA_Defense + (yokai.baseB_Defense - yokai.baseA_Defense + parseInt(DEF_IV)) * (LVL - 1) / 98 + DEF_EV * (1+LVL/198) + (parseInt(DEF_Gym)*5) - (parseInt(STR_Gym)*2) - (parseInt(SPD_Gym)*2);
    var BSPD = yokai.baseA_Speed + (yokai.baseB_Speed - yokai.baseA_Speed + parseInt(SPD_IV)) * (LVL - 1) / 98 + SPD_EV * (1+LVL/198) + (parseInt(SPD_Gym)*5) - (parseInt(SPR_Gym)*2) - (parseInt(DEF_Gym)*2);
	return [BHP, BSTR, BSPR, BDEF, BSPD]
}

let Defender = document.getElementById("yokai_select1")
let DefenderHP = document.getElementById("yokai_select1-HP")
let DefenderSTR = document.getElementById("yokai_select1-STR")
let DefenderSPR = document.getElementById("yokai_select1-SPR")
let DefenderDEF = document.getElementById("yokai_select1-DEF")
let DefenderSPD = document.getElementById("yokai_select1-SPD")
let DefenderLVL = document.getElementById("yokai_select1-LVL")
let DefenderEV = document.getElementById("yokai_select1-Attitude")
let DefenderEV_Div = document.getElementById("yokai_select1-Attitude_display")

let DefenderSTR_Gym_Input = document.getElementById("yokai_select1-STR_Gym")
let DefenderSPR_Gym_Input = document.getElementById("yokai_select1-SPR_Gym")
let DefenderDEF_Gym_Input = document.getElementById("yokai_select1-DEF_Gym")
let DefenderSPD_Gym_Input = document.getElementById("yokai_select1-SPD_Gym")

var DefenderSTR_Gym = 0;
var DefenderSPR_Gym = 0;
var DefenderDEF_Gym = 0;
var DefenderSPD_Gym = 0;


var DefenderHP_IV = 8;
var DefenderSTR_IV = 8;
var DefenderSPR_IV = 8;
var DefenderDEF_IV = 8;
var DefenderSPD_IV = 8;

let Attacker = document.getElementById("yokai_select2")
let AttackerHP = document.getElementById("yokai_select2-HP")
let AttackerSTR = document.getElementById("yokai_select2-STR")
let AttackerSPR = document.getElementById("yokai_select2-SPR")
let AttackerDEF = document.getElementById("yokai_select2-DEF")
let AttackerSPD = document.getElementById("yokai_select2-SPD")
let AttackerLVL = document.getElementById("yokai_select2-LVL")
let AttackerEV = document.getElementById("yokai_select2-Attitude")
let AttackerEV_Div = document.getElementById("yokai_select2-Attitude_display")

let ATK_IVInput = document.getElementsByClassName("ATK_IV")

let DEF_IVInput = document.getElementsByClassName("DEF_IV")

let ATK_GymInput = document.getElementsByClassName("ATK_Gym")

let DEF_GymInput = document.getElementsByClassName("DEF_Gym")

var AttackerSTR_Gym = 0;
var AttackerSPR_Gym = 0;
var AttackerDEF_Gym = 0;
var AttackerSPD_Gym = 0;

var AttackerHP_IV = 8;
var AttackerSTR_IV = 8;
var AttackerSPR_IV = 8;
var AttackerDEF_IV = 8;
var AttackerSPD_IV = 8;

let AttackType = document.getElementById("AttackType");
let DamageOutput = document.getElementById("DamageOutput");
let Defending = document.getElementById('isDefending');
let isCrit = document.getElementById("isCrit");
let isMoxie = document.getElementById('isMoxie');
let HitsDiv = document.getElementById('HitsDiv');

let DefenderImg = document.getElementById("DefenderImg");
let AttackerImg = document.getElementById("AttackerImg");
let DefenderName = document.getElementById("DefenderName");
let AttackerName = document.getElementById("AttackerName");

const CalcButton = document.getElementById("calcButton");

function getRandomNumberWithTwoDecimals() {
  const min = 0.9;
  const max = 1.1;
  const range = max - min;
  const randomValue = Math.random() * range + min;
  return parseFloat(randomValue.toFixed(2));
}

function getAttack(Attack){
	var yokaiData = Defender.value;
	//console.log("Yokai: ",yokaiData)
	var Power = parseInt(Attack.Lv10_power);
	var ElementalResistance=1;
	var Attack;
	var ChosenAttackStat;
	var Hit_amount = "";
	var Crit = 1;
	var Defence = parseInt(DefenderDEF.value)+parseInt(Attitudes[DefenderEV.value].boost[3]);
	if (AttackType.value == "1"){
		
		ChosenAttackStat = parseInt(AttackerSTR.value)+parseInt(Attitudes[DefenderEV.value].boost[1]);
		Hit_amount = Attack.N_Hits;
		
	}
	else if (AttackType.value == "2"){
		ChosenAttackStat = parseInt(AttackerSPR.value)+parseInt(Attitudes[DefenderEV.value].boost[2]);
		let Element = Attack.Element;
		console.log(Element)
		
		ElementalResistance = yokaiData[`AttributeDamage${Element}`]
		
		Hit_amount = 1;
	}
	else if (AttackType.value == "3"){
		ChosenAttackStat = parseInt(AttackerSTR.value)+parseInt(Attitudes[DefenderEV.value].boost[1]);
		if (Attack.Element !== null){
			ChosenAttackStat = parseInt(AttackerSPR.value)+parseInt(Attitudes[DefenderEV.value].boost[2]);
			let Element = Attack.element_type;
		console.log(Element)
		ElementalResistance = yokaiData[`AttributeDamage${Element}`]
		}
		Hit_amount = Attack.N_Hits;		
	}
		
		RandMulti = getRandomNumberWithTwoDecimals();
		
		let DefenceMulti = 1;
		
		if (Defending.checked == true){
			DefenceMulti = 0.5
		}
		
		console.log("---")
		console.log("STR or SPR ",ChosenAttackStat)
		console.log("Power ",Power)
		console.log("Defence ",Math.round(Defence))
		console.log("Random Multiplier ",RandMulti)
		console.log("Hit amount ", Hit_amount)
		console.log("---")
		
		var Damage;
		var RawDamage;
		if (isCrit.checked == true){
			Defence = 0;
			Crit = 1.25
		}
		
		let MoxieMulti = 1;
		
		if (isMoxie.checked == true && isMoxie.disabled == false){
			MoxieMulti = 2;
		}
		
		RawDamage = Math.max((ChosenAttackStat/2 + Power/2 - Defence/4),1)
		console.log("Raw Damage: ", RawDamage)
		Damage = (RawDamage*RandMulti*DefenceMulti*ElementalResistance*Crit*MoxieMulti)
		Damage = Math.round(Damage) 
		DamageOutput.innerHTML = Damage;
		console.log(Damage)
		console.log(DefenderEV_Div)
		DetermineHitAmount(Damage, parseInt(DefenderHP.value)+parseInt(Attitudes[DefenderEV.value].boost[0]))
}

function DetermineHitAmount(Damage, DefenderHealth){
	console.log(Damage)
	console.log(DefenderHealth)
	let Amount = Math.ceil(DefenderHealth / Damage)
	HitsDiv.innerHTML = Amount;
}

function SetAttackerData(yokaiDatabase){
	var AttackerValue = Attacker.value;
	
	console.log(Attacker.value, yokaiDatabase)
	
	AttackerImg.src = Path_Medal+AttackerValue.Medallium_Image;
	AttackerName.innerText = AttackerValue.Name;
	
			
	let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(AttackerValue, ATK_IVInput[0].value, ATK_IVInput[1].value, ATK_IVInput[2].value, ATK_IVInput[3].value, ATK_IVInput[4].value, AttackerLVL.value, ATK_GymInput[0].value, ATK_GymInput[1].value, ATK_GymInput[2].value, ATK_GymInput[3].value, Attitudes[AttackerEV.value].boost[0], Attitudes[AttackerEV.value].boost[1], Attitudes[AttackerEV.value].boost[2], Attitudes[AttackerEV.value].boost[3], Attitudes[AttackerEV.value].boost[4])
	
	console.log("Attacker Stats: ",[BHP, BSTR, BSPR, BDEF, BSPD])
	
	AttackerHP.value = Math.round(BHP)
	AttackerSTR.value = Math.round(BSTR);
	AttackerSPR.value = Math.round(BSPR);
	AttackerDEF.value = Math.round(BDEF);
	AttackerSPD.value = Math.round(BSPD);
}

function SetDefenderData(yokaiDatabase){
	var DefenderValue = Defender.value;
	
	DefenderImg.src = Path_Medal+DefenderValue.Medallium_Image;
	DefenderName.innerText = DefenderValue.Name;
			
	let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(DefenderValue, DEF_IVInput[0].value, DEF_IVInput[1].value, DEF_IVInput[2].value, DEF_IVInput[3].value, DEF_IVInput[4].value, DefenderLVL.value, DEF_GymInput[0].value, DEF_GymInput[1].value, DEF_GymInput[2].value, DEF_GymInput[3].value, Attitudes[DefenderEV.value].boost[0], Attitudes[DefenderEV.value].boost[1], Attitudes[DefenderEV.value].boost[2], Attitudes[DefenderEV.value].boost[3], Attitudes[DefenderEV.value].boost[4])
		
	DefenderHP.value = Math.round(BHP)	
	DefenderSTR.value = Math.round(BSTR);
	DefenderSPR.value = Math.round(BSPR);
	DefenderDEF.value = Math.round(BDEF);
	DefenderSPD.value = Math.round(BSPD);
}

function CheckIV(){
	let DEFsum=0;
	let ATKsum=0;
	let DEFflag = 0;
	let ATKflag = 0;
	for (const element of DEF_IVInput) {
		if (parseInt(element.value) < 0){
			DEFflag = 1;
		}
		DEFsum+=parseInt(element.value);
	}
	for (const element of ATK_IVInput) {
		if (parseInt(element.value) < 0){
			ATKflag = 1;
		}
		ATKsum+=parseInt(element.value);
	}
	if (ATKsum != 40 || ATKflag == 1){
		for (const element of ATK_IVInput) {
		element.style.color =  "red"
		}
	}
	else{
		for (const element of ATK_IVInput) {
		element.style.color =  "var(--side-buttons-color)"
		}
	}
	if (DEFsum != 40 || DEFflag == 1){
		for (const element of DEF_IVInput) {
		element.style.color =  "red"
		}
	}
	else{
		for (const element of DEF_IVInput) {
		element.style.color =  "var(--side-buttons-color)"
		}
	}
	SetAttackerData(yokaiDatabase)
	SetDefenderData(yokaiDatabase)
}

function CheckGymStat(){
	let DEFsum=0;
	let ATKsum=0;
	for (const element of DEF_GymInput) {
		DEFsum+=parseInt(element.value);
	}
	for (const element of ATK_GymInput) {
		ATKsum+=parseInt(element.value);
	}
	if (DEFsum > 5){
		for (const element of DEF_GymInput) {
		element.style.color =  "red"
		}
	}else{
		for (const element of DEF_GymInput) {
		element.style.color =  "var(--side-buttons-color)"
		}
	}
	if (ATKsum > 5){
		for (const element of ATK_GymInput) {
		element.style.color =  "red"
		}
	}else{
		for (const element of ATK_GymInput) {
		element.style.color =  "var(--side-buttons-color)"
		}
	}
	SetAttackerData(yokaiDatabase)
	SetDefenderData(yokaiDatabase)
}

function loadDatabase(yokais) {
	var defender_list = [];
	var attacker_list = [];
	defender_list.length = Object.keys(yokais).length;
	attacker_list.length = Object.keys(yokais).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,yokai] of Object.entries(yokais)) {
		if (legalCheck(yokai)==false){continue;}
		const ID = document.createElement("div");
		const divName = document.createElement("div")
		const divMain = document.createElement("div");
		const img = document.createElement("img");
		const Div_HP = document.createElement("div");
		const Div_STR = document.createElement("div");
		const Div_SPR = document.createElement("div");
		const Div_DEF = document.createElement("div");
		const Div_SPD = document.createElement("div");
		
		var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, 8, 8, 8, 8, 8, 60)
		
		divName.innerHTML = yokai.Name
		divName.id = "div-name"
		divName.setAttribute("paramID", key)
		divName.style = `width: 12%; justify-self: center;`
		ID.innerHTML = "NO. "+(yokai.MedalliumOffset).toString().padStart(3,'0')
		divMain.className = "MiniYokaiInfo-div"
		divMain.style = `width: 93%;
		height: 120px;
		margin: 5px;
		border: 1px solid #c6c0ff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		flex-direction: row;
		flex-wrap: wrap;`
		if (yokai.Medallium_Image){
			img.src = Path_Medal+yokai.Medallium_Image;
		}
		else{
			img.src = Path_Medal+"Unknown.webp";
		}
		img.alt = yokai.Name;
		img.style = "cursor: pointer; width: 50px; height: auto"
		Div_HP.innerHTML = "HP:"+Math.round(BHP);
		Div_HP.style = `width: 12%; justify-self: center;`
		Div_STR.innerHTML = "STR:"+Math.round(BSTR);
		Div_STR.style = `width: 12%; justify-self: center;`
		Div_SPR.innerHTML = "SPR:"+Math.round(BSPR);
		Div_SPR.style = `width: 12%; justify-self: center;`
		Div_DEF.innerHTML = "DEF:"+Math.round(BDEF);
		Div_DEF.style = `width: 12%; justify-self: center;`
		Div_SPD.innerHTML = "SPD:"+Math.round(BSPD);
		Div_SPD.style = `width: 12%; justify-self: center;`
		divMain.appendChild(ID);
		divMain.appendChild(img)
		divMain.appendChild(divName);
		divMain.appendChild(Div_HP);
		divMain.appendChild(Div_STR);
		divMain.appendChild(Div_SPR);
		divMain.appendChild(Div_DEF);
		divMain.appendChild(Div_SPD);
		
		img.onclick = () => {
			Defender.value = yokai;
			SetDefenderData(yokaiDatabase)
		}
		defender_list[parseInt(yokai.MedalliumOffset)] = divMain;
		
		var divMainClone = divMain.cloneNode(true);
		
		divMainClone.getElementsByTagName('img')[0].onclick = () =>{
			Attacker.value = yokai;
			SetAttackerData(yokaiDatabase)
		}
		
		attacker_list[parseInt(yokai.MedalliumOffset)] = divMainClone;
		
	}
	for (i=0; i < defender_list.length; i++){
	if (defender_list[i] !== undefined){
		Defender.appendChild(defender_list[i])
	}
	}
	for (i=0; i < attacker_list.length; i++){
	if (attacker_list[i] !== undefined){
		Attacker.appendChild(attacker_list[i])
	}
	}
	Defender.value=yokaiDatabase["0x79F3AA36"];
	SetDefenderData(yokaiDatabase)
	Attacker.value=yokaiDatabase["0x79F3AA36"];
	SetAttackerData(yokaiDatabase)
}


loadScripts(Databases, () => {
	//yokaiDatabase;
    console.log("All databases loaded. Initializing game...");
	if (Defender){
		for (i = 0; i < Attitudes.length; i++){
			const option = `
			<option value="${i}">${Attitudes[i].name}</option>
			`
			DefenderEV.innerHTML += option;
			AttackerEV.innerHTML += option;
		}
		loadDatabase(yokaiDatabase);
		
	//(STRorSPR/2 + BP/2)*0.9or1.1*ElementalWeaknessResistance*SkillMultiplier*Guard 
	
	Attacker.addEventListener('change', function(event) { 
		SetAttackerData(yokaiDatabase)
		})
	
	Defender.addEventListener('change', function(event) {
		SetDefenderData(yokaiDatabase)
	})
	
	DefenderLVL.addEventListener('input', function(event){
		SetDefenderData(yokaiDatabase)
	})
	
	AttackerLVL.addEventListener('input', function(event){
		SetAttackerData(yokaiDatabase)
	})
	
	
	for (const element of ATK_IVInput) {
        element.addEventListener('input', function(event){
		CheckIV()
    })
	}
	
	for (const element of DEF_IVInput) {
        element.addEventListener('input', function(event){
		CheckIV()
    })
	}
	
	for (const element of ATK_GymInput) {
        element.addEventListener('input', function(event){
		CheckGymStat()
    })
	}
	
	for (const element of DEF_GymInput) {
        element.addEventListener('input', function(event){
		CheckGymStat()
    })
	}
	
	DefenderEV.addEventListener('change', function(event){
		DefenderEV_Div.innerHTML = 'HP Boost:'+Attitudes[DefenderEV.value].boost[0]+' | STR Boost:'+Attitudes[DefenderEV.value].boost[1]+' | SPR Boost:'+Attitudes[DefenderEV.value].boost[2]+' | DEF Boost:'+Attitudes[DefenderEV.value].boost[3]+' | SPD Boost:'+Attitudes[DefenderEV.value].boost[4]
		SetDefenderData(yokaiDatabase)
	})
	AttackerEV.addEventListener('change', function(event){
		AttackerEV_Div.innerHTML = 'HP Boost:'+Attitudes[AttackerEV.value].boost[0]+' | STR Boost:'+Attitudes[AttackerEV.value].boost[1]+' | SPR Boost:'+Attitudes[AttackerEV.value].boost[2]+' | DEF Boost:'+Attitudes[AttackerEV.value].boost[3]+' | SPD Boost:'+Attitudes[AttackerEV.value].boost[4]
		SetAttackerData(yokaiDatabase)
	})
	
	AttackerEV.value = "3";
	DefenderEV.value = "3";
	
	AttackerEV_Div.innerHTML = 'HP Boost:'+Attitudes[AttackerEV.value].boost[0]+' | STR Boost:'+Attitudes[AttackerEV.value].boost[1]+' | SPR Boost:'+Attitudes[AttackerEV.value].boost[2]+' | DEF Boost:'+Attitudes[AttackerEV.value].boost[3]+' | SPD Boost:'+Attitudes[AttackerEV.value].boost[4]
	
	DefenderEV_Div.innerHTML = 'HP Boost:'+Attitudes[DefenderEV.value].boost[0]+' | STR Boost:'+Attitudes[DefenderEV.value].boost[1]+' | SPR Boost:'+Attitudes[DefenderEV.value].boost[2]+' | DEF Boost:'+Attitudes[DefenderEV.value].boost[3]+' | SPD Boost:'+Attitudes[DefenderEV.value].boost[4]
	
	AttackType.addEventListener('change', function(event){
		if (AttackType.value == "3"){
			isMoxie.disabled = false;
		}
		else{
			isMoxie.disabled = true;
		}
	})

	CalcButton.addEventListener("click", () =>{
		yokai = Attacker.value
		
		if (AttackType.value == "1"){
		getAttack(attackDatabase[yokai.AttackID])
		}
		else if (AttackType.value == "2"){
			getAttack(techniqueDatabase[yokai.TechniqueID])
		}
		else if(AttackType.value == "3"){
			getAttack(soultimateDatabase[yokai.SoultimateID])
		}
		
	});

	}

});