
const Tiers = ["OU","UU","RU","NU","PU","Ubers"]

var Path = "Content/Graphics/Yo kai Medals/"

function YokaiInfoRedirect(yokai){
	SaveData(yokai)
	window.location.assign("./YoKaiInfoPage.html")
}

for (const tier of Tiers){
for (const yokai of yokais){
	if (yokai.tier == tier){
	const cell = document.querySelector(`.${yokai.tribe}.${tier}`);
	const divMain = document.createElement("div");
	divMain.style.display = "flex";
	divMain.style.flexDirection = "row";
	const divName = document.createElement("div");
	divName.style = "font-size: 90%"
	const img = document.createElement("img");
	divName.innerHTML = yokai.name;
	img.src = Path+yokai.image;
	img.alt = yokai.name;
	img.style = "cursor: pointer; width: 50px; height: auto"
	
	img.addEventListener("click", () => {
				SaveData(yokai)
				window.location.assign("./YoKaiInfoPage.html")
	});
	divMain.appendChild(img);
	divMain.appendChild(divName);
	cell.appendChild(divMain)
	}
}
}