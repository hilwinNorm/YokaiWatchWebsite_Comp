
function LoadStats(){
	
	var GivenStats = localStorage.getItem('_clicked_yokai_data');
	if (!GivenStats) return false;
	
	GivenStats = atob(GivenStats);
	
	GivenStats = JSON.parse(GivenStats);
	
	var Move, Technique, Skill, Inspirit, Soultimate
	
	for (i=0; i<moves.length; i++){
		if (moves[i].ID == GivenStats.attack){
			Move = moves[i]
			break;
		}
	}
	for (i=0; i<techniques.length; i++){
		if (techniques[i].ID == GivenStats.technique){
			Technique = techniques[i]
			break;
		}
	}
	for (i=0; i<inspirits.length; i++){
		if (inspirits[i].ID == GivenStats.inspirit){
			Inspirit = inspirits[i]
			break;
		}
	}
	for (i=0; i<skills.length; i++){
		if (skills[i].ID == GivenStats.skill){
			Skill = skills[i]
			break;
		}
	}
	for (i=0; i<soultimates.length; i++){
		if (soultimates[i].ID == GivenStats.soultimate){
			Soultimate = soultimates[i]
			break;
		}
	}
	
	console.log([GivenStats, Move, Technique, Skill, Inspirit, Soultimate])
	
	return [GivenStats, Move, Technique, Skill, Inspirit, Soultimate];
}

const Rarities = {
	Classic: "Rank_Classic.webp",
	Rare: "Rank_Rare.png",
	Legendary: "Rank_Legendary.png"
}

var DefaultLVL = 60;

var CurrentLVL = DefaultLVL;

var Path_Medal = 'Content/Graphics/YokaiMedals/'

var Path_Artwork = "Content/Graphics/Artwork/"

var STR_Gym = 0;
var SPR_Gym = 0;
var DEF_Gym = 0;
var SPD_Gym = 0;

var HP_IV = 8;
var STR_IV = 8;
var SPR_IV = 8;
var DEF_IV = 8;
var SPD_IV = 8;

function CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, LVL, STR_Gym=0, SPR_Gym=0, DEF_Gym=0, SPD_Gym=0, HP_EV=0, STR_EV=0, SPR_EV=0, DEF_EV=0, SPD_EV=0) {
    if (LVL == NaN || LVL > 99 || LVL <= 0) {
        LVL = 60
    }
    var BHP = yokai.BS_A_HP + (yokai.BS_B_HP - yokai.BS_A_HP + parseInt(HP_IV)*2) * (parseInt(LVL) - 1) / 98 + HP_EV * (1+parseInt(LVL)/198);
    var BSTR = yokai.BS_A_Str + (yokai.BS_B_Str - yokai.BS_A_Str + parseInt(STR_IV)) * (parseInt(LVL) - 1) / 98 + STR_EV * (1+parseInt(LVL)/198) + (parseInt(STR_Gym)*5);
    var BSPR = yokai.BS_A_Spr + (yokai.BS_B_Spr - yokai.BS_A_Spr + parseInt(SPR_IV)) * (parseInt(LVL) - 1) / 98 + SPR_EV * (1+parseInt(LVL)/198) + (parseInt(SPR_Gym)*5);
    var BDEF = yokai.BS_A_Def + (yokai.BS_B_Def - yokai.BS_A_Def + parseInt(DEF_IV)) * (parseInt(LVL) - 1) / 98 + DEF_EV * (1+parseInt(LVL)/198) + (parseInt(DEF_Gym)*5) - (parseInt(STR_Gym)*2) - (parseInt(SPD_Gym)*2);
    var BSPD = yokai.BS_A_Spd + (yokai.BS_B_Spd - yokai.BS_A_Spd + parseInt(SPD_IV)) * (parseInt(LVL) - 1) / 98 + SPD_EV * (1+parseInt(LVL)/198) + (parseInt(SPD_Gym)*5) - (parseInt(SPR_Gym)*2) - (parseInt(DEF_Gym)*2);
    return [BHP, BSTR, BSPR, BDEF, BSPD]
}

function UpdateDisplay(BHP, BSTR, BSPR, BDEF, BSPD){
	document.getElementById('yokai-max-hp').textContent = `HP: ${Math.round(BHP)}`;
	document.getElementById('yokai-strength').textContent = `STR: ${Math.round(BSTR)}`;
	document.getElementById('yokai-spirit').textContent = `SPR: ${Math.round(BSPR)}`;
	document.getElementById('yokai-defense').textContent = `DEF: ${Math.round(BDEF)}`;
	document.getElementById('yokai-speed').textContent = `SPD: ${Math.round(BSPD)}`;
}

function showYokaiDetails(Yokai_Data) {
		
		yokai = Yokai_Data[0]
		
		var move = Yokai_Data[1]
		
		var technique = Yokai_Data[2]
		
		var skills = Yokai_Data[3]
		
		var inspirit = Yokai_Data[4]
		
		var soultimate = Yokai_Data[5]
		
		var [BHP, BSTR, BSPR, BDEF, BSPD] = [0,0,0,0,0]
		
		var YokaiRarity = document.createElement("div");
		
		if (yokai.Extra){
			for (Rarity of Object.keys(Rarities)){
				var RarityImg = document.createElement("img")
				if ((yokai.Extra).includes(Rarity)){
					RarityImg.src=`Content/Graphics/Rarities/${Rarities[Rarity]}`
					if (Rarity != "Classic"){RarityImg.style="width:150px; height:21px"}
					else{RarityImg.style="height:40px;"}
					YokaiRarity.appendChild(RarityImg)
				}
			}
		}
		
		if (typeof(yokai.rank) !== 'string'){
			yokai.rank="None"
		}
		if (typeof move == 'undefined'){
			move = {Command: "ERROR", Lv10_power: "ERROR"}
			console.error("Cannot read properties of undefined. Perhaps the move isn't written in the dictionary of yokai?")
		}
		if (typeof technique == 'undefined'){
			technique = {Command: "ERROR", Element: "ERROR"}
			console.error("Cannot read properties of undefined. Perhaps the technique isn't written in the dictionary of yokai?")
		}
		
		
    const details = `
        <h3>${yokai.name} (${yokai.tier})</h3>
		<h3 style="display: flex; align-items: center;">${YokaiRarity.innerHTML}</h3>
        <div style="background-color: var(--side-buttons-bg); border-radius: 50%; padding: 20px; height: 200px; width: 200px"><img src="${Path_Artwork}${yokai.artwork_image}" alt="${yokai.name}" height="100%" width="auto"></div>
        <h3>Rank: <img src="Content/Graphics/Ranks/DictionaryRanks/Rank_${yokai.rank}_icon.png"></h3>
		<h3 style="display: flex;align-items: center;">Tribe: ${yokai.tribe} <img style="width:20px; height:auto; margin-left: 5px"src="Content/Graphics/tribes/tribe${yokai.tribe}.png"></h3>
		<h4>Level <input id="yokai-level" type="text" value="${CurrentLVL}" placeholder="60"> Stats:</h4>
		<label for="Attitude">Choose Attitude:</label>
		<select id="Attitude"></select>
		<h3>Attitude boost:</h3>
		<div id="Attitude_display"></div>
		<h3>Gym Training</h3>
		<div>
		<span>STR:</span>
		<input type="number" value=0 placeholder="STR" id="yokai-STR_Gym" class="GYM">
		<span>SPR:</span>
		<input type="number" value=0 placeholder="SPR" id="yokai-SPR_Gym"class="GYM">
		<span>DEF:</span>
		<input type="number" value=0 placeholder="DEF" id="yokai-DEF_Gym"class="GYM">
		<span>SPD:</span>
		<input type="number" value=0 placeholder="SPD" id="yokai-SPD_Gym"class="GYM">
		</div>
		<h3>IV:</h3>
		<div style="margin-bottom: 25px;">
		<span>HP IV:</span>
		<input type="number" value=8 placeholder="HP IV" id="yokai-IV_HP" class="IV">
		<span>STR IV:</span>
		<input type="number" value=8 placeholder="STR IV" id="yokai-IV_STR"class="IV">
		<span>SPR IV:</span>
		<input type="number" value=8 placeholder="SPR IV" id="yokai-IV_SPR"class="IV">
		<span>DEF IV:</span>
		<input type="number" value=8 placeholder="DEF IV" id="yokai-IV_DEF"class="IV">
		<span>SPD IV:</span>
		<input type="number" value=8 placeholder="SPD IV" id="yokai-IV_SPD"class="IV">
		<div id="yokai-IV_Amount" style="color: red"></div>
			</div>
        <p id="yokai-max-hp" style="font-size: 15px"><u>HP: ${Math.round(BHP)}</u></p>
        <p id="yokai-strength" style="font-size: 15px"><u>STR: ${Math.round(BSTR)}</u></p>
        <p id="yokai-spirit" style="font-size: 15px"><u>SPR: ${Math.round(BSPR)}</u></p>
        <p id="yokai-defense" style="font-size: 15px"><u>DEF: ${Math.round(BDEF)}</u></p>
        <p id="yokai-speed" style="font-size: 15px"><u>SPD: ${Math.round(BSPD)}</u></p>
		<p>Move: ${move.Command} | Move Power: ${move.Lv10_power} | Move Probability: ${yokai.AttackProb}</p>
        <p>Technique: ${technique.Command} | Technique Element: ${technique.Element} <img style="height:20px; width: auto;"src="Content/Graphics/Elements/InGameIcons/${technique.Element}.png" alt="ElementImg"> | Technique Power: ${technique.Lv10_power} | Technique Probability: ${yokai.techniqueProb}</p>
        <p style="display: flex; align-items: center;">Inspirit: ${inspirit.Command} | description: ${inspirit.Effect[0].EffectDesc} <img style="position: relative;"src="Content/Graphics/InspiritImages/${inspirit.image}"> | Inspirit Probability: ${yokai.inspiritProb}</p>
		<p>Skill: ${skills.name}</p>
		<p>Skill Description: ${skills.description}</p>
		<p>Guard Probability: ${yokai.GuardProb}</p>
        <p>Soultimate: ${soultimate.Command} | Soultimate Power: ${soultimate.Lv10_power} | Soultimate Charge Rate: ${soultimate.Lv10_soul_charge}</p>
        <p>Base A HP: ${yokai.BS_A_HP} | Base B HP: ${yokai.BS_B_HP}</p>
        <p>Base A STR: ${yokai.BS_A_Str} | Base B STR: ${yokai.BS_B_Str}</p>
        <p>Base A SPR: ${yokai.BS_A_Spr} | Base B SPR: ${yokai.BS_B_Spr}</p>
        <p>Base A DEF: ${yokai.BS_A_Def} | Base B DEF: ${yokai.BS_B_Def}</p>
        <p>Base A SPD: ${yokai.BS_A_Spd} | Base B SPD: ${yokai.BS_B_Spd}</p>
    `;
    document.getElementById('yokai-details').innerHTML = details;
    
    // Now attach the event listener to the input element
    const levelInput = document.getElementById('yokai-level');
    levelInput.addEventListener('input', function(event) {
        CurrentLVL = event.target.value;
        updateYokaiStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym);
    });
	let HP_IV_Input = document.getElementById("yokai-IV_HP")
	let STR_IV_Input = document.getElementById("yokai-IV_STR")
	let SPR_IV_Input = document.getElementById("yokai-IV_SPR")
	let DEF_IV_Input = document.getElementById("yokai-IV_DEF")
	let SPD_IV_Input = document.getElementById("yokai-IV_SPD")

	let STR_Gym_Input = document.getElementById("yokai-STR_Gym")
	let SPR_Gym_Input = document.getElementById("yokai-SPR_Gym")
	let DEF_Gym_Input = document.getElementById("yokai-DEF_Gym")
	let SPD_Gym_Input = document.getElementById("yokai-SPD_Gym")

    let Attitude = document.getElementById('Attitude')
	let Attitude_display = document.getElementById('Attitude_display')
	
	for (i = 0; i < Attitudes.length; i++){
			const option = `
			<option value="${i}">${Attitudes[i].name}</option>
			`
			Attitude.innerHTML += option;
		}

        function updateYokaiStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym, HP_EV, STR_EV, SPR_EV, DEF_EV, SPD_EV) {
        
		let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, CurrentLVL, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym, HP_EV, STR_EV, SPR_EV, DEF_EV, SPD_EV)
		console.log(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, CurrentLVL, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym, HP_EV, STR_EV, SPR_EV, DEF_EV, SPD_EV)
        UpdateDisplay(BHP, BSTR, BSPR, BDEF, BSPD)
    }
	
	Attitude.addEventListener('change', function(event){
		Attitude_display.innerHTML = 'HP Boost:'+Attitudes[Attitude.value].boost[0]+' | STR Boost:'+Attitudes[Attitude.value].boost[1]+' | SPR Boost:'+Attitudes[Attitude.value].boost[2]+' | DEF Boost:'+Attitudes[Attitude.value].boost[3]+' | SPD Boost:'+Attitudes[Attitude.value].boost[4]
		updateYokaiStats(yokai,HP_IV,STR_IV,SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym, Attitudes[Attitude.value].boost[0], Attitudes[Attitude.value].boost[1], Attitudes[Attitude.value].boost[2], Attitudes[Attitude.value].boost[3], Attitudes[Attitude.value].boost[4])
	})

	Attitude_display.innerHTML = 'HP Boost:'+Attitudes[Attitude.value].boost[0]+' | STR Boost:'+Attitudes[Attitude.value].boost[1]+' | SPR Boost:'+Attitudes[Attitude.value].boost[2]+' | DEF Boost:'+Attitudes[Attitude.value].boost[3]+' | SPD Boost:'+Attitudes[Attitude.value].boost[4]
	
	updateYokaiStats(yokai,HP_IV,STR_IV,SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym, Attitudes[Attitude.value].boost[0], Attitudes[Attitude.value].boost[1], Attitudes[Attitude.value].boost[2], Attitudes[Attitude.value].boost[3], Attitudes[Attitude.value].boost[4])

	var IV_Class = document.getElementsByClassName("IV")
	
	var GYM_Class = document.getElementsByClassName("GYM")
	
	for (const element of IV_Class) {
		element.addEventListener('input', function(event){
		HP_IV = HP_IV_Input.value;
		STR_IV = STR_IV_Input.value;
		SPR_IV = SPR_IV_Input.value;
		SPD_IV = SPD_IV_Input.value;
		CheckIV()
	})
	}
	
	for (const element of GYM_Class) {
		element.addEventListener('input', function(event){
		STR_Gym = STR_Gym_Input.value;
		SPR_Gym = SPR_Gym_Input.value;
		DEF_Gym = DEF_Gym_Input.value;
		SPD_Gym = SPD_Gym_Input.value;
		CheckGymStat()
	})
	}
	
function CheckIV(){
	let sum=0;
	let flag = 0;
	for (const element of IV_Class) {
		if (parseInt(element.value) < 0){
			flag=1;
		}
		sum+=parseInt(element.value);
	}
	if (sum != 40 || flag == 1){
		for (const element of IV_Class) {
			element.style.color = 'red';
		}
	}
	else{
		for (const element of IV_Class) {
			element.style.color =  "var(--side-buttons-color)"
		}
	}
	updateYokaiStats(yokai,HP_IV,STR_IV,SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym, Attitudes[Attitude.value].boost[0], Attitudes[Attitude.value].boost[1], Attitudes[Attitude.value].boost[2], Attitudes[Attitude.value].boost[3], Attitudes[Attitude.value].boost[4])
}

function CheckGymStat(){
	let sum=0;
	let flag = 0;
	for (const element of GYM_Class) {
		if (parseInt(element.value) < 0){
			flag=1;
		}
		sum+=parseInt(element.value);
	}
	if (sum > 5 || flag == 1){
		for (const element of GYM_Class) {
			element.style.color = 'red';
		}
	}
	else{
		for (const element of GYM_Class) {
			element.style.color =  "var(--side-buttons-color)"
		}
	}
	updateYokaiStats(yokai,HP_IV,STR_IV,SPR_IV,DEF_IV,SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym, Attitudes[Attitude.value].boost[0], Attitudes[Attitude.value].boost[1], Attitudes[Attitude.value].boost[2], Attitudes[Attitude.value].boost[3], Attitudes[Attitude.value].boost[4])
}
}


	Yokai_Data = LoadStats()
	
	showYokaiDetails(Yokai_Data)
	
