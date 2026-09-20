
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

function loadYokaiIntoCells(yokaiDatabase){
	for (const [key,yokai] of Object.entries(yokaiDatabase)) {
		if (yokai.legalAlliancesCheck != 0){
			//console.log('Pass')
			for (const tier of tiers) {
				if (tierDatabase[key] == tier) {
					//console.log('Pass')
					const cell = document.querySelector(`.${tribes[yokai.Tribe]}.${tier}`);
					if (!cell){
						break;
					}

					// Create elements for the normal tier
					const divMainNormal = document.createElement("div");
					
					const anhr = document.createElement('a');
					anhr.href=`./yokai-data.html?yokai=${key}`;
					
					divMainNormal.style.display = "flex";
					divMainNormal.style.flexDirection = "row";
					const divNameNormal = document.createElement("div");
					divNameNormal.style = "font-size: 90%"
					const imgNormal = document.createElement("img");
					
					divNameNormal.innerHTML = `${yokai.Name} `;
					
					if (yokai.LegalAlliances==1){
						var alliance = document.createElement("div")
						//alliance.style.color = "green";
						alliance.innerHTML = "(FS)";
						divNameNormal.innerHTML += alliance.outerHTML;
					}
					else if(yokai.LegalAlliances==2){
						var alliance = document.createElement("div")
						//alliance.style.color = "red";
						alliance.innerHTML = "(BS)";
						divNameNormal.innerHTML += alliance.outerHTML;
					}
					
					
					imgNormal.src = `${medalPath}y${String(yokai.MedalPosX + yokai.MedalPosY*23).padStart(3, '0')}.webp`;
					imgNormal.alt = yokai.Name;
					imgNormal.style = "cursor: pointer; width: 50px; height: auto";
					anhr.append(imgNormal)
					divMainNormal.append(anhr, divNameNormal);
					cell.appendChild(divMainNormal);
				}
			}
		}
	}
}

loadYokaiIntoCells(yokaiDatabase)
console.log("All databases loaded. Initializing game...");
