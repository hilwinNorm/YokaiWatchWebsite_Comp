var pathDatabase = "Content/JS/Databases/";

const Databases = ['YoKaiDataBase.js'];

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


function LoadStats(yokaiDatabase, abilitiesDatabase, yokaiSameKindDatabase){
	
	const urlParams = new URLSearchParams(window.location.search)
	
	var GivenYokai = yokaiDatabase[urlParams.get('yokai')];
	
	var Attack, Technique, Skill, Inspirit, Soultimate
	
	if (GivenYokai.isNotBoss == 0){
		return [GivenYokai];
	}
	
	Attack=attackDatabase[GivenYokai.AttackID]
	Technique=techniqueDatabase[GivenYokai.TechniqueID]
	Inspirit=inspiritDatabase[GivenYokai.InspiritID]
	Soultimate=soultimateDatabase[GivenYokai.SoultimateID]
	
	let SkillID = GivenYokai.SkillID
	
	Skill = abilitiesDatabase[SkillID]
	if(typeof Skill== "undefined"){console.error("Error: SkillID could not be found. Replacing with different ID.");Skill=abilitiesDatabase['0xA2625900']}

	for (data of yokaiSameKindDatabase){
		if (data.ParamID1 == GivenYokai.ParamID){
			if (GivenYokai.isNotTypeRare==0){rareVariant_ParamID=GivenYokai.ParamID;NormalVariant_ParamID=data.ParamID2}
			else{NormalVariant_ParamID=GivenYokai.ParamID;rareVariant_ParamID=data.ParamID2}
			break;
		}
		else if (data.ParamID2 == GivenYokai.ParamID){
			if (GivenYokai.isNotTypeRare==0){rareVariant_ParamID=GivenYokai.ParamID;NormalVariant_ParamID=data.ParamID1}
			else{NormalVariant_ParamID=GivenYokai.ParamID;rareVariant_ParamID=data.ParamID1}
			break;
		}
	}
	
	return [GivenYokai, Attack, Technique, Skill, Inspirit, Soultimate];
}

const Rarities = {
	Classic: "Rank_Classic.webp",
	Rare: "Rank_Rare.png",
	Legendary: "Rank_Legendary.png"
}

const Tribes = [
	"None",
    "Brave",
    "Mysterious",
    "Tough",
    "Charming",
    "Heartful",
    "Shady",
    "Eerie",
    "Slippery",
    "Kaima"
]

const Ranks=['E','D','C','B','A','S']

// Used for type rare yokai

var NormalVariant_ParamID = null;

var rareVariant_ParamID = null;

//

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
	LVL=parseInt(LVL)
	
    var BHP = yokai.baseA_HP + (yokai.baseB_HP - yokai.baseA_HP + parseInt(HP_IV)*2) * (LVL - 1) / 98 + HP_EV * (1+LVL/198);
    var BSTR = yokai.baseA_Strength + (yokai.baseB_Strength - yokai.baseA_Strength + parseInt(STR_IV)) * (LVL - 1) / 98 + STR_EV * (1+LVL/198) + (parseInt(STR_Gym)*5);
    var BSPR = yokai.baseA_Spirit + (yokai.baseB_Spirit - yokai.baseA_Spirit + parseInt(SPR_IV)) * (LVL - 1) / 98 + SPR_EV * (1+LVL/198) + (parseInt(SPR_Gym)*5);
    var BDEF = yokai.baseA_Defense + (yokai.baseB_Defense - yokai.baseA_Defense + parseInt(DEF_IV)) * (LVL - 1) / 98 + DEF_EV * (1+LVL/198) + (parseInt(DEF_Gym)*5) - (parseInt(STR_Gym)*2) - (parseInt(SPD_Gym)*2);
    var BSPD = yokai.baseA_Speed + (yokai.baseB_Speed - yokai.baseA_Speed + parseInt(SPD_IV)) * (LVL - 1) / 98 + SPD_EV * (1+LVL/198) + (parseInt(SPD_Gym)*5) - (parseInt(SPR_Gym)*2) - (parseInt(DEF_Gym)*2);
	return [BHP, BSTR, BSPR, BDEF, BSPD]
}

function UpdateDisplay(BHP, BSTR, BSPR, BDEF, BSPD){
	let span_style = 'padding: 0px 6px; color: white; background-color: #ffe327; border-radius: 15px; -webkit-text-stroke-width: 1.6px;'
	document.getElementById('yokai-max-hp').innerHTML = `<span style="${span_style}-webkit-text-stroke-color: #a14290;">HP</span> ${Math.round(BHP)}`;
	document.getElementById('yokai-strength').innerHTML = `<span style="${span_style}-webkit-text-stroke-color: #9b3232;">STR</span> ${Math.round(BSTR)}`;
	document.getElementById('yokai-spirit').innerHTML = `<span style="${span_style}-webkit-text-stroke-color: #70329b;">SPR</span> ${Math.round(BSPR)}`;
	document.getElementById('yokai-defense').innerHTML = `<span style="${span_style}-webkit-text-stroke-color: #1a46bc">DEF</span> ${Math.round(BDEF)}`;
	document.getElementById('yokai-speed').innerHTML = `<span style="${span_style}-webkit-text-stroke-color: #184f16;">SPD</span> ${Math.round(BSPD)}`;
}

function showYokaiDetails(Yokai_Data) {
		
	yokai = Yokai_Data[0]
		
	if (yokai.isNotBoss == 1){
		var attack = Yokai_Data[1]
		
		var technique = Yokai_Data[2]
		
		var skill = Yokai_Data[3]
		
		var inspirit = Yokai_Data[4]
		
		var soultimate = Yokai_Data[5]
		
		var [BHP, BSTR, BSPR, BDEF, BSPD] = [0,0,0,0,0]
		
		var YokaiRarity = document.createElement("div");
		
		var alliegance = document.createElement("div")
		
		var RarityImg = document.createElement("img")
		
		var ExtraAlliegance = ""
		
		if (yokai.IsRare){
			RarityImg.src=`Content/Graphics/Rarities/${Rarities.Rare}`
			RarityImg.style="width:150px; height:21px"
			YokaiRarity.appendChild(RarityImg)
		}
		if (yokai.IsLegendary){
			RarityImg.src=`Content/Graphics/Rarities/${Rarities.Legendary}`
			RarityImg.style="width:150px; height:21px"
			YokaiRarity.appendChild(RarityImg)
		}
		if (yokai.IsClassic){
			RarityImg.src=`Content/Graphics/Rarities/${Rarities.Classic}`
			RarityImg.style="height:40px;"
			YokaiRarity.appendChild(RarityImg)
		}
		var LegalAlliancesNums=[7,3]
		if (LegalAlliancesNums.includes(yokai.LegalAlliances) == false){
			if (yokai.isNotTypeRare==0){
				Path_Artwork = `${Path_Artwork}Rare/`
			}
			const fleshy_button = document.createElement("button")
	
			fleshy_button.id = ("fleshy-btn")
			
			fleshy_button.style = "background-image: url('Content/Graphics/Rarities/Fleshy.png'); background-size: cover; border: none; width: 49px; height: 26px"
			
			const bony_button = document.createElement("button");
			
			bony_button.id = ("bony-btn")
			
			bony_button.style = "background-image: url('Content/Graphics/Rarities/Bony.png'); background-size: cover; border: none; width: 49px; height: 26px"
			
			if (yokai.LegalAlliances == 1){
				if (rareVariant_ParamID==null){bony_button.style.display="none";}
				else{
				fleshy_button.style.opacity = 0.7
				}
				fleshy_button.disabled = true
			}
			else{
				if (rareVariant_ParamID==null){fleshy_button.style.display="none";}
				else{
				bony_button.style.opacity = 0.7
				}
				bony_button.disabled = true
			}
			
			alliegance.append(bony_button, fleshy_button)
		}
		
		if (typeof attack == 'undefined'){
			attack = {Command: "ERROR", Lv10_power: "ERROR"}
			console.error("Cannot read properties of undefined. Perhaps the attack isn't written in the dictionary of yokai?")
		}
		if (typeof technique == 'undefined'){
			technique = {Command: "ERROR", Element: "ERROR"}
			console.error("Cannot read properties of undefined. Perhaps the technique isn't written in the dictionary of yokai?")
		}
		var technique_element = ""
		
		if (technique.Element != null){
			technique_element = ` | Technique Element: ${technique.Element} <img style="height:20px; width: auto;"src="Content/Graphics/Elements/InGameIcons/${technique.Element}.png" alt="ElementImg">`
		}
		let stat_style = 'font-size: 25px; margin-left: 25px;'
		let container_style = "background-color: var(--side-buttons-bg); border-radius: 25px;"
		const details = `
			<h1 style="display: flex;${container_style}; align-self: center; padding: 16px; justify-content: center;">${yokai.Name} (${yokai.Tier})</h1>
			<h3 style="display: flex; align-items: center;">${YokaiRarity.innerHTML}</h3>
			<div>${alliegance.innerHTML}</div>
			
			<div style="display: flex; flex-direction: row; align-items: center">
			<div style="background-color: var(--side-buttons-bg); border-radius: 50%; padding: 20px; height: 200px; width: 200px; overflow: hidden;"><img id='yokai-img' src="${Path_Artwork}${yokai.Artwork_Image}" alt="${yokai.Name}" height="100%" width="auto"></div>
			<div style="display: grid; padding-left: 20px; gap: 20px; justify-content: center;">
			<div style="display: flex; ${container_style}">
			<p id="yokai-max-hp" style="${stat_style}">HP</p>
			<p id="yokai-strength" style="${stat_style}">STR</p>
			<p id="yokai-spirit" style="${stat_style}">SPR</p>
			<p id="yokai-defense" style="${stat_style}">DEF</p>
			<p id="yokai-speed" style="${stat_style}; margin-right: 25px">SPD</p>
			</div>
			<div style="display: flex; background-color: var(--side-buttons-bg); border-radius: 25px; justify-content: center;">
			<p style="display: flex; align-items: center; gap: 5px; ${stat_style}">Rank: <img style="width:25px; height:auto" src="Content/Graphics/Ranks/DictionaryRanks/Rank_${Ranks[yokai.Rank]}_icon.png"></p>
			<p style="display: flex; align-items: center; gap: 5px; ${stat_style}">Tribe: ${Tribes[yokai.Tribe]} <img style="width:35px; height:auto"src="Content/Graphics/tribes/${Tribes[yokai.Tribe]}.png"></p>
			</div>
			</div style="display: column; flex-direction: row; align-items: center">
			</div>
			
			<div style="${container_style}; padding: 16px; align-self: center; margin-top: 10px;">${(yokai.MedalliumDescription).replaceAll('\\n','\n')}</div>
			
			<h4>Level <input id="yokai-level" type="text" value="${CurrentLVL}" placeholder="60"> Stats:</h4>
			
			<div style="${container_style}; margin:20px 0px; padding-left: 10px; display: grid; gap: 1px;">
			<p><a href="./MoveiInfoPage.html?moveType=0&id=${attack.ID}" style="color:var(--side-buttons-color)">Attack: ${attack.Command}</a> | Attack Power: ${attack.Lv10_power} | Attack Probability: ${yokai.BaseAttackPercent}%</p>
			<p><a href="./MoveiInfoPage.html?moveType=1&id=${technique.ID}" style="color:var(--side-buttons-color)">Technique: ${technique.Command}</a>${technique_element} | Technique Power: ${technique.Lv10_power} | Technique Probability: ${yokai.BaseTechniquePercent}%</p>
			<p style="display: flex; align-items: center;"><a href="./MoveiInfoPage.html?moveType=2&id=${inspirit.ID}" style="color:var(--side-buttons-color)">Inspirit: ${inspirit.Command}</a> | description: ${inspirit.Effect[0].EffectDesc} <img style="position: relative;"src="Content/Graphics/InspiritImages/${inspirit.image}"> | Inspirit Probability: ${yokai.BaseInspiritPercent}%</p>
			<p><a href="./MoveiInfoPage.html?moveType=4&id=${skill.ID}" style="color:var(--side-buttons-color)" id="skill-name">Skill: ${skill.Name}</a></p>
			<p id="skill-desc">Skill Description: ${(skill.Description).replaceAll('\\n','\n')}</p>
			<p>Guard Probability: ${yokai.BaseGuardPercent}%</p>
			<p><a href="./MoveiInfoPage.html?moveType=3&id=${soultimate.ID}" style="color:var(--side-buttons-color)">Soultimate: ${soultimate.Command}</a> | Soultimate Power: ${soultimate.Lv10_power} | Soultimate Charge Rate: ${soultimate.Lv10_soul_charge}</p>
			</div>
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
			<div style="${container_style}; margin:20px 0px; padding-left: 10px;">
			<p>Base A HP: ${yokai.baseA_HP} | Base B HP: ${yokai.baseB_HP}</p>
			<p>Base A STR: ${yokai.baseA_Strength} | Base B STR: ${yokai.baseB_Strength}</p>
			<p>Base A SPR: ${yokai.baseA_Spirit} | Base B SPR: ${yokai.baseB_Spirit}</p>
			<p>Base A DEF: ${yokai.baseA_Defense} | Base B DEF: ${yokai.baseB_Defense}</p>
			<p>Base A SPD: ${yokai.baseA_Speed} | Base B SPD: ${yokai.baseB_Speed}</p>
			</div>
		`;
		document.getElementById('yokai-details').innerHTML = details;
		
		var skill_name = document.getElementById("skill-name")
		
		var skill_desc = document.getElementById("skill-desc")
		
		var bony_button = document.getElementById("bony-btn")
		
		var fleshy_button = document.getElementById("fleshy-btn")
		
		if (bony_button){
		fleshy_button.addEventListener("click", function() {
			bony_button.style.opacity = 0.7
			fleshy_button.style.opacity = 1
			if (yokai.isNotTypeRare==0){window.location.assign(`./YoKaiInfoPage.html?yokai=${NormalVariant_ParamID}`)}
			else{window.location.assign(`./YoKaiInfoPage.html?yokai=${rareVariant_ParamID}`)}
		});
		
		bony_button.addEventListener("click", function() {
			bony_button.style.opacity = 1
			fleshy_button.style.opacity = 0.7
			if (yokai.isNotTypeRare==0){window.location.assign(`./YoKaiInfoPage.html?yokai=${NormalVariant_ParamID}`)}
			else{window.location.assign(`./YoKaiInfoPage.html?yokai=${rareVariant_ParamID}`)}
		});
		}
		
}
	else{
		let stat_style = 'font-size: 25px; margin-left: 25px;'
		let container_style = "background-color: var(--side-buttons-bg); border-radius: 25px;"
		const details = `
			<h1 style="display: flex;${container_style}; align-self: center; padding: 16px; justify-content: center;">${yokai.Name}</h1>
			
			<div style="display: flex; flex-direction: row; align-items: center">
			<div style="background-color: var(--side-buttons-bg); border-radius: 50%; padding: 20px; height: 200px; width: 200px; overflow: hidden;"><img id='yokai-img' src="${Path_Artwork}Boss/${yokai.Artwork_Image}" alt="${yokai.Name}" height="100%" width="auto"></div>
			<div style="display: grid; padding-left: 20px; gap: 20px; justify-content: center;">
			<div style="display: flex; ${container_style}">
			<p id="yokai-max-hp" style="${stat_style}">HP</p>
			<p id="yokai-strength" style="${stat_style}">STR</p>
			<p id="yokai-spirit" style="${stat_style}">SPR</p>
			<p id="yokai-defense" style="${stat_style}">DEF</p>
			<p id="yokai-speed" style="${stat_style}; margin-right: 25px">SPD</p>
			</div>
			<div style="display: flex; background-color: var(--side-buttons-bg); border-radius: 25px; justify-content: center;">
			<p style="display: flex; align-items: center; gap: 5px; ${stat_style}">Rank: <img style="width:25px; height:auto" src="Content/Graphics/Ranks/DictionaryRanks/Rank_${Ranks[yokai.Rank]}_icon.png"></p>
			<p style="display: flex; align-items: center; gap: 5px; ${stat_style}">Tribe: ${Tribes[yokai.Tribe]} <img style="width:35px; height:auto"src="Content/Graphics/tribes/${Tribes[yokai.Tribe]}.png"></p>
			</div>
			</div style="display: column; flex-direction: row; align-items: center">
			</div>
			
			<div style="${container_style}; padding: 16px; align-self: center; margin-top: 10px;">${(yokai.MedalliumDescription).replaceAll('\\n','\n')}</div>
			
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
			<div style="${container_style}; margin:20px 0px; padding-left: 10px;">
			<p>Base A HP: ${yokai.baseA_HP} | Base B HP: ${yokai.baseB_HP}</p>
			<p>Base A STR: ${yokai.baseA_Strength} | Base B STR: ${yokai.baseB_Strength}</p>
			<p>Base A SPR: ${yokai.baseA_Spirit} | Base B SPR: ${yokai.baseB_Spirit}</p>
			<p>Base A DEF: ${yokai.baseA_Defense} | Base B DEF: ${yokai.baseB_Defense}</p>
			<p>Base A SPD: ${yokai.baseA_Speed} | Base B SPD: ${yokai.baseB_Speed}</p>
			</div>
		`;
		document.getElementById('yokai-details').innerHTML = details;
	}
		
	const levelInput = document.getElementById('yokai-level');
	levelInput.addEventListener('input', function(event) {
		CurrentLVL = event.target.value;
		updateYokaiStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, STR_Gym, SPR_Gym, DEF_Gym, SPD_Gym);
	});
	
	var yokai_image = document.getElementById("yokai-img")
	
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

loadScripts(Databases, () => {
	var Yokai_Data = LoadStats(yokaiDatabase,abilitiesDatabase,yokaiSameKindDatabase)
	showYokaiDetails(Yokai_Data)
    console.log("All databases loaded. Initializing game...");
});