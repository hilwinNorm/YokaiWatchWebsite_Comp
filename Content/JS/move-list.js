const YokaiDataPage = document.getElementById("yokaidata-page");

const attack_btn = document.getElementById("attack-btn");
const technique_btn = document.getElementById("technique-btn");
const inspirit_btn = document.getElementById("inspirit-btn");
const soultimate_btn = document.getElementById("soultimate-btn");
const skill_btn = document.getElementById("skill-btn");


const anhrStyle =
    "margin: 0 6px; color: var(--side-buttons-color);";


const pathGraphics = "Content/Graphics/";


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


const GenericInspiritIDs = {
    "0x61999483": "STR_Buff",
    "0x169EA415": "STR_Buff",
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


let attack_list = [];
let technique_list = [];
let inspirit_list = [];
let soultimate_list = [];
let skill_list = [];

let included_skill_list = [];


function getMoveName(move) {
	
	let text = move.SkillConfig?.Text;
	
	if(text && text.length != 0){
		return text;
	}
	return "Unknown Name";
}


function getMoveID(move, key) {

    return move.BattleCommandID ??
           key;
}


function getLevelPower(move, level) {

    const skillConfig = move.SkillConfig;

    if (!skillConfig) return null;

    const growthIndex = skillConfig.SkillGrowthIndex;

    if (!growthIndex || !moveGrowthList[growthIndex - 1]) return null;

    const multiplier = moveGrowthList[growthIndex - 1].powerLevelMulti[level - 1];

    if (multiplier == null ||
        skillConfig.BasePower == null) {
        return null;
    }

    return Math.floor(
        skillConfig.BasePower *
        multiplier /
        100
    );
}


function getSoultimateCharge(move, level) {

    const skillConfig = move.SkillConfig;

    if (!skillConfig) {
        return null;
    }

    const tier =
        skillConfig.SoultChargeTier;

    const growthIndex =
        skillConfig.SkillGrowthIndex;


    if (!tier ||
        !growthIndex ||
        !soultimateChargeList[tier - 1] ||
        !moveGrowthList[growthIndex - 1]) {
        return null;
    }


    const multiplier =
        moveGrowthList[growthIndex - 1]
            .soultChargeMulti[level - 1];

    if (multiplier == null) {
        return null;
    }


    return Math.floor(
        soultimateChargeList[tier - 1] *
        multiplier /
        100
    );
}


function createMoveDiv(content, fontSize = "125%") {

    const divMain =
        document.createElement("div");

    divMain.className =
        "MiniYokaiInfo-div";


    divMain.style = `
        width: auto;
        min-height: 80px;
        margin: 5px;
        border: 1px solid #000;
        display: flex;
        place-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: ${fontSize};
        padding: 10px;
    `;


    divMain.innerHTML = content;

    return divMain;
}


function createElementHTML(element) {

    if (element == null ||
        element === 0) {
        return "";
    }


    const name =
        elementList[element] ?? element;


    return `
        | Element: ${name}

        <img
            style="
                height:20px;
                width:auto;
                margin-left:3px;
                margin-right:3px;
            "
            src="${pathGraphics}elements/InGameIcons/${name}.png"
            alt="Element"
        >
    `;
}


function createMoveLink(moveType, key, move) {

    const id = getMoveID(move, key);

    const name = getMoveName(move);


    return `
        <a
            style="${anhrStyle}"
            href="./move-data.html?moveType=${moveType}&id=${encodeURIComponent(id)}"
        >
            ${name}
        </a>
    `;
}

function buildAttackList() {

    attack_list = [];


    delete attackDatabase["0x00000000"];


    for (const [key, attack] of Object.entries(attackDatabase)) {

        const powerLv1 =
            getLevelPower(attack, 1);

        const powerLv10 =
            getLevelPower(attack, 10);


        const content = `
            Name:
            ${createMoveLink(0, key, attack)}

            | LVL 1 Power:
            ${powerLv1 ?? "None"}

            | LVL 10 Power:
            ${powerLv10 ?? "None"}

            | Number of Hits:
            ${attack.HitsPerTarget ?? "None"}
        `;


        attack_list.push(
            createMoveDiv(content)
        );
    }
}
function buildTechniqueList() {

    technique_list = [];


    delete techniqueDatabase["0x00000000"];


    for (const [key, technique] of Object.entries(techniqueDatabase)) {

        const powerLv1 =
            getLevelPower(technique, 1);

        const powerLv10 =
            getLevelPower(technique, 10);


        const element =
            createElementHTML(
                technique.SkillConfig?.Element
            );


        const content = `
            Name:
            ${createMoveLink(1, key, technique)}

            ${element}

            | LVL 1 Power:
            ${powerLv1 ?? "None"}

            | LVL 10 Power:
            ${powerLv10 ?? "None"}

            | Number of Hits:
            ${technique.HitsPerTarget ?? "None"}
        `;


        technique_list.push(
            createMoveDiv(content)
        );
    }
}
function buildInspiritList() {

    inspirit_list = [];


    delete inspiritDatabase["0x00000000"];


    for (const [key, inspirit] of Object.entries(inspiritDatabase)) {

        const skillConfig =
            inspirit.SkillConfig;


        let inspiritType =
            "Unknown";


        let inspiritTier =
            "Unknown";


        /*
         * Inspirit information comes from the
         * Steff referenced by Steff1.
         */

        const steff =
            steffInfoDatabase?.[inspirit.Steff1];


        if (steff) {

            inspiritType =
                GenericInspiritIDs[steff.EffectID]
                ?.replaceAll("_", " ")
                ?? steff.EffectID;


            if (steff.FloatB != null) {
                inspiritTier =
                    Math.floor(steff.FloatB);
            }
        }


        const content = `
            Name:
            ${createMoveLink(2, key, inspirit)}

            | Inspirit Type:
            ${inspiritType}

            | Inspirit Tier:
            ${inspiritTier}

            | Description:
            <div id="div-desc">
                ${(skillConfig?.Description ?? "None")
                    .replaceAll("\\n", " ")}
            </div>
        `;


        inspirit_list.push(
            createMoveDiv(content)
        );
    }
}


function buildSoultimateList() {

    soultimate_list = [];


    delete soultimateDatabase["0x00000000"];


    for (
        const [key, soultimate]
        of Object.entries(soultimateDatabase)
    ) {

        const powerLv1 =
            getLevelPower(soultimate, 1);

        const powerLv10 =
            getLevelPower(soultimate, 10);


        const chargeLv1 =
            getSoultimateCharge(soultimate, 1);

        const chargeLv10 =
            getSoultimateCharge(soultimate, 10);


        const element =
            createElementHTML(
                soultimate.SkillConfig?.Element
            );


        const content = `
            Name:
            ${createMoveLink(3, key, soultimate)}

            | LVL 1 Power:
            ${powerLv1 ?? "None"}

            | LVL 10 Power:
            ${powerLv10 ?? "None"}

            | LVL 1 Charge:
            ${chargeLv1 ?? "None"}

            | LVL 10 Charge:
            ${chargeLv10 ?? "None"}

            | Number of Hits:
            ${soultimate.HitsPerTarget ?? "None"}

            ${element}
        `;


        soultimate_list.push(
            createMoveDiv(content, "95%")
        );
    }
}


function buildSkillList() {

    skill_list = [];
    included_skill_list = [];


    for (
        const [key, yokai]
        of Object.entries(yokaiDatabase)
    ) {

        if (yokai.LegalAlliances == 0) {
            continue;
        }


        const skill =
            abilitiesDatabase[yokai.SkillID];


        if (!skill) {
            continue;
        }

        const skillID =
            skill.ID ??
            skill.SkillID ??
            yokai.SkillID ??
            key;


        if (included_skill_list.includes(skillID)) {
            continue;
        }


        const skillName =
            skill.Name ??
            skill.Text ??
            "Unknown Skill";


        const description =
            skill.Description ??
            skill.SkillConfig?.Description ??
            "";


        const content = `
            Name:

            <a
                style="${anhrStyle}"
                href="./skill-data.html?id=${encodeURIComponent(skillID)}"
            >
                ${skillName}
            </a>

            | Description:

            <div id="div-desc">
                ${description.replaceAll("\\n", " ")}
            </div>
        `;


        skill_list.push(
            createMoveDiv(content, "140%")
        );


        included_skill_list.push(skillID);
    }
}


function ShowYokaiData(data) {

    YokaiDataPage.innerHTML = "";


    for (const element of data) {

        YokaiDataPage.appendChild(element);
    }
}


buildAttackList();
buildTechniqueList();
buildInspiritList();
buildSoultimateList();
buildSkillList();


if (attack_btn) {
    attack_btn.onclick =
        () => ShowYokaiData(attack_list);
}


if (technique_btn) {
    technique_btn.onclick =
        () => ShowYokaiData(technique_list);
}


if (inspirit_btn) {
    inspirit_btn.onclick =
        () => ShowYokaiData(inspirit_list);
}


if (soultimate_btn) {
    soultimate_btn.onclick =
        () => ShowYokaiData(soultimate_list);
}


if (skill_btn) {
    skill_btn.onclick =
        () => ShowYokaiData(skill_list);
}


ShowYokaiData(attack_list);