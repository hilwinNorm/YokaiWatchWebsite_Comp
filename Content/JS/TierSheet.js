
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

const Tiers = ["OU","UU","RU","NU","PU","Ubers"]

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
    "Wicked"
]

var Path = "Content/Graphics/YokaiMedals/"

function YokaiInfoRedirect(yokai){
	SaveData(yokai)
	window.location.assign("./YoKaiInfoPage.html")
}

function loadYokaiIntoCells(yokaiDatabase){
	for (const [key,yokai] of Object.entries(yokaiDatabase)) {
		if (yokai.isNotBoss == 1){
			for (const tier of Tiers) {
				if (yokai.Tier == tier) {
					const cell = document.querySelector(`.${Tribes[yokai.Tribe]}.${tier}`);

					// Create elements for the normal tier
					const divMainNormal = document.createElement("div");
					
					const anhr = document.createElement('a');
					anhr.href=`./YoKaiInfoPage.html?yokai=${key}`;
					
					divMainNormal.style.display = "flex";
					divMainNormal.style.flexDirection = "row";
					const divNameNormal = document.createElement("div");
					divNameNormal.style = "font-size: 90%"
					const imgNormal = document.createElement("img");
					
					divNameNormal.innerHTML = `${yokai.Name} `;
					
					if (yokai.LegalAlliances==1){
						divNameNormal.innerHTML += "(Fleshy)"
					}
					else if(yokai.LegalAlliances==2){
						divNameNormal.innerHTML += "(Bony)"
					}

					imgNormal.src = Path + yokai.Medallium_Image;
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

loadScripts(Databases, () => {
	loadYokaiIntoCells(yokaiDatabase)
    console.log("All databases loaded. Initializing game...");
});