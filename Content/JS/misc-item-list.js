
let itemPath = "Content/Graphics/ItemIcons/";

var infoPage = document.getElementById("item-list");

function showItemPage(){
	infoPage.innerHTML = "";
	const list = [];
	
	for (const [key,item] of Object.entries(itemConsumeDatabase)) {
		const divMain = document.createElement("div");
		divMain.className = "item-list__item";
		
		const img = document.createElement("img");
		img.src = `${itemPath}item_${String(item.IconPosY * 16 + item.IconPosX + 1).padStart(3, '0')}.xi.00.png`;
		img.alt = item.Name;
		img.style = "width: 70px; height: auto";
		divMain.appendChild(img);
		
		const itemLink = document.createElement("a");
		itemLink.href=`./item-info.html?item=${key}&type=1`;
		itemLink.innerHTML = item.NounText;
		divMain.appendChild(itemLink);
		
		const divDesc = document.createElement("div");
		divDesc.innerHTML = (item.DescText).replaceAll('\\n','\n');
		divMain.appendChild(divDesc);
			
		infoPage.appendChild(divMain);			
	}
}

document.addEventListener('DOMContentLoaded', function(){
	const searchInput = document.getElementById('search-input');
	if (!searchInput) console.warn('Search input (#search-input) not found – filtering will not work.');
	searchInput?.addEventListener('search', () => {filterItems(searchInput.value)});
	showItemPage()
});