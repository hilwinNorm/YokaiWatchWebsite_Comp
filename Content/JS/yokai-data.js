
function loadStats(yokaiDatabase, abilitiesDatabase, yokaiSameKindDatabase){
	
	const urlParams = new URLSearchParams(window.location.search);
	
	let yokaiData = yokaiDatabase[urlParams.get('yokai')];
	
	if (!yokaiData) return null;
	
	if (yokaiData.isNotBoss == 0) return {yokaiData};
	
	let attack, technique, skill, inspirit, soultimate;
	
	attack=attackDatabase[yokaiData?.AttackID];
	technique=techniqueDatabase[yokaiData?.TechniqueID];
	inspirit=inspiritDatabase[yokaiData?.InspiritID];
	soultimate=soultimateDatabase[yokaiData?.SoultimateBtlCommandID];
	skill = abilitiesDatabase[yokaiData?.SkillID];
	
	return {yokaiData, attack, technique, skill, inspirit, soultimate};
};

function calculateStats({ yokaiData, lvl = 60, ivHp = 16, ivStr = 8, ivSpr = 8, ivDef = 8, ivSpd = 8,
                          gymStr = 0, gymSpr = 0, gymDef = 0, gymSpd = 0,
                          evHp = 0, evStr = 0, evSpr = 0, evDef = 0, evSpd = 0 }) {
	//console.debug( yokaiData, lvl, ivHp, ivStr, ivSpr, ivDef, ivSpd, gymStr, gymSpr, gymDef, gymSpd, evHp, evStr, evSpr, evDef, evSpd);
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

function updateDisplay({baseHp = 0, baseStr = 0, baseSpr = 0, baseDef = 0, baseSpd = 0}){
	$('yokai-max-hp').innerText = Math.max(Math.floor(baseHp), 1);
	$('yokai-strength').innerText = Math.max(Math.floor(baseStr), 1);
	$('yokai-spirit').innerText = Math.max(Math.floor(baseSpr), 1);
	$('yokai-defense').innerText = Math.max(Math.floor(baseDef), 1);
	$('yokai-speed').innerText = Math.max(Math.floor(baseSpd), 1);
}

function validateAndStyleInputs(manager) {
	let ivTotal = 0;
	Object.values(manager.ivs).slice(1).forEach(iv => {
		ivTotal+=iv;
	});
	ivTotal+= Math.floor(manager.ivs.hp / 2);
	const ivValid = ivTotal === 40 && Object.values(manager.ivs).slice(1).every(v => v >= 3 && v <= 16) && (3 <= Math.floor(manager.ivs.hp / 2) <= 16);
	document.querySelectorAll(`.IV`).forEach(elem => {
		elem.style.color = ivValid ? 'var(--side-buttons-color)' : 'red';
	});

	let gymTotal = 0;
	Object.values(manager.gym).forEach(gymStat => {
		gymTotal+=gymStat;
	});
	//console.debug(gymTotal);
	const gymValid = gymTotal <= 5 && Object.values(manager.gym).every(v => v >= 0 && v <= 5);
	document.querySelectorAll(`.gym`).forEach(elem => {
		elem.style.color = gymValid ? 'var(--side-buttons-color)' : 'red';
	});
	let evTotal = 0;
	Object.values(manager.evs).forEach(ev => {
		evTotal +=ev;
	})
	const evValid = evTotal <= 20 && Object.values(manager.evs).every(v => v >= 0);
	document.querySelectorAll(`.EV`).forEach(elem => {
		elem.style.color = evValid ? 'var(--side-buttons-color)' : 'red';
	});
	//let attiduteSelect = $('attitude-select');
	//$('attitude-display').innerHTML = `HP Boost: ${attiduteDatabase[attiduteSelect.value].boost[0]} | STR Boost: ${attiduteDatabase[attiduteSelect.value].boost[1]} | SPR Boost: ${attiduteDatabase[attiduteSelect.value].boost[2]} | DEF Boost: ${attiduteDatabase[attiduteSelect.value].boost[3]} | SPD Boost: ${attiduteDatabase[attiduteSelect.value].boost[4]}`;
}

const formatText = text => text?.replaceAll('\\n','\n') ?? '';

function renderPage({
	yokaiData, 
	attack, technique, skill,
	inspirit, soultimate
	}){
	
	let pathArtwork = "Content/Graphics/Artwork/";
	
	const pathMedal = "Content/Graphics/YokaiMedals/";
	
	const pathItem = "Content/Graphics/ItemIcons/";
	
	const pathElement = el => `Content/Graphics/elements/InGameIcons/${el}.png`;
	
	const prefixArray = ['c','d','i','m','r','x','y','z'];
	
	//let allegiance = document.createElement("div");
	
	const yokaiRarityImg = $("yokai-rarity");
	
	if (yokaiData.CharaSameKind != -1){
		if (yokaiData.LegalAlliances == 1) {
			$("img-bony").src="Content/Graphics/alliances/BonySpirits0.webp";
			$("link-bony").style.pointerEvents = 'none';
		}
		else {
			$("img-fleshy").src="Content/Graphics/alliances/FleshySouls0.webp";
			$("link-fleshy").style.pointerEvents = 'none';
		}
	}
	
	if (yokaiData.IsRare) yokaiRarityImg.src=`Content/Graphics/rarities/${rarities.Rare}`;
	else if (yokaiData.IsLegendary) yokaiRarityImg.src=`Content/Graphics/rarities/${rarities.Legendary}`;
	
	if (yokaiData.IsClassic) $("yokai-isclassic").src=`Content/Graphics/rarities/${rarities.Classic}`;
		
	let techniqueElement=``;
	
	if (technique?.SkillConfig.Element != 0) techniqueElement = `<img style="height:20px; width: auto;
		"src="${pathElement(element[technique?.SkillConfig.Element])}" alt="elementImg">`
	
	let soultimateElement=``;
	
	if (soultimate?.SkillConfig.Element != 0) soultimateElement = `<img style="height:20px; width: auto;
		"src="${pathElement(element[soultimate?.SkillConfig.Element])}" alt="elementImg">`

	let tier = tierDatabase[yokaiData.ParamID] ? `(${tierDatabase[yokaiData.ParamID]})` : '';
	$("yokai-title").innerHTML = `<img src="${pathMedal}y${String(yokaiData.MedalPosX + yokaiData.MedalPosY * 23).padStart(3,'0')}.webp"> ${yokaiData.Name} ${tier}`;
	$("yokai-no").innerText = `NO.: ${(yokaiData.MedalliumOffset).toString().padStart(3,'0')}`;
	
	const prefix = yokaiData.FileNamePrefix;
	const number = (yokaiData.FileNameNumber).toString();
	const variant = (yokaiData.FileNameVariant).toString();
	$("yokai-img").src = `${pathArtwork}${prefixArray[prefix]}${number.padStart(3,'0')}${variant.padStart(2,'0')}0.png`;
	$("yokai-img").alt = `${yokaiData.Name}`;
	
	const rankImg = document.createElement("img");
	const tribeImg = document.createElement("img");
	rankImg.src = `Content/Graphics/ranks/DictionaryRanks/${ranks[yokaiData.Rank]}.png`;
	rankImg.style = `width:25px; height:auto`;
	tribeImg.src = `Content/Graphics/tribes/${tribes[yokaiData.Tribe]}.png`;
	tribeImg.style = `width:35px; height:auto`;
	
	$("yokai-rank").innerHTML = `Rank: ${rankImg.outerHTML}`;
	$("yokai-tribe").innerHTML = `Tribe: ${tribes[yokaiData.Tribe]} ${tribeImg.outerHTML}`;
	
	$("yokai-description").innerText = `${formatText(yokaiData.Description)}`;
	//$("yokai-level-input").value = `60`;
	
	const attackLink = document.createElement("a");
	const techniqueLink = document.createElement("a");
	const inspiritLink = document.createElement("a");
	//const guardLink = document.createElement("a");
	const soultimateLink = document.createElement("a");
	const skillLink = document.createElement("a");
	
	const commonItemLink = document.createElement("a");
	const rareItemLink = document.createElement("a");
	
	const commonItemImg = document.createElement("img");
	const rareItemImg = document.createElement("img");
	
	commonItemImg.style = "position: relative; width: 25px;";
	rareItemImg.style = "position: relative; width: 25px;";
	
	const hatedFoodImg = document.createElement("img");
	const favFoodImg = document.createElement("img");
	
	hatedFoodImg.style = "position: relative; width: 25px;";
	favFoodImg.style = "position: relative; width: 25px;";
	
	let favFood = null;
	let hatedFood = null;
	
	for (const food of Object.values(itemConsumeDatabase)) {
		if (!favFood && food.ItemType === yokaiData.FavFood) {
			favFood = food;
		}
		if (!hatedFood && food.ItemType === yokaiData.HatedFood) {
			hatedFood = food;
		}
		
		if (favFood && hatedFood) break;
	}
	
	if (favFood) {
		favFoodImg.src = `${pathItem}item_${(favFood.IconPosX + (favFood.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
	}
	if (hatedFood) {
		hatedFoodImg.src = `${pathItem}item_${(hatedFood.IconPosX + (hatedFood.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
	}
	
	attackLink.href = `./move-data.html?moveType=0&id=${attack?.BattleCommandID}`;
	attackLink.innerText = `Attack: ${attack?.SkillConfig.Text}`;
	techniqueLink.href = `./move-data.html?moveType=1&id=${technique?.BattleCommandID}`;
	techniqueLink.innerText = `Technique: ${technique?.SkillConfig.Text}`;
	inspiritLink.href = `./move-data.html?moveType=2&id=${inspirit?.BattleCommandID}`;
	inspiritLink.innerText = `Inspirit: ${inspirit?.SkillConfig.Text}`;
	//guardLink.href = `./move-data.html?moveType=0&id=${attack.ID}`;
	soultimateLink.href = `./move-data.html?moveType=3&id=${soultimate?.BattleCommandID}`;
	soultimateLink.innerText = `Soultimate: ${soultimate?.SkillConfig.Text}`;
	skillLink.href = `./skill-data.html?id=${skill?.SkillID}`;
	skillLink.innerText = `Skill: ${skill?.Name}`;
	
	const commonItemID = yokaiData.CommonDropItemID;
	const rareItemID = yokaiData.RareDropItemID;
	let typeIndex;
	
	let commonItem = yokaiData.CommonDropItemID
	  ? (equipmentDatabase[yokaiData.CommonDropItemID] || itemConsumeDatabase[yokaiData.CommonDropItemID]) 
	  : null;
	
	if(commonItem){
		if(equipmentDatabase[commonItemID]) typeIndex = 0;
		else if (itemConsumeDatabase[commonItemID]) typeIndex = 1;
		else typeIndex = 2;
		commonItemLink.href = `./item-data.html?item=${commonItemID}&type=${typeIndex}`;
		commonItemLink.innerText = commonItem.NounText;
		commonItemImg.src = `${pathItem}item_${(commonItem.IconPosX + (commonItem.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
	}
	
	let rareItem = yokaiData.RareDropItemID
	  ? (equipmentDatabase[yokaiData.RareDropItemID] || itemConsumeDatabase[yokaiData.RareDropItemID]) 
	  : null;
	  
	if(rareItem){
		if(equipmentDatabase[rareItemID]) typeIndex = 0;
		else if (itemConsumeDatabase[rareItemID]) typeIndex = 1;
		else typeIndex = 2;
		rareItemLink.href = `./item-data.html?item=${rareItemID}&type=${typeIndex}`;
		rareItemLink.innerText = rareItem.NounText;
		rareItemImg.src = `${pathItem}item_${(rareItem.IconPosX + (rareItem.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
	}
	
	let attackLv10, techniqueLv10, soultimateLv10, soultimateChargeLv10, inspiritSteff;
	
	if(attack) attackLv10 = Math.floor(attack.SkillConfig.BasePower * moveGrowthList[attack.SkillConfig.SkillGrowthIndex - 1].powerLevelMulti[9]/100);
	if(technique) techniqueLv10 = Math.floor(technique.SkillConfig.BasePower * moveGrowthList[technique.SkillConfig.SkillGrowthIndex - 1].powerLevelMulti[9]/100);
	if(soultimate) soultimateLv10 = Math.floor(soultimate.SkillConfig.BasePower * moveGrowthList[soultimate.SkillConfig.SkillGrowthIndex - 1].powerLevelMulti[9]/100);
	if(soultimate) soultimateChargeLv10 = Math.floor(soultimateChargeList[soultimate.SkillConfig.SoultChargeTier - 1] * moveGrowthList[soultimate.SkillConfig.SkillGrowthIndex - 1].soultChargeMulti[9]/100);
	if(inspirit) inspiritSteff = steffInfoDatabase[inspirit.Steff1];
	
	let inspiritPrecision = ``;
	
	if (inspiritSteff?.FloatE != 0) inspiritPrecision = `| Inspirit Precision Multiplier: ${inspiritSteff?.FloatE}`;
	
	let attackHits = ``;
	
	if (attack?.HitsPerTarget != 1) attackHits = `x${attack?.HitsPerTarget}`;
	
	let soultHits = ``;
	
	if (soultimate?.HitsPerTarget != 1) soultHits = `x${soultimate?.HitsPerTarget}`;
	
	if(attack){			
		$("attack").innerHTML = `${attackLink.outerHTML} (ID: ${attack.BattleCommandID})`;
		$("attack-prob").innerHTML = `Probability: ${yokaiData.BaseAttack_Percent}%`;
		$("attack-power").innerHTML = `Power: ${attackLv10}${attackHits}`;
	}
	
	if(technique){		
		$("technique").innerHTML = `${techniqueLink.outerHTML} ${techniqueElement} (ID: ${technique.BattleCommandID})`;
		$("technique-prob").innerHTML = `Probability: ${yokaiData.BaseTechnique_Percent}%`;
		$("technique-power").innerHTML = `Power: ${techniqueLv10}`;
	}
	
	if(inspirit){	
		$("inspirit").innerHTML = `${inspiritLink.outerHTML}<img style="position: relative;" 
			src="Content/Graphics/InspiritImages/${GenericInspiritIDs[inspiritSteff.EffectID]}.png">
			${inspiritPrecision} | Inspirit Level: ${Math.floor(inspiritSteff.FloatB)} 
			(ID: ${inspirit.BattleCommandID})`;
		$("inspirit-prob").innerHTML = `Probability: ${yokaiData.BaseInspirit_Percent}%`;
		$("inspirit-desc").innerHTML = `Description: ${formatText(inspirit.SkillConfig.Description)}`;
	}
	
	if(skill){
		$("skill").innerHTML = `${skillLink.outerHTML} | (ID: ${skill.SkillID})`;
		$("skill-desc").innerHTML = `Description: ${(skill.Description).replaceAll('\\n','\n')}`;
	}
	
	$("guard").innerText = `Guard Probability: ${yokaiData.BaseGuard_Percent}% | (ID: ${yokaiData.GuardID})`;
	
	if(soultimate){
		$("soultimate").innerHTML = `${soultimateLink.outerHTML}${soultimateElement} | Soultimate Power: ${soultimateLv10}${soultHits}  
														| Soultimate Charge: ${soultimateChargeLv10} | (ID: ${soultimate.BattleCommandID})`;
		$("soultimate-desc").innerHTML = `Description: ${formatText(soultimate.SkillConfig.Description)}`;
	}
	
	$("item-slots").innerText = `Equipment Slots Amount: ${yokaiData.EquipmentSlots}`;
	$("money-drop").innerText = `Money Drop: ${yokaiData.DropMoney / 100}$`;
	$("exp-drop").innerText = `Experience Drop: ${yokaiData.DropExperience}`;
	if (commonItem){
		$("common-item").innerHTML = `Common Item Drop: ${commonItemLink.outerHTML} ${commonItemImg.outerHTML} (ID: ${yokaiData.CommonDropItemID})`;
		$("common-item-chance").innerText = `Drop probability: ${yokaiData.CommonDrop_Percent}%`;
	} 
	if (rareItem){
		$("rare-item").innerHTML = `Rare Item Drop: ${rareItemLink.outerHTML} ${rareItemImg.outerHTML} (ID: ${yokaiData.RareDropItemID})`;
		$("rare-item-chance").innerText = `Drop probability: ${yokaiData.RareDrop_Percent}%`;
	} 
	$("food-quote").innerText = `General Food Quote: ${yokaiData.GeneralFoodQuoteText}`;
	$("fav-food").innerHTML = `Favourite Type of Food: ${foodTypeList[yokaiData.FavFood]} (${yokaiData.FavFood}) ${favFoodImg.outerHTML}`;
	$("fav-food-quote").innerText = `Favourite Food Quote: ${yokaiData.FavouriteFoodQuoteText}`;
	$("hated-food").innerHTML = `Hated Type of Food: ${foodTypeList[yokaiData.HatedFood]} (${yokaiData.HatedFood}) ${hatedFoodImg.outerHTML}`;
	$("hated-food-quote").innerText = `Hated Food Quote: ${yokaiData.HatedFoodQuoteText}`;
	$("loaf-quote").innerText = `Loaf Quote: ${yokaiData.LoafQuoteText}`;
	if (yokaiData.BefriendQuoteText) $("befriend-quote").innerText = `Befriend Text: ${formatText(yokaiData.BefriendQuoteText)}`;
	$("trade-quote").innerText = `Trade Text: ${formatText(yokaiData.TradeQuoteText)}`;
	if (yokaiData.CapsuleUnlockQuoteText) $("capsule-unlock-quote").innerText = `Unlock from Crank-a-kai text: ${formatText(yokaiData.CapsuleUnlockQuoteText)}`;
	$("inspirit-battle-text-type").innerText = `Inspirit Text Type: ${yokaiData.InspiritBtlTxtPersonality}`;
	if (yokaiData.CharaSameKind != -1) $("chara-same-kind").innerText = (yokaiData.IsNotTypeRare == 1 ? "Version: Normal" : "Version: Type Rare");
	if (yokaiData.WorldMapPosID != "0x00000000"){
		$("capsule-unlock-quote").innerText = `World Map Location: ${worldMapPosDatabase[yokaiData.WorldMapPosID].PositionText.Text} (ID: ${yokaiData.WorldMapPosID})`;
	}
	$("enemy-inspirit-hit-chance").innerText = `Chance of being Inspirited: ${yokaiData.BaseInspiritEvasion_Percent}%`;
	$("base-loaf-attitude").innerText = `Base Loaf Attitude: ${baseLoafAttList[yokaiData.BaseLoafAttitude]} (${yokaiData.BaseLoafAttitude})`
	$("exp-curve").innerText = `Experience Curve: ${yokaiData.ExperienceCurve}`
	
	$("fire-res").innerHTML = `Fire multiplier: x${yokaiData.FireAttributeMultiplier} <img src="${pathElement("Fire")}">`
	$("water-res").innerHTML = `Water multiplier: x${yokaiData.WaterAttributeMultiplier} <img src="${pathElement("Water")}">`
	$("lightning-res").innerHTML = `Lightning multiplier: x${yokaiData.LightningAttributeMultiplier} <img src="${pathElement("Lightning")}">`
	$("earth-res").innerHTML = `Earth multiplier: x${yokaiData.EarthAttributeMultiplier} <img src="${pathElement("Earth")}">`
	$("wind-res").innerHTML = `Wind multiplier: x${yokaiData.WindAttributeMultiplier} <img src="${pathElement("Wind")}">`
	$("ice-res").innerHTML = `Ice multiplier: x${yokaiData.IceAttributeMultiplier} <img src="${pathElement("Ice")}">`
	
	$("yokai-paramID").innerText = `Param ID: ${yokaiData.ParamID}`;
	$("yokai-baseID").innerText = `Base ID: ${yokaiData.ParamID}`;
	$("yokai-MDL").innerText = `MDL: ${prefixArray[prefix]}${number.padStart(3,'0')}${variant.padStart(2,'0')}0`;
	$("yokai-baseHP").innerText = `Base A HP: ${yokaiData.baseA_HP} | Base B HP: ${yokaiData.baseB_HP}`;
	$("yokai-baseStr").innerText = `Base A STR: ${yokaiData.baseA_Strength} | Base B STR: ${yokaiData.baseB_Strength}`;
	$("yokai-baseSpr").innerText = `Base A SPR: ${yokaiData.baseA_Spirit} | Base B SPR: ${yokaiData.baseB_Spirit}`;
	$("yokai-baseDef").innerText = `Base A DEF: ${yokaiData.baseA_Defense} | Base B DEF: ${yokaiData.baseB_Defense}`;
	$("yokai-baseSpd").innerText = `Base A SPD: ${yokaiData.baseA_Speed} | Base B SPD: ${yokaiData.baseB_Speed}`;
	
	const baseRate = yokaiData.FriendRateDescriptor[yokaiData.FriendRateDescriptor.length-1];
	const rateData = friendRateList[baseRate];
	const friendFood1 = rateData.FoodScale1/100;
	const friendFood2 = rateData.FoodScale2/100;
	const friendFood3 = rateData.FoodScale3/100;
	const friendFood4 = rateData.FoodScale4/100;
	
	$("base-friend-rate").innerText = `Base Friend Chance: ${rateData.BaseXOR == 0 ? 0 : (1/rateData.BaseXOR * 100).toFixed(2)}% (${baseRate})`;
	$("friend-food1").innerText = `Tier 1 Food Boost: +${friendFood1}% | Favourite: +${(friendFood1*1.5).toFixed(2)}% | Hated: +${(friendFood1*0.4).toFixed(2)}%`;
	$("friend-food2").innerText = `Tier 2 Food Boost: +${friendFood2}% | Favourite: +${(friendFood2*1.5).toFixed(2)}% | Hated: +${(friendFood2*0.4).toFixed(2)}%`;
	$("friend-food3").innerText = `Tier 3 Food Boost: +${friendFood3}% | Favourite: +${(friendFood3*1.5).toFixed(2)}% | Hated: +${(friendFood3*0.4).toFixed(2)}%`;
	$("friend-food4").innerText = `Tier 4 Food Boost: +${friendFood4}% | Favourite: +${(friendFood4*1.5).toFixed(2)}% | Hated: +${(friendFood4*0.4).toFixed(2)}%`;
	$("friend-popularity").innerText = `Popularity Skill Boost: +${rateData.PopularityBoost/100}%`;
	$("friend-unpopularity").innerText = `Unpopularity Skill Boost: ${rateData.UnpopularityBoost/100}%`;
	$("friend-blue-whist").innerText = `Blue Wisp Boost: +${rateData.BlueWhispBoost/100}%`;
	$("friend-gold-whist").innerText = `Golden Wisp Boost: +${rateData.GoldWhispBoost/100}%`;
	$("friend-poke").innerText = `Friend Poke Boost: +${rateData.PokeBoost/100}%`;
	$("friend-shrine").innerText = `Shrine Bonus Boost: +${rateData.ShrineBonusBoost/100}%`;
	
	$("randomact-type").innerText = `Random Act Type: ${yokaiData.CharaRandomActType}`;
	if (yokaiData.CharaRandomActType){
		const randomActData = randomAttitudeDatabase[yokaiData.CharaRandomActType-1];
		$("attitudeA").innerText = `Attitude 1: ${attiduteDatabase[randomActData.AttitudeA].text}`;
		$("attitudeA-prob").innerText = `Attitude 1 Chance: ${randomActData.ProbabilityA}%`;
		$("attitudeB").innerText = `Attitude 2: ${attiduteDatabase[randomActData.AttitudeB].text}`;
		$("attitudeB-prob").innerText = `Attitude 2 Chance: ${randomActData.ProbabilityB}%`;
		$("attitudeC").innerText = `Attitude 3: ${attiduteDatabase[randomActData.AttitudeC].text}`;
		$("attitudeC-prob").innerText = `Attitude 3 Chance: ${randomActData.ProbabilityC}%`;
		$("attitudeD").innerText = `Attitude 4: ${attiduteDatabase[randomActData.AttitudeD].text}`;
		$("attitudeD-prob").innerText = `Attitude 4 Chance: ${randomActData.ProbabilityD}%`;
	}
};

function loadYokaiData({
	yokaiData, 
	attack, technique, skill,
	inspirit, soultimate
	}) 
	{
	
	if (yokaiData.CharaSameKind != -1){
		const sameKindData = yokaiSameKindDatabase[yokaiData.CharaSameKind];
		if (Object.values(sameKindData).includes(yokaiData.ParamID)){
			
			if (yokaiDatabase[sameKindData.ParamID1].LegalAlliances==1){
				$("link-bony").href=`yokai-data.html?yokai=${sameKindData.ParamID1}`;
				$("link-fleshy").href=`yokai-data.html?yokai=${sameKindData.ParamID2}`;
			}else{
				$("link-bony").href=`yokai-data.html?yokai=${sameKindData.ParamID2}`;
				$("link-fleshy").href=`yokai-data.html?yokai=${sameKindData.ParamID1}`;
			}
			//console.debug('Pass!')
			$("link-bony").removeAttribute('hidden');
			$("link-fleshy").removeAttribute('hidden');
		}
	}
	
	renderPage({yokaiData, attack, technique, skill, inspirit, soultimate});
	
	const yokaiManager = new YokaiStatsManager({yokaiData});
	if(yokaiData.HasNoBossParts == 0) {yokaiManager.level = 0; $("yokai-level-input").value = 0}

	let attiduteSelect = $('attitude-select');
	//let attitudeDisplay = $('attitude-display');
	
	$('yokai-level-input').addEventListener('input', function(e) {
		yokaiManager.updateLevel(this.value);
	});

	document.querySelectorAll('.IV').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('iv-', '').toLowerCase();
		  yokaiManager.updateIV(stat, this.value);
		});
	});
	
	document.querySelectorAll('.gym').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('gym-', '').toLowerCase();
		  yokaiManager.updateGym(stat, this.value);
		});
	});
	
	document.querySelectorAll('.EV').forEach(input => {
		input.addEventListener('input', function(e) {
		  const stat = this.id.replace('ev-', '').toLowerCase();
		  yokaiManager.updateEV(stat, this.value);
		});
	})
	
	/*
	
	for (i = 0; i < attiduteDatabase.length; i++){
		const option = document.createElement('option');
		option.value = i;
		option.innerText = attiduteDatabase[i].name;
		if (i === yokaiManager.attitudeIndex) option.selected = true;
		attiduteSelect.appendChild(option);
	};
	
	attiduteSelect.addEventListener('change', function(event){
		yokaiManager.attitudeIndex = parseInt(this.value);
		yokaiManager.onUpdate();
	});
	*/
	//console.debug('score');
	yokaiManager.onUpdate();
};

class YokaiStatsManager {
	constructor({yokaiData, level=60}) {
    this.yokaiData = yokaiData;
    this.level = level;
    this.ivs = { hp: 16, str: 8, spr: 8, def: 8, spd: 8 };
    this.gym = { str: 0, spr: 0, def: 0, spd: 0 };
    this.attitudeIndex = 0;
    this.evs = { hp: 0, str: 0, spr: 0, def: 0, spd: 0 };
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
		if (isNaN(num) || num < 0) return null; // (IV can't be higher than 16 legally and can't be lower than 3 in comp, though possible in game)
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
		if (isNaN(num) || num < 0) return null; // Yokai can have only 5 Gym Trainings
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
			baseHp: stats.baseHp, 
			baseStr: stats.baseStr, 
			baseSpr: stats.baseSpr, 
			baseDef: stats.baseDef, 
			baseSpd: stats.baseSpd
		});
		validateAndStyleInputs(this);
	}
};

// Variables

//const $ = id => document.getElementById(id);

const GenericInspiritIDs = {"0x61999483": "STR_Buff", "0x169EA415": "SPR_Buff", "0x8F97F5AF": "DEF_Buff", "0xF890C539":"SPD_Buff", "0x66F4509A":"ALL_Buff","0x605BFEB4": "STR_Debuff", "0x175CCE22": "SPR_Debuff", "0x8E559F98": "DEF_Debuff", "0xF952AF0E":"SPD_Debuff", "0x67363AAD":"ALL_Debuff", "0x63DF2ADA": "Attract", "0x14D81A4C": "Stealth", "0x62792C28": "Recover", "0x8AD8E32A":"Scatter","0x64D68206":"Loaf","0xFDDFD3BC":"Poison", "0x13D1B290": "Confuse"};

const rarities = {
	Classic: "Rank_Classic.webp",
	Rare: "Rank_Rare.png",
	Legendary: "Rank_Legendary.png"
};

const tribes = [
	"None",
    "Brave",
    "Mysterious",
    "Tough",
    "Charming",
    "Heartful",
    "Shady",
    "Eerie",
    "Slippery",
    "Wicked"
];

const element = [
	"None",
	"Fire",
	"Water",
	"Lightning",
	"Earth",
	"Ice",
	"Wind",
	"Drain"
];

const ranks=['E','D','C','B','A','S'];

const foodTypeList = [
	"None",
	"Rice Ball",
	"Bread",
	"Candy",
	"Milk",
	"Juice",
	"Hamburger",
	"Ramen",
	"Sushi",
	"Chinese Food",
	"Unknown",
	"Veggies",
	"Meat",
	"Seafood",
	"Curry",
	"Sweeets",
	"Oden",
	"Soba",
	"Snack",
	"Chocobar"
];

const baseLoafAttList = [
	"Serious",
	"Stiff",
	"Casual",
	"Carefree",
	"Sloppy",
	"Clumsy",
	"Scared"
]

//
window.addEventListener('load', function (){
	//	Where the parameters from:
	//
	// 	yokaiDatabase	=> YoKaiDataBase.js
	// 	abilitiesDatabase	=> YokaiAbilitiesDatabase.js
	// 	yokaiSameKindDatabase	=> YokaiSameKindDatabase.js
	
	const data = loadStats(yokaiDatabase,abilitiesDatabase,yokaiSameKindDatabase);
	if (!data){
		console.error("Couldn't load Yokai data. Yokai not found"); 
		return;
	};
		
	if (typeof data.attack == 'undefined') console.error("attack is undefined.");
	if (typeof data.technique == 'undefined') console.error("technique is undefined.");
	if (typeof data.skill == 'undefined') console.error("skill is undefined.");
	if (typeof data.inspirit == 'undefined') console.error("inspirit is undefined.");
	if (typeof data.soultimate == 'undefined')console.error("soultimate is undefined.");
	
	loadYokaiData(data);
	
	console.log("All databases loaded. Initializing...");
});