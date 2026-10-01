
const infoPage = document.getElementById("data-page");

const skillTextConfig=[
	0x1880DCDC,
	0x81898D66,
	0x68EA2853,
	0xF68EBDF0
];

function setBuffText(effect) {
	//console.debug(skillTextConfig.includes(parseInt(effect.EffectID, 16)),  effect.EffectID);
	if (!skillTextConfig.includes(parseInt(effect.EffectID, 16))) return '';
	return ` +${effect.C10}`;
}

function showEquipmentPage(){
	let itemPath = "Content/Graphics/ItemIcons/"
	infoPage.innerHTML = "";
	const list = [];
	list.length = Object.keys(equipmentDatabase).length;
	
	for (const [key,item] of Object.entries(equipmentDatabase)) {
		const divMain = document.createElement("div");
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		const ItemAnhr = document.createElement("a");
		ItemAnhr.href=`./item-info.html?item=${key}&type=0`;
		
		const divSTR = document.createElement("div")
		const divSPR = document.createElement("div")
		const divDEF = document.createElement("div")
		const divSPD = document.createElement("div")
		
		ItemAnhr.style = `width: auto; margin-left: 10px ;margin-right: 10px; color: var(--side-buttons-color);`
		ItemAnhr.id = "div-name"
		ItemAnhr.innerHTML = item.NounText
		divDesc.style = `width: auto; margin-left: 10px ;margin-right: 10px`
		divDesc.innerHTML = (item.DescText).replaceAll('\\n','\n')
		divDesc.id = "div-desc"
		divSTR.style=`width: auto; margin-left: 10px ;margin-right: 10px`
		divSTR.innerHTML = "STR: "+item.STRBuff
		divSPR.style=`width: auto; margin-left: 10px ;margin-right: 10px;`
		divSPR.innerHTML = "SPR: "+item.SPRBuff
		divDEF.style=`width: auto; margin-left: 10px ;margin-right: 10px`
		divDEF.innerHTML = "DEF: "+item.DEFBuff
		divSPD.style=`width: auto; margin-left: 10px ;margin-right: 10px;`
		divSPD.innerHTML = "SPD: "+item.SPDBuff
		divMain.className = "mini-info-div"
		divMain.style = "min-width: 850px; justify-content: space-between;"
		if (item.ImageIcon !== undefined){
		img.src = itemPath+item.ImageIcon;
		img.alt = item.Name;
		img.style = "width: 70px; height: auto"
		img.onclick = () => {
		selectEquipment(img);
		};
		
		divMain.appendChild(img);
		}
		divMain.appendChild(ItemAnhr);
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
				infoPage.appendChild(list[i])
			}
		}
}

function showSoulgemPage(){
	const soulPage = document.getElementById("data-page");
	let itemPath = "Content/Graphics/ItemIcons/"
	soulPage.innerHTML = "";
	const list = [];
	list.length = Object.entries(soulgemDatabase).length;
	
	for (const [key,item] of Object.entries(soulgemDatabase)) {
		const divMain = document.createElement("div")
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		const ItemAnhr = document.createElement("a");
		ItemAnhr.href=`./item-info.html?item=${key}&type=2`;
		
		const abilityData = abilitiesDatabase[item.SoulEffect.SkillID];
		
		const descConfig = setBuffText(abilityData.EffectData[0]);
		
		ItemAnhr.style = `width: auto; margin-left: 10px ;margin-right: 10px; color: var(--side-buttons-color);`
		ItemAnhr.id = "div-name";
		ItemAnhr.innerHTML = `${item.NounText} Soul`;
		divDesc.style = `width: auto`;
		divDesc.innerHTML = (item.DescText).replaceAll('\\n','\n') + descConfig;
		divDesc.id = "div-desc"
		divMain.className = "mini-info-div"
		divMain.style = "min-width: 850px; justify-content: space-between;"
		img.src = itemPath+item.ImageIcon;
		img.alt = item.NounText;
		img.style = `width: 50px; height: auto; margin-left: 10px ;margin-right: 10px`
		img.value = key;
		img.setAttribute("ItemName", item.NounText);
		img.onclick = () => {
		selectEquipment(key);
		};
		divMain.appendChild(img);
		divMain.appendChild(ItemAnhr);
		divMain.appendChild(divDesc);
		list[item.ItemNum] = divMain;
}
	for (i=0; i < list.length; i++){
		if (list[i] !== undefined){
			//console.log(list[i])
			soulPage.appendChild(list[i])
		}
	}
}



const equipmentButton = document.getElementById("equipment-button");
const soulgemButton = document.getElementById("soulgem-button");

if (equipmentButton){
	equipmentButton.addEventListener('click', function (){
		showEquipmentPage()
	})
}

if (soulgemButton){
	soulgemButton.addEventListener('click', function (){
		showSoulgemPage()
	})
}

document.addEventListener('DOMContentLoaded', function () {
	const searchInput = $("search-input");
	
	searchInput.addEventListener('search', () => {
		filterYokai(searchInput.value);
	});
	showEquipmentPage()
})