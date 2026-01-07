
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

var ChosenTribes = [];

var ChosenRanks = [];

var DefaultLVL = 60;

var CurrentLVL = DefaultLVL;

var Path = "Content/Graphics/YokaiMedals/"

var TribePath = "Content/Graphics/tribes"

var HP_IV = 8;

var STR_IV = 8;

var SPR_IV = 8;

var DEF_IV = 8;

var SPD_IV = 8;

// Add event listeners to buttons
document.querySelectorAll(".yokai-tribes button").forEach(button => {
	button.addEventListener("click", () => {
		button.classList.toggle('selected');
		if (button.classList.contains("selected")){
			button.style.backgroundColor = "rgb(255 255 255 / 60%)"
			button.style.borderRadius = "50%";
			ChosenTribes.push(button.id);
		}
		else{
			button.style.background = "none"
			ChosenTribes = ChosenTribes.filter(tribe => tribe !== button.id)
		}
		for (div of allYokaiInfoDiv){
			var hyperlink = (div.getElementsByTagName("a"))[0]
			var imgElement = hyperlink.children[0]
			var YokaiRank = Ranks[imgElement.getAttribute('rank-index')];
			var YokaiTribe = Tribes[imgElement.getAttribute('tribe-index')];
			if (ChosenTribes.includes(YokaiTribe) || ChosenTribes.length==0){div.style.display = 'flex'}else{div.style.display = 'none'}
			if ((ChosenRanks.includes(YokaiRank) == false) && ChosenRanks.length != 0){div.style.display = 'none'}
		}
	});
});

document.querySelectorAll(".yokai-ranks button").forEach(button => {
	button.addEventListener("click", () => {
		button.classList.toggle('selected');
		if (button.classList.contains("selected")){
			button.style.backgroundColor = "rgb(255 255 255 / 60%)"
			button.style.borderRadius = "50%";
			ChosenRanks.push(button.id);
		}
		else{
			button.style.background = "none"
			ChosenRanks = ChosenRanks.filter(rank => rank !== button.id)
		}
		for (div of allYokaiInfoDiv){
			var hyperlink = (div.getElementsByTagName("a"))[0]
			var imgElement = hyperlink.children[0]
			var YokaiRank = Ranks[imgElement.getAttribute('rank-index')];
			var YokaiTribe = Tribes[imgElement.getAttribute('tribe-index')];
			if (ChosenRanks.includes(YokaiRank) || ChosenRanks.length==0){div.style.display = 'flex'}else{div.style.display = 'none'}
			if ((ChosenTribes.includes(YokaiTribe) == false) && ChosenTribes.length != 0){div.style.display = 'none'}
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
		const ID = document.createElement("div");
		const divName = document.createElement("div")
		const divMain = document.createElement("div");
		
		const anhr = document.createElement('a');
		
		if (page !== "TeamBuild.html"){
		anhr.href=`./YoKaiInfoPage.html?yokai=${key}`;
		}
		const img = document.createElement("img");
		const Div_HP = document.createElement("div");
		const Div_STR = document.createElement("div");
		const Div_SPR = document.createElement("div");
		const Div_DEF = document.createElement("div");
		const Div_SPD = document.createElement("div");
		const Img_Tribe = document.createElement("img");
		const Img_Rank = document.createElement("img");
		
		if (ChosenTribes.includes(yokai.Tribe) || ChosenTribes.length==0){
			
		var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, CurrentLVL)
		
		divName.innerHTML = yokai.Name
		divName.id = "div-name"
		divName.style = `width: 12%; justify-self: center;`
		ID.innerHTML = "NO. "+(yokai.MedalliumOffset).toString().padStart(3,'0')
		divMain.className = "MiniYokaiInfo-div"
		divMain.style = `width: 850px;
		height: 80px;
		margin: 5px;
		border: 1px solid #000;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		flex-direction: row;
		flex-wrap: wrap;`
		if (yokai.Medallium_Image){
			img.src = Path+yokai.Medallium_Image;
		}
		else{
			img.src = Path+"Unknown.webp";
		}
		img.alt = yokai.Name;
		img.style = "cursor: pointer; width: 50px; height: auto"
		img.setAttribute('rank-index', yokai.Rank);
		img.setAttribute('tribe-index', yokai.Tribe)
		img.setAttribute('id', 'yokaiImage')
		
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
		anhr.appendChild(img)
		divMain.appendChild(anhr);
		divMain.appendChild(divName);
		divMain.appendChild(Div_HP);
		divMain.appendChild(Div_STR);
		divMain.appendChild(Div_SPR);
		divMain.appendChild(Div_DEF);
		divMain.appendChild(Div_SPD);
		divMain.appendChild(Img_Tribe);
		divMain.appendChild(Img_Rank)
		if (ChosenRanks.includes(Ranks[yokai.Rank]) || ChosenRanks.length==0){
		display_list[parseInt(yokai.MedalliumOffset)] = divMain;
		}
	}
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
