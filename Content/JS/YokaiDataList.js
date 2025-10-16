
var YokaiDataPage = document.getElementById("yokaidata-page");
var class_mainButton = document.getElementsByClassName('main-button')

var move_btn = document.getElementById("move-btn")
var technique_btn = document.getElementById("technique-btn")
var inspirit_btn = document.getElementById("inspirit-btn")
var soultimate_btn = document.getElementById("soultimate-btn")
var skill_btn = document.getElementById("skill-btn")

move_list = []
technique_list = []
inspirit_list = []
soultimate_list = []
skill_list = []

for (move of moves){
	divMain = document.createElement("div")
	divMain.innerHTML = `Name:‎‎ ‎ <div id="div-name">${move.Command}</div>‎ | ID: ${move.ID} | LVL 1 Power: ${move.Lv1_power} | LVL 10 Power: ${move.Lv10_power} | Number of Hits: ${move.N_Hits}`
	divMain.className = "MiniYokaiInfo-div"
				divMain.style = `width: auto;
    height: 80px;
    margin: 5px;
	border: 1px solid #000;
    display: flex;
    place-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
	font-size:125%`
	move_list.push(divMain)
}
for (technique of techniques){
	divMain = document.createElement("div")
	let Element = ` | Element: ${technique.Element} <img style="height:20px; width: auto; margin-left:3px; margin-right:3px;"src="Content/Graphics/Elements/InGameIcons/${technique.Element}.png" alt="ElementImg">`
	if (technique.Element == null){
		Element = ``
	}
	divMain.innerHTML = `Name:‎ ‎‎<div id="div-name">${technique.Command}</div>‎  ${Element}| ID: ${technique.ID} | LVL 1 Power: ${technique.Lv1_power} | LVL 10 Power: ${technique.Lv10_power}`
	divMain.className = "MiniYokaiInfo-div"
				divMain.style = `width: auto;
    height: 80px;
    margin: 5px;
	border: 1px solid #000;
    display: flex;
    place-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
	font-size:125%`
	technique_list.push(divMain)
}
for (inspirit of inspirits){
	divMain = document.createElement("div")
	divMain.innerHTML = `Name:‎ ‎ <div id="div-name">${inspirit.Command}</div>‎ | ID: ${inspirit.ID} | Description: <div id="div-desc">${inspirit.Effect[0].EffectDesc}</div>`
	divMain.className = "MiniYokaiInfo-div"
				divMain.style = `width: auto;
    height: 80px;
    margin: 5px;
	border: 1px solid #000;
    display: flex;
    place-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
	font-size:125%`
	inspirit_list.push(divMain)
}
for (soultimate of soultimates){
	divMain = document.createElement("div")
	
	let Element = `| Element:‎  ${soultimate.Element} <img style="height:20px; width: auto; margin-left:3px; margin-right:3px;"src="Content/Graphics/Elements/InGameIcons/${soultimate.Element}.png" alt="ElementImg">`
	if (soultimate.Element == null){
		Element = ''
	}
	divMain.innerHTML = `Name:‎ <div id="div-name">${soultimate.Command}</div>‎ | ID: ${soultimate.ID} | LVL 1 Power: ${soultimate.Lv1_power} | LVL 10 Power: ${soultimate.Lv10_power} | LVL 1 Charge: ${soultimate.Lv1_soul_charge} | LVL 10 Charge: ${soultimate.Lv10_soul_charge} | Number of Hits: ${soultimate.N_Hits}${Element}`
	divMain.className = "MiniYokaiInfo-div"
				divMain.style = `width: auto;
    height: 80px;
    margin: 5px;
	border: 1px solid #000;
    display: flex;
    place-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
	padding-left: 20px;
	padding-right: 20px;
	font-size:95%`
	soultimate_list.push(divMain)
}
for (skill of skills){
	divMain = document.createElement("div")
	divMain.innerHTML = `Name:‎ ‎ <div id="div-name">${skill.name}</div>‎ | Description: <div id="div-desc">${skill.description}</div>`
	divMain.className = "MiniYokaiInfo-div"
				divMain.style = `width: auto;
    height: 80px;
    margin: 5px;
	border: 1px solid #000;
    display: flex;
    place-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
	font-size:140%`
	skill_list.push(divMain)
}

function ShowYokaiData(Data){
	YokaiDataPage.innerHTML=""
	for (index of Data){
		YokaiDataPage.appendChild(index);
	}
}

ShowYokaiData(move_list)