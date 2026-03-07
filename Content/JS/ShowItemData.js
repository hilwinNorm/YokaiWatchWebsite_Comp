
const urlParams = new URLSearchParams(window.location.search)

var databaseType = urlParams.get('type')

var pathDatabase = "Content/JS/Databases/";

var ImgPath = "Content/Graphics/ItemIcons/"

function showItemDetails(database, item) {
	var Extra, BuyPrice, SellPrice;
	var ExtraStyle = `display: flex; justify-content: center; font-size: 20px;`;
	var SpanStyle = `display: flex; align-items: center;`;
	var ItemInfoStyle = `justify-content: center; display: flex; font-size: 20px;`;
	var ItemIcon = document.createElement('img');
	BuyPrice=parseFloat(item.BuyPrice)/100
	SellPrice=parseFloat(item.SellPrice)/100
	
	ItemIcon.style="position: absolute; height:100px;width:auto; padding-top: 20px; padding-left: 20px;"
	ItemIcon.src = ImgPath+(item.ImageIcon);
		
	let stat_style = 'font-size: 25px; margin-left: 25px;'
	let container_style = "background-color: var(--side-buttons-bg); border-radius: 25px;"
	
	switch (parseInt(databaseType)){
		case 0:
			var vSTR,vSPR,vDEF,vSPD;
			vSTR=vSPR=vDEF=vSPD="";
			if (item.STRBuff!=0){vSTR=`STR: ${item.STRBuff} | `}
			if (item.SPRBuff!=0){vSPR=`SPR: ${item.SPRBuff} | `}
			if (item.DEFBuff!=0){vDEF=`DEF: ${item.DEFBuff} | `}
			if (item.SPDBuff!=0){vSPD=`SPD: ${item.SPDBuff}`}
			
			Extra=`<p style="${ExtraStyle}">${vSTR}${vSPR}${vDEF}${vSPD}</p>`
			break;
		case 1:
			var Fusable = document.createElement("div");
			var Soldable = document.createElement("div");
			var Buyable = document.createElement("div");
			var OnAllyEffect = document.createElement("div");
			var OnFoeEffect = document.createElement("div");
			
			Fusable.style=ItemInfoStyle;Fusable.innerHTML="Can be used for fusion.";
			
			Soldable.style=ItemInfoStyle;Soldable.style.color="Red"; Soldable.innerHTML="Cannot be sold!";
			
			Buyable.style=ItemInfoStyle;Buyable.style.color="Red";Buyable.style.innerHTML="Cannot be bought!";
			
			OnAllyEffect.style=ItemInfoStyle;OnAllyEffect.innerHTML=`On Ally: ${item.OnAllyText}`;
			
			OnFoeEffect.style=ItemInfoStyle;OnFoeEffect.innerHTML=`On Foe: ${item.OnFoeText}`;
			
			if (item.CanBeBought){Buyable.style.display="none";}
			if (item.CanBeSold){Soldable.style.display="none";}
			if (!item.IsFusable){Fusable.style.display="none";}
			if (!item.OnAllyText){OnAllyEffect.style.display="none";}
			if (!item.OnFoeText){OnFoeEffect.style.display="none";}
			Extra=`
			${OnAllyEffect.outerHTML}
			${OnFoeEffect.outerHTML}
			${Fusable.outerHTML}
			${Soldable.outerHTML}
			${Buyable.outerHTML}
			`
			break;
	}
	
	var details = `
	<span style="display: grid;${container_style}">
		${ItemIcon.outerHTML}
		<div style="display: flex; min-width: 200px; padding-top: 16px; font-size: 35px; justify-content: center; align-items:center;">${item.NounText}</div>
		<div style="display: flex; width: 100%; padding-bottom: 16px; justify-content: center; overflow: hidden; font-size: 20px;">${(item.DescText).replaceAll('\\n','\n')}</div>
		${Extra}
		<div style="display: flex; justify-content: center; white-space:pre-wrap; font-size: 20px; "> Sell Price: ${SellPrice}$ \n Buy Price: ${BuyPrice}$</div>
	</span>
	`;
	
	document.getElementById('item-details').innerHTML = details;
}

window.addEventListener('load', function (event) {
	switch (parseInt(databaseType)){
		case 0:
			var ItemData = equipmentDatabase[urlParams.get('item')]
			showItemDetails(equipmentDatabase, ItemData)
			
			break;
		case 1:
			var ItemData = itemConsumeDatabase[urlParams.get('item')]
			showItemDetails(itemConsumeDatabase, ItemData)
			break;
	}
    console.log("All databases loaded. Initializing game...");
});