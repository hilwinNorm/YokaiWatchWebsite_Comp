
const tiers = ["OU","UU","RU","NU","PU","Ubers"];

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

const medalPath = "Content/Graphics/YokaiMedals/";

function loadYokaiIntoCells(){
	for (const [yokaiID, tierValue] of Object.entries(tierDatabase)){
		if(!tierValue) continue;
		const cellTier = tierValue.replace("UUBL", "UU")
		const yokai = yokaiDatabase[yokaiID];
		if (yokai.legalAlliancesCheck == 0) continue;
		//console.log('Pass')
		const cell = document.querySelector(`.${tribes[yokai.Tribe]}.${cellTier}`);
		if (!cell){
			break;
		}

		// Create elements for the normal tier
		const divMain = document.createElement("div");
		const anhr = document.createElement('a');
		anhr.href=`./yokai-info.html?yokai=${yokaiID}`;
		const imgNormal = document.createElement("img");
		const divName = document.createElement("div");
		divName.className = "divName";
		
		divName.innerText = `${yokai.Name}`;
		
		//if (yokai.LegalAlliances==1) divName.innerText += ` (FS)`;
		
		//else if(yokai.LegalAlliances==2) divName.innerText += ` (BS)`;
		
		if(tierValue == "UUBL") divName.innerText += ` (UUBL)`;
		
		imgNormal.src = `${medalPath}y${String(yokai.MedalPosX + yokai.MedalPosY*23).padStart(3, '0')}.webp`;
		imgNormal.alt = yokai.Name;
		imgNormal.className = "medal-img";
		imgNormal.style = "cursor: pointer; width: 50px; height: auto";
		anhr.append(imgNormal)
		divMain.append(anhr, divName);
		
		if([1,2].includes(yokai.LegalAlliances)){
			const imgAlliance = document.createElement("img");
			imgAlliance.className = "alliance";
			if (yokai.LegalAlliances==1) imgAlliance.src += `./Content/Graphics/battle/bonyIcon.png`;
			else if(yokai.LegalAlliances==2) imgAlliance.src += `./Content/Graphics/battle/fleshyIcon.png`;
			divMain.append(imgAlliance);
		}
		cell.appendChild(divMain);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	loadYokaiIntoCells();
	console.log("All databases loaded. Initializing game...");
})
