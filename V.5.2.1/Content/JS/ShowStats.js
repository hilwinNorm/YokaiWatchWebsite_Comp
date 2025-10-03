
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
	for (i=0; i<techqniues.length; i++){
		if (techqniues[i].ID == GivenStats.technique){
			Technique = techqniues[i]
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

var DefaultLVL = 60;

var CurrentLVL = DefaultLVL;

var Path_Medal = 'Content/Graphics/Yo kai Medals/'

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

function CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, LVL, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym) {
    if (LVL == NaN || LVL > 99 || LVL <= 0) {
        LVL = 60
    }
    var BHP = yokai.BS_A_HP + (yokai.BS_B_HP - yokai.BS_A_HP + HP_IV*2) * (LVL - 1) / 98;
    var BSTR = yokai.BS_A_Str + (yokai.BS_B_Str - yokai.BS_A_Str + parseInt(STR_IV) + (parseInt(STR_Gym)*5)) * (LVL - 1) / 98;
    var BSPR = yokai.BS_A_Spr + (yokai.BS_B_Spr - yokai.BS_A_Spr + parseInt(SPR_IV) + (parseInt(SPR_Gym)*5)) * (LVL - 1) / 98;
    var BDEF = yokai.BS_A_Def + (yokai.BS_B_Def - yokai.BS_A_Def + parseInt(DEF_IV) + (parseInt(DEF_Gym)*5)) * (LVL - 1) / 98;
    var BSPD = yokai.BS_A_Spd + (yokai.BS_B_Spd - yokai.BS_A_Spd + parseInt(SPD_IV) + (parseInt(SPD_Gym)*5)) * (LVL - 1) / 98;
    return [BHP, BSTR, BSPR, BDEF, BSPD]
}


function showYokaiDetails(Yokai_Data) {
		
		yokai = Yokai_Data[0]
		
		var move = Yokai_Data[1]
		
		var technique = Yokai_Data[2]
		
		var skills = Yokai_Data[3]
		
		var inspirit = Yokai_Data[4]
		
		var soultimate = Yokai_Data[5]
		
        var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, CurrentLVL, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym)
    const details = `
        <h3>${yokai.name}</h3>
        <div style="background-color: var(--side-buttons-bg); border-radius: 50%; padding: 20px; height: 200px; width: 200px"><img src="${Path_Artwork}${yokai.artwork_image}" alt="${yokai.name}" height="100%" width="auto"></div>
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
		<h4>IV:</h4>
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
        <p id="yokai-max-hp">Max HP: ${Math.round(BHP)}</p>
        <p id="yokai-strength">STR: ${Math.round(BSTR)}</p>
        <p id="yokai-spirit">SPR: ${Math.round(BSPR)}</p>
        <p id="yokai-defense">DEF: ${Math.round(BDEF)}</p>
        <p id="yokai-speed">SPD: ${Math.round(BSPD)}</p>
        <p>Base A HP: ${yokai.BS_A_HP} | Base B HP: ${yokai.BS_B_HP}</p>
        <p>Base A STR: ${yokai.BS_A_Str} | Base B STR: ${yokai.BS_B_Str}</p>
        <p>Base A SPR: ${yokai.BS_A_Spr} | Base B SPR: ${yokai.BS_B_Spr}</p>
        <p>Base A DEF: ${yokai.BS_A_Def} | Base B DEF: ${yokai.BS_B_Def}</p>
        <p>Base A SPD: ${yokai.BS_A_Spd} | Base B SPD: ${yokai.BS_B_Spd}</p>
        <p>Move: ${move.Command} | Move Power: ${move.Lv10_power} | Move Probability: ${yokai.AttackProb}</p>
        <p>Technique: ${technique.Command} | Technique Element: ${technique.Element} | Technique Power: ${technique.Lv10_power} | Technique Probability: ${yokai.techniqueProb}</p>
        <p>Inspirit: ${inspirit.Command} | description: ${inspirit.Effect[0].EffectDesc} | Inspirit Probability: ${yokai.inspiritProb}</p>
		<p>Skill: ${skills.name}</p>
		<p>Skill Description: ${skills.description}</p>
		<p>Guard Probability: ${yokai.GuardProb}</p>
        <p>Soultimate: ${soultimate.Command} | Soultimate Power: ${soultimate.Lv10_power} | Soultimate Charge Rate: ${soultimate.Lv10_soul_charge}</p>
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
		
		
		Attitude.addEventListener('change', function(event){
		Attitude_display.innerHTML = 'HP Boost:'+Attitudes[Attitude.value].boost[0]+' | STR Boost:'+Attitudes[Attitude.value].boost[1]+' | SPR Boost:'+Attitudes[Attitude.value].boost[2]+' | DEF Boost:'+Attitudes[Attitude.value].boost[3]+' | SPD Boost:'+Attitudes[Attitude.value].boost[4]
	})

		Attitude_display.innerHTML = 'HP Boost:'+Attitudes[Attitude.value].boost[0]+' | STR Boost:'+Attitudes[Attitude.value].boost[1]+' | SPR Boost:'+Attitudes[Attitude.value].boost[2]+' | DEF Boost:'+Attitudes[Attitude.value].boost[3]+' | SPD Boost:'+Attitudes[Attitude.value].boost[4]


        function updateYokaiStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym) {
        
		let [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, CurrentLVL, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym)
	
		console.log(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, CurrentLVL, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym)
		
		console.log(BHP, BSTR, BSPR, BDEF, BSPD)
        
        // Update the displayed stats
        document.getElementById('yokai-max-hp').textContent = `Max HP: ${Math.round(BHP)}`;
        document.getElementById('yokai-strength').textContent = `STR: ${Math.round(BSTR)}`;
        document.getElementById('yokai-spirit').textContent = `SPR: ${Math.round(BSPR)}`;
        document.getElementById('yokai-defense').textContent = `DEF: ${Math.round(BDEF)}`;
        document.getElementById('yokai-speed').textContent = `SPD: ${Math.round(BSPD)}`;
    }
	
	HP_IV_Input.addEventListener('input', function(event){
		HP_IV = HP_IV_Input.value;
		CheckIV()
	})
	STR_IV_Input.addEventListener('input', function(event){
		STR_IV = STR_IV_Input.value;
		CheckIV()
	})
	SPR_IV_Input.addEventListener('input', function(event){
		SPR_IV = SPR_IV_Input.value;
		CheckIV()
	})
	DEF_IV_Input.addEventListener('input', function(event){
		DEF_IV = DEF_IV_Input.value;
		CheckIV()
	})
	SPD_IV_Input.addEventListener('input', function(event){
		SPD_IV = SPD_IV_Input.value;
		CheckIV()
	})
	
	STR_Gym_Input.addEventListener('input', function(event){
		STR_Gym = STR_Gym_Input.value;
		CheckGymStat()
	})
	SPR_Gym_Input.addEventListener('input', function(event){
		SPR_Gym = SPR_Gym_Input.value;
		CheckGymStat()
	})
	DEF_Gym_Input.addEventListener('input', function(event){
		DEF_Gym = DEF_Gym_Input.value;
		CheckGymStat()
	})
	SPD_Gym_Input.addEventListener('input', function(event){
		SPD_Gym = SPD_Gym_Input.value;
		CheckGymStat()
	})
	
function CheckIV(){
	let IV_Class = document.getElementsByClassName("IV")
	
	//for (i=0; i<IV_Class.length; i++){}
	
	if ((parseInt(HP_IV) + parseInt(STR_IV) + parseInt(SPR_IV) + parseInt(DEF_IV) + parseInt(SPD_IV)) != 40){
		for (const element of IV_Class) {
			element.style.color = 'red';
		}
	}
	else{
		for (const element of IV_Class) {
			element.style.color = 'black';
		}
	}
	updateYokaiStats(yokai,HP_IV,STR_IV,SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym)
}

function CheckGymStat(){
	let GYM_Class = document.getElementsByClassName("GYM")
	
	if (parseInt(STR_Gym) + parseInt(SPR_Gym) + parseInt(DEF_Gym) + parseInt(SPD_Gym) > 5){
		for (const element of GYM_Class) {
			element.style.color = 'red';
		}
	}
	else{
		for (const element of GYM_Class) {
			element.style.color = 'black';
		}
	}
	updateYokaiStats(yokai,HP_IV,STR_IV,SPR_IV,DEF_IV,SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym)
}
}


	Yokai_Data = LoadStats()
	
	showYokaiDetails(Yokai_Data)
	
