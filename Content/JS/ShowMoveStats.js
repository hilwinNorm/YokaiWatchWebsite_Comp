var pathDatabase = "Content/JS/Databases/";

var ImgPath = "Content/Graphics/"

const Databases = ['AttackDatabase.js','TechniqueDatabase.js','InspiritDatabase.js','SoultimateDatabase.js','YokaiAbilitiesDatabase.js'];
	
const urlParams = new URLSearchParams(window.location.search)

var databaseType = urlParams.get('moveType')

function loadScript(src, callback) {
    // 1. Snapshot existing global variables
    const existingGlobals = Object.keys(window);

    const script = document.createElement('script');
    script.src = pathDatabase+src;
    script.async = true;

    script.onload = () => {
        // 2. Identify new variables by filtering the current window keys
        const newGlobals = Object.keys(window).filter(key => !existingGlobals.includes(key));
        
        // 3. The "database" is likely the first (or only) new global found
        const detectedData = newGlobals.length > 0 ? window[newGlobals[0]] : null;

        if (callback) callback(detectedData, newGlobals);
    };

    script.onerror = () => console.error(`Error: ${src}`);
    document.head.appendChild(script);
}


function showMoveDetails(move) {
	var Extra;
	var MoveIcon = document.createElement('img');
	var OwnerYokai_Div = document.createElement('div');
	var technique_element;
		
	if (move.Element != null){
		technique_element = `${move.Element} <img style="height:35px; width: auto;"src="Content/Graphics/Elements/InGameIcons/${move.Element}.png" alt="ElementImg">`
	}
	OwnerYokai_Div.style = "justify-content: center;display: flex; gap: 20px; flex-wrap: wrap;";
	MoveIcon.style="height:48px;width:auto;"
		
	let stat_style = 'font-size: 25px; margin-left: 25px;'
	let container_style = "background-color: var(--side-buttons-bg); border-radius: 25px;"
	let extra_style = "min-width: 200px; padding: 16px; font-size: 25px; justify-content: center; align-items:center; display: flex;"
	let OwnerYokai = [];
	OwnerYokai.length = Object.keys(yokaiDatabase).length;
	for (const [key,yokai] of Object.entries(yokaiDatabase)) {
		var flag = 0;
		if (parseInt(databaseType)){if (Object.values(yokai).includes(move.ID)){f=1}}
		if (Object.values(yokai).includes(move.ID)){
			if (legalCheck(yokai)==false){continue;};
			var yokaiImg = document.createElement('img');
			yokaiImg.src = ""
			if (yokai.Medallium_Image){
				yokaiImg.src = "Content/Graphics/YokaiMedals/"+yokai.Medallium_Image;
			}
			else{
				yokaiImg.src = "Content/Graphics/YokaiMedals/Unknown.webp";
			}
			yokaiImg.alt = yokai.Name;
			yokaiImg.style = "cursor: pointer; width: 50px; height: auto"
			var anhr = document.createElement('a');
			anhr.href=`./YoKaiInfoPage.html?yokai=${key}`;
			
			anhr.appendChild(yokaiImg)
			OwnerYokai[parseInt(yokai.MedalliumOffset)] = anhr;
		}
		OwnerYokai.forEach((yokai) => {if (yokai !== undefined){OwnerYokai_Div.appendChild(yokai)}})
	}
	console.log(OwnerYokai)
	console.log(parseInt(databaseType))
	
	switch (parseInt(databaseType)){
		case 0:
			MoveIcon.src = ImgPath+"AttackIcon.png";
			Extra=`<p style="${container_style}; ${extra_style}"><img width="37px" alt="Lvl 1" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_1.png"> Attack Power: ${move.Lv1_power} | <img width="30px" alt="Lvl 10" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_Max.png"> Attack Power: ${move.Lv10_power} | Number of Hits: ${move.N_Hits}</p>`
			break;
		case 1:
			MoveIcon.src = ImgPath+"TechniqueIcon.png";
			Extra=`<p style="${container_style}; ${extra_style}"><img width="37px" alt="Lvl 1" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_1.png"> Attack Power: ${move.Lv1_power} | <img width="30px" alt="Lvl 10" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_Max.png"> Attack Power: ${move.Lv10_power} | Element: <span style="display: flex; align-items: center;">${technique_element}</span></p>`
			break;
		case 2:
			MoveIcon.src = ImgPath+"InspiritIcon.png";
			var TierText=``;
			if (move.Effect[0].Tier){TierText=` | Tier: ${move.Effect[0].Tier}`};
			Extra=`<p style="${container_style}; ${extra_style}"><span style="display: flex; align-items: center;"><img width="50px" alt="Lvl 1" style="margin: 0px 6px" src="Content/Graphics/InspiritImages/${move.image}"></span>Effect Description: ${move.Effect[0].EffectDesc} | Target: ${move.Effect[0].Target}${TierText}</p>`
			break;
		case 3:
			var Element=``;
			if (move.Element){Element=` | Number of Hits: ${move.N_Hits}`}
			Extra=`<p style="${container_style}; ${extra_style}"><img width="37px" alt="Lvl 1" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_1.png"> Soultimate Power: ${move.Lv1_power} | <img width="30px" alt="Lvl 10" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_Max.png"> Soultimate Power: ${move.Lv10_power} | Number of Hits: ${move.N_Hits}</p>
			<p style="${container_style}; ${extra_style}"><img width="37px" alt="Lvl 1" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_1.png"> Soultimate Charge: ${move.Lv1_soul_charge} | <img width="30px" alt="Lvl 10" style="margin: 0px 6px" src="${ImgPath}Move_Lvl_Max.png"> Soultimate Soultimate: ${move.Lv10_soul_charge}${Element}</p>`
			MoveIcon.src = ImgPath+"SoultimateIcon.png";
			break;
		case 4:
			MoveIcon.src = ImgPath+"skill_text_image.png";
			MoveIcon.style.margin = "0px 30px";
			MoveIcon.style="height: 48px; width: 18vw; margin: 0px 30px;"
			Extra=`<p style="${container_style}; ${extra_style}">Skill Description: ${(move.Description).replaceAll('\\n', '\n')}</p>`
			break;
	}
	
	var details = `
	<span style="display: grid;">
		<div style="display: flex;${container_style}; min-width: 200px; padding: 16px; font-size: 35px; justify-content: center; align-items:center;">${move.Command || move.Name} <span style="display: flex; align-items: center;">${MoveIcon.outerHTML}</span></div>
		${Extra}
		<h1 style="justify-content: center;display: flex;">Yokai that have this move:</h1>
		${OwnerYokai_Div.outerHTML}
	</span>
	`;
	
	document.getElementById('move-details').innerHTML = details;
}
loadScript(Databases[databaseType], (data, names) => {
	console.log(data,names)
	var Move_Data = data[urlParams.get('id')]
	showMoveDetails(Move_Data)
    console.log("All databases loaded. Initializing game...");
});