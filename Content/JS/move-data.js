function loadScript(src, callback) {
	
    const existingGlobals = Object.keys(window);
	
    const script = document.createElement('script');
    script.src = pathDatabase + src;
    script.async = true;

    script.onload = () => {
        const newGlobals = Object.keys(window).filter(key => !existingGlobals.includes(key));
		
		const detectedData = newGlobals.length > 0 ? window[newGlobals[0]] : null;
		
		if (callback) callback(detectedData, newGlobals);
    };

    script.onerror = () => {
        console.error(`Error loading database: ${src}`);
    };

    document.head.appendChild(script);
}


const pathDatabase = "Content/JS/Databases/";
const pathGraphics = "Content/Graphics/";
const pathArtwork = "Content/Graphics/YokaiMedals/"

const moveDatabases = [
    'AttackDatabase.js',
    'TechniqueDatabase.js',
    'InspiritDatabase.js',
    'SoultimateDatabase.js',
    'YokaiAbilitiesDatabase.js'
];


const GenericInspiritIDs = {
    "0x61999483": "STR_Buff",
    "0x169EA415": "SPR_Buff",
    "0x8F97F5AF": "DEF_Buff",
    "0xF890C539": "SPD_Buff",
    "0x66F4509A": "ALL_Buff",
    "0x605BFEB4": "STR_Debuff",
    "0x175CCE22": "SPR_Debuff",
    "0x8E559F98": "DEF_Debuff",
    "0xF952AF0E": "SPD_Debuff",
    "0x67363AAD": "ALL_Debuff",
    "0x63DF2ADA": "Attract",
    "0x14D81A4C": "Stealth",
    "0x62792C28": "Recover",
    "0x8AD8E32A": "Scatter",
    "0x64D68206": "Loaf",
    "0xFDDFD3BC": "Poison",
    "0x13D1B290": "Confuse"
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

const effectTarget = ["Enemy", "Ally", "Itself", "Itself (All Ally in front if multitarget)", "Enemy and Ally"];

const effectTargetAmount = ["Unitarget", "Multitarget", "Unknown", "Yokai both in back and front", "Yokai in front"];

const prefixArray = ['c','d','i','m','r','x','y','z'];


const urlParams = new URLSearchParams(window.location.search);

const databaseType = parseInt(urlParams.get('moveType'));
const moveID = urlParams.get('id');

function steffSig(move, keys = ['EffectID', 'Effect7', 'Effect8']) {
    const parts = [];
    for (const sk of ['Steff1', 'Steff2', 'Steff3', 'Steff4']) {
        const id = move[sk];
        if (id === -1 || id == null || !steffInfoDatabase[id]) continue;
        const info = steffInfoDatabase[id];
        parts.push(keys.map(k => info[k]).join('|'));
    }
    return parts.join(';') + '#' + move.SkillConfig.element;
}

function setText(id, text) {
    const element = document.getElementById(id);
	//console.debug(id);
	if (text) text = formatText(text);

    if (element) {
        element.innerText = text ?? "None";
    }
}


function setHTML(id, html) {
    const element = document.getElementById(id);

    if (element) {
        element.innerHTML = html;
    }
}


function formatText(text) {
    if (text === null || text === undefined || text === "") {
        return "None";
    }

    return String(text).replaceAll('\\n', '\n');
}

function createYokaiLink(key, yokai) {

    const yokaiImg = document.createElement('img');
	
	const prefix = yokai.FileNamePrefix;
	const number = (yokai.FileNameNumber).toString();
	const variant = (yokai.FileNameVariant).toString();

    //yokaiImg.src = `${pathArtwork}${prefixArray[prefix]}${number.padStart(3,'0')}${variant.padStart(2,'0')}0.png`;
    yokaiImg.src = `${pathArtwork}y${String(yokai.MedalPosX + yokai.MedalPosY * 23).padStart(3, '0')}.webp`;
    yokaiImg.alt = yokai.Name;
    yokaiImg.title = yokai.Name;

    yokaiImg.style = "cursor: pointer; width: 50px; height: auto;";

    const link = document.createElement('a');

    link.href = `./yokai-data.html?yokai=${key}`;

    link.appendChild(yokaiImg);

    return link;
}

function findOwnerYokai(database, move,legal=1){
	const ownerYokai = document.getElementById('owner-yokai-list');

    ownerYokai.innerHTML = "";

    const yokaiList = [];

    for (const [key, yokai] of Object.entries(yokaiDatabase)) {

        if(legal){
			if (yokai.InMedallium == 0 || yokai.LegalAlliances == 0 || yokai.IsCharaSameKindNotUsed == 0) continue;
		}

        let yokaiMove = null;
		
        switch (databaseType) {

            case 0:
                yokaiMove = database[yokai.AttackID];
                break;

            case 1:
                yokaiMove = database[yokai.TechniqueID];
                break;

            case 2:
                yokaiMove = database[yokai.InspiritID];
                break;

            case 3:
                yokaiMove = database[yokai.SoultimateBtlCommandID];
                break;

            default:
                break;
        }
		
        if (!yokaiMove) continue;
        
		if (yokaiMove.BattleCommandID !== move.BattleCommandID) continue;

        yokaiList.push({
            offset: yokai.MedalliumOffset,
            element: createYokaiLink(key, yokai)
        });
    }


    yokaiList.sort((a, b) => Number(a.offset) - Number(b.offset));
	
    for (const yokai of yokaiList) {
        ownerYokai.appendChild(yokai.element);
    }
	
    console.log("Owner Yo-kai list:", yokaiList);
}

function findRelatedYokai(database, move) {

    const relatedYokai = document.getElementById('related-yokai-list');

    relatedYokai.innerHTML = "";

    const yokaiList = [];

    for (const [key, yokai] of Object.entries(yokaiDatabase)) {

        if (yokai.InMedallium == 0 || yokai.LegalAlliances == 0 || yokai.IsCharaSameKindNotUsed == 0) continue;

        let yokaiMove = null;
		
        switch (databaseType) {

            case 0:
                yokaiMove = database[yokai.AttackID];
                break;

            case 1:
                yokaiMove = database[yokai.TechniqueID];
                break;

            case 2:
                yokaiMove = database[yokai.InspiritID];
                break;

            case 3:
                yokaiMove = database[yokai.SoultimateBtlCommandID];
                break;

            default:
                break;
        }
		
        if (!yokaiMove) continue;

        if (databaseType === 0 || databaseType === 1) {
			
            if (yokaiMove.BattleCommandID !== move.BattleCommandID) continue;
        }
        else if (databaseType === 2) {
			
            if (steffInfoDatabase[move.Steff1].EffectID !== steffInfoDatabase[yokaiMove.Steff1].EffectID
				|| steffInfoDatabase[move.Steff1].Effect7 !== steffInfoDatabase[yokaiMove.Steff1].Effect7
				|| steffInfoDatabase[move.Steff1].Effect8 !== steffInfoDatabase[yokaiMove.Steff1].Effect8
				|| steffInfoDatabase[move.Steff1].FloatB !== steffInfoDatabase[yokaiMove.Steff1].FloatB) continue;
        }
        else if (databaseType === 3) {

            if (steffSig(yokaiMove) !== steffSig(move)
				|| yokaiMove.SkillConfig.Element !== move.SkillConfig.Element) continue;
        }


        yokaiList.push({
            offset: yokai.MedalliumOffset,
            element: createYokaiLink(key, yokai)
        });
    }


    yokaiList.sort((a, b) => Number(a.offset) - Number(b.offset));
	
    for (const yokai of yokaiList) {
        relatedYokai.appendChild(yokai.element);
    }
	
    console.log("Related Yo-kai:", yokaiList);
}

function showMoveDetails(database, move) {

    if (!move) {
        setText('move-name','Move not found');
        return;
    }

    const skillConfig = move.SkillConfig;
	
	const steffList = [move.Steff1, move.Steff2, move.Steff3, move.Steff4];
	
	const steff1 = steffInfoDatabase[move.Steff1];
	
	let elementText = "";
	
	if(skillConfig?.Element) {$("move-element-img").src = `Content/Graphics/elements/InGameIcons/${elementList[skillConfig.Element]}.png`; 
		elementText=`(${elementList[skillConfig.Element]})`};

    setText('move-name',skillConfig?.Text || move.Text || "Unknown Move");

    setText('move-id',`Battle Command ID: ${move.BattleCommandID}`);

    setText('move-text',`Text: ${skillConfig.Text ?? "None"}`);

    setText('move-text-id',`Text ID: ${move.TextID ?? "None"}`);
	
    setText('move-description',`Description: ${skillConfig?.Description || "None"}`);

    setText('move-description-id',`Description ID: ${skillConfig?.DescID ?? "None"}`);

    setText('skill-config-id',`Skill Config ID: ${move.SkillConfigID ?? "None"}`);

    setText('skill-growth-index',`Skill Growth Index: ${skillConfig?.SkillGrowthIndex ?? "None"}`);

    setText('soult-charge-tier',`Soultimate Charge Tier: ${skillConfig?.SoultChargeTier ?? "None"}`);

    setText('torituku-index',`Torituku Info Index: ${skillConfig?.ToritukuInfoIndex ?? "None"}`);

    setText('effect-behaviour-mask',`Effect Behaviour Bit Mask: ${move.EffectBehaviourBitMask.toString(2).padStart(27, "0") ?? "None"}`);

    setText('battle-command-cond',`Battle Command Condition: ${move.BattleComamndCond ?? "None"}`);

    setText('animation-speed',`Animation Speed: ${move.AnimSpeed ?? "None"}`);

    setText('texture-name',`Texture Name: ${move.TextureName ?? "None"}`);

    setText('move-hit-amount',`Number of Hits: ${move.HitsPerTarget ?? "None"}`);

    if (databaseType != 2) {
		const attackLv1 = Math.floor(skillConfig.BasePower * moveGrowthList[skillConfig.SkillGrowthIndex - 1].powerLevelMulti[0]/100);
		const attackLv10 = Math.floor(skillConfig.BasePower * moveGrowthList[skillConfig.SkillGrowthIndex - 1].powerLevelMulti[9]/100);
		
        setText('power-lv1',`Level 1 Power: ${attackLv1 ?? "None"}`);
		
        setText('power-lv10',`Level 10 Power: ${attackLv10 ?? "None"}`);
    }
	
	if (databaseType == 3){
		$("charge-container").style.display = "block";
		const soultimateChargeLv = lvl => Math.floor(soultimateChargeList[skillConfig.SoultChargeTier - 1] 
			* moveGrowthList[skillConfig.SkillGrowthIndex - 1].soultChargeMulti[lvl]/100);
		const soultimateChargeLv1 = soultimateChargeLv(0);
		const soultimateChargeLv10 = soultimateChargeLv(9);
		
        setText('charge-lv1',`Level 1 Soutlimate Charge: ${soultimateChargeLv1 ?? "None"}`);
		
        setText('charge-lv10',`Level 10 Soutlimate Charge: ${soultimateChargeLv10 ?? "None"}`);
	}

    if (databaseType != 2) {
        setText('move-base-power',`Base Power: ${skillConfig.BasePower ?? "None"}`);
		
		setHTML('move-element',`Element: ${skillConfig.Element ?? "None"} ${elementText}`);
		
		$("inspirit-container").style.display = "none";
	}
	else{
		$("inspirit-container").style.display = "block";
		
		$("power-container").style.display = "none";
		
		$("move-base-power").style.display = "none";
		
		$("move-element-container").style.display = "none";
		
		let inspiritPrecision = ``;
	
		if (steff1.FloatE != 0) inspiritPrecision = `| Inspirit Precision Multiplier: ${steff1.FloatE}`;
		
		const inspiritTier = Math.floor(steff1.FloatB);
		
		$('inspirit-img').src = `Content/Graphics/InspiritImages/${GenericInspiritIDs[steff1.EffectID]}.png`;
		
		setText('inspirit-type', `Inspirit Type: ${GenericInspiritIDs[steff1.EffectID].replaceAll('_', ' ')}`);
		
		if(inspiritPrecision) setText('inspirit-precision', `Precision Multiplier: ${inspiritPrecision}`);
		else $("inspirit-precision").style.display = "none";
		
		setText('inspirit-tier', `Inspirit Tier: ${inspiritTier}`);
	}

	for (let i = 1; i <= steffList.length; i++){
		const steff = steffList[i-1];
		if(steff != -1){
			const steffEffect = steffInfoDatabase[steff];
			//console.debug(`steff-${i}-effectID`);
			$(`steff-${i}-effectID`).style.display = "block";
			$(`steff-${i}-target`).style.display = "block";
			$(`steff-${i}-amount`).style.display = "block";
			setText(`steff-${i}-effectID`, "Effect ID: "+steffEffect.EffectID);
			setText(`steff-${i}-target`,`Steff ${i} Target: ${steffEffect.Effect7} (${effectTarget[steffEffect.Effect7 - 1]})`);
			setText(`steff-${i}-amount`,`Steff ${i} NºTargets: ${steffEffect.Effect8} (${effectTargetAmount[steffEffect.Effect8 - 1]})`);
		}
	}

    setText('steff-1',`Steff 1: ${move.Steff1}`);

    setText('steff-2',`Steff 2: ${move.Steff2}`);

    setText('steff-3',`Steff 3: ${move.Steff3}`);

    setText('steff-4',`Steff 4: ${move.Steff4}`);
	
	if([0,1].includes(databaseType)) findOwnerYokai(database, move);
	else if ([2,3].includes(databaseType)){
		findOwnerYokai(database, move, 0);
		document.getElementById('similar-move-title').style.display = "block";
		findRelatedYokai(database, move);
	}
	else{
		console.error("Couldn't identify move type");
	}

}
if (databaseType < 0 || databaseType >= moveDatabases.length) console.error("Invalid moveType:", databaseType);
else{
    loadScript(moveDatabases[databaseType], (database, names) => {
			//console.debug(database, names);
			
            const databaseName = moveDatabases[databaseType];

            if (!database) {
                console.error("Could not find database global:", databaseName);
                console.log(Object.keys(window));
                return;
            }
			
            const move = database[moveID];

            console.log("Database:", database);
            console.log("Move:", move);

            showMoveDetails(database, move);
        }
    );
}