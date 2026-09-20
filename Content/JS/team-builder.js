
function calculateStats({ yokaiData, lvl = 60, ivHp = 16, ivStr = 8, ivSpr = 8, ivDef = 8, ivSpd = 8,
                          gymStr = 0, gymSpr = 0, gymDef = 0, gymSpd = 0,
                          evHp = 0, evStr = 0, evSpr = 0, evDef = 0, evSpd = 0 }) {
	//console.debug( yokaiData, lvl, ivHp, ivStr, ivSpr, ivDef, ivSpd, gymStr, gymSpr, gymDef, gymSpd, evHp, evStr, evSpr, evDef, evSpd);
    let parsedLvl = parseInt(lvl, 10);
    if (isNaN(parsedLvl) || parsedLvl > 99 || parsedLvl < 0) parsedLvl = 60;
    const lvlFactor = (parsedLvl - 1) / 98;

    const baseHp = yokaiData.baseA_HP + (yokaiData.baseB_HP - yokaiData.baseA_HP + (+ivHp))
        * lvlFactor + (evHp * 3 * (1 + parsedLvl / 198));

    const baseStr = yokaiData.baseA_Strength + (yokaiData.baseB_Strength - yokaiData.baseA_Strength + (+ivStr))
        * lvlFactor + (evStr * 1.5 * (1 + parsedLvl / 198)) + ((+gymStr) * 5);

    const baseSpr = yokaiData.baseA_Spirit + (yokaiData.baseB_Spirit - yokaiData.baseA_Spirit + (+ivSpr))
        * lvlFactor + (evSpr * 1.5 * (1 + parsedLvl / 198)) + ((+gymSpr) * 5);

    const baseDef = yokaiData.baseA_Defense
        + (yokaiData.baseB_Defense - yokaiData.baseA_Defense + (+ivDef))
        * lvlFactor + (evDef * 1.5 * (1 + parsedLvl / 198)) + ((+gymDef) * 5) - ((+gymStr) * 2) - ((+gymSpd) * 2);

    const baseSpd = yokaiData.baseA_Speed
        + (yokaiData.baseB_Speed - yokaiData.baseA_Speed + (+ivSpd))
        * lvlFactor + (evSpd * 1.5 * (1 + parsedLvl / 198)) + ((+gymSpd) * 5) - ((+gymSpr) * 2) - ((+gymDef) * 2);

    return { baseHp, baseStr, baseSpr, baseDef, baseSpd };
}

// Config:

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const pathDatabase = "Content/JS/databases/";

const pathMedal = "Content/Graphics/YokaiMedals/";

const pathArtwork = "Content/Graphics/Artwork/";

const pathEquipment = "Content/Graphics/ItemIcons/";

const tribeList = [
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

const rankList = [
	'E',
	'D',
	'C',
	'B',
	'A',
	'S'
];

const SkillTextConfig={
	"0x4257EF55": " + 20.",
	"0xDB5EBEEF": " + 30.",
	"0xAC598E79": " + 40.",
	"0x323D1BDA": " + 45.",
	
	"0x453A2B4C": " + 20.",
	"0xDC337AF6": " + 30.",
	"0xAB344A60": " + 40.",
	"0x3B8B57F1": " + 45.",
	
	"0xB542BF38": " + 20.",
	"0x2B262A9B": " + 25.",
	"0x5C211A0D": " + 30.",
	"0xC5284BB7": " + 35.",
	
	"0x4C8C6767": " + 20.",
	"0x2C4BEE82": " + 30.",
	"0x5B4CDE14": " + 40.",
	"0xC2458FAE": " + 45.",
};

const colorCodes = {
    '0-59'     : 'red',
    '60-89'    : 'orange',
    '90-105'   : 'yellow',
	'106-129'  : 'yellowgreen',
	'130-159'  : 'lightgreen',
	'160-200'  : 'green',
	'201-999'  : 'darkgreen'
};
  
// Helper Functions
 
const between = (x,min,max) => (x >= min && x <= max);

//const $ = id => document.getElementById(id);

//

const state = {
	slots:[
		{ attitude: 0, ivs: { hp: 16, str: 8, spr: 8, def: 8, spd: 8 }, gym: { str: 0, spr: 0, def: 0, spd: 0 }, level: 60, yokaiId: null },
		{ attitude: 0, ivs: { hp: 16, str: 8, spr: 8, def: 8, spd: 8 }, gym: { str: 0, spr: 0, def: 0, spd: 0 }, level: 60, yokaiId: null },
		{ attitude: 0, ivs: { hp: 16, str: 8, spr: 8, def: 8, spd: 8 }, gym: { str: 0, spr: 0, def: 0, spd: 0 }, level: 60, yokaiId: null },
		{ attitude: 0, ivs: { hp: 16, str: 8, spr: 8, def: 8, spd: 8 }, gym: { str: 0, spr: 0, def: 0, spd: 0 }, level: 60, yokaiId: null },
		{ attitude: 0, ivs: { hp: 16, str: 8, spr: 8, def: 8, spd: 8 }, gym: { str: 0, spr: 0, def: 0, spd: 0 }, level: 60, yokaiId: null },
		{ attitude: 0, ivs: { hp: 16, str: 8, spr: 8, def: 8, spd: 8 }, gym: { str: 0, spr: 0, def: 0, spd: 0 }, level: 60, yokaiId: null }
	],
	equipment:[
		{ slot1: null, slot2: null },
		{ slot1: null, slot2: null },
		{ slot1: null, slot2: null },
		{ slot1: null, slot2: null },
		{ slot1: null, slot2: null },
		{ slot1: null, slot2: null }
	],
	selected: { // Selected Element Params
		wheelSlot: null,
		yokaiId: null,
		equipmentId: null,
	},
	editingSlots: false,
	rankCounter: { S: 0, A: 0 } // Rank Config
};

//

// Assigning elements:

const equipmentButton = $("EquipmentButton")

const soulGemButton = $("SoulGemButton")

const alertWindow = $('alertWindow');

const popupCloseButton  = $('close-btn');

const main = document.getElementsByTagName('main')[0];

// Main Function List:

function editTeam(){
	state.editingSlots=true;
	state.selected.yokaiId=null;
}
		
function selectYokai(yokaiId) {
	$("ChosenYokaiRing").style.visibility = "hidden";
	
	state.editingSlots = false;
	
	state.selected.yokaiId = yokaiId;
}

function selectEquipment(equipmentId) {
    state.selected.equipmentId = equipmentId;
} 	
	
function selectWheelSlot(slot) {

    const slotIndex = Number(slot.dataset.index);
    if (state.selected.yokaiId === null && !state.editingSlots) {
        console.warn("No Yo-kai selected!");
        return;
    }

    if (state.selected.yokaiId === state.slots[slotIndex].yokaiId) {
        console.warn("Yo-kai is already in that slot!");
        return;
    }
	
	
    state.selected.wheelSlot = slotIndex;

    const ringLeft = `${parseInt(slot.style.left || 0, 10) - 8}px`;

    const ringTop = `${parseInt(slot.style.top || 0, 10) - 7}px`;

    $("ChosenYokaiRing").style.left = ringLeft;
    $("ChosenYokaiRing").style.top = ringTop;
    $("ChosenYokaiRing").style.visibility = "visible";

    if (state.editingSlots) {
        showSlotInfo();
        return;
    }

    const newYokai = yokaiDatabase[state.selected.yokaiId];

    const slotState = state.slots[slotIndex];

    const oldYokai = slotState.yokaiId !== null ? yokaiDatabase[slotState.yokaiId] : null;

    if (oldYokai) updateRankCounter(oldYokai, -1);

    updateRankCounter(newYokai, +1);

    slotState.yokaiId = state.selected.yokaiId;

    slot.src = `${pathMedal}y${String(newYokai.MedalPosX + newYokai.MedalPosY * 23).padStart(3,'0')}.webp`;

    showSlotInfo();
}

function updateRankCounter(yokai, amount) {

    if (!yokai) {
        return;
    }

    if (yokai.Rank === 5) {
        state.rankCounter.S += amount;
    }
    else if (yokai.Rank === 4) {
        state.rankCounter.A += amount;
    }


    updateRankDisplay();
}
	
function updateRankDisplay() {

    const sRemaining = 2 - state.rankCounter.S;

    const aRemaining = 2 - state.rankCounter.A;


    $('S_Rank1').src = sRemaining >= 1 ? "Content/Graphics/S_RankUnincluded.png" : "Content/Graphics/S_RankIncluded.png";

    $('S_Rank2').src = sRemaining >= 2 ? "Content/Graphics/S_RankUnincluded.png" : "Content/Graphics/S_RankIncluded.png";

    $('A_Rank1').src = aRemaining >= 1 ? "Content/Graphics/A_RankUnincluded.png" : "Content/Graphics/A_RankIncluded.png";

    $('A_Rank2').src = aRemaining >= 2 ? "Content/Graphics/A_RankUnincluded.png" : "Content/Graphics/A_RankIncluded.png";
}

function decodeTeam(encoded) {

    const json = decodeURIComponent(atob(encoded));

    return JSON.parse(json);
}

function loadTeam(){
	let team = prompt("Paste encoded team here:")
	
	if (team===null) return;
	
	state.editingSlots=true;
	
	team = decodeTeam(team);
	
	state.slots = team.slots;
	
	state.equipment = team.equipment;
	
	state.rankCounter = team.rankCounter;
	
	const wheelImages = document.getElementsByClassName("wheel-img");
	
	for (const img of wheelImages){
		const yokaiData = yokaiDatabase[state.slots[img.dataset.index].yokaiId];
		if (yokaiData) img.src = `${pathMedal}y${String(yokaiData.MedalPosX + yokaiData.MedalPosY * 23).padStart(3,'0')}.webp`;
	}
	
	updateRankDisplay()
	
	closePopup();
}
/* Deprecated

function loadTeamFromURL(){
	Slots = urlParams.get('team');
	EditingSlots=false;
	
	Slots = atob(Slots)
	Slots = decodeURIComponent(Slots)
	Slots = JSON.parse(Slots)
	
	let WheelSlots = [Slot1,Slot2,Slot3,Slot4,Slot5,Slot6]
	
	slots_stats = Slots[0]
	
	WheelSlot1Eq=Slots[1]
	WheelSlot2Eq=Slots[2]
	WheelSlot3Eq=Slots[3]
	WheelSlot4Eq=Slots[4]
	WheelSlot5Eq=Slots[5]
	WheelSlot6Eq=Slots[6]
	
	let YokaiPage = document.getElementById("data-page")
	let YokaiPageList = YokaiPage.children;
	
	for (let x = 0; x < 6; x++){
		for (let i = 0; i < YokaiPageList.length; i++) {
			const YokaiIMG = YokaiPageList[i].querySelector("#div-name").textContent
			let Slot = WheelSlots[x]
			if (YokaiIMG == yokaiDatabase[slots_stats[x][4]].Name){
				//console.log(slots_stats[x].Name)
				selectYokai(slots_stats[x][4])
				//console.log(selectedYokai)
				selectWheelSlot(Slot)
				
			}
		}
	}
}
*/
function saveTeam() {

    const teamData = {
        slots: state.slots,
        equipment: state.equipment,
		rankCounter: state.rankCounter
    };


    const encoded = btoa(encodeURIComponent(JSON.stringify(teamData)));


    navigator.clipboard.writeText(encoded).then(() => {
		alert("Successfully copied Base64 code to clipboard!");
	}).catch(error => {
		console.error(
			"Failed to copy team:",
			error
		);
	});
}

function copyAsText(){

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

    const names = state.slots.map(slot => {
        return yokaiDatabase[slot.yokaiId]?.Name ?? "Empty";
    });


    const lines = state.slots.map((slot, index) => {

            const yokai = yokaiDatabase[slot.yokaiId];

            const equipment = state.equipment[index];


            const item1 = equipmentDatabase[equipment.slot1] || soulgemDatabase[equipment.slot1];

            const item2 = equipmentDatabase[equipment.slot2] || soulgemDatabase[equipment.slot2];


            const attitude = attiduteDatabase[slot.attitude ?? 0]?.text ?? "Unknown";


            return `${yokai?.Name ?? "Empty"} @ ${attitude}; ` +
                   `${item1?.NounText ?? ""} ` +
                   `${item2?.NounText ?? ""}`;
        });


    return `${names.slice(0, 3).join(" - ")}
${names.slice(3, 6).join(" - ")}

__*Equipment and Attidutes*__

${lines.join("\n")}`;
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

function postTeam(){
	var TeamData = [slots_stats, WheelSlot1Eq, WheelSlot2Eq, WheelSlot3Eq, WheelSlot4Eq, WheelSlot5Eq, WheelSlot6Eq ]
	var SavingTeamJSON = btoa(encodeURIComponent(JSON.stringify(TeamData)))
	window.location.assign(`./createTeamPost.html?team=${SavingTeamJSON}`);
}

function showSlotInfo(){
	
	const slotIndex = state.selected.wheelSlot;
	
    const slotData = state.slots[slotIndex];
	
	const yokaiData = yokaiDatabase[slotData.yokaiId];
	
	const equipmentData = state.equipment[slotIndex];
	
	if(!yokaiData) return;
    
	$("slot-info").style.visibility = "visible";
	
	//const prefix = yokaiData.FileNamePrefix;
	//const number = (yokaiData.FileNameNumber).toString();
	//const variant = (yokaiData.FileNameVariant).toString();
	$("yokai-img").src = `${pathMedal}y${String(yokaiData.MedalPosX + yokaiData.MedalPosY * 23).padStart(3,'0')}.webp`;
	$("yokai-img").alt = `${yokaiData.Name}`;
	$("yokai-rank").src = `./Content/Graphics/tribes/${tribeList[yokaiData.Tribe]}.png`;
	$("yokai-tribe").src = `./Content/Graphics/ranks/${rankList[yokaiData.Rank]}.png`
	
	$("yokai-title").innerText = yokaiData.Name;
	
	/*
	$("slot-info").querySelectorAll('.Stats').forEach(function(stat){
		var dc = Math.round(parseInt(stat.getAttribute("data-stat")))
		
		for (var [name, value] of Object.entries(colorCodes)){
			var first = parseInt(name.split('-')[0],10);
			var second = parseInt(name.split('-')[1],10);
			
			//console.log(between(dc, first, second));
			
			if( between(dc, first, second) ){
			  stat.style.color= value;
			}
		}
	});
	*/
	
	let yokaiAttitude = document.getElementById("yokai-attitude");
	let equipment1 = equipmentDatabase[equipmentData.slot1] || soulgemDatabase[equipmentData.slot1];
	let equipment2 = equipmentDatabase[equipmentData.slot2] || soulgemDatabase[equipmentData.slot2];
	
	const slotElement1 = $("equip-slot-1");
	const slotElement2 = $("equip-slot-2");
	slotElement1.style.visibility = "hidden";
	$("equipment-1").style.visibility = "hidden";
	slotElement2.style.visibility = "hidden";
	$("equipment-2").style.visibility = "hidden";
	
	if (yokaiData.EquipmentSlots >= 1) {
		slotElement1.style.visibility = "visible"
		if (equipment1 != null){
			$("equipment-1").src=`${pathEquipment}item_${(equipment1.IconPosX + (equipment1.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
			$("equipment-1").style.visibility = "visible";
		}
		if (yokaiData.EquipmentSlots >= 2) {
			slotElement2.style.visibility = "visible"
			if (equipment2 != null){
				$("equipment-2").src = `${pathEquipment}item_${(equipment2.IconPosX + (equipment2.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
				$("equipment-2").style.visibility = "visible";
			}
		}
	}
	
	
    yokaiAttitude.innerHTML = '';
    for (let i = 0; i < attiduteDatabase.length; i++){
        const selected = i === slotData.attitude ? 'selected' : '';
        const option = `<option value="${i}" ${selected}>${attiduteDatabase[i].text}</option>`;
        yokaiAttitude.innerHTML += option;
    }
	updateDisplay();
	setupSlotEventListeners();
}



function setupSlotEventListeners() {
	
	const slotIndex = state.selected.wheelSlot;

    const slotData = state.slots[slotIndex];
	
	
	const yokaiLevelInput = $("yokai-level");
	yokaiLevelInput.value = slotData.level;
    yokaiLevelInput.addEventListener("input", function () {
		slotData.level = parseInt(this.value, 10) || 60;
		validateAndStyleInputs();
	});
	
    $("yokai-attitude").addEventListener('change', function() {
        slotData.attitude = parseInt(this.value, 10);
		validateAndStyleInputs();
    });
	
    const classIV = document.getElementsByClassName("IV");
    for (const input of classIV) {
		const attr = input.id.replace("iv-", "");

		input.value = slotData.ivs[attr];
		input.addEventListener("input", function () {
			slotData.ivs[attr] = parseInt(this.value, 10) || 0;
			validateAndStyleInputs();
		});
	}
    
    const classGym = document.getElementsByClassName("gym");
    for (const input of classGym) {
		const attr = input.id.replace("gym-", "");

		input.value = slotData.gym[attr];
		input.addEventListener("input", function () {
			slotData.gym[attr] = parseInt(this.value, 10) || 0;
			validateAndStyleInputs();
		});
	}
}

function validateAndStyleInputs() {
	
	const slotIndex = state.selected.wheelSlot;

    const slotData = state.slots[slotIndex];
	
	let ivTotal = 0;
	Object.values(slotData.ivs).slice(1).forEach(iv => {
		ivTotal+=iv;
	});
	ivTotal+= Math.floor(slotData.ivs.hp / 2);
	const ivValid = ivTotal === 40 && Object.values(slotData.ivs).slice(1).every(v => v >= 3 && v <= 16) && (3 <= Math.floor(slotData.ivs.hp / 2) <= 16);
	document.querySelectorAll(`.IV`).forEach(elem => {
		elem.style.color = ivValid ? 'var(--side-buttons-color)' : 'red';
	});

	let gymTotal = 0;
	Object.values(slotData.gym).forEach(gymStat => {
		gymTotal+=gymStat;
	});
	//console.debug(gymTotal);
	const gymValid = gymTotal <= 5 && Object.values(slotData.gym).every(v => v >= 0 && v <= 5);
	document.querySelectorAll(`.gym`).forEach(elem => {
		elem.style.color = gymValid ? 'var(--side-buttons-color)' : 'red';
	});
	//let attiduteSelect = $('attitude-select');
	//$('attitude-display').innerHTML = `HP Boost: ${attiduteDatabase[attiduteSelect.value].boost[0]} | STR Boost: ${attiduteDatabase[attiduteSelect.value].boost[1]} | SPR Boost: ${attiduteDatabase[attiduteSelect.value].boost[2]} | DEF Boost: ${attiduteDatabase[attiduteSelect.value].boost[3]} | SPD Boost: ${attiduteDatabase[attiduteSelect.value].boost[4]}`;
	updateDisplay();
}

function updateDisplay(){
	
	const slotIndex = state.selected.wheelSlot;

    const slotData = state.slots[slotIndex];

    const yokaiData = yokaiDatabase[slotData.yokaiId];
	
	const attitudeData = attiduteDatabase[slotData.attitude].boost;
	
	const stats = calculateStats({
        yokaiData,

        lvl: slotData.level,

        ivHp: slotData.ivs.hp,
        ivStr: slotData.ivs.str,
        ivSpr: slotData.ivs.spr,
        ivDef: slotData.ivs.def,
        ivSpd: slotData.ivs.spd,

        gymStr: slotData.gym.str,
        gymSpr: slotData.gym.spr,
        gymDef: slotData.gym.def,
        gymSpd: slotData.gym.spd,
		
		evHp: attitudeData[0],
		evStr: attitudeData[1],
	    evSpr: attitudeData[2],
	    evDef: attitudeData[3],
	    evSpd: attitudeData[4]
	}); 
	
	$('yokai-max-hp').innerText = "HP: "+Math.max(Math.floor(stats.baseHp), 1);
	$('yokai-strength').innerText = "STR: "+Math.max(Math.floor(stats.baseStr), 1);
	$('yokai-spirit').innerText = "SPR: "+Math.max(Math.floor(stats.baseSpr), 1);
	$('yokai-defense').innerText = "DEF: "+Math.max(Math.floor(stats.baseDef), 1);
	$('yokai-speed').innerText = "SPD: "+Math.max(Math.floor(stats.baseSpd), 1);
}

function AddEquipmentIntoSlot(eqSlot){
	const slotIndex = state.selected.wheelSlot;
	const equipmentData = state.equipment[slotIndex];
	const equipmentId = state.selected.equipmentId;
	
	if (!equipmentId) return;
	
	const data = equipmentDatabase[equipmentId] || soulgemDatabase[equipmentId];
	
	if (!data) return;
	
	equipmentData[`slot${eqSlot.dataset.index}`] = equipmentId;
	
	const image = $(`equipment-${eqSlot.dataset.index}`);
	
	image.src = `${pathEquipment}item_${(data.IconPosX + (data.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
	image.style.visibility = "visible";
}

function showEquipmentPage(){
	const equipmentPage = document.getElementById("data-page");
	let Path = "Content/Graphics/ItemIcons/"
	equipmentPage.innerHTML = "";
	const list = [];
	list.length = Object.keys(equipmentDatabase).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,item] of Object.entries(equipmentDatabase)) {
		const divMain = document.createElement("div")
		const divName = document.createElement("div")
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		
		const divSTR = document.createElement("div")
		const divSPR = document.createElement("div")
		const divDEF = document.createElement("div")
		const divSPD = document.createElement("div")
		
		divName.style = `width: auto; margin-left: 10px ;margin-right: 10px`;
		divName.id = "div-name";
		divName.innerHTML = item.NounText;
		divDesc.style = `width: auto; margin-left: 10px ;margin-right: 10px`
		divDesc.innerHTML = (item.DescText).replaceAll('\\n','\n');
		divDesc.id = "div-desc";
		divSTR.style=`width: auto; margin-left: 10px ;margin-right: 10px`;
		divSTR.innerHTML = "STR: "+item.STRBuff;
		divSPR.style=`width: auto; margin-left: 10px ;margin-right: 10px;`;
		divSPR.innerHTML = "SPR: "+item.SPRBuff;
		divDEF.style=`width: auto; margin-left: 10px ;margin-right: 10px`;
		divDEF.innerHTML = "DEF: "+item.DEFBuff;
		divSPD.style=`width: auto; margin-left: 10px ;margin-right: 10px;`;
		divSPD.innerHTML = "SPD: "+item.SPDBuff;
		divMain.className = "MiniEqInfo-div";
		divMain.style = "min-width: 850px; justify-content: space-between;";
		if (item.ImageIcon !== undefined){
		img.src = Path+item.ImageIcon;
		img.alt = item.NounText;
		img.value = key;
		img.setAttribute("ItemName", item.NounText);
		img.style = "width: 70px; height: auto"
		img.onclick = () => {
		selectEquipment(key);
		};
		
		divMain.appendChild(img);
		}
		divMain.appendChild(divName);
		divMain.appendChild(divDesc);
		if (item.STRBuff !== 0){
		divMain.appendChild(divSTR);
		}
		if (item.SPRBuff !== 0){
		divMain.appendChild(divSPR);
		}
		if (item.DEFBuff !== 0){
		divMain.appendChild(divDEF);
		}
		if (item.SPDBuff !== 0){
		divMain.appendChild(divSPD);
		}
		list[item.ItemNum] = divMain;				
}
		for (i=0; i < list.length; i++){
			if (list[i] !== undefined){
				equipmentPage.appendChild(list[i])
			}
		}
}

function showSoulgemPage(){
	const soulPage = document.getElementById("data-page");
	let Path = "Content/Graphics/ItemIcons/"
	soulPage.innerHTML = "";
	const list = [];
	list.length = Object.entries(soulgemDatabase).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,item] of Object.entries(soulgemDatabase)) {
		const divMain = document.createElement("div")
		const divName = document.createElement("div")
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		
		const DescConfig = SkillTextConfig[item.SoulEffect.SkillID] || ""
		
		divName.style = `width: auto; margin-left: 10px ;margin-right: 10px`
		divName.id = "div-name"
		divName.innerHTML = item.NounText
		divDesc.style = `width: auto`
		divDesc.innerHTML = (item.DescText).replaceAll('\\n','\n') + DescConfig;
		divDesc.id = "div-desc"
		divMain.className = "MiniEqInfo-div"
		divMain.style = "min-width: 850px; justify-content: space-between;"
		img.src = Path+item.ImageIcon;
		img.alt = item.NounText;
		img.style = `width: 50px; height: auto; margin-left: 10px ;margin-right: 10px`
		img.value = key;
		img.setAttribute("ItemName", item.NounText);
		img.onclick = () => {
		selectEquipment(key);
		};
		divMain.appendChild(img);
		divMain.appendChild(divName);
		divMain.appendChild(divDesc);
		list[item.ItemNum] = divMain;
}
		console.log(list, list.length)
		for (i=0; i < list.length; i++){
			if (list[i] !== undefined){
				//console.log(list[i])
				soulPage.appendChild(list[i])
			}
		}
}

window.addEventListener('load', function () {
	if (page == "equipment.html"){
		console.log('!')
		showEquipmentPage()
	}
})

if (equipmentButton){
	equipmentButton.addEventListener('click', function (){
		showEquipmentPage()
	})
}

if (soulGemButton){
	soulGemButton.addEventListener('click', function (){
		showSoulgemPage()
	})
}

function showPage(yokais) {
	const yokaiPage = document.getElementById("data-page");
	yokaiPage.innerHTML = "";

    let yokaiListHTML = '';
	
	const sortedEntries = Object.entries(yokais)
    .filter(([, yokai]) => yokai.InMedallium === 1 && yokai.LegalAlliances != 0)
    .sort((a, b) => a[1].MedalliumOffset - b[1].MedalliumOffset);

    for (const [key, yokai] of sortedEntries) {
		
		//console.debug(key, yokai);

        const stats = calculateStats({yokaiData: yokai});

        const imgSrc = `Content/Graphics/YokaiMedals/y${String(yokai.MedalPosX + yokai.MedalPosY * 23).padStart(3, '0')}.webp`;

        const medalId = String(yokai.MedalliumOffset).padStart(3, '0');
        const name = yokai.Name;
        const hp = Math.floor(stats.baseHp);
        const str = Math.floor(stats.baseStr);
        const spr = Math.floor(stats.baseSpr);
        const def = Math.floor(stats.baseDef);
        const spd = Math.floor(stats.baseSpd);

        const itemHTML = `
            <div class="MiniYokaiInfo-div" style="width:93%;height:120px;margin:5px;border:1px solid #c6c0ff;display:flex;justify-content:space-between;align-items:center;flex-direction:row;flex-wrap:nowrap;">
                <div>NO. ${medalId}</div>
				<img class="yokai-img" src="${imgSrc}" alt="${name}" style="cursor:pointer;width:50px;height:auto;" data-index="${key}">
                <div paramID="${key}">${name}</div>
                <div>HP:${hp}</div>
                <div>STR:${str}</div>
                <div>SPR:${spr}</div>
                <div>DEF:${def}</div>
                <div>SPD:${spd}</div>
				<img src="./Content/Graphics/tribes/${tribeList[yokai.Tribe]}.png">
				<img src="./Content/Graphics/ranks/${rankList[yokai.Rank]}.png">
            </div>
        `;

        yokaiListHTML += itemHTML;
    }

    yokaiPage.innerHTML = yokaiListHTML;

    yokaiPage.querySelectorAll('.yokai-img').forEach(img => {
        img.addEventListener('click', function(e) {
            state.selected.yokaiId = img.dataset.index;
        });
    });
}

function clearEquipment(){
	
	const slotIndex = state.selected.wheelSlot;

    const equipmentData = state.equipment[slotIndex];
	
	equipmentData.slot1 = null;
	equipmentData.slot2 = null;
	
	$("equipment-1").style.visibility = "hidden";
	$("equipment-2").style.visibility = "hidden";
	wheelSlotEq.Slot1 = null
	wheelSlotEq.Slot2 = null
}

function closePopup(){
	alertWindow.style.display="none";
	main.style.display="block";
}

function showPopup(){
	main.style.display = "none";
	alertWindow.style.display = "grid";
}


var YokaiButton = document.getElementById("YokaiButton")


if (YokaiButton){
	YokaiButton.addEventListener('click', function(){
		showPage(yokaiDatabase)
	})
	showPage(yokaiDatabase)
	if (urlParams.get('team')){
		loadTeamFromURL();
	}
}

