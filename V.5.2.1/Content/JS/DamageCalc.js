
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
	var yokaiData;
	for (yokai of yokais){
		if (Defender.value == yokai.name){
			yokaiData = yokai;
			console.log("Yokai: ",yokaiData)
			break;
		}
	}
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
		
		ElementalResistance = yokaiData[Element]
		
		Hit_amount = 1;
	}
	else if (AttackType.value == "3"){
		ChosenAttackStat = parseInt(AttackerSTR.value)+parseInt(Attitudes[DefenderEV.value].boost[1]);
		if (Attack.Element !== null){
			ChosenAttackStat = parseInt(AttackerSPR.value)+parseInt(Attitudes[DefenderEV.value].boost[2]);
			let Element = Attack.element_type;
		console.log(Element)
		ElementalResistance = yokaiData[Element]
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
		
		RawDamage = (ChosenAttackStat/2 + Power/2 - Defence/4)
		console.log("Raw Damage: ", RawDamage)
		if (RawDamage < 1){
			RawDamage = 1;	
		}
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

function SetAttackerData(){
	var AttackerName = Attacker.value;
	
	for (i=0;i<yokais.length;i++){
		if (Attacker.value == yokais[i].name){
			AttackerImg.src = 'Content/Graphics/YokaiMedals/'+yokais[i].image
			AttackerName = yokais[i]
			break;
		}
	}
	let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(AttackerName, ATK_IVInput[0].value, ATK_IVInput[1].value, ATK_IVInput[2].value, ATK_IVInput[3].value, ATK_IVInput[4].value, AttackerLVL.value, ATK_GymInput[0].value, ATK_GymInput[1].value, ATK_GymInput[2].value, ATK_GymInput[3].value, Attitudes[AttackerEV.value].boost[0], Attitudes[AttackerEV.value].boost[1], Attitudes[AttackerEV.value].boost[2], Attitudes[AttackerEV.value].boost[3], Attitudes[AttackerEV.value].boost[4])
	
	console.log("Attacker Stats: ",[BHP, BSTR, BSPR, BDEF, BSPD])
	
	AttackerHP.value = Math.round(BHP)
	AttackerSTR.value = Math.round(BSTR);
	AttackerSPR.value = Math.round(BSPR);
	AttackerDEF.value = Math.round(BDEF);
	AttackerSPD.value = Math.round(BSPD);
}

function SetDefenderData(){
	var DefenderName = Defender.value;
	
	for (i=0;i<yokais.length;i++){
		if (Defender.value == yokais[i].name){
			DefenderImg.src = 'Content/Graphics/YokaiMedals/'+yokais[i].image
			DefenderName = yokais[i]
			break;
		}
	}
	let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(DefenderName, DEF_IVInput[0].value, DEF_IVInput[1].value, DEF_IVInput[2].value, DEF_IVInput[3].value, DEF_IVInput[4].value, DefenderLVL.value, DEF_GymInput[0].value, DEF_GymInput[1].value, DEF_GymInput[2].value, DEF_GymInput[3].value, Attitudes[DefenderEV.value].boost[0], Attitudes[DefenderEV.value].boost[1], Attitudes[DefenderEV.value].boost[2], Attitudes[DefenderEV.value].boost[3], Attitudes[DefenderEV.value].boost[4])
		
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
	SetAttackerData()
	SetDefenderData()
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
	SetAttackerData()
	SetDefenderData()
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
		SetAttackerData()
		})
	
	Defender.addEventListener('change', function(event) {
	SetDefenderData()
	})
	
	DefenderLVL.addEventListener('input', function(event){
	SetDefenderData()
	})
	
	AttackerLVL.addEventListener('input', function(event){
	SetAttackerData()
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
		SetDefenderData()
	})
	AttackerEV.addEventListener('change', function(event){
		AttackerEV_Div.innerHTML = 'HP Boost:'+Attitudes[AttackerEV.value].boost[0]+' | STR Boost:'+Attitudes[AttackerEV.value].boost[1]+' | SPR Boost:'+Attitudes[AttackerEV.value].boost[2]+' | DEF Boost:'+Attitudes[AttackerEV.value].boost[3]+' | SPD Boost:'+Attitudes[AttackerEV.value].boost[4]
		SetAttackerData()
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

for (i=0;i<yokais.length;i++){
	if (Attacker.value == yokais[i].name){
		AttackerImg.src = 'Content/Graphics/YokaiMedals/'+yokais[i].image
		break;
	}
}
	
for (i=0;i<yokais.length;i++){
	if (Defender.value == yokais[i].name){
		DefenderImg.src = 'Content/Graphics/YokaiMedals/'+yokais[i].image
		break;
	}
}
	
SetAttackerData(8, 8, 8, 8, 8, 60, 0, 0, 0, 0)

SetDefenderData(8, 8, 8, 8, 8, 60, 0, 0, 0, 0)

CalcButton.addEventListener("click", () =>{
	let yokai = null;
	for (i=0;i<yokais.length;i++){
	if (Attacker.value == yokais[i].name){
		yokai = yokais[i]
		break;
	}
}
		if (AttackType.value == "1"){
		getAttack(GetMove(yokai.attack))
	}
	else if (AttackType.value == "2"){
		getAttack(GetTechnique(yokai.technique))
	}
	else if(AttackType.value == "3"){
		getAttack(GetSoultimate(yokai.soultimate))
	}
	
});

}

