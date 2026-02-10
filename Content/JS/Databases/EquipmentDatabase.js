const eqipment = [
  {
    name: 'Worn Bangle',
    description: 'It\'s sort of cheap, but some Yo-kai say it\'s just right for them!',
    STR: '+10',
    SPR: '',
    DEF: '',
    SPD: '-5',
	image: 'Braces/Worn_Bangle.webp'
  },
  {
    name: 'Cheap Bracelet',
    description: 'It\'s not the classiest accessory, but it does the job.',
    STR: '+10',
    SPR: '',
    DEF: '-5',
    SPD: '',
	image: 'Braces/Cheap_Bracelet.webp'
  },
  {
    name: 'Rocker Wrist',
    description: 'A rocker bracelet with spikes. It\'d hurt to be on the receiving end.',
    STR: '+18',
    SPR: '',
    DEF: '',
    SPD: '-8',
	image: 'Braces/Rocker_Wrist.webp'
  },
  {
    name: 'Power Bracelet',
    description: 'Makes the wearer tough enough to crush apples bare-handed!',
    STR: '+18',
    SPR: '',
    DEF: '-8',
    SPD: '',
	image: 'Braces/Power_Bracelet.webp'
  },
  {
    name: 'Brute Bracer',
    description: 'Like solving problems with strength? This one\'s for you.',
    STR: '+25',
    SPR: '',
    DEF: '',
    SPD: '-12',
	image: 'Braces/Brute_Bracer.webp'
  },
  {
    name: 'Grand Bracelet',
    description: 'An elegant, strength-enhancing item that helps with heavy lifting.',
    STR: '+25',
    SPR: '',
    DEF: '-12',
    SPD: '',
	image: 'Braces/Grand_Bracelet.webp'
  },
  {
    name: 'Sun Bracelet',
    description: 'A heavy gold bracelet said to contain the power of the sun.',
    STR: '+35',
    SPR: '',
    DEF: '',
    SPD: '-15',
	image: 'Braces/Sun_Bracelet.webp'
  },
  {
    name: 'Comet Bracelet',
    description: 'Unleashes the destructive force of a comet flying through space.',
    STR: '+35',
    SPR: '',
    DEF: '-15',
    SPD: '',
	image: 'Braces/Comet_Bracelet.webp'
  },
  {
    name: 'Fiend Band',
    description: 'A bracelet bearing a demon\'s crest. It houses a dark power.',
    STR: '+50',
    SPR: '',
    DEF: '',
    SPD: '-25',
	image: 'Braces/Fiend_Band.webp'
  },
  {
    name: 'Legend Bracelet',
    description: 'A fabled fashion accessory that crackles with power.',
    STR: '+50',
    SPR: '',
    DEF: '-25',
    SPD: '',
	image: 'Braces/Legend_Bracelet.webp'
  },
  {
    name: 'Rusty Ring',
    description: 'A ring that\'s gotten old and rusty. It still has power.',
    STR: '',
    SPR: '+10',
    DEF: '-5',
    SPD: '',
	image: 'Rings/Rusty_Ring.webp'
  },
  {
    name: 'Ugly Ring',
    description: 'It\'s not pretty, but it\'s pretty effective.',
    STR: '',
    SPR: '+10',
    DEF: '',
    SPD: '-5',
	image: 'Rings/Ugly_Ring.webp'
  },
  {
    name: 'Pretty Ring',
    description: 'A cute ring of pink gold. Lady Yo-kai like it a lot.',
    STR: '',
    SPR: '+18',
    DEF: '-8',
    SPD: '',
	image: 'Rings/Pretty_Ring.webp'
  },
  {
    name: 'Rainbow Ring',
    description: 'A beautiful ring that sparkles with all the colors of the rainbow.',
    STR: '',
    SPR: '+18',
    DEF: '',
    SPD: '-8',
	image: 'Rings/Rainbow_Ring.webp'
  },
  {
    name: 'Illusion Ring',
    description: 'Anyone who wears this ring can easily use Yo-kai Techniques.',
    STR: '',
    SPR: '+25',
    DEF: '-12',
    SPD: '',
	image: 'Rings/Illusion_Ring.webp'
  },
  {
    name: 'Fairy Ring',
    description: 'The spirit of a fairy dwells within this ring.',
    STR: '',
    SPR: '+25',
    DEF: '',
    SPD: '-12',
	image: 'Rings/Fairy_Ring.webp'
  },
  {
    name: 'Lunar Ring',
    description: 'A softly glowing ring said to contain the power of the moon.',
    STR: '',
    SPR: '+35',
    DEF: '-15',
    SPD: '',
	image: 'Rings/Rusty_Ring.webp'
  },
  {
    name: 'Ring of Fate',
    description: 'Imbued with the power to alter one\'s destiny.',
    STR: '',
    SPR: '+35',
    DEF: '',
    SPD: '-15',
	image: 'Rings/Ring_of_Fate.webp'
  },
  {
    name: 'Fiend Ring',
    description: 'A ring bearing a demon\'s crest. It houses a dark power.',
    STR: '',
    SPR: '+50',
    DEF: '-25',
    SPD: '',
	image: 'Rings/Fiend_Ring.webp'
  },
  {
    name: 'Legend Ring',
    description: 'A mythical fashion accessory with untold power.',
    STR: '',
    SPR: '+50',
    DEF: '',
    SPD: '-25',
	image: 'Rings/Legend_Ring.webp'
  },
  {
    name: 'Aged Charm',
    description: 'An old charm whose power has atrophied over the years.',
    STR: '',
    SPR: '-5',
    DEF: '+10',
    SPD: '',
	image: 'Charms/Aged_Charm.webp'
  },
  {
    name: 'Old Charm',
    description: 'It\'s seen better days, but it can still offer a little power.',
    STR: '-5',
    SPR: '',
    DEF: '+10',
    SPD: '',
	image: 'Charms/Old_Charm.webp'
  },
  {
    name: 'Runic Charm',
    description: 'A charm with a mysterious pattern upon it.',
    STR: '',
    SPR: '-8',
    DEF: '+18',
    SPD: '',
	image: 'Charms/Runic_Charm.webp'
  },
  {
    name: 'Protective Charm',
    description: 'Offers divine protection to the wearer.',
    STR: '-8',
    SPR: '',
    DEF: '+18',
    SPD: '',
	image: 'Charms/Protective_Charm.webp'
  },
  {
    name: 'Armor Charm',
    description: 'A charm said to provide impregnable defense.',
    STR: '',
    SPR: '-12',
    DEF: '+25',
    SPD: '',
	image: 'Charms/Armor_Charm.webp'
  },
  {
    name: 'Lucky Charm',
    description: 'Brings good fortune and offers powerful protection.',
    STR: '-12',
    SPR: '',
    DEF: '+25',
    SPD: '',
	image: 'Charms/Lucky_Charm.webp'
  },
  {
    name: 'Galaxy Charm',
    description: 'A powerful charm that sparkles like a nebula.',
    STR: '',
    SPR: '-15',
    DEF: '+35',
    SPD: '',
	image: 'Charms/Galaxy_Charm.webp'
  },
  {
    name: 'Earth Charm',
    description: 'This charm draws its power from the spirit of the earth itself.',
    STR: '5-15',
    SPR: '',
    DEF: '+35',
    SPD: '',
	image: 'Charms/Earth_Charm.webp'
  },
  {
    name: 'Fiend Charm',
    description: 'A charm bearing a demon\'s crest. It houses a dark power.',
    STR: '',
    SPR: '-25',
    DEF: '+50',
    SPD: '',
	image: 'Charms/Fiend_Charm.webp'
  },
  {
    name: 'Legend Charm',
    description: 'A famed charm that offers the wearer unmatched protection.',
    STR: '-25',
    SPR: '',
    DEF: '+50',
    SPD: '',
	image: 'Charms/Legend_Charm.webp'
  },
  {
    name: 'Simple Badge',
    description: 'Sometimes simple is best. This badge bumps up your Speed.',
    STR: '-5',
    SPR: '',
    DEF: '',
    SPD: '+8',
	image: 'Badges/Simple_Badge.webp'
  },
  {
    name: 'Black Badge',
    description: 'A mysterious dark badge that boosts your Speed.',
    STR: '',
    SPR: '-5',
    DEF: '',
    SPD: '+8',
	image: 'Badges/Black_Badge.webp'
  },
  {
    name: 'Shiny Badge',
    description: 'A cool badge that shine bright. Kids love this one!',
    STR: '-8',
    SPR: '',
    DEF: '',
    SPD: '+15',
	image: 'Badges/Shiny_Badge.webp'
  },
  {
    name: 'Cute Badge',
    description: 'An adorable glittery badge. It\'s actually functional too!',
    STR: '',
    SPR: '-8',
    DEF: '',
    SPD: '+15',
	image: 'Badges/Cute_Badge.webp'
  },
  {
    name: 'Hermes Badge',
    description: 'A badge that lets you run like the wind.',
    STR: '-12',
    SPR: '',
    DEF: '',
    SPD: '+20',
	image: 'Badges/Hermes_Badge.webp'
  },
  {
    name: 'Aurora Badge',
    description: 'A badge that pulsates with scintillating starlight.',
    STR: '',
    SPR: '-12',
    DEF: '',
    SPD: '+20',
	image: 'Badges/Aurora_Badge.webp'
  },
  {
    name: 'Meteor Badge',
    description: 'A badge shaped like a shooting star, with power to match.',
    STR: '-15',
    SPR: '',
    DEF: '',
    SPD: '+30',
	image: 'Badges/Meteor_Badge.webp'
  },
  {
    name: 'Lightning Badge',
    description: 'A fast-moving accessory. Blink and you\'ll miss it!',
    STR: '',
    SPR: '-15',
    DEF: '',
    SPD: '+30',
	image: 'Badges/Lightning_Badge.webp'
  },
  {
    name: 'Fiend Badge',
    description: 'A badge bearing a demon\'s crest. It houses unholy speed.',
    STR: '-25',
    SPR: '',
    DEF: '',
    SPD: '+40',
	image: 'Badges/Fiend_Badge.webp'
  },
  {
    name: 'Legend Badge',
    description: 'A powerful accessory that gives an incredible boost to Speed.',
    STR: '',
    SPR: '-25',
    DEF: '',
    SPD: '+40',
	image: 'Badges/Legend_Badge.webp'
  },
  {
    name: 'Cicada Sword',
    description: 'The sword of the cicada-style ninja. Only for cicada Yo-kai.',
    STR: '+35',
    SPR: '',
    DEF: '',
    SPD: '+35',
	image: 'Specific/Cicada_Sword.webp'
  },
  {
    name: 'Beefy Bell',
    description: 'Use this cat bell if you want to get beefy! For cat Yo-kai only.',
    STR: '+50',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Specific/Bells/Beefy_Bell.webp'
  },
  {
    name: 'Spell Bell',
    description: 'Use this cat bell if you want elegance! For cat Yo-kai only.',
    STR: '',
    SPR: '+50',
    DEF: '',
    SPD: '',
	image: 'Specific/Bells/Spell_Bell.webp'
  },
  {
    name: 'Tough Bell',
    description: 'Use this cat bell if you want to be tough! For cat Yo-kai only.',
    STR: '',
    SPR: '',
    DEF: '+50',
    SPD: '',
	image: 'Specific/Bells/Tough_Bell.webp'
  },
  {
    name: 'Speed Bell',
    description: 'Use this cat bell if you want to be speedy! For cat Yo-kai only.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '+30',
	image: 'Specific/Bells/Speed_Bell.webp'
  },
  {
    name: 'Big Bottle',
    description: 'A water bottle that never runs dry. For kappa Yo-kai only.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Specific/Big_Bottle.webp'
  },
  {
    name: 'Tengu Fan',
    description: 'Tengu draw power from fans like these. For tengu Yo-kai only.',
    STR: '',
    SPR: '+100',
    DEF: '',
    SPD: '+100',
	image: 'Specific/Tengu_Fan.webp'
  },
  {
    name: 'Cheery Coat',
    description: 'This\'ll make you wanna dance! For Wiglin, Steppa, and Rhyth only.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '+50',
	image: 'Specific/Cheery_Coat.webp'
  },
  {
    name: 'Nail Bat',
    description: 'A bat with nails sticking out of it. Only for Badude and Bruff.',
    STR: '+50',
    SPR: '',
    DEF: '-25',
    SPD: '',
	image: 'Specific/Nail_Bat.webp'
  },
  {
    name: 'Drumsticks',
    description: 'Don Chan uses these to thump out big, bold rhythms.',
    STR: '',
    SPR: '+40',
    DEF: '+60',
    SPD: '',
	image: 'Specific/Drumsticks.webp'
  },
  {
    name: 'Robovitamin E',
    description: 'A drink that makes robotic Yo-kai run more smoothly.',
    STR: '',
    SPR: '',
    DEF: '+45',
    SPD: '+20',
	image: 'Specific/Robovitamin_E.webp'
  },
  {
    name: 'Burly\'s Wristband',
    description: 'Imbued with Sgt. Burly\'s thirst for bigger muscles.',
    STR: '+60',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Specific/Burlys_Wristband.webp'
  },
  {
    name: 'Memory Chime',
    description: 'This treasured chime reminds Jibanyan of Amy.',
    STR: '+40',
    SPR: '',
    DEF: '',
    SPD: '+40',
	image: 'Specific/Memory_Chime.webp'
  },
  {
    name: 'Bony Band',
    description: 'Inspires Bony Spirits Yo-kai to outdo their Fleshy Souls rivals.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Bony_Band.webp'
  },
  {
    name: 'Fleshy Band',
    description: 'Inspires Fleshy Souls Yo-kai to outdo their Bony Spirits rivals.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Fleshy_Band.webp'
  },
  {
    name: 'Reversword',
    description: 'This sword strengthens the weak. D- and E-Rank Yo-kai only.',
    STR: '+30',
    SPR: '',
    DEF: '',
    SPD: '+30',
	image:'Specific/Reversal/Reversword.webp'
  },
  {
    name: 'Turnabeads',
    description: 'A jewel that gives the weak power. D- and E-Rank Yo-kai only.',
    STR: '',
    SPR: '+30',
    DEF: '',
    SPD: '+30',
	image:'Specific/Reversal/Turnabeads.webp'
  },
  {
    name: 'Reflector',
    description: 'One of a wimpy trinity of items. D- and E-Rank Yo-kai only.',
    STR: '',
    SPR: '',
    DEF: '+30',
    SPD: '+30',
	image:'Specific/Reversal/Reflector.webp'
  },
  {
    name: 'Paradise Ball',
    description: 'A gem that can only be used by B-Rank or lower Yo-kai.',
    STR: '',
    SPR: '',
    DEF: '+50',
    SPD: '+50',
	image: 'Specific/Paradise_Ball.webp'
  },
  {
    name: 'Sinister Screed',
    description: 'Cures cursed Yo-kai and curses healthy ones.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image:'Other/Sinister_Screed.webp'
  },
  {
    name: 'Cursed Sword',
    description: 'Unknown effects. Use at your own risk...',
    STR: '+80',
    SPR: '',
    DEF: '',
    SPD: '-40',
	image:'Other/Cursed_Sword.webp'
  },
  {
    name: 'Cursed Staff',
    description: 'Unknown effects. Use at your own risk...',
    STR: '',
    SPR: '+80',
    DEF: '',
    SPD: '-40',
	image:'Other/Cursed_Staff.webp'
  },
  {
    name: 'Cursed Shield',
    description: 'Unknown effects. Use at your own risk...',
    STR: '',
    SPR: '',
    DEF: '+80',
    SPD: '-40',
	image:'Other/Cursed_Shield.webp'
  },
  {
    name: 'Cursed Robe',
    description: 'Unknown effects. Use at your own risk...',
    STR: '',
    SPR: '',
    DEF: '-40',
    SPD: '+80',
	image:'Other/Cursed_Robe.webp'
  },
  {
    name: 'Restraint Belt',
    description: 'Wear this power-lowering belt when you want to hold back.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image:'Other/Restraint_Belt.webp'
  },
  {
    name: 'Monkey Circlet',
    description: 'This circlet will tighten to put a stop to any evolution.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image:'Other/Monkey_Circlet.webp'
  },
  {
    name: 'General\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  },
  {
    name: 'Lt. Gen\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  },
  {
    name: 'Maj. Gen\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  },
  {
    name: 'Colonel\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  },
  {
    name: 'Major\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  },
  {
    name: 'Captain\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  },
  {
    name: 'CDR.\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  },
  {
    name: 'Lt.\'s Medal',
    description: 'Unlocked by reaching the equivalent level in battle.',
    STR: '',
    SPR: '',
    DEF: '',
    SPD: '',
	image: 'Other/Medal.png'
  }
]


var equipmentPage = document.getElementById("data-page");
var equipmentButton = document.getElementById("EquipmentButton")
function Show_Equipment_Page(){
	let Path = "Content/Graphics/Equipment/"
	equipmentPage.innerHTML = "";
	const list = [];
	list.length = eqipment.length;
	var path_location = window.location.pathname;
	var page = path_location.split("/").pop();
	
	for (i = 0; i < eqipment.length; i++) {
		const divMain = document.createElement("div")
		const divName = document.createElement("div")
		const img = document.createElement("img");
		const divDesc = document.createElement("div")
		
		const divSTR = document.createElement("div")
		const divSPR = document.createElement("div")
		const divDEF = document.createElement("div")
		const divSPD = document.createElement("div")
		
		const item = eqipment[i];
		
				divName.style = `width: auto; margin-left: 10px ;margin-right: 10px`
				divName.id = "div-name"
				divName.innerHTML = item.name
				divDesc.style = `width: auto; margin-left: 10px ;margin-right: 10px`
				divDesc.innerHTML = item.description
				divDesc.id = "div-desc"
				divSTR.style=`width: auto; margin-left: 10px ;margin-right: 10px`
				divSTR.innerHTML = "STR: "+item.STR
				divSPR.style=`width: auto; margin-left: 10px ;margin-right: 10px;`
				divSPR.innerHTML = "SPR: "+item.SPR
				divDEF.style=`width: auto; margin-left: 10px ;margin-right: 10px`
				divDEF.innerHTML = "DEF: "+item.DEF
				divSPD.style=`width: auto; margin-left: 10px ;margin-right: 10px;`
				divSPD.innerHTML = "SPD: "+item.SPD
				divMain.className = "MiniEqInfo-div"
				if (item.image !== undefined){
                img.src = Path+item.image;
                img.alt = item.name;
				img.style = "width: 70px; height: auto"
				img.onclick = () => {
				selectEquipment(img);
				};
				
				divMain.appendChild(img);
				}
				divMain.appendChild(divName);
				divMain.appendChild(divDesc);
				if (item.STR !== ''){
				divMain.appendChild(divSTR);
				}
				if (item.SPR !== ''){
				divMain.appendChild(divSPR);
				}
				if (item.DEF !== ''){
				divMain.appendChild(divDEF);
				}
				if (item.SPD !== ''){
				divMain.appendChild(divSPD);
				}
				list[i] = divMain;				
}
				for (i=0; i < list.length; i++){
				if (list[i] !== undefined){
					equipmentPage.appendChild(list[i])
				}
				}
}

window.addEventListener('load', function () {
  if (page == "equipment.html"){
	  console.log('!')
		Show_Equipment_Page()
	}
})

if (equipmentButton){
	equipmentButton.addEventListener('click', function (){
		Show_Equipment_Page()
	})
}