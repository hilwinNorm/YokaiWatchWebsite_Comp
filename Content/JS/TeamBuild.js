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

var Path_Medal = 'Content/Graphics/YokaiMedals/'

var Path_Artwork = "Content/Graphics/Artwork/"

var STR_Gym = 0;
var SPR_Gym = 0;
var DEF_Gym = 0;
var SPD_Gym = 0;

var HP_IV = 8;
var STR_IV = 8;
var SPR_IV = 8;
var DEF_IV = 8;
var SPD_IV = 8;

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

const Ranks=['E','D','C','B','A','S']

Slot1 = document.getElementById("Slot1")

Slot2 = document.getElementById("Slot2")

Slot3 = document.getElementById("Slot3")

Slot4 = document.getElementById("Slot4")

Slot5 = document.getElementById("Slot5")

Slot6 = document.getElementById("Slot6")

var WheelSlot1Eq = {
	"Slot1": null,
	"Slot2": null,
	"Slot1_Name": "",
	"Slot2_Name": ""
}
var WheelSlot2Eq = {
	"Slot1": null,
	"Slot2": null,
	"Slot1_Name": "",
	"Slot2_Name": ""
}
var WheelSlot3Eq = {
	"Slot1": null,
	"Slot2": null,
	"Slot1_Name": "",
	"Slot2_Name": ""
}
var WheelSlot4Eq = {
	"Slot1": null,
	"Slot2": null,
	"Slot1_Name": "",
	"Slot2_Name": ""
}
var WheelSlot5Eq = {
	"Slot1": null,
	"Slot2": null,
	"Slot1_Name": "",
	"Slot2_Name": ""
}
var WheelSlot6Eq = {
	"Slot1": null,
	"Slot2": null,
	"Slot1_Name": "",
	"Slot2_Name": ""
}

var slots_stats = [
	{},
	{},
	{},
	{},
	{},
	{}

]

var selectedWheelSlot = null;
var selectedImage = null;
var selectedEquipment = null;
var EditingSlots=false;
let S_RankSlot1 = document.getElementById('S_Rank1');
let S_RankSlot2 = document.getElementById('S_Rank2');
let A_RankSlot1 = document.getElementById('A_Rank1');
let A_RankSlot2 = document.getElementById('A_Rank2');
var SRanksUsed = 0;
var ARanksUsed = 0;

function EditTeam(){
	EditingSlots=true;
	selectedImage=null;
}
		
function selectImage(image) {
	let ChosenYokaiRing = document.getElementById("ChosenYokaiRing")
	EditingSlots=false;
	ChosenYokaiRing.style.visibility = "hidden"
	selectedImage = image;
}	
function selectEquipment(image){
	selectedEquipment = image;
}
	
	
function selectSlot(slot) {
	if (!selectedImage && !EditingSlots) {
		console.error('No image selected!');
		return;
		
		if (selectedImage.src === slot.src) {
			console.error('Image already in that slot!');
			return;
		}
	}
	
	let ChosenYokaiRing = document.getElementById("ChosenYokaiRing")
	let Ring_Left = JSON.stringify(parseInt(slot.style.left, 10)-8)+"px"
	let Ring_Top = JSON.stringify(parseInt(slot.style.top, 10)-7)+"px"
	ChosenYokaiRing.style.left = Ring_Left
	ChosenYokaiRing.style.top = Ring_Top
	ChosenYokaiRing.style.visibility = "visible"
	selectedWheelSlot = slot;
	
	if (EditingSlots){
		ShowSlotInfo(slot)
		return;
	}
	
	var slotInfo_div = document.getElementById("SlotInfo-div")
	
	if (slot.getAttribute('rank-index') == "5"){
		if (SRanksUsed == 1){
			S_RankSlot1.src = "Content/Graphics/S_RankUnincluded.png"
		}
		else if (SRanksUsed == 2){
			S_RankSlot2.src = "Content/Graphics/S_RankUnincluded.png"
		}
		SRanksUsed -= 1
		console.log("SRanksUsed", SRanksUsed)
	}
	else if(slot.getAttribute('rank-index') == "4"){
		if (ARanksUsed == 1){
			A_RankSlot1.src = "Content/Graphics/A_RankUnincluded.png"
		}
		else if (ARanksUsed == 2){
			A_RankSlot2.src = "Content/Graphics/A_RankUnincluded.png"
		}
		ARanksUsed -= 1
		console.log("ARanksUsed", ARanksUsed)
	}
	if (selectedImage.getAttribute('rank-index') == "5"){
		if (SRanksUsed == 0){
			S_RankSlot1.src = "Content/Graphics/S_RankIncluded.png"
		}
		else if (SRanksUsed == 1){
			S_RankSlot2.src = "Content/Graphics/S_RankIncluded.png"
		}
		SRanksUsed += 1
		console.log("SRanksUsed", SRanksUsed)
	}
	else if (selectedImage.getAttribute('rank-index') == "4"){
		if (ARanksUsed == 0){
			A_RankSlot1.src = "Content/Graphics/A_RankIncluded.png"
		}
		else if (ARanksUsed == 1){
			A_RankSlot2.src = "Content/Graphics/A_RankIncluded.png"
		}
		ARanksUsed += 1
		console.log("ARanksUsed", ARanksUsed)
	}
	
	let imageName = selectedImage.parentNode.parentNode.querySelector("#div-name").innerText;
	let imageParamID = selectedImage.parentNode.parentNode.querySelector("#div-name").getAttribute("paramID")

	slot.src = selectedImage.src;
	slot.setAttribute('data-name', imageName);
	slot.setAttribute('data-paramID', imageParamID);
	slot.setAttribute('rank-index', selectedImage.getAttribute('rank-index'));
	slotInfo_div.innerHTML=""
	ShowSlotInfo(slot)
}
	


function LoadTeam(){
	let Slots = prompt("Paste encoded team here:")
	if (Slots===null){return}
	EditingSlots=false;
	Slots = atob(Slots)
	Slots = JSON.parse(Slots)
	console.log(Slots)
	
	let WheelSlots = [Slot1,Slot2,Slot3,Slot4,Slot5,Slot6]
	
	slots_stats = Slots[0]
	
	let YokaiPage = document.getElementById("data-page")
	let YokaiPageList = YokaiPage.children;
	
	for (let x = 0; x < 6; x++){
		for (let i = 0; i < YokaiPageList.length; i++) {
			const YokaiIMG = YokaiPageList[i].querySelector("#div-name").textContent
			let Slot = WheelSlots[x]
			if (YokaiIMG == slots_stats[x].name){
				console.log(slots_stats[x].name)
				selectImage(YokaiPageList[i].querySelector("img"))
				selectSlot(Slot)
				
			}
		}
	}
	
	WheelSlot1Eq = Slots[1]
	WheelSlot2Eq = Slots[2]
	WheelSlot3Eq = Slots[3]
	WheelSlot4Eq = Slots[4]
	WheelSlot5Eq = Slots[5]
	WheelSlot6Eq = Slots[6]
}

function SaveTeam(){
	
	Slots = [slots_stats,WheelSlot1Eq,WheelSlot2Eq,WheelSlot3Eq,WheelSlot4Eq,WheelSlot5Eq,WheelSlot6Eq]
	
	console.log(Slots)
	
	var SavingTeamJSON = btoa(JSON.stringify(Slots))
	
	try {
    navigator.clipboard.writeText(SavingTeamJSON);
    alert("Succesfully copied Base64 code to clipboard!");
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function CopyAsText(){

	const SavingTextTeam = createTeamText();
            
	try {
		navigator.clipboard.writeText(SavingTextTeam);
		alert("Successfully copied team as text to clipboard!");
	} catch (err) {
		console.error('Failed to copy text: ', err);
		alert("Failed to copy text to clipboard: " + err, "error");
	}
}

function createTeamText() {
	
            return `${slots_stats[0].name} - ${slots_stats[1].name} - ${slots_stats[2].name}
${slots_stats[3].name} - ${slots_stats[4].name} - ${slots_stats[5].name}

__*Equipment and Attitudes*__

${slots_stats[0].name} @ ${Attitudes[slots_stats[0].attitude || 0].name} ${WheelSlot1Eq.Slot1_Name} ${WheelSlot1Eq.Slot2_Name}
${slots_stats[1].name} @ ${Attitudes[slots_stats[1].attitude || 0].name} ${WheelSlot2Eq.Slot1_Name} ${WheelSlot2Eq.Slot2_Name}
${slots_stats[2].name} @ ${Attitudes[slots_stats[2].attitude || 0].name} ${WheelSlot3Eq.Slot1_Name} ${WheelSlot3Eq.Slot2_Name}
${slots_stats[3].name} @ ${Attitudes[slots_stats[3].attitude || 0].name} ${WheelSlot4Eq.Slot1_Name} ${WheelSlot4Eq.Slot2_Name}
${slots_stats[4].name} @ ${Attitudes[slots_stats[4].attitude || 0].name} ${WheelSlot5Eq.Slot1_Name} ${WheelSlot5Eq.Slot2_Name}
${slots_stats[5].name} @ ${Attitudes[slots_stats[5].attitude || 0].name} ${WheelSlot6Eq.Slot1_Name} ${WheelSlot6Eq.Slot2_Name}`;
        }
/*
async function CopyBoth() {
	try {
		const text = createTeamText();
		const wheelDiv = document.getElementById('Wheel-div');
		
		
		const canvas = await html2canvas(wheelDiv);
		
		canvas.toBlob(async (blob) => {
			try {
				// Create a ClipboardItem with both text and image
				const textItem = new ClipboardItem({ 'text/plain': new Blob([text], { type: 'text/plain' }) });
				const imageItem = new ClipboardItem({ 'image/png': blob });
				
				await navigator.clipboard.write([textItem, imageItem]);
				showStatus("Successfully copied both team text and wheel image to clipboard!", "success");
			} catch (err) {
				console.error('Failed to copy both: ', err);
				showStatus("Failed to copy both text and image: " + err, "error");
			}
		});
	} catch (err) {
		console.error('Failed to capture wheel: ', err);
		showStatus("Failed to capture wheel: " + err, "error");
	}
}
*/
function ShowSlotInfo(slot){
	var slotNumber = selectedWheelSlot.id.replace('Slot', '');
	var wheelSlotEq = window[`WheelSlot${slotNumber}Eq`];
    var slotInfo_div = document.getElementById("SlotInfo-div")
    
    if (slotInfo_div.style.visibility == "hidden"){
        slotInfo_div.style.visibility = "visible"
    }
	
	const slotName = slot.getAttribute('data-name')
    const slotIndex = parseInt(slotNumber) - 1;
	const slotParamID = slot.getAttribute('data-paramID')
	
    let slotStats = slots_stats[slotIndex];
	if ((!slotStats || Object.keys(slotStats).length === 0) || (EditingSlots == false)) {
		if (Object.keys(slotStats).length === 0){
			slotStats = {
				"BS_A_HP": 0,
				"BS_A_Str": 0,
				"BS_A_Spr": 0,
				"BS_A_Def": 0,
				"BS_A_Spd": 0,
				"BS_B_HP": 0,
				"BS_B_Str": 0,
				"BS_B_Spr": 0,
				"BS_B_Def": 0,
				"BS_B_Spd": 0,
				"HP_IV": 8,
				"STR_IV": 8,
				"SPR_IV": 8,
				"DEF_IV": 8,
				"SPD_IV": 8,
				"STR_GYM": 0,
				"SPR_GYM": 0,
				"DEF_GYM": 0,
				"SPD_GYM": 0,
				"Rank": "",
				"Tribe": "",
				"equipment": 0,
				"level": 60,
				"attitude": 0
			}
		slotStats.name = slotName;
		}
        if (slotName && slotName !== "null") {
            slotStats.BS_A_HP = yokaiDatabase[slotParamID].baseA_HP || 0;
			slotStats.BS_A_Str = yokaiDatabase[slotParamID].baseA_Strength || 0;
			slotStats.BS_A_Spr = yokaiDatabase[slotParamID].baseA_Spirit || 0;
			slotStats.BS_A_Def = yokaiDatabase[slotParamID].baseA_Defense || 0;
			slotStats.BS_A_Spd = yokaiDatabase[slotParamID].baseA_Speed || 0;
			slotStats.BS_B_HP = yokaiDatabase[slotParamID].baseB_HP || 0;
			slotStats.BS_B_Str = yokaiDatabase[slotParamID].baseB_Strength || 0;
			slotStats.BS_B_Spr = yokaiDatabase[slotParamID].baseB_Spirit || 0;
			slotStats.BS_B_Def = yokaiDatabase[slotParamID].baseB_Defense || 0;
			slotStats.BS_B_Spd = yokaiDatabase[slotParamID].baseB_Speed || 0;
			slotStats.equipment = yokaiDatabase[slotParamID].ItemSlots || 0;
			console.log(yokaiDatabase[slotParamID].Rank)
			slotStats.Rank = yokaiDatabase[slotParamID].Rank || "Error";
			slotStats.Tribe = yokaiDatabase[slotParamID].Tribe || "";
			console.log("Loaded yokai's stats")
        }
        slots_stats[slotIndex] = slotStats;
    }
	
	var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(
        slotStats, 
        slotStats.HP_IV, 
        slotStats.STR_IV, 
        slotStats.SPR_IV, 
        slotStats.DEF_IV, 
        slotStats.SPD_IV, 
        slotStats.level
    );
	
	console.log(slotStats)
	
	const details=`
	<h2 class="SlotInfo-Text">${slotName}</h2>
	<img src=${slot.src} width="74px" height="auto" alt="ChosenYokai">
	<img src="Content/Graphics/Ranks/Rank_${Ranks[slotStats.Rank]}_icon.png" style="margin-left: 10px ;margin-right: 10px" width="50px" height="auto" alt="Rank">
	<img src=${"Content/Graphics/tribes/"+Tribes[slotStats.Tribe]+".png"} style="margin-left: 10px ;margin-right: 10px" width="50px" height="auto" alt="Tribe">
	<div style="display:column">
	<img width="75px" height="auto" src="Content/Graphics/Equip_Image.png">
	<div class="SlotInfo-Text" style="display: flex;">
	<div class="SlotInfo-Text" id="EquipmentDiv-1" style="position: relative; visibility: hidden;"><img onclick="AddEquipmentIntoSlot(this)" src="Content/Graphics/EquipmentSlot_Image.png" style="margin-left: 5px ;margin-right: 5px" width="80px" height="auto" alt="EquipmentSlot"><img id="EquipmentImg" height="auto" style="pointer-events: none; position: absolute; top: 2px; left:7px; visibility: hidden;"></div>
	<div class="SlotInfo-Text" id="EquipmentDiv-2" style="position: relative; visibility: hidden;"><img onclick="AddEquipmentIntoSlot(this)" src="Content/Graphics/EquipmentSlot_Image.png" style="margin-left: 5px ;margin-right: 5px" width="80px" height="auto" alt="EquipmentSlot"><img id="EquipmentImg" height="auto" style="pointer-events: none; position: absolute; top: 2px; left:7px; visibility: hidden;"></div>
	</div>
	</div>
	<button class="main-button" onclick="ClearEquipment()">Clear Equipment</button>
	<div class="SlotInfo-Text" style="margin-top: 20px">
	<label for="yokai-attitude">Attitude:</label>
		<select id="yokai-attitude">
	</select>
	<h4>Level <input style="width: 30px" id="yokai-level" type="text" value="${slotStats.level}" placeholder="60"></h4>
	</div>
	<h3 class="SlotInfo-Text Stats">HP: ${Math.round(BHP) + Attitudes[slotStats.attitude].boost[0]}</h3>
	<h3 class="SlotInfo-Text Stats">STR: ${Math.round(BSTR) + Attitudes[slotStats.attitude].boost[1]}</h3>
	<h3 class="SlotInfo-Text Stats">SPR: ${Math.round(BSPR) + Attitudes[slotStats.attitude].boost[2]}</h3>
	<h3 class="SlotInfo-Text Stats">DEF: ${Math.round(BDEF) + Attitudes[slotStats.attitude].boost[3]}</h3>
	<h3 class="SlotInfo-Text Stats">SPD: ${Math.round(BSPD) + Attitudes[slotStats.attitude].boost[4]}</h3>
	
	<h3 class="SlotInfo-Text" style="border-top-width: 1px; border-top-color: var(--side-buttons-color); border-top-style: solid">Gym STR: <input style="width:30px" type="number" value=${slotStats.STR_GYM} placeholder="STR" id="yokai-STR_Gym" class="GYM"></h3>
	<h3 class="SlotInfo-Text">Gym SPR: <input style="width:30px" type="number" value=${slotStats.SPR_GYM} placeholder="SPR" id="yokai-SPR_Gym" class="GYM"></h3>
	<h3 class="SlotInfo-Text">Gym DEF: <input style="width:30px" type="number" value=${slotStats.DEF_GYM} placeholder="DEF" id="yokai-DEF_Gym" class="GYM"></h3>
	<h3 class="SlotInfo-Text">Gym SPD: <input style="width:30px" type="number" value=${slotStats.SPD_GYM} placeholder="SPD" id="yokai-SPD_Gym" class="GYM"></h3>
	
	<h3 class="SlotInfo-Text" style="border-top-width: 1px; border-top-color: var(--side-buttons-color); border-top-style: solid">IV HP: <input style="width:30px" type="number" value=${slotStats.HP_IV} placeholder="HP" id="IV-HP" class="IV"></h3>
	<h3 class="SlotInfo-Text">IV STR: <input style="width:30px" type="number" value=${slotStats.STR_IV} placeholder="STR" id="IV-STR" class="IV"></h3>
	<h3 class="SlotInfo-Text">IV SPR: <input style="width:30px" type="number" value=${slotStats.SPR_IV} placeholder="SPR" id="IV-SPR" class="IV"></h3>
	<h3 class="SlotInfo-Text">IV DEF: <input style="width:30px" type="number" value=${slotStats.DEF_IV} placeholder="DEF" id="IV-DEF" class="IV"></h3>
	<h3 class="SlotInfo-Text">IV SPD: <input style="width:30px" type="number" value=${slotStats.SPD_IV} placeholder="SPD" id="IV-SPD" class="IV"></h3>
	`
	
	
	slotInfo_div.innerHTML = details;
	
	let EquipmentSlot_1 = document.getElementById("EquipmentDiv-1").querySelector("#EquipmentImg")
	let EquipmentSlot_2 = document.getElementById("EquipmentDiv-2").querySelector("#EquipmentImg")
	let YokaiAttitude = document.getElementById("yokai-attitude")
	let IV_HP = document.getElementById("IV-HP")
	let IV_STR = document.getElementById("IV-STR")
	let IV_SPR = document.getElementById("IV-SPR")
	let IV_DEF = document.getElementById("IV-DEF")
	let IV_SPD = document.getElementById("IV-SPD")
	
	if (slotStats.equipment >= 1) {
		EquipmentSlot_1.parentNode.style.visibility = "visible"
		if (wheelSlotEq.Slot1 != null){
			EquipmentSlot_1.src = wheelSlotEq.Slot1.src;
			EquipmentSlot_1.width = (wheelSlotEq.Slot1.width)
			EquipmentSlot_1.style = wheelSlotEq.Slot1.style;
			EquipmentSlot_1.style.position = wheelSlotEq.Slot1.style.position;
			EquipmentSlot_1.style.left = wheelSlotEq.Slot1.style.left;
			EquipmentSlot_1.style.top = wheelSlotEq.Slot1.style.top;
			EquipmentSlot_1.style.pointerEvents = "none";
		}
	}
	if (slotStats.equipment >= 2) {
		EquipmentSlot_2.parentNode.style.visibility = "visible"
		if (wheelSlotEq.Slot2 != null){
			EquipmentSlot_2.src = wheelSlotEq.Slot2.src;
			EquipmentSlot_2.width = (wheelSlotEq.Slot2.width)
			EquipmentSlot_2.style = wheelSlotEq.Slot2.style;
			EquipmentSlot_2.style.position = wheelSlotEq.Slot2.style.position;
			EquipmentSlot_2.style.left = wheelSlotEq.Slot2.style.left;
			EquipmentSlot_2.style.top = wheelSlotEq.Slot2.style.top;
			EquipmentSlot_2.style.pointerEvents = "none";
		}
	}
	
    YokaiAttitude.innerHTML = '';
    for (let i = 0; i < Attitudes.length; i++){
        const selected = i === slotStats.attitude ? 'selected' : '';
        const option = `<option value="${i}" ${selected}>${Attitudes[i].name}</option>`;
        YokaiAttitude.innerHTML += option;
    }
	setupSlotEventListeners(slotIndex, slotStats);
}



function setupSlotEventListeners(slotIndex, slotStats) {
    // Level input
    const levelInput = document.getElementById("yokai-level");
    levelInput.addEventListener('input', function(event) {
        slotStats.level = parseInt(this.value) || 60;
        slots_stats[slotIndex] = slotStats;
        updateDisplayedStats(slotStats);
    });
    
    // Attitude dropdown
    const attitudeSelect = document.getElementById("yokai-attitude");
    attitudeSelect.addEventListener('change', function(event) {
        slotStats.attitude = parseInt(this.value);
		console.log(this)
        slots_stats[slotIndex] = slotStats;
        updateDisplayedStats(slotStats);
    });
    
    // IV inputs
    const IV_Class = document.getElementsByClassName("IV");
    for (const element of IV_Class) {
        element.addEventListener('input', function(event) {
            const stat = this.id.replace('IV-', '').toUpperCase();
			const stat_value = element.value;
            slotStats[`${stat}_IV`] = parseInt(stat_value) || 0;
            slots_stats[slotIndex] = slotStats;
            CheckIV();
            updateDisplayedStats(slotStats);
        });
    }
    
    // Gym inputs
    const GYM_Class = document.getElementsByClassName("GYM");
    for (const element of GYM_Class) {
        element.addEventListener('input', function(event) {
            const stat = this.id.replace('yokai-', '').replace('_Gym', '').toUpperCase();
			const stat_value = element.value;
            slotStats[`${stat}_GYM`] = parseInt(stat_value) || 0;
            slots_stats[slotIndex] = slotStats;
            CheckGymStat();
            updateDisplayedStats(slotStats);
        });
    }
	
	function CheckIV(){
		let sum=0;
		let flag = 0;
		for (const element of IV_Class) {
			if (parseInt(element.value) < 0){
				flag=1;
			}
			sum+=parseInt(element.value);
		}
		if (sum != 40 || flag == 1){
			for (const element of IV_Class) {
				element.style.color = 'red';
			}
		}
		else{
			for (const element of IV_Class) {
				element.style.color =  "var(--side-buttons-color)"
			}
		}
	}

	function CheckGymStat(){
		let sum=0;
		let flag = 0;
		for (const element of GYM_Class) {
			if (parseInt(element.value) < 0){
				flag=1;
			}
			sum+=parseInt(element.value);
		}
		if (sum > 5 || flag == 1){
			for (const element of GYM_Class) {
				element.style.color = 'red';
			}
		}
		else{
			for (const element of GYM_Class) {
				element.style.color =  "var(--side-buttons-color)"
			}
		}
	}
}

function updateDisplayedStats(slotStats) {
    var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(
        slotStats, 
        slotStats.HP_IV, 
        slotStats.STR_IV, 
        slotStats.SPR_IV, 
        slotStats.DEF_IV, 
        slotStats.SPD_IV, 
        slotStats.level,
        slotStats.STR_GYM, 
        slotStats.SPR_GYM, 
        slotStats.DEF_GYM, 
        slotStats.SPD_GYM, 
		Attitudes[slotStats.attitude].boost[0],
		Attitudes[slotStats.attitude].boost[1],
		Attitudes[slotStats.attitude].boost[2],
		Attitudes[slotStats.attitude].boost[3],
		Attitudes[slotStats.attitude].boost[4],
    );
    
    const statElements = {
        'HP': Math.round(BHP),
        'STR': Math.round(BSTR),
        'SPR': Math.round(BSPR),
        'DEF': Math.round(BDEF),
        'SPD': Math.round(BSPD)
    };
    let i=0;
    for (const [stat, value] of Object.entries(statElements)) {
        const element = document.getElementsByClassName("Stats")[i];
        if (element) {
            element.textContent = `${stat}: ${value}`;
			i++
        }
    }
}

function AddEquipmentIntoSlot(eqSlot){

	const slotNumber = selectedWheelSlot.id.replace('Slot', '');
	const wheelSlotEq = window[`WheelSlot${slotNumber}Eq`];
	const imgElement = eqSlot.parentElement.querySelector("#EquipmentImg");
	
	imgElement.src = selectedEquipment.src
	imgElement.value = selectedEquipment.alt
	imgElement.style.visibility = "visible"
	imgElement.width = (eqSlot.width-10)
	
	const slotIndex = eqSlot.parentElement.id.replace('EquipmentDiv-', '')
	
	wheelSlotEq[`Slot${slotIndex}`] = imgElement.cloneNode(true);
	wheelSlotEq[`Slot${slotIndex}_Name`] = imgElement.value;
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
		if (legalCheck(yokai)==false){continue;}
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
		
		var [BHP, BSTR, BSPR, BDEF, BSPD] = CalculateStats(yokai, HP_IV, STR_IV, SPR_IV, DEF_IV, SPD_IV, 60)
		
		divName.innerHTML = yokai.Name
		divName.id = "div-name"
		divName.setAttribute("paramID", key)
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
		selectImage(img);
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
		display_list[parseInt(yokai.MedalliumOffset)] = divMain;
		
}

for (i=0; i < display_list.length; i++){
	if (display_list[i] !== undefined){
		yokaiPage.appendChild(display_list[i])
	}
}
}

function ClearEquipment(){
	let EquipmentSlot_1 = document.getElementById("EquipmentDiv-1").querySelector("#EquipmentImg")
	let EquipmentSlot_2 = document.getElementById("EquipmentDiv-2").querySelector("#EquipmentImg")
	
	var slotNumber = selectedWheelSlot.id.replace('Slot', '');
	var wheelSlotEq = window[`WheelSlot${slotNumber}Eq`];
	
	EquipmentSlot_1.outerHTML = `<img id="EquipmentImg" height="auto" style="pointer-events: none; position: absolute; top: 2px; left:7px; visibility: hidden;">`
	EquipmentSlot_2.outerHTML = `<img id="EquipmentImg" height="auto" style="pointer-events: none; position: absolute; top: 2px; left:7px; visibility: hidden;">`
	wheelSlotEq.Slot1 = null
	wheelSlotEq.Slot2 = null
}


var YokaiButton = document.getElementById("YokaiButton")


if (YokaiButton){
		loadScripts(Databases, () => {
		YokaiButton.addEventListener('click', function (){
			showPage(yokaiDatabase)
		})
		showPage(yokaiDatabase)
    });
}

