
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

var SelectAttack = document.getElementById("select-attack")

var SelectTechnique = document.getElementById("select-technique")

var SelectInspirit = document.getElementById("select-inspirit")

var SelectSoultimate = document.getElementById("select-soultimate")

SelectAttack.addEventListener('change', (e) => {
    const move = attackDatabase[e.target.value];
    document.getElementById('info-attack').innerHTML = `
        <span><span class="info-label">Pow:</span> ${move.Lv10_power}</span>
        <span><span class="info-label">Hits:</span> ${move.N_Hits}</span>
    `;
});
SelectTechnique.addEventListener('change', (e) => {
    const move = techniqueDatabase[e.target.value];
    document.getElementById('info-technique').innerHTML = `
        <span><span class="info-label">Power:</span> ${move.Lv10_power}</span>
        <span><span class="info-label">N_Hits:</span> ${move.N_Hits}</span>
        <span><span class="info-label">Element:</span> ${move.Element}</span>
    `;
});
SelectInspirit.addEventListener('change', (e) => {
    const move = inspiritDatabase[e.target.value].Effect[0];
    document.getElementById('info-inspirit').innerHTML = `
        <div><span class="info-label">Tier:</span> ${move.Tier}</div>
        <div><span class="info-label">Target:</span> ${move.Target}</div>
        <div><span class="info-label">Desc:</span> ${move.EffectDesc}</div>
    `;
});
SelectSoultimate.addEventListener('change', (e) => {
    const move = soultimateDatabase[e.target.value];
    document.getElementById('info-soultimate').innerHTML = `
        <span><span class="info-label">Power:</span> ${move.Lv10_power}</span>
        <span><span class="info-label">N_Hits:</span> ${move.N_Hits}</span>
        <span><span class="info-label">Element:</span> ${move.Element}</span>
        <span><span class="info-label">Charge:</span> ${move.Lv10_soul_charge}</span>
    `;
});	

function SetOptions_Attack(GivenAttack=null){
	if (GivenAttack!=null){
		SelectAttack.value=GivenAttack.ID;
		document.getElementById('info-attack').innerHTML = `
        <span><span class="info-label">Pow:</span> ${GivenAttack.Lv10_power}</span>
        <span><span class="info-label">Hits:</span> ${GivenAttack.N_Hits}</span>
		`;
		return;
	}
	for (const [index, attack] of Object.entries(attackDatabase)){
		const newOption = new Option(attack.Command, attack.ID);
		SelectAttack.add(newOption);
	}
}
function SetOptions_Technique(GivenAttack=null){
	if (GivenAttack!=null){
		SelectTechnique.value=GivenAttack.ID;
		document.getElementById('info-technique').innerHTML = `
        <span><span class="info-label">Power:</span> ${GivenAttack.Lv10_power}</span>
        <span><span class="info-label">N_Hits:</span> ${GivenAttack.N_Hits}</span>
        <span><span class="info-label">Element:</span> ${GivenAttack.Element}</span>
		`;
		return;
	}
	for (const [index, technique] of Object.entries(techniqueDatabase)){
		const newOption = new Option(technique.Command, technique.ID);
		SelectTechnique.add(newOption);
	}
}
function SetOptions_Inspirit(GivenAttack=null){
	if (GivenAttack!=null){
		SelectInspirit.value=GivenAttack.ID;
		document.getElementById('info-inspirit').innerHTML = `
        <div><span class="info-label">Tier:</span> ${GivenAttack.Effect[0].Tier}</div>
        <div><span class="info-label">Target:</span> ${GivenAttack.Effect[0].Target}</div>
        <div><span class="info-label">Desc:</span> ${GivenAttack.Effect[0].EffectDesc}</div>
        `;
		return;
	}
	for (const [index, inspirit] of Object.entries(inspiritDatabase)){
		const newOption = new Option(inspirit.Command, inspirit.ID);
		SelectInspirit.add(newOption);
	}
}
function SetOptions_Soultimate(GivenAttack=null){
	if (GivenAttack!=null){
		SelectSoultimate.value=GivenAttack.ID;
		document.getElementById('info-soultimate').innerHTML = `
        <span><span class="info-label">Power:</span> ${GivenAttack.Lv10_power}</span>
        <span><span class="info-label">N_Hits:</span> ${GivenAttack.N_Hits}</span>
        <span><span class="info-label">Element:</span> ${GivenAttack.Element}</span>
        <span><span class="info-label">Charge:</span> ${GivenAttack.Lv10_soul_charge}</span>
		`;
		return;
	}
	for (const [index, soultimate] of Object.entries(soultimateDatabase)){
		const newOption = new Option(soultimate.Command, soultimate.ID);
		SelectSoultimate.add(newOption);
	}
}

function showPage(yokais) {
	const yokaiPage = document.getElementById("data-page");
	yokaiPage.innerHTML = "";
	const display_list = [];
	console.log(yokais)
	display_list.length = Object.keys(yokais).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,yokai] of Object.entries(yokais)) {
		if (yokai.isNotBoss == 0 || yokai.MedalliumOffset == 389 || (441 <= yokai.MedalliumOffset && yokai.MedalliumOffset <= 443)){continue;}
		const ID = document.createElement("div");
		const divName = document.createElement("div")
		const divMain = document.createElement("div");
		const img = document.createElement("img");
		const Div_HP = document.createElement("div");
		const Div_STR = document.createElement("div");
		const Div_SPR = document.createElement("div");
		const Div_DEF = document.createElement("div");
		const Div_SPD = document.createElement("div");
		const Img_Tribe = document.createElement("img");
		const Img_Rank = document.createElement("img");
		
		var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, 60)
		
		divName.innerHTML = yokai.Name
		divName.id = "div-name"
		divName.setAttribute("paramID", key)
		divName.style = `width: 12%; justify-self: center;`
		ID.innerHTML = "NO. "+(yokai.MedalliumOffset).toString().padStart(3,'0')
		divMain.className = "MiniYokaiInfo-div"
		divMain.style = `width: 93%;
		height: 120px;
		margin: 5px;
		border: 1px solid #c6c0ff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		flex-direction: row;
		flex-wrap: wrap;`
		if (yokai.Medallium_Image){
			img.src = Path_Medal+yokai.Medallium_Image;
		}
		else{
			img.src = Path_Medal+"Unknown.webp";
		}
		img.alt = yokai.Name;
		img.style = "cursor: pointer; width: 50px; height: auto"
		img.setAttribute('rank-index', yokai.Rank);
		img.setAttribute('tribe-index', yokai.Tribe)
		
		img.onclick = () => {
			var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, 60)
			selectYokai(yokai);
			var Attack=attackDatabase[yokai.AttackID];
			var Technique=techniqueDatabase[yokai.TechniqueID];
			var Inspirit=inspiritDatabase[yokai.InspiritID];
			var Soultimate=soultimateDatabase[yokai.SoultimateID];
			SetOptions_Attack(Attack)
			SetOptions_Technique(Technique)
			SetOptions_Inspirit(Inspirit)
			SetOptions_Soultimate(Soultimate)
			DisplayHP.value=Math.round(BHP)
			DisplaySTR.value=Math.round(BSTR)
			DisplaySPR.value=Math.round(BSPR)
			DisplayDEF.value=Math.round(BDEF)
			DisplaySPD.value=Math.round(BSPD)
			DispayName.value=yokai.Name;
		}
		Div_HP.innerHTML = "HP:"+Math.round(BHP);
		Div_HP.style = `width: 12%; justify-self: center;`
		Div_STR.innerHTML = "STR:"+Math.round(BSTR);
		Div_STR.style = `width: 12%; justify-self: center;`
		Div_SPR.innerHTML = "SPR:"+Math.round(BSPR);
		Div_SPR.style = `width: 12%; justify-self: center;`
		Div_DEF.innerHTML = "DEF:"+Math.round(BDEF);
		Div_DEF.style = `width: 12%; justify-self: center;`
		Div_SPD.innerHTML = "SPD:"+Math.round(BSPD);
		Div_SPD.style = `width: 12%; justify-self: center;`
		Img_Rank.src = `Content/Graphics/Ranks/Rank_${Ranks[yokai.Rank]}_icon.png`
		Img_Rank.alt = yokai.Rank
		Img_Tribe.src = "Content/Graphics/tribes/"+Tribes[yokai.Tribe]+".png"
		Img_Tribe.alt = yokai.Tribe
		divMain.appendChild(ID);
		divMain.appendChild(img)
		divMain.appendChild(divName);
		divMain.appendChild(Div_HP);
		divMain.appendChild(Div_STR);
		divMain.appendChild(Div_SPR);
		divMain.appendChild(Div_DEF);
		divMain.appendChild(Div_SPD);
		divMain.appendChild(Img_Tribe);
		divMain.appendChild(Img_Rank)
		if (yokai.MedalliumOffset == 0){
			display_list.length++
			display_list[parseInt(display_list.length)] = divMain;
		}
		display_list[parseInt(yokai.MedalliumOffset)] = divMain;
	}
	for (i=0; i < display_list.length; i++){
	if (display_list[i] !== undefined){
		yokaiPage.appendChild(display_list[i])
	}
}
}

function selectYokai(yokai){
	DisplayingYokai.src = ArtworkPath+yokai.Artwork_Image;
}

var DisplayingYokai = document.getElementById("DisplayingYokai")

var DispayName = document.getElementById("yokai-name")

var DisplayHP = document.getElementById("stat-hp")

var DisplaySTR = document.getElementById("stat-str")

var DisplaySPR = document.getElementById("stat-spr")

var DisplayDEF = document.getElementById("stat-def")

var DisplaySPD = document.getElementById("stat-spd")

var allYokaiInfoDiv = undefined

var DefaultLVL = 60;

var CurrentLVL = DefaultLVL;

var Path_Medal = "Content/Graphics/YokaiMedals/"

var ArtworkPath = "Content/Graphics/Artwork/"

var TribePath = "Content/Graphics/tribes"

var HP_IV = 8;

var STR_IV = 8;

var SPR_IV = 8;

var DEF_IV = 8;

var SPD_IV = 8;

DisplayingYokai.src = ArtworkPath+"pandle.png"

const Ranks=['E','D','C','B','A','S']

const Tribes=["None","Brave","Mysterious","Tough","Charming","Heartful","Shady","Eerie","Slippery","Wicked"];

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

window.addEventListener('load', function () {
	loadScript('database.js', () => {
		showPage(yokaiDatabase)
		allYokaiInfoDiv = document.querySelectorAll('#data-page .MiniYokaiInfo-div');
    });
	SetOptions_Attack()
	SetOptions_Technique()
	SetOptions_Inspirit()
	SetOptions_Soultimate()
});
