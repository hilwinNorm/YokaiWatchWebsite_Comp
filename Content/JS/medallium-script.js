
// Global Constants

const ranks = ['E', 'D', 'C', 'B', 'A', 'S'];
const tribes = ['None', 'Brave', 'Mysterious', 'Tough', 'Charming', 'Heartful', 'Shady', 'Eerie', 'Slippery', 'Wicked'];
const elementList = [
	"None",
	"Fire",
	"Water",
	"Lightning",
	"Earth",
	"Ice",
	"Wind",
	"Drain"
];

const foodTypeList = [
	"None",
	"Rice Ball",
	"Bread",
	"Candy",
	"Milk",
	"Juice",
	"Hamburger",
	"Ramen",
	"Sushi",
	"Chinese Food",
	"Veggies",
	"Meat",
	"Seafood",
	"Curry",
	"Sweeets",
	"Oden",
	"Soba",
	"Snack",
	"Chocobar"
];

const GenericInspiritIDs = {"0x61999483": "STR_Buff", "0x169EA415": "SPR_Buff", "0x8F97F5AF": "DEF_Buff", "0xF890C539":"SPD_Buff", "0x66F4509A":"ALL_Buff","0x605BFEB4": "STR_Debuff", "0x175CCE22": "SPR_Debuff", "0x8E559F98": "DEF_Debuff", "0xF952AF0E":"SPD_Debuff", "0x67363AAD":"ALL_Debuff", "0x63DF2ADA": "Attract", "0x14D81A4C": "Stealth", "0x62792C28": "Recover", "0x8AD8E32A":"Throw","0x64D68206":"Loaf","0xFDDFD3BC":"Poison", "0x13D1B290": "Confuse"};


function calculateStats({ yokaiData, lvl = 60, ivHp = 16, ivStr = 8, ivSpr = 8, ivDef = 8, ivSpd = 8,
                          gymStr = 0, gymSpr = 0, gymDef = 0, gymSpd = 0,
                          evHp = 0, evStr = 0, evSpr = 0, evDef = 0, evSpd = 0 }) {
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


function buildYokaiList(yokais) {
  const container = document.getElementById('data-page');
  container.innerHTML = '';

  const sortedEntries = Object.entries(yokais)
    .filter(([, yokai]) => yokai.InMedallium === 1)
    .sort((a, b) => a[1].MedalliumOffset - b[1].MedalliumOffset);

  const fragment = document.createDocumentFragment();

  for (const [key, yokai] of sortedEntries) {
    const legalAlliances = yokai.LegalAlliances;
    const level = legalAlliances ? 60 : 0;

    const stats = calculateStats({ yokaiData: yokai, lvl: level});

    const divMain = document.createElement('div');
    divMain.className = 'MiniYokaiInfo-div';
    divMain.style.cssText = `
      min-width: 1100px; height: 80px; margin: 5px;
      border: 1px solid #000;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    `;

    const idSpan = document.createElement('div');
    idSpan.id = 'yokai-index';
    idSpan.style.cssText = 'width: 6%; text-align: center;';
    idSpan.textContent = `NO. ${String(yokai.MedalliumOffset).padStart(3, '0')}`;
    divMain.appendChild(idSpan);

    const link = document.createElement('a');
    link.href = `./yokai-data.html?yokai=${key}`;
	
    const medalImg = document.createElement('img');
    medalImg.src = `Content/Graphics/YokaiMedals/y${String(yokai.MedalPosX + yokai.MedalPosY * 23).padStart(3, '0')}.webp`;
    medalImg.alt = yokai.Name;
    medalImg.style.cssText = 'cursor: pointer; width: 50px; height: auto;';
    medalImg.setAttribute('rank-value', `rank_${ranks[yokai.Rank]}`);
    medalImg.setAttribute('tribe-value', tribes[yokai.Tribe]);
	if(yokai.IsRare) medalImg.setAttribute('rarity-value', "rare");
	if(yokai.IsLegendary) medalImg.setAttribute('rarity-value', "legendary");
    medalImg.id = 'yokaiImage';
    link.appendChild(medalImg);
    divMain.appendChild(link);
	
	if ([1,2].includes(legalAlliances)){
		//console.debug('pass');
		const allianceTag = document.createElement('img');
		allianceTag.style = `width: auto; height: 30px;`;
		
		if (legalAlliances == 1) {allianceTag.src=`./Content/Graphics/alliances/bonyTag.webp`; medalImg.setAttribute('alliance-value', "bony");}
		else if (legalAlliances == 2) {allianceTag.src=`./Content/Graphics/alliances/fleshyTag.webp`; medalImg.setAttribute('alliance-value', "fleshy");}
		
		divMain.appendChild(allianceTag);
	}
	if(yokai.IsClassic){
		const classicTag = document.createElement('img');
		classicTag.style = `width: auto; height: 25px;`;
		classicTag.src = `./Content/Graphics/Rarities/classicTag.webp`;
		medalImg.setAttribute('classic-value', "classic");
		divMain.appendChild(classicTag);
	}

    const nameDiv = document.createElement('div');
    nameDiv.id = 'div-name';
    nameDiv.style.cssText = 'width: 12%; text-align: center;';
    nameDiv.textContent = yokai.Name;
    divMain.appendChild(nameDiv);

    const statLabels = ['HP', 'STR', 'SPR', 'DEF', 'SPD'];
    const statValues = [stats.baseHp, stats.baseStr, stats.baseSpr, stats.baseDef, stats.baseSpd];
    statLabels.forEach((label, idx) => {
      const div = document.createElement('div');
      div.style.cssText = 'width: 9%; text-align: center;';
      div.textContent = `${label}:${Math.floor(statValues[idx])}`;
      divMain.appendChild(div);
    });

    const tribeImg = document.createElement('img');
    tribeImg.src = `Content/Graphics/tribes/${tribes[yokai.Tribe]}.png`;
    tribeImg.alt = tribes[yokai.Tribe];
    divMain.appendChild(tribeImg);

    const rankImg = document.createElement('img');
    rankImg.src = `Content/Graphics/ranks/${ranks[yokai.Rank]}.png`;
    rankImg.alt = ranks[yokai.Rank];
    divMain.appendChild(rankImg);

    if (legalAlliances) {
      const attack = attackDatabase[yokai.AttackID];
      const technique = techniqueDatabase[yokai.TechniqueID];
      const inspirit = inspiritDatabase[yokai.InspiritID];

      const atkLink = document.createElement('a');
      atkLink.href = `./move-data.html?moveType=0&id=${yokai.AttackID}`;
      atkLink.textContent = attack.SkillConfig.Text;
      atkLink.style.cssText =
        'width: 15%; text-align: center; background-color: #e6903bc2; color: white; border-radius: 10px; border: 2px solid black; padding: 0 6px;';
      divMain.appendChild(atkLink);

      const techLink = document.createElement('a');
      techLink.href = `./move-data.html?moveType=1&id=${yokai.TechniqueID}`;
      let element = elementList[technique.SkillConfig.Element];
	  'Restoration';
      const span = document.createElement('span');
      if (element !== "None") {
        span.className = 'icon';
        span.style.cssText =
          `background-repeat: no-repeat; background-image: url(Content/Graphics/Elements/InGameIcons/${element}.png);`;
        medalImg.setAttribute('element-value', element);
      }else{element = "Restoration"};
      techLink.appendChild(span);
      techLink.appendChild(document.createTextNode(technique.SkillConfig.Text));
      techLink.style.cssText =
        'width: 15%; text-align: center; background-color: #84c6cfc2; color: white; border-radius: 10px; border: 2px solid black; padding: 0 6px;';
      divMain.appendChild(techLink);

      const inspLink = document.createElement('a');
      inspLink.href = `./move-data.html?moveType=2&id=${yokai.InspiritID}`;
	  const inspiritSteff = steffInfoDatabase[inspirit.Steff1];
      const inspiritType = GenericInspiritIDs[inspiritSteff.EffectID] || '';
      const inspImg = document.createElement('img');
      inspImg.src = `Content/Graphics/InspiritImages/${inspiritType}.png`;
      inspImg.alt = 'Inspirit';
      medalImg.setAttribute('inspirit-value', GenericInspiritIDs[inspirit.GenericEffectID] || '');
      inspLink.appendChild(inspImg);
      divMain.appendChild(inspLink);
    }

    fragment.appendChild(divMain);
  }

  container.appendChild(fragment);
}

function setupSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) {
    console.warn('Search input (#search-input) not found – filtering will not work.');
    return;
  }

  searchInput.addEventListener('search', () => {
    filterYokai(searchInput.value);
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

  filterYokai(searchInput.value);
}

window.addEventListener('load', () => {
  if (typeof yokaiDatabase !== 'undefined') {
    buildYokaiList(yokaiDatabase);
  } else {
    console.error('yokaiDatabase is not defined.');
  }

  setupSearchAndFilters();
});