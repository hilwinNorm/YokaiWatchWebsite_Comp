
const $ = id => document.getElementById(id);

const meta = document.createElement('meta');

meta.name = "viewport";

meta.content = `width=device-width, initial-scale=1.0`;

document.getElementsByTagName('head')[0].appendChild(meta);

let WV={
	"Major": 2,
	"Minor": 2,
	"Patch": 0
}

let webVerElement = document.getElementsByClassName('WebVerElement');

for (element of webVerElement){
	element.innerText=`Version of the website: ${WV.Major}.${WV.Minor}.${WV.Patch}`
}

const side_bar = document.getElementsByTagName('aside')[0];

const nav_tab = $('nav-tab');

if (side_bar){
side_bar.innerHTML += `
	<button style="position: absolute; right: 0px; top: 0px; border-radius: 15px; color: var(--side_button-color); 
	background-color: var(--side-buttons-bg); padding: 0; height: 27px; width: 27px; border: var(--nav-buttons-color) 1px solid; border-radius: 100%;"id="toggleSidebar";>+</button>
	<a href='./medallium.html' class="side-button" id="medallium-btn">Strategy Medallium <span style="background-repeat: no-repeat;" class="icon icon-yokai"></span></a>
	<a href='./team-builder.html' class="side-button" id="TeamBuild-btn">Build Team <span style="background-repeat: no-repeat;" class="icon icon-dict"></span></a>
	<a href='./tier-sheet.html' class="side-button" id="tierSheet-btn">Tier Sheet</a>
	<a href='./equipment-list.html' class="side-button" id="equipment-btn">Equipment List <span class="icon icon-equipment"></a>
	<a href='./damage-calculator.html' class="side-button" id="damageCalc-btn">Damage Calculator <span style="background-repeat: no-repeat;" class="icon icon-damage"></span></a>
	<a href='./move-list.html' class="side-button" id="yokaiData-btn">Move List <span style="background-repeat: no-repeat;" class="icon icon-damage"></a>
	<a href='./misc-list.html' class="side-button" id="Misc-btn">Misc  <span style="background-repeat: no-repeat;" class="icon icon-misc"></span></a>
	<a href='./image-recources.html' class="side-button" id="Resources-btn">Image Resources <span style="background-repeat: no-repeat;" class="icon icon-search"></span></a>
`
}
if (nav_tab){
nav_tab.innerHTML += `
	<div class="main-tabs">
		<div style="display: flex; gap: 10px;">
			<a href='./index.html'><button style="margin-left: 50px;"class="nav-button" id="home-btn">Home</button></a>
			<a href='./about.html'><button class="nav-button">About Project</button></a>
			<a href='./contact.html'><button class="nav-button">Contacts</button></a>
			<a href='https://discord.gg/wyWbEhhGwm'><button class="nav-button" style="background-color: #5972ff; color: white;">Discord <span style="height: 25px; width: 25px;" class="icon icon-discord"></span></button></a>
		</div>
		<div style="display: flex; gap:10px">
			<div id="nav-wallpaper-change" class="nav-wallpaper-change">
				<label for="wallpaper-select">Wallpaper:  </label>
				<select id="wallpaper-select">
				<option value="Cool_Blue">Cool Blue</option>
				<option value="HeartsAndFluff">Hearts and Fluff</option>
				<option value="Antique_Blossoms">Antique Blossoms</option>
				<option selected value="Bamboo_Forest">Bamboo Forest</option>
				<option value="Merchant_Purple">Merchant Purple</option>
				<option value="Classic_Gold">Classic Gold</option>
				<option value="Up_All_Night">Up All Night</option>
				<option value="Galaxy_Cruise">Galaxy Cruise</option>
				<option value="Small_Cream_Soda">Small Cream Soda</option>
				<option value="OhMySwirls">Oh My Swirls! Pattern</option>
				</select>
			</div>
			
		</div>
	</div>
		
        <a href="./index.html" id='logo-js' class="nav-brand">
		<div id="banner-container" class="banner-container">
			<img src="Content/Graphics/BannerYokai/LeftYokai4.png" class="left-char" alt="Left Character">
			
				<div id="Logo-Text" style="font-family: 'YokaiWatch_YokaiRoleFont'; font-size: 45px;">Yo-gon Academy</div>
			
			<img src="Content/Graphics/BannerYokai/RightYokai4.png" class="right-char" alt="Right Character">
		</div>
		</a>
`

/*
			<div id="authDiv" style="padding-right: 40px; color: var(--side-buttons-color); display: flex; align-items: center;">
				<a href='./authorisation.html' id="authLink" style="display: none"><button class="nav-button" id="authorisation-btn">Register</button></a>
				<img id="userPfpImg" src='./Content/Graphics/YokaiMedals/y000.webp' style="display: none">
				<a href='./profile.html' id="userGreeting" style="display: none; color: var(--nav-buttons-color);"></a>
			</div>
*/


let wallpaperChange = $("wallpaper-select");

wallpaperChange.addEventListener('change', function(event){
	changeTheme(wallpaperChange.value);
})

const toggleSidebar_button = $("toggleSidebar")

if (toggleSidebar_button){
	side_bar.classList.toggle('hidden-sidebar');

	toggleSidebar_button.addEventListener('click', function(event){
		const element = document.getElementsByTagName('aside')[0];
		element.classList.toggle('hidden-sidebar');
		if (element.classList.contains("hidden-sidebar")){
			toggleSidebar_button.textContent = '+'
		}
		else{
			toggleSidebar_button.textContent = '-'
		}
	})
	if (localStorage.getItem("_sidebar_hidden") == 1){
		const element = document.getElementsByTagName('aside')[0];
		element.style.removeProperty("transition")
		element.classList.toggle('hidden-sidebar');
		element.style.transition = "transform 0.8s ease-in-out";
		if (element.classList.contains("hidden-sidebar")){
			toggleSidebar_button.textContent = '+'
		}
		else{
			toggleSidebar_button.textContent = '-'
		}
		
	}
	}
}

const transparent_background = document.getElementsByClassName("transparent-background")

const nav_buttons = document.getElementsByClassName("nav-button")

const side_buttons = document.getElementsByClassName("side-button")

const disabled_side_buttons = document.getElementsByClassName("disabled-side-button")

const nav_wallpaperChange = $("nav-wallpaper-change")

const banner_container = $('banner-container')

const body_element = document.body;

const Logo_Text = $("Logo-Text")

//const logo_text_color, side_buttons_color, nav_buttons_color, side_bg_color, nav_bg_color, nav_text_color, side_text_color;

const medallium_btn = $('medallium-btn');

const damageCalc_btn = $('damageCalc-btn')

const teamBuild_btn = $('TeamBuild-btn')

const equipment_btn = $("equipment-btn")

const tierSheet_btn = $("tierSheet-btn")

const yokaiData_btn = $("yokaiData-btn")

const imageRecources_btn = $("Resources-btn")

const head = document.head

const faviconLink = document.createElement('link');

faviconLink.rel = 'icon';

faviconLink.href = 'Content/Graphics/Whisper.ico';

head.appendChild(faviconLink);

function changeTheme(wallpaper){
	$("wallpaper-select").value = wallpaper; banner_container.style.backgroundImage = `url("./Content/Graphics/Wallpapers/${wallpaper}.png")`;
	body_element.style.background = `url("./Content/Graphics/Wallpapers/${wallpaper}_Pattern.png") fixed, url("./Content/Graphics/Wallpapers/${wallpaper}.png") fixed`
	body_element.style.backgroundSize = `220px, cover`
	
	document.documentElement.className = wallpaper;
	
	localStorage.setItem("selected_wallpaper", wallpaper);
}


function redirect(name){
	if (page != `${name}.html`){
		console.log('Redirecting...');
		window.location.assign(`./${name}.html`);
		console.log('Done!');
  }
  else{
	  noredirect(1)
  }
}

function noredirect(num){
	console.log("Can't redirect to the page");
	switch(num){
		case NaN:
			console.log("Unknown issue");
			break;
		case 1:
			console.log("Already broadcasting");
			break;
		case 2:
			console.log("The page is unavaliable");
			break;
	}
}

const SearchInput = $("search-input");
let pathLocation = window.location.pathname;
let page = pathLocation.split("/").pop();
let originalOrder = [];

function filterYokai(searchTerm) {
	const terms = searchTerm.toLowerCase().split(/\s+/);
	const divs = document.querySelectorAll('#data-page .MiniYokaiInfo-div');
	const filterRanks = ['E', 'D', 'C', 'B', 'A', 'S'];
	const filterTribes = ['None', 'Brave', 'Mysterious', 'Tough', 'Charming', 'Heartful', 'Shady', 'Eerie', 'Slippery', 'Wicked'];

	divs.forEach(div => {
		const img = div.querySelector('a img');
		if (!img) return;

		const name = div.querySelector('#div-name')?.textContent || '';
		const rank = img.getAttribute('rank-value') || '';
		const tribe = img.getAttribute('tribe-value') || '';
		const element = img.getAttribute('element-value') || '';
		const inspirit = img.getAttribute('inspirit-value') || '';
		const alliance = img.getAttribute('alliance-value') || '';
		const rarity = img.getAttribute('rarity-value') || '';
		const classic = img.getAttribute('classic-value') || '';
		
		const fullText = `${name} ${tribe} ${rank} ${element} ${inspirit} ${alliance} ${rarity} ${classic}`.toLowerCase();

		let match = 0;
		for (term of terms){
			if (term.includes(`"`)){
				if (!fullText.includes(term.replaceAll(`"`,``))){
					match=0;
					break;
				}
				match=1;
				continue;
			}
			else{
				if (fullText.includes(term)) match=1;
			}
		}
		div.style.display = match ? 'flex' : 'none';
	});
}

let localStorage_Wallpaper = localStorage.getItem('selected_wallpaper');

if (localStorage_Wallpaper){
	changeTheme(localStorage_Wallpaper)
	$("wallpaper-select").value = localStorage_Wallpaper
}
else{
	changeTheme("Small_Cream_Soda")
}
console.log( page );

console.log('JS LOADED UP');
