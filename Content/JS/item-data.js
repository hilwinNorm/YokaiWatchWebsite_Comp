function loadScript(src, callback) {
	
    const existingGlobals = Object.keys(window);
	
    const script = document.createElement('script');
    script.src = pathDatabase + src;
    script.async = true;

    script.onload = () => {
        const newGlobals = Object.keys(window).filter(key => !existingGlobals.includes(key));
		
		const detectedData = newGlobals.length > 0 ? window[newGlobals[0]] : null;
		
		if (callback) callback(detectedData, newGlobals);
    };

    script.onerror = () => {
        console.error(`Error loading database: ${src}`);
    };

    document.head.appendChild(script);
}

const urlParams = new URLSearchParams(window.location.search);

const databaseType = parseInt(urlParams.get('type'));

const itemID = urlParams.get('item');

const pathDatabase = "Content/JS/Databases/";

const imgPath = "Content/Graphics/ItemIcons/";

function formatText(text) {
    if (text === null || text === undefined || text === "") return "None";

    return String(text).replaceAll('\\n', '\n');
}

function setText(id, text) {
    const element = $(id);
	//console.debug(id);
	if (text) text = formatText(text);

    if (element) element.innerText = text ?? "None";
}

function setHTML(id, html) {
    const element = $(id);

    if (element) element.innerHTML = html;
}

function setCondText(id, textTrue, textFalse, condition){
    const element = $(id);
	if(!element) return;
	
	if (condition) setText(id, textTrue);
	else{
		element.style.color="red";
		setText(id, textFalse);
	}
}

function setStatText(id, stat, text){
	const element = $(id);
	if(!element) return;
	
	if (element){
		if (stat != 0) setText(id, text)
		else element.style.display = "none";
	}
}

function setSign(num){
	if(num > 0) return `+${num}`;
	else return `${num}`;
}

function display(id, newDisplay){
	const element = $(id);
	if (element) element.style.display = newDisplay;
}

function showItemDetails(database, item) {
	
	$("item-img").src =`${imgPath}item_${(item.IconPosX + (item.IconPosY * 16) + 1).toString().padStart(3,'0')}.xi.00.png`;
	setText("item-name", item?.NounText  ?? "None");
	if (databaseType == 2)  setText("item-name", item?.NounText ? `${item.NounText} Soul` : "None");
	setText("item-id", `Item ID: ${item.ItemID}`);
	
	setText("item-text", `Text: ${item?.NounText ?? "None"}`);
	setText("item-text-id", `Text ID: ${item.NounTextID}`);
	setText("item-desc", `Description: ${item?.DescText ?? "None"}`);
	setText("item-desc-id", `Description ID: ${item.DescTextID}`);
	
	setText("item-sell", `Sell Price: ${(item.SellPrice / 100).toFixed(2)}$`);
	setText("item-buy", `Buy Price: ${(item.BuyPrice / 100).toFixed(2)}$`);
	
	setCondText("item-can-sell", "Can be sold.", "Cannot be sold.", item.CanBeSold);
	setCondText("item-can-buy", "Can be bought.", "Cannot be bought.", item.CanBeBought);
	
	setText("item-inv-text", `Inventory Text: ${item?.InvMenuText ?? "None"}`);
	setText("item-inv-text-id", `Inventory Text ID: ${item.InvMenuTextID}`);
	setText("item-inv-sort", `Inventory Sort Index: ${item.InventorySort}`);
	setText("item-global-index", `Inventory Global Sort Index: ${item.GlobalItemIndex}`);
	setText("item-type", `Item Type: ${item.ItemType}`);
	setText("item-num", `Item Number: ${item.ItemNum}`);
	setText("item-carry-cap", `Carry Cap: ${item.CarryCap}`);
	
	switch (databaseType){
		case 0:
			$("equipment-container").style.display = "flex";
			setStatText("item-str", item.STRBuff, `STR: ${setSign(item.STRBuff)}`);
			setStatText("item-spr", item.SPRBuff, `SPR: ${setSign(item.SPRBuff)}`);
			setStatText("item-def", item.DEFBuff, `DEF: ${setSign(item.DEFBuff)}`);
			setStatText("item-spd", item.SPDBuff, `SPD: ${setSign(item.SPDBuff)}`);
			
			const skillA = database[item.SkillIDA];
			const skillB = database[item.SkillIDB];
			
			setText("item-skill-1-id", `First Skill ID: ${item.SkillIDA}`);
			setText("item-skill-2-id", `Second Skill ID: ${item.SkillIDB}`);
			if (skillA) {
				$("item-skill-1").href = `./skill-info.html?id=${skillA?.SkillID}`;
				display("item-skill-1", "block");
				setText("item-skill-1", `First Skill Name: ${skillA?.Name ?? "None"}`);
			}
			if (skillB) {
				$("item-skill-2").href = `./skill-info.html?id=${skillB?.SkillID}`;
				display("item-skill-2", "block");
				setText("item-skill-2", `Second Skill Name: ${skillB?.Name ?? "None"}`);
			}
			
			setText("item-equip-requirement", `Equipment Requirement: ${item.EquipRequirement}`);
			break;
		case 1:
			display("effect-container", "flex");
			display("item-can-fuse", "block");
			
			setCondText("item-can-fuse", "Can be used for fusion.", "Cannot be fused", item.IsFusable);
			
			setText("item-consume-text", `Consumption Text: ${item?.OnConsumptionText ?? "None"}`);
			setText("item-consume-text-id", `Consumption Text ID: ${item.OnConsumptionTextID}`);
			
			setText("item-ally-effect-text", `On Ally Text: ${item?.OnAllyText ?? "None"}`);
			setText("item-ally-effect-id", `On Ally Text ID: ${item.OnAllyTextID}`);
			setText("item-foe-effect-text", `On Foe Text: ${item?.OnFoeText ?? "None"}`);
			setText("item-foe-effect-id", `On Foe: ${item.OnFoeTextID}`);
			
			setText("item-ally-effect-index", `Ally Effect Index: ${item.AllyEffect}`);
			setText("item-foe-effect-index", `Foe Effect Index: ${item.FoeEffect}`);
			
			setText("item-ally-effect-battle-command-id", `Ally Effect Battle Command ID: ${item.AllyEffectValue_BtlCommandID}`);
			setText("item-foe-effect-battle-command-id", `Foe Effect Battle Command ID: ${item.FoeEffectValue_BtlCommandID}`);
			
			
			const moveAlly = database[item.AllyEffectValue_BtlCommandID];
			if (moveAlly){
				$("item-ally-effect-battle-command").href = `./move-info.html?moveType=4&id=${moveAlly?.BattleCommandID}`;
				display("item-ally-effect-battle-command", "block");
				const moveAllyConfig = skillConfigDatabase[moveAlly?.SkillConfigID];
				setText("item-ally-effect-battle-command", 
					`Ally Effect Battle Command: ${moveAlly?.Text?.TextString || moveAllyConfig?.Text?.TextString || "None"}`);
			}
			
			const moveFoe = database[item.FoeEffectValue_BtlCommandID];
			if (moveFoe){
				$("item-foe-effect-battle-command").href = `./move-info.html?moveType=4&id=${moveFoe?.BattleCommandID}`;
				display("item-foe-effect-battle-command", "block");
				const moveFoeConfig = skillConfigDatabase[moveFoe?.SkillConfigID];
				setText("item-foe-effect-battle-command", 
					`Foe Effect Battle Command: ${moveFoe?.Text?.TextString || moveFoeConfig?.Text?.TextString || "None"}`);
			}
			
			break;
		case 2:
			display("soul-container", "flex");
			
			setText("soul-effect-id", `Soul Effect ID: ${item.SoulEffectID}`);
			const soulEffect = item.SoulEffect;
			if (soulEffect.YokaiBaseID) {
				setText("soul-yokai-id", `Fusion Yokai BaseID: ${soulEffect.YokaiBaseID}`);
				for (const [key, yokai] of Object.entries(yokaiDatabase)){
					if (yokai.BaseID == soulEffect.YokaiBaseID) {
						display("soul-yokai", "block");
						$("soul-yokai").href = `./yokai-info.html?yokai=${yokai.BaseID}`;
						setText("soul-yokai", `Fusion Yokai: ${yokai.Name}`);
						break;
					}
				}
			}else{
				display("soul-yokai-id", "none");
				display("soul-yokai", "none");
				display("soul-ingridient-1-id", "block");
				display("soul-ingridient-2-id", "block");
				display("soul-ingridient-1", "block");
				display("soul-ingridient-2", "block");
				setText("soul-ingridient-1-id", `First Soul Ingridient ID: ${soulEffect.IngredientItemIDA}`);
				setText("soul-ingridient-2-id", `Second Soul Ingridient ID: ${soulEffect.IngredientItemIDB}`);
				const ingridientA = soulgemDatabase[soulEffect.IngredientItemIDA];
				const ingridientB = soulgemDatabase[soulEffect.IngredientItemIDB];
				setText("soul-ingridient-1", `First Soul Ingridient: ` + ingridientA?.NounText ? `${ingridientA.NounText} Soul` : "None");
				setText("soul-ingridient-2", `Second Soul Ingridient: ` + ingridientB?.NounText ? `${ingridientB.NounText} Soul` : "None");
				$("soul-ingridient-1").href = `./item-info.html?item=${ingridientA.ItemID}&type=2`;
				$("soul-ingridient-2").href = `./item-info.html?item=${ingridientB.ItemID}&type=2`;
			}
			
			setText("soul-skill-id", `Skill ID: ${item.SoulEffect.SkillID}`);
			
			const skill = database[item.SoulEffect.SkillID];
			if (skill) {
				$("soul-skill").href = `./skill-info.html?id=${skill?.SkillID}`;
				display("soul-skill", "block");
				setText("soul-skill", `First Skill Name: ${skill?.Name ?? "None"}`);
			}
			break;
	}
}

const databaseList = ["YokaiAbilitiesDatabase.js", "MoveDatabase.js", "YokaiAbilitiesDatabase.js"]

document.addEventListener('DOMContentLoaded', function (event) {
	
	const databaseName = databaseList[databaseType];
	let item;
	
	loadScript(databaseName, (database, names) => {
		if (!database) {
			console.error("Could not find database global:", databaseName);
			console.log(Object.keys(window));
			return;
		}
		switch (databaseType){
			case 0:
				item = equipmentDatabase[itemID];
				break;
			case 1:
				item = itemConsumeDatabase[itemID];
				break;
			case 2:
				item = soulgemDatabase[itemID];
				break;
			default:
				console.error(`Error: Unknown database type ${databaseType}`);
				
		}

		console.log("Database:", database);
		console.log("Item:", item);

		showItemDetails(database, item);
	});
    console.log("All databases loaded. Initializing game...");
});