
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = 'Content/JS/Databases/YoKaiDataBase.js';
	console.log(script.src)
    script.async = true; // Load asynchronously

    // Use onload to know when the script is ready
    script.onload = () => {
        console.log(`${src} loaded successfully.`);
        if (callback) callback();
    };

    script.onerror = () => {
        console.error(`Error loading script: ${src}`);
    };

    document.head.appendChild(script);
}

const Ranks=['E','D','C','B','A','S'];

const Tribes=["None","Brave","Mysterious","Tough","Charming","Heartful","Shady","Eerie","Slippery","Wicked"];

const GenericInspiritIDs = {"0x61999483": "STR_Buff", "0x169EA415": "STR_Buff", "0x8F97F5AF": "DEF_Buff", "0xF890C539":"SPD_Buff", "0x66F4509A":"ALL_Buff","0x605BFEB4": "STR_Debuff", "0x175CCE22": "SPR_Debuff", "0x8E559F98": "DEF_Debuff", "0xF952AF0E":"SPD_Debuff", "0x67363AAD":"ALL_Debuff", "0x63DF2ADA": "Attract", "0x14D81A4C": "Stealth", "0x62792C28": "Recover", "0x8AD8E32A":"Throw","0x64D68206":"Stun","0xFDDFD3BC":"Poison"};

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

// Stat Formula
//
// Uncorrected:
//
// StatA + (StatB-StatA+IV)*(Level-1)/98
//
// Corrected:
//
// StatA + (StatB-StatA+IV)*(Level-1)/98 + Attitude * (1+Level/198) + Training * 5 * Items
//
//
//

var allYokaiInfoDiv = undefined

var Selections={

	Tribes: [],

	Ranks: [],

	Elements: [],
	
	Inspirits: []
};
var DefaultLVL = 60;

var CurrentLVL = DefaultLVL;

var Path = "Content/Graphics/YokaiMedals/"

var TribePath = "Content/Graphics/Tribes"

var HP_IV = 8;

var STR_IV = 8;

var SPR_IV = 8;

var DEF_IV = 8;

var SPD_IV = 8;

// Add event listeners to buttons
document.querySelectorAll(".yokai-attributes button").forEach(button => {
	button.addEventListener("click", () => {
		const AttributeType = button.parentElement.dataset.type;
		button.classList.toggle('selected');
		if (button.classList.contains("selected")){
			button.style.backgroundColor = "rgb(255 255 255 / 60%)"
			button.style.borderRadius = "50%";
			Selections[AttributeType].push(button.id)
		}
		else{
			button.style.background = "none"
			Selections[AttributeType] = Selections[AttributeType].filter(attribute => attribute !== button.id)
		}
		for (div of allYokaiInfoDiv){
			div.style.display='flex';
		}
		for (div of allYokaiInfoDiv){
			var hyperlink = (div.getElementsByTagName("a"))[0]
			var imgElement = hyperlink.children[0]
			var YokaiRank = Ranks[imgElement.getAttribute('rank-value')];
			var YokaiTribe = Tribes[imgElement.getAttribute('tribe-value')];
			var YokaiElement = imgElement.getAttribute('element-value')
			var YokaiInspirit = GenericInspiritIDs[imgElement.getAttribute('inspirit-value')]
			
			var ChosenTribes = Selections.Tribes;
			var ChosenRanks = Selections.Ranks;
			var ChosenElements = Selections.Elements;
			var ChosenInspirits = Selections.Inspirits;
			
			if ((ChosenTribes.includes(YokaiTribe) == false && ChosenTribes.length != 0) ||
			(ChosenRanks.includes(YokaiRank) == false && ChosenRanks.length != 0) ||
			(ChosenElements.includes(YokaiElement) == false && ChosenElements.length != 0) ||
			(ChosenInspirits.includes(YokaiInspirit) == false && ChosenInspirits.length != 0)){div.style.display = 'none'; div.classList.add("Filtered")}else{div.classList.remove("Filtered")}
		}
	});
});
	
		

function showPage(yokais) {
	const yokaiPage = document.getElementById("data-page");
	yokaiPage.innerHTML = "";
	const display_list = [];
	display_list.length = Object.keys(yokais).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,yokai] of Object.entries(yokais)) {
		if (yokai.inMedallium != 1){continue;}
		const yokaiID = document.createElement("div");
		const divName = document.createElement("div")
		const divMain = document.createElement("div");
		
		const anhr = document.createElement('a');
		anhr.href=`./YoKaiInfoPage.html?yokai=${key}`;
		const img = document.createElement("img");
		const Div_HP = document.createElement("div");
		const Div_STR = document.createElement("div");
		const Div_SPR = document.createElement("div");
		const Div_DEF = document.createElement("div");
		const Div_SPD = document.createElement("div");
		const Img_Tribe = document.createElement("img");
		const Img_Rank = document.createElement("img");
			
		var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, CurrentLVL)
		
		divName.innerHTML = yokai.Name
		divName.id = "div-name"
		divName.style = `width: 12%; text-align: center;`
		yokaiID.innerHTML = "NO. "+(yokai.MedalliumOffset).toString().padStart(3,'0')
		yokaiID.style = `width: 6%; text-align: center;`
		yokaiID.id = "yokai-index";
		divMain.className = "MiniYokaiInfo-div"
		divMain.style = `width: 900px;
		height: 80px;
		margin: 5px;
		border: 1px solid #000;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		flex-direction: row;
		flex-wrap: nowrap;`
		if (yokai.Medallium_Image){
			img.src = Path+yokai.Medallium_Image;
		}
		else{
			img.src = Path+"Unknown.webp";
		}
		img.alt = yokai.Name;
		img.style = "cursor: pointer; width: 50px; height: auto"
		img.setAttribute('rank-value', yokai.Rank);
		img.setAttribute('tribe-value', yokai.Tribe)
		img.setAttribute('id', 'yokaiImage')
		
		Div_HP.innerHTML = "HP:"+Math.round(BHP);
		Div_HP.style = `width: 9%; text-align: center;`
		Div_STR.innerHTML = "STR:"+Math.round(BSTR);
		Div_STR.style = `width: 9%; text-align: center;`
		Div_SPR.innerHTML = "SPR:"+Math.round(BSPR);
		Div_SPR.style = `width: 9%; text-align: center;`
		Div_DEF.innerHTML = "DEF:"+Math.round(BDEF);
		Div_DEF.style = `width: 9%; text-align: center;`
		Div_SPD.innerHTML = "SPD:"+Math.round(BSPD);
		Div_SPD.style = `width: 9%; text-align: center;`
		Img_Rank.src = `Content/Graphics/Ranks/Rank_${Ranks[yokai.Rank]}_icon.png`
		Img_Rank.alt = yokai.Rank
		Img_Tribe.src = "Content/Graphics/tribes/"+Tribes[yokai.Tribe]+".png"
		Img_Tribe.alt = yokai.Tribe
		
		divMain.appendChild(yokaiID);
		anhr.appendChild(img)
		divMain.appendChild(anhr);
		divMain.appendChild(divName);
		divMain.appendChild(Div_HP);
		divMain.appendChild(Div_STR);
		divMain.appendChild(Div_SPR);
		divMain.appendChild(Div_DEF);
		divMain.appendChild(Div_SPD);
		divMain.appendChild(Img_Tribe);
		divMain.appendChild(Img_Rank);
		if (legalCheck(yokai)){
			
			const attack_anhr = document.createElement('a');
			
			const technique_anhr = document.createElement('a');
			const Span_Element = document.createElement("span");
			
			const inspirit_anhr = document.createElement('a');
			const Img_InspiritType = document.createElement("img")
			
			attack_anhr.href=`./MoveiInfoPage.html?moveType=0&id=${yokai.AttackID}`;
			technique_anhr.href=`./MoveiInfoPage.html?moveType=1&id=${yokai.TechniqueID}`;
			inspirit_anhr.href=`./MoveiInfoPage.html?moveType=2&id=${yokai.InspiritID}`;
			
			var YokaiInspiritImage = inspiritDatabase[yokai.InspiritID].image
			Img_InspiritType.src = "Content/Graphics/InspiritImages/"+YokaiInspiritImage
			Img_InspiritType.alt="YokaiInspiritImg"
			
			var YokaiInspirit = inspiritDatabase[yokai.InspiritID].Effect[0].GenericEffectID
			img.setAttribute('inspirit-value',YokaiInspirit)
			inspirit_anhr.appendChild(Img_InspiritType);
			divMain.appendChild(inspirit_anhr);
			
			var YokaiTechnique = techniqueDatabase[yokai.TechniqueID].Command
			if (techniqueDatabase[yokai.TechniqueID].Element){
				var YokaiElement = techniqueDatabase[yokai.TechniqueID].Element;
				Span_Element.style = "background-repeat: no-repeat; background-image: url(Content/Graphics/Elements/InGameIcons/"+YokaiElement+".png)";
				Span_Element.classList.add("icon")
			}else{var YokaiElement = "Restoration";}
			technique_anhr.innerHTML = Span_Element.outerHTML+YokaiTechnique;
			technique_anhr.style = `width: 15%; text-align: center; background-color: #84c6cfc2; color: white; border-radius: 10px; border: 2px solid rgb(0, 0, 0); padding: 0px 6px;`;
			
			img.setAttribute('element-value',YokaiElement)
			divMain.appendChild(technique_anhr);
			
			var YokaiAttack = attackDatabase[yokai.AttackID].Command;
			
			attack_anhr.innerHTML = YokaiAttack;
			attack_anhr.style = `width: 15%; text-align: center; background-color: #e6903bc2; color: white; border-radius: 10px; border: 2px solid rgb(0, 0, 0); padding: 0px 6px;`;
			
			divMain.appendChild(attack_anhr);
		}
		display_list[parseInt(yokai.MedalliumOffset)] = divMain;
	}

for (i=0; i < display_list.length; i++){
	if (display_list[i] !== undefined){
		yokaiPage.appendChild(display_list[i])
	}
}
}

let yokaiPage = document.getElementById("data-page");
let Slot1 = document.getElementById("Slot1")


window.addEventListener('load', function () {
  if (yokaiPage){
		loadScript('database.js', () => {
		showPage(yokaiDatabase)
		allYokaiInfoDiv = document.querySelectorAll('#data-page .MiniYokaiInfo-div');
    });
	}
});

