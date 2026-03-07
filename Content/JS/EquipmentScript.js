
var InfoPage = document.getElementById("data-page");

var soulGemButton = document.getElementById("SoulGemButton")
var equipmentButton = document.getElementById("EquipmentButton")

function Show_Equipment_Page(){
	let Path = "Content/Graphics/ItemIcons/"
	InfoPage.innerHTML = "";
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
		
				divName.style = `width: auto; margin-left: 10px ;margin-right: 10px`
				divName.id = "div-name"
				divName.innerHTML = item.NounText
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
						InfoPage.appendChild(list[i])
					}
				}
}

function Show_SoulGem_Page(){
	let Path = "Content/Graphics/ItemIcons/"
	InfoPage.innerHTML = "";
	const list = [];
	list.length = SoulGems.length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (i = 0; i < SoulGems.length; i++) {
		const divMain = document.createElement("div")
		const divName = document.createElement("div")
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		
		const SoulGem = SoulGems[i];
		
				divName.style = `width: auto; margin-left: 10px ;margin-right: 10px`
				divName.id = "div-name"
				divName.innerHTML = SoulGem.name
				divDesc.style = `width: auto`
				divDesc.innerHTML = SoulGem.description
				divDesc.id = "div-desc"
				divMain.className = "MiniSoulGemInfo-div"
				divMain.style = "min-width: 850px; justify-content: space-between;"
                img.src = Path+SoulGem.image;
                img.alt = SoulGem.name;
				img.style = `width: 50px; height: auto; margin-left: 10px ;margin-right: 10px`
				img.onclick = () => {
				selectEquipment(img);
				};
				divMain.appendChild(img);
				divMain.appendChild(divName);
				divMain.appendChild(divDesc);
				list[i] = divMain;				
}
				for (i=0; i < list.length; i++){
				if (list[i] !== undefined){
					InfoPage.appendChild(list[i])
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