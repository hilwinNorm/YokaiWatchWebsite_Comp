
const infoPage = document.getElementById("item-list");

const tribeList = ['None', 'Brave', 'Mysterious', 'Tough', 'Charming', 'Heartful', 'Shady', 'Eerie', 'Slippery', 'Wicked'];

const skillTextConfig=[
	0x1880DCDC,
	0x81898D66,
	0x68EA2853,
	0xF68EBDF0
]

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
		ItemAnhr.textContent = item.NounText
		divDesc.style = `width: auto; margin-left: 10px ;margin-right: 10px`
		divDesc.textContent = (item.DescText).replaceAll('\\n','\n')
		divDesc.id = "div-desc"
		divSTR.textContent = "STR: "+item.STRBuff
		divSPR.textContent = "SPR: "+item.SPRBuff
		divDEF.textContent = "DEF: "+item.DEFBuff
		divSPD.textContent = "SPD: "+item.SPDBuff
		divMain.className = "item-list__item"
		//divMain.style = "min-width: 850px; justify-content: space-between;"
		if (item.ImageIcon !== undefined){
			img.src = `${itemPath}item_${String(item.IconPosY * 16 + item.IconPosX + 1).padStart(3, '0')}.xi.00.png`;
			img.alt = item.Name;
			img.style = "width: 70px; height: auto"
			img.onclick = () => {
				selectEquipment(img);
			};
		
			divMain.appendChild(img);
		}
		divMain.appendChild(ItemAnhr);
		divMain.appendChild(divDesc);
		if (item.STRBuff !== 0) divMain.appendChild(divSTR);
		if (item.SPRBuff !== 0) divMain.appendChild(divSPR);
		if (item.DEFBuff !== 0) divMain.appendChild(divDEF);
		if (item.SPDBuff !== 0) divMain.appendChild(divSPD);
		list[item.ItemNum] = divMain;				
}
		for (i=0; i < list.length; i++){
			if (list[i] !== undefined){
				infoPage.appendChild(list[i])
			}
		}
}

function showSoulgemPage(){
	const soulPage = document.getElementById("item-list");
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
		
		//ItemAnhr.style = `width: auto; margin-left: 10px ;margin-right: 10px; color: var(--side-buttons-color);`
		ItemAnhr.id = "div-name";
		ItemAnhr.innerHTML = `${item.NounText} Soul`;
		divDesc.style = `width: auto`;
		divDesc.innerHTML = (item.DescText).replaceAll('\\n','\n') + descConfig;
		divDesc.id = "div-desc";
		divMain.className = "item-list__item";
		//divMain.style = "min-width: 850px; justify-content: space-between;";
		img.src = `${itemPath}item_${String(item.IconPosY * 16 + item.IconPosX + 1).padStart(3, '0')}.xi.00.png`;
		img.alt = item.NounText;
		img.style = `width: 50px; height: auto; margin-left: 10px ;margin-right: 10px`
		img.value = key;
		divMain.setAttribute("info-name", `${item.NounText} Soul`);
		if (item.SoulEffect.YokaiBaseID) {
			let tribeIndex = item.IconPosY * 16 + item.IconPosX - 489;
			divMain.setAttribute("tribe-value", tribeList[tribeIndex]);
		}
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

function setupSearchAndFilters() {
	const searchInput = document.getElementById('search-input');
	if (!searchInput) {
		console.warn('Search input (#search-input) not found – filtering will not work.');
		return;
	}

	searchInput?.addEventListener('search', () => {
		filterItems(searchInput.value);
	});

	const buttons = document.querySelectorAll('.attribute-button');
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const current = searchInput.value.trim();
			const id = button.id.trim();
			if (!id) return;

			const words = current.split(/\s+/).filter(w => w.length > 0);
			const index = words.indexOf(id);
			if (index !== -1) {
				words.splice(index, 1);
			} else {
				words.push(id);
			}
			searchInput.value = words.join(' ');
			searchInput.dispatchEvent(new Event('input'));
		});
	});
	/*
	let languageSelect = $("language-select");
	
	if (languageSelect){
		const divs = document.querySelectorAll('#item-list .item-list__item');
		
		languageSelect?.addEventListener('change', function() {
			changeYokaiLanguageDisplay(languageSelect.value, divs);
		});
		changeYokaiLanguageDisplay(languageSelect.value, divs);
	}
	*/
	filterItems(searchInput.value);
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
		filterItems(searchInput.value);
	});
	showEquipmentPage();
	setupSearchAndFilters();
})