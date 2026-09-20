
const pathDatabase = "Content/JS/Databases/";
const pathGraphics = "Content/Graphics/";
const pathArtwork = "Content/Graphics/YokaiMedals/";


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

const ownerList = [];

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

function findOwnerYokai(skill, legal=1){
	const ownerYokai = document.getElementById('owner-yokai-list');

    ownerYokai.innerHTML = "";

    const yokaiList = [];

    for (const [key, yokai] of Object.entries(yokaiDatabase)) {

        if(legal){
			if (yokai.InMedallium == 0 || yokai.LegalAlliances == 0) continue;
		}

        let yokaiSkill = abilitiesDatabase[yokai.SkillID];
		
        if (!yokaiSkill) continue;
        
		if (yokai.SkillID !== skill.SkillID) continue;

        yokaiList.push({
            offset: yokai.MedalliumOffset,
            element: createYokaiLink(key, yokai)
        });
		ownerList.push(key);
    }


    yokaiList.sort((a, b) => Number(a.offset) - Number(b.offset));
	
    for (const yokai of yokaiList) {
        ownerYokai.appendChild(yokai.element);
    }
	
    console.log("Owner Yo-kai list:", yokaiList);
}

function findRelatedYokai(skill) {

    const relatedYokai = document.getElementById('related-yokai-list');

    relatedYokai.innerHTML = "";

    const yokaiList = [];

    for (const [key, yokai] of Object.entries(yokaiDatabase)) {
		
		if (ownerList.includes(key)) continue;

		if (yokai.InMedallium == 0 || yokai.LegalAlliances == 0) continue;

        let yokaiSkill = abilitiesDatabase[yokai.SkillID];
		
        if (!yokaiSkill) continue;
        
		if (yokaiSkill.EffectData.length !== skill.EffectData.length) continue;
		
		let f = 0;
		
		for (let i = 0; i < skill.EffectData.length; i++){
			if (yokaiSkill.EffectData[i].EffectID !== skill.EffectData[i].EffectID){
				f=1;
				break;
			}
		}
		if (f) continue;
        yokaiList.push({
            offset: yokai.MedalliumOffset,
            element: createYokaiLink(key, yokai)
        });
    }
	
	if (yokaiList.length == 0){
		$("similar-skill-title").style.display = "none";
		return;
	}

    yokaiList.sort((a, b) => Number(a.offset) - Number(b.offset));
	
    for (const yokai of yokaiList) {
        relatedYokai.appendChild(yokai.element);
    }
	
    console.log("Related Yo-kai:", yokaiList);
}

function showSkillDetails(skill) {

    if (!skill) {
        setText('skill-name','Skill not found');
        return;
    }

    setText('skill-name', skill?.Name || "Unknown Skill Name");

    setText('skill-id',`Skill ID: ${skill.SkillID}`);

    setText('skill-text',`Text: ${skill?.Name ?? "None"}`);

    setText('skill-text-id',`Text ID: ${skill.NameID ?? "None"}`);
	
    setText('skill-description',`Description: ${skill?.Description || "None"}`);

    setText('skill-description-id',`Description ID: ${skill?.DescTextID ?? "None"}`);
	
    setText('skill-trigger-text',`Triggered Text: ${skill?.TriggeredText || "None"}`);

    setText('skill-trigger-text-id',`Triggered Text ID: ${skill?.TriggeredTextID ?? "None"}`);
	
	const effectContainer = $("effect-container");
	
	for (let i = 0; i < skill.EffectData.length; i++){
		const effect = skill.EffectData[i];
		effectContainer.innerHTML +=`
		<hr>
		<p>EffectID: ${effect.EffectID}</p>
		<p>UnkNum: ${effect.UnkNum}</p>
		<p>Unk2: ${effect.Unk2}</p>
		<p>Unk3: ${effect.Unk3}</p>
		<p>Unk4: ${effect.Unk4}</p>
		<p>Unk5: ${effect.Unk5}</p>
		<p>Unk6: ${effect.Unk6}</p>
		<p>Unk7: ${effect.Unk7}</p>
		<p>UnkNumA: ${effect.UnkNumA}</p>
		<p>C1: ${effect.C1}</p>
		<p>C2: ${effect.C2}</p>
		<p>C3: ${effect.C3}</p>
		<p>C4: ${effect.C4}</p>
		<p>C5: ${effect.C5}</p>
		<p>C6: ${effect.C6}</p>
		<p>C7: ${effect.C7}</p>
		<p>C8: ${effect.C8}</p>
		<p>C9: ${effect.C9}</p>
		<p>C10: ${effect.C10}</p>
		`
	}
	
	findOwnerYokai(skill);
	findRelatedYokai(skill);

}

document.addEventListener("DOMContentLoaded", function(){
	const skillID = urlParams.get('id');
	const skill = abilitiesDatabase[skillID];

    showSkillDetails(skill);
});