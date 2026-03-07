
let ImagePath = "Content/Graphics/ItemIcons/"

var InfoPage = document.getElementById("data-page");

var ItemConsumeButton = document.getElementById("ItemConsumeButton")

var divInfoStyle=`width: auto; margin-left: 10px ;margin-right: 10px; color: var(--side-buttons-color);`

function Show_ConsumableItems_Page(){
	InfoPage.innerHTML = "";
	const list = [];
	list.length = Object.keys(itemConsumeDatabase).length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (const [key,item] of Object.entries(itemConsumeDatabase)) {
		const divMain = document.createElement("div")
		const divDesc = document.createElement("div")
		const img = document.createElement("img");
		const ItemAnhr = document.createElement("a");
		ItemAnhr.href=`./ItemInfoPage.html?item=${key}&type=1`;
		

		ItemAnhr.style = divInfoStyle
		ItemAnhr.id = "div-name"
		ItemAnhr.innerHTML = item.NounText
		divDesc.style = divInfoStyle
		divDesc.innerHTML = (item.DescText).replaceAll('\\n','\n')
		divDesc.id = "div-desc"
		divMain.className = "MiniEqInfo-div"
		divMain.style = "min-width: 850px; justify-content: space-between;"
		if (item.ImageIcon !== undefined){
		img.src = ImagePath+item.ImageIcon;
		img.alt = item.Name;
		img.style = "width: 70px; height: auto"
		divMain.appendChild(img);
		}
		divMain.appendChild(ItemAnhr);
		divMain.appendChild(divDesc);
		list[item.ItemNum] = divMain;				
	}
		for (i=0; i < list.length; i++){
			if (list[i] !== undefined){
				InfoPage.appendChild(list[i])
			}
		}
}

window.addEventListener('load', function () {Show_ConsumableItems_Page()})