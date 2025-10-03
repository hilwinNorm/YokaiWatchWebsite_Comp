
let Defender = document.getElementById("yokai_select1")
let DefenderHP = document.getElementById("yokai_select1-HP")
let DefenderSTR = document.getElementById("yokai_select1-STR")
let DefenderSPR = document.getElementById("yokai_select1-SPR")
let DefenderDEF = document.getElementById("yokai_select1-DEF")
let DefenderSPD = document.getElementById("yokai_select1-SPD")
let DefenderLVL = document.getElementById("yokai_select1-LVL")
let DefenderEV = document.getElementById("yokai_select1-Attitude")
let DefenderEV_Div = document.getElementById("yokai_select1-Attitude_display")

let DefenderHP_IV_Input = document.getElementById("yokai_select1-IV_HP")
let DefenderSTR_IV_Input = document.getElementById("yokai_select1-IV_STR")
let DefenderSPR_IV_Input = document.getElementById("yokai_select1-IV_SPR")
let DefenderDEF_IV_Input = document.getElementById("yokai_select1-IV_DEF")
let DefenderSPD_IV_Input = document.getElementById("yokai_select1-IV_SPD")

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

let AttackerHP_IV_Input = document.getElementById("yokai_select2-IV_HP")
let AttackerSTR_IV_Input = document.getElementById("yokai_select2-IV_STR")
let AttackerSPR_IV_Input = document.getElementById("yokai_select2-IV_SPR")
let AttackerDEF_IV_Input = document.getElementById("yokai_select2-IV_DEF")
let AttackerSPD_IV_Input = document.getElementById("yokai_select2-IV_SPD")

let AttackerSTR_Gym_Input = document.getElementById("yokai_select2-STR_Gym")
let AttackerSPR_Gym_Input = document.getElementById("yokai_select2-SPR_Gym")
let AttackerDEF_Gym_Input = document.getElementById("yokai_select2-DEF_Gym")
let AttackerSPD_Gym_Input = document.getElementById("yokai_select2-SPD_Gym")

var AttackerSTR_Gym = 0;
var AttackerSPR_Gym = 0;
var AttackerDEF_Gym = 0;
var AttackerSPD_Gym = 0;

var AttackerHP_IV = 8;
var AttackerSTR_IV = 8;
var AttackerSPR_IV = 8;
var AttackerDEF_IV = 8;
var AttackerSPD_IV = 8;

let AttackType = document.getElementById("AttackType")
let DamageOutput = document.getElementById("DamageOutput")
let Defending = document.getElementById('isDefending')
let isCrit = document.getElementById("isCrit")
let isMoxie = document.getElementById('isMoxie')
let HitsDiv = document.getElementById('HitsDiv')

let DefenderImg = document.getElementById("DefenderImg")
let AttackerImg = document.getElementById("AttackerImg")

const CalcButton = document.getElementById("calcButton")

function getRandomNumberWithTwoDecimals() {
  const min = 0.9;
  const max = 1.1;
  const range = max - min;
  const randomValue = Math.random() * range + min;
  return parseFloat(randomValue.toFixed(2));
}

function getAttack(Attack){
	console.log(Attack)
	var Power = parseInt(Attack.Lv10_power);
	var ElementalResistance=1;
	var Attack;
	var ChosenAttackStat;
	var Hit_amount = "";
	var Crit = 1;
	var Defence = parseInt(DefenderDEF.value)+parseInt(Attitudes[DefenderEV.value].boost[3]);
	if (AttackType.value == "1"){
		//Attack = localStorage.getItem("_trans_attacker_yokai_move_data");
		//Attack = JSON.parse(atob(Attack));
		
		ChosenAttackStat = parseInt(AttackerSTR.value)+parseInt(Attitudes[DefenderEV.value].boost[1]);
		Hit_amount = Attack.N_Hits;
		
	}
	else if (AttackType.value == "2"){
		//Attack = localStorage.getItem("_trans_attacker_yokai_technique_data");
		//Attack = JSON.parse(atob(Attack));
		ChosenAttackStat = parseInt(AttackerSPR.value)+parseInt(Attitudes[DefenderEV.value].boost[2]);
		let Element = Attack.Element;
		console.log(Element)
		if (Element="Fire"){
			ElementalResistance = yokais[Defender.value].Fire
		}
		else if (Element="Water"){
			ElementalResistance = yokais[Defender.value].Water
		}
		else if (Element="Lightning"){
			ElementalResistance = yokais[Defender.value].Lightning
		}
		else if (Element="Earth"){
			ElementalResistance = yokais[Defender.value].Earth
		}
		else if (Element="Wind"){
			ElementalResistance = yokais[Defender.value].Wind
		}
		else if (Element="Ice"){
			ElementalResistance = yokais[Defender.value].Ice
		}
		Hit_amount = 1;
	}
	else if (AttackType.value == "3"){
		ChosenAttackStat = parseInt(AttackerSTR.value)+parseInt(Attitudes[DefenderEV.value].boost[1]);
		if (Attack.Element !== null){
			ChosenAttackStat = parseInt(AttackerSPR.value)+parseInt(Attitudes[DefenderEV.value].boost[2]);
			let Element = Attack.element_type;
		console.log(Element)
		if (Element="Fire"){
			ElementalResistance = yokais[Defender.value].Fire
		}
		else if (Element="Water"){
			ElementalResistance = yokais[Defender.value].Water
		}
		else if (Element="Lightning"){
			ElementalResistance = yokais[Defender.value].Lightning
		}
		else if (Element="Earth"){
			ElementalResistance = yokais[Defender.value].Earth
		}
		else if (Element="Wind"){
			ElementalResistance = yokais[Defender.value].Wind
		}
		else if (Element="Ice"){
			ElementalResistance = yokais[Defender.value].Ice
		}
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
		if (Attack.target == 2){
			Defence = 0;
			DamageOutput.style.color ="green";
			DefenceMulti = 1;
			Crit = 1;
		}else{
			DamageOutput.style.color ="red";
		}
		
		RawDamage = (ChosenAttackStat/2 + Power/2 - Defence/4)
		if (RawDamage < 1){
			RawDamage = 1;	
		}
		Damage = (RawDamage*RandMulti*DefenceMulti*ElementalResistance*Crit*MoxieMulti)*Hit_amount
		Damage = Math.round(Damage) 
		DamageOutput.innerHTML = Damage;
		console.log(Damage)
		console.log(DefenderEV_Div)
		console.log(Attitudes[DefenderEV_Div.value])
		DetermineHitAmount(Damage, parseInt(DefenderHP.value)+parseInt(Attitudes[DefenderEV.value].boost[0]))
}

function DetermineHitAmount(Damage, DefenderHealth){
	console.log(Damage)
	console.log(DefenderHealth)
	let Amount = Math.ceil(DefenderHealth / Damage)
	HitsDiv.innerHTML = Amount;
}

function SetAttackerData(HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym){
	var AttackerName = Attacker.value;
	
	for (i=0;i<yokais.length;i++){
		if (Attacker.value == yokais[i].name){
			AttackerImg.src = 'Content/Graphics/Yo kai Medals/'+yokais[i].image
			AttackerName = yokais[i]
			break;
		}
	}
	let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(AttackerName, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, parseInt(AttackerLVL.value), STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym)
	
	AttackerHP.value = Math.round(BHP)
	AttackerSTR.value = Math.round(BSTR);
	AttackerSPR.value = Math.round(BSPR);
	AttackerDEF.value = Math.round(BDEF);
	AttackerSPD.value = Math.round(BSPD);
}

function SetDefenderData(HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym){
	var DefenderName = Defender.value;
	
	for (i=0;i<yokais.length;i++){
		if (Defender.value == yokais[i].name){
			DefenderImg.src = 'Content/Graphics/Yo kai Medals/'+yokais[i].image
			DefenderName = yokais[i]
			break;
		}
	}
	let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(DefenderName, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, parseInt(DefenderLVL.value), STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym)
		
	DefenderHP.value = Math.round(BHP)	
	DefenderSTR.value = Math.round(BSTR);
	DefenderSPR.value = Math.round(BSPR);
	DefenderDEF.value = Math.round(BDEF);
	DefenderSPD.value = Math.round(BSPD);
}

function CheckIV(){
	if ((parseInt(AttackerHP_IV_Input.value) + parseInt(AttackerSTR_IV_Input.value) + parseInt(AttackerSPR_IV_Input.value) + parseInt(AttackerDEF_IV_Input.value) + parseInt(AttackerSPD_IV_Input.value)) != 40){
		ATK_IVInput.style.color =  "red"
	}
	else{
		ATK_IVInput.style.color =  "black"
	}
	if ((parseInt(DefenderHP_IV_Input.value) + parseInt(DefenderSTR_IV_Input.value) + parseInt(DefenderSPR_IV_Input.value) + parseInt(DefenderDEF_IV_Input.value) + parseInt(DefenderSPD_IV_Input.value)) != 40){
		DEF_IVInput.style.color =  "red"
	}
	else{
		DEF_IVInput.style.color =  "black"
	}
	SetAttackerData(AttackerHP_IV_Input.value,AttackerSTR_IV_Input.value,AttackerSPR_IV_Input.value, AttackerDEF_IV_Input.value, AttackerSPD_IV_Input.value, AttackerSTR_Gym_Input.value, AttackerSPR_Gym_Input.value, AttackerDEF_Gym_Input.value, AttackerSPD_Gym_Input.value)
	SetDefenderData(DefenderHP_IV_Input.value,DefenderSTR_IV_Input.value,DefenderSPR_IV_Input.value,DefenderDEF_IV_Input.value,DefenderSPD_IV_Input.value, DefenderSTR_Gym_Input.value, DefenderSPR_Gym_Input.value, DefenderDEF_Gym_Input.value, DefenderSPD_Gym_Input.value)
}

function CheckGymStat(){
	if (parseInt(DefenderSTR_Gym_Input.value) + parseInt(DefenderSPR_Gym_Input.value) + parseInt(DefenderDEF_Gym_Input.value) + parseInt(DefenderSPD_Gym_Input.value) > 5){
		DEF_GymInput.style.color ="red"
	}else{
		DEF_GymInput.style.color ="black"
	}
	if (parseInt(AttackerSTR_Gym_Input.value) + parseInt(AttackerSPR_Gym_Input.value) + parseInt(AttackerDEF_Gym_Input.value) + parseInt(AttackerSPD_Gym_Input.value) > 5){
		ATK_GymInput.style.color ="red"
	}else{
		ATK_GymInput.style.color ="black"
	}
	SetDefenderData(DefenderHP_IV_Input.value,DefenderSTR_IV_Input.value,DefenderSPR_IV_Input.value,DefenderDEF_IV_Input.value,DefenderSPD_IV_Input.value, DefenderSTR_Gym_Input.value, DefenderSPR_Gym_Input.value, DefenderDEF_Gym_Input.value, DefenderSPD_Gym_Input.value)
	SetAttackerData(AttackerHP_IV_Input.value,AttackerSTR_IV_Input.value,AttackerSPR_IV_Input.value, AttackerDEF_IV_Input.value, AttackerSPD_IV_Input.value, AttackerSTR_Gym_Input.value, AttackerSPR_Gym_Input.value, AttackerDEF_Gym_Input.value, AttackerSPD_Gym_Input.value)
}

	if (Defender){
		
		for (i = 0; i < yokais.length; i++){
			const option = `
				<option value="${yokais[i].name}">${yokais[i].name}</option>
			`
			Defender.innerHTML += option;
			Attacker.innerHTML += option;
		}
		for (i = 0; i < Attitudes.length; i++){
			const option = `
			<option value="${i}">${Attitudes[i].name}</option>
			`
			DefenderEV.innerHTML += option;
			AttackerEV.innerHTML += option;
		}
		
	//(STRorSPR/2 + BP/2)*0.9or1.1*ElementalWeaknessResistance*SkillMultiplier*Guard 
	
	Attacker.addEventListener('change', function(event) { 
		SetAttackerData(AttackerHP_IV_Input.value,AttackerSTR_IV_Input.value,AttackerSPR_IV_Input.value, AttackerDEF_IV_Input.value, AttackerSPD_IV_Input.value, AttackerSTR_Gym_Input.value, AttackerSPR_Gym_Input.value, AttackerDEF_Gym_Input.value, AttackerSPD_Gym_Input.value)
})
	
	Defender.addEventListener('change', function(event) {
	SetDefenderData(DefenderHP_IV_Input.value,DefenderSTR_IV_Input.value,DefenderSPR_IV_Input.value,DefenderDEF_IV_Input.value,DefenderSPD_IV_Input.value, DefenderSTR_Gym_Input.value, DefenderSPR_Gym_Input.value, DefenderDEF_Gym_Input.value, DefenderSPD_Gym_Input.value)
	})
	
	DefenderLVL.addEventListener('input', function(event){
	SetDefenderData(DefenderHP_IV_Input.value,DefenderSTR_IV_Input.value,DefenderSPR_IV_Input.value,DefenderDEF_IV_Input.value,DefenderSPD_IV_Input.value, DefenderSTR_Gym_Input.value, DefenderSPR_Gym_Input.value, DefenderDEF_Gym_Input.value, DefenderSPD_Gym_Input.value)
	})
	
	AttackerLVL.addEventListener('input', function(event){
	SetAttackerData(AttackerHP_IV_Input.value,AttackerSTR_IV_Input.value,AttackerSPR_IV_Input.value, AttackerDEF_IV_Input.value, AttackerSPD_IV_Input.value, AttackerSTR_Gym_Input.value, AttackerSPR_Gym_Input.value, AttackerDEF_Gym_Input.value, AttackerSPD_Gym_Input.value)
	})
	
	let ATK_IVInput = document.getElementsByClassName("ATK_IV")
	let DEF_IVInput = document.getElementsByClassName("DEF_IV")
	
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
	
	let ATK_GymInput = document.getElementsByClassName("ATK_Gym")
	let DEF_GymInput = document.getElementsByClassName("DEF_Gym")
	
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
	})
	AttackerEV.addEventListener('change', function(event){
		AttackerEV_Div.innerHTML = 'HP Boost:'+Attitudes[AttackerEV.value].boost[0]+' | STR Boost:'+Attitudes[AttackerEV.value].boost[1]+' | SPR Boost:'+Attitudes[AttackerEV.value].boost[2]+' | DEF Boost:'+Attitudes[AttackerEV.value].boost[3]+' | SPD Boost:'+Attitudes[AttackerEV.value].boost[4]
	})
	
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
	
var AttackerName = Attacker.value;

for (i=0;i<yokais.length;i++){
	if (Attacker.value == yokais[i].name){
		AttackerImg.src = 'Content/Graphics/Yo kai Medals/'+yokais[i].image
		break;
	}
}
		
var DefenderNumber = Defender.value;
		
for (i=0;i<yokais.length;i++){
	if (Defender.value == yokais[i].name){
		DefenderImg.src = 'Content/Graphics/Yo kai Medals/'+yokais[i].image
		break;
	}
}
	
SetAttackerData(8, 8, 8, 8, 8, 60, 0, 0, 0, 0)

SetDefenderData(8, 8, 8, 8, 8, 60, 0, 0, 0, 0)

CalcButton.addEventListener("click", () =>{
	let ID = null;
	for (i=0;i<yokais.length;i++){
	if (Attacker.value == yokais[i].name){
		ID = i
		break;
	}
}
		if (AttackType.value == "1"){
		getAttack(GetMove(yokais[ID]))
	}
	else if (AttackType.value == "2"){
		getAttack(GetTechnique(yokais[ID]))
	}
	else if(AttackType.value == "3"){
		getAttack(GetSoultimate(yokais[ID]))
	}
	
});

}

