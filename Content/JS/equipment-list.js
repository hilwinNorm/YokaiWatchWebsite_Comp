
var InfoPage = document.getElementById("data-page");

var soulGemButton = document.getElementById("SoulGemButton")
var equipmentButton = document.getElementById("EquipmentButton")

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
}

function Show_Equipment_Page(){
	let Path = "Content/Graphics/ItemIcons/"
	InfoPage.innerHTML = "";
	const list = [];
	list.length = Object.keys(equipmentDatabase).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,item] of Object.entries(equipmentDatabase)) {
		const divMain = document.createElement("div");
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		const ItemAnhr = document.createElement("a");
		ItemAnhr.href=`./item-data.html?item=${key}&type=0`;
		
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
				divMain.className = "MiniEqInfo-div"
				divMain.style = "min-width: 850px; justify-content: space-between;"
				if (item.ImageIcon !== undefined){
                img.src = Path+item.ImageIcon;
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
						InfoPage.appendChild(list[i])
					}
				}
}

function Show_SoulGem_Page(){
	const soulPage = document.getElementById("data-page");
	let Path = "Content/Graphics/ItemIcons/"
	soulPage.innerHTML = "";
	const list = [];
	list.length = Object.entries(soulgemDatabase).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,item] of Object.entries(soulgemDatabase)) {
		const divMain = document.createElement("div")
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		const ItemAnhr = document.createElement("a");
		ItemAnhr.href=`./item-data.html?item=${key}&type=2`;
		
		const DescConfig = SkillTextConfig[item.SoulEffect.SkillID] || ""
		
		ItemAnhr.style = `width: auto; margin-left: 10px ;margin-right: 10px; color: var(--side-buttons-color);`
		ItemAnhr.id = "div-name"
		ItemAnhr.innerHTML = item.NounText
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

if (equipmentButton){
	equipmentButton.addEventListener('click', function (){
		Show_Equipment_Page()
	})
}

if (soulGemButton){
	soulGemButton.addEventListener('click', function (){
		Show_SoulGem_Page()
	})
}

window.addEventListener('load', function () {Show_Equipment_Page()})