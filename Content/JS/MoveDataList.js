
var YokaiDataPage = document.getElementById("yokaidata-page");
var class_mainButton = document.getElementsByClassName('main-button')

var attack_btn = document.getElementById("attack-btn")
var technique_btn = document.getElementById("technique-btn")
var inspirit_btn = document.getElementById("inspirit-btn")
var soultimate_btn = document.getElementById("soultimate-btn")
var skill_btn = document.getElementById("skill-btn")

delete attackDatabase["0x00000000"]
delete techniqueDatabase["0x00000000"]
delete inspiritDatabase["0x00000000"]
delete soultimateDatabase["0x00000000"]

const anhrStyle = "margin: 0 6px; color: var(--side-buttons-color);";

attack_list = []
technique_list = []
inspirit_list = []
soultimate_list = []
skill_list = []
included_skill_list=[]

for (const [key,attack] of Object.entries(attackDatabase)) {
	divMain = document.createElement("div")
	divMain.innerHTML = `Name:‎‎<a style="${anhrStyle}" href="./MoveiInfoPage.html?moveType=0&id=${attack.ID}"> ${attack.Command} </a>| LVL 1 Power: ${attack.Lv1_power} | LVL 10 Power: ${attack.Lv10_power} | Number of Hits: ${attack.N_Hits}`
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
	attack_list.push(divMain)
}
for (const [key,technique] of Object.entries(techniqueDatabase)) {
	divMain = document.createElement("div")
	let Element = ` | Element: ${technique.Element} <img style="height:20px; width: auto; margin-left:3px; margin-right:3px;"src="Content/Graphics/Elements/InGameIcons/${technique.Element}.png" alt="ElementImg">`
	if (technique.Element == null){
		Element = ``
	}
	divMain.innerHTML = `Name:‎<a style="${anhrStyle}" href="./MoveiInfoPage.html?moveType=1&id=${technique.ID}"> ${technique.Command} </a>${Element} | LVL 1 Power: ${technique.Lv1_power} | LVL 10 Power: ${technique.Lv10_power}`
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
for (const [key,inspirit] of Object.entries(inspiritDatabase)) {
	divMain = document.createElement("div")
	divMain.innerHTML = `Name:‎<a style="${anhrStyle}" href="./MoveiInfoPage.html?moveType=2&id=${inspirit.ID}"> ${inspirit.Command} </a> | Inspirit Level ${inspirit.Tier} | Description: <div id="div-desc">${(inspirit.Description || "None").replaceAll('\\n','\n')}</div>`
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
for (const [key,soultimate] of Object.entries(soultimateDatabase)) {
	divMain = document.createElement("div")
	
	let Element = `| Element:‎  ${soultimate.Element} <img style="height:20px; width: auto; margin-left:3px; margin-right:3px;"src="Content/Graphics/Elements/InGameIcons/${soultimate.Element}.png" alt="ElementImg">`
	if (soultimate.Element == null){
		Element = ''
	}
	divMain.innerHTML = `Name:‎<a style="${anhrStyle}" href="./MoveiInfoPage.html?moveType=3&id=${soultimate.ID}"> ${soultimate.Command} </a>| LVL 1 Power: ${soultimate.Lv1_power} | LVL 10 Power: ${soultimate.Lv10_power} | LVL 1 Charge: ${soultimate.Lv1_soul_charge} | LVL 10 Charge: ${soultimate.Lv10_soul_charge} | Number of Hits: ${soultimate.N_Hits}${Element}`
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
for (const [key, yokai] of Object.entries(yokaiDatabase)){
	var skill = abilitiesDatabase[yokai.SkillID]
	if (included_skill_list.includes(skill)|| legalCheck(yokai)==false){continue;}
	divMain = document.createElement("div")
	divMain.innerHTML = `Name:‎‎<a style="${anhrStyle}" href="./MoveiInfoPage.html?moveType=4&id=${skill.ID}"> ${skill.Name} </a>| Description: <div id="div-desc">${(skill.Description || "").replaceAll('\\n',' ')}</div>`
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
	included_skill_list.push(skill)
}

function ShowYokaiData(Data){
	YokaiDataPage.innerHTML=""
	for (index of Data){
		YokaiDataPage.appendChild(index);
	}
}

ShowYokaiData(attack_list)