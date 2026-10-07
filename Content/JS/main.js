
const $ = id => document.getElementById(id);

const bannerPath = "Content/Graphics/BannerYokai/";

const meta = document.createElement('meta');

meta.name = "viewport";

meta.content = `width=device-width, initial-scale=1.0`;

document.getElementsByTagName('head')[0].appendChild(meta);

let textPath = null;

let WV={
	"Major": 2,
	"Minor": 4,
	"Patch": 1
}

let webVerElement = document.getElementsByClassName('WebVerElement');
let versionTitle = $("version-title");

for (element of webVerElement){
	element.innerText=`Version of the website: ${WV.Major}.${WV.Minor}.${WV.Patch}`
}
if (versionTitle) {
	versionTitle.textContent = `Version ${WV.Major}.${WV.Minor}.${WV.Patch} Update`;
}

const sideBar = document.getElementsByTagName('aside')[0];

const navTab = $('nav-tab');

if (sideBar){
sideBar.innerHTML += `
	<button id="toggleSidebar";>+</button>
	<a href='./medallium.html' id="medallium-btn">Strategy Medallium <span style="background-repeat: no-repeat;" class="icon icon-yokai"></span></a>
	<a href='./team-builder.html' id="TeamBuild-btn">Build Team <span style="background-repeat: no-repeat;" class="icon icon-dict"></span></a>
	<a href='./tier-sheet.html' id="tierSheet-btn">Tier Sheet</a>
	<a href='./equipment-list.html' id="equipment-btn">Equipment List <span class="icon icon-equipment"></a>
	<a href='./damage-calculator.html' id="damageCalc-btn">Damage Calculator <span style="background-repeat: no-repeat;" class="icon icon-damage"></span></a>
	<a href='./move-list.html' id="yokaiData-btn">Move List <span style="background-repeat: no-repeat;" class="icon icon-damage"></a>
	<a href='./misc-list.html' id="Misc-btn">Misc  <span style="background-repeat: no-repeat;" class="icon icon-misc"></span></a>
	<a href='./image-recources.html' id="Resources-btn">Image Resources <span style="background-repeat: no-repeat;" class="icon icon-search"></span></a>
`
}
if (navTab){
	const navHtml = `
	<div class="main-tabs">
		<div class="nav-links">
			<a href="./index.html"><button class="nav-button" id="home-btn">Home</button></a>
			<a href="./about.html"><button class="nav-button">About Project</button></a>
			<a href="./contact.html"><button class="nav-button">Contacts</button></a>
			<a href="https://discord.gg/wyWbEhhGwm">
				<button class="nav-button btn-discord">
					Discord <span class="icon icon-discord icon-discord-span"></span>
				</button>
			</a>
		</div>
		<div class="nav-controls">
			<div id="nav-wallpaper-change" class="nav-change">
				<label for="wallpaper-select">Wallpaper: </label>
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
			<div id="nav-language-change" class="nav-change">
				<label for="language-select">Language: </label>
				<select id="language-select" name="languages">
					<option value="eng">ENG</option>
					<option value="jpn">JPN</option>
				</select>
			</div>
		</div>
	</div>
	<a href="./index.html" class="nav-brand">
		<div id="banner-container" class="banner-container">
			<img id="left-char" alt="Left Character">
			
				<div id="logo-text">Yo-gon Academy</div>
			
			<img id="right-char" alt="Right Character">
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
	navTab.insertAdjacentHTML('beforeend', navHtml);

	const wallpaperSelect = $("wallpaper-select");
	let languageSelect = $("language-select");

	wallpaperSelect?.addEventListener('change', function() {
		changeTheme(wallpaperSelect.value);
	});
	
	languageSelect?.addEventListener('change', function() {
		changeLanguage(languageSelect.value);
	});

	const toggleSidebar = $("toggleSidebar");

	if (toggleSidebar){
		sideBar.classList.toggle('hidden-sidebar');

		toggleSidebar.addEventListener('click', function(event){
			const element = document.getElementsByTagName('aside')[0];
			element.classList.toggle('hidden-sidebar');
			if (element.classList.contains("hidden-sidebar")){
				toggleSidebar.textContent = '+'
			}
			else{
				toggleSidebar.textContent = '-'
			}
		})
		if (localStorage.getItem("_sidebar_hidden") == 1){
			const element = document.getElementsByTagName('aside')[0];
			element.style.removeProperty("transition")
			element.classList.toggle('hidden-sidebar');
			element.style.transition = "transform 0.8s ease-in-out";
			if (element.classList.contains("hidden-sidebar")){
				toggleSidebar.textContent = '+'
			}
			else{
				toggleSidebar.textContent = '-'
			}
			
		}
	}
}

const head = document.head;

const faviconLink = document.createElement('link');

faviconLink.rel = 'icon';

faviconLink.href = 'Content/Graphics/Whisper.ico';

head.appendChild(faviconLink);

function changeTheme(wallpaper){
	const body = document.body;
	$("wallpaper-select").value = wallpaper; 
	$("banner-container").style.backgroundImage = `url("./Content/Graphics/Wallpapers/${wallpaper}.png")`;
	body.style.background = `url("./Content/Graphics/Wallpapers/${wallpaper}_Pattern.png") fixed, url("./Content/Graphics/Wallpapers/${wallpaper}.png") fixed`;
	body.style.backgroundSize = `220px, cover`;
	
	document.documentElement.className = wallpaper;
	
	localStorage.setItem("selected_wallpaper", wallpaper);
}

function changeLanguage(language = "ENG"){
	$("language-select").value = language;
	textPath = language;
	localStorage.setItem("selected_language", language);
}

function setBannerYokai(name){
	$("left-char").src = `${bannerPath}LeftYokai${name}.png`;
	$("right-char").src = `${bannerPath}RightYokai${name}.png`
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
	
function scaleText(element) {
	if (!element) return;

	element.style.transform = 'scale(1)';
	
	const parentWidth = element.parentElement.clientWidth;
	// Account for the medal width (44px) and gap (8px)
	const availableWidth = parentWidth - 44 - 8; 
	
	const textWidth = element.offsetWidth;

	if (textWidth > availableWidth) {
		const scaleRatio = availableWidth / textWidth;
		element.style.transform = `scale(${scaleRatio})`;
	}
}

function filterYokai(searchTerm) {
	const terms = searchTerm.toLowerCase().split(/\s+/);
	const divs = document.querySelectorAll('#data-page .mini-info-div');
	const filterRanks = ['E', 'D', 'C', 'B', 'A', 'S'];
	const filterTribes = ['None', 'Brave', 'Mysterious', 'Tough', 'Charming', 'Heartful', 'Shady', 'Eerie', 'Slippery', 'Wicked'];

	divs.forEach(div => {
		const img = div.querySelector('a img');

		const name = div.querySelector('.info-name')?.textContent || '';
		const rank = img?.getAttribute('rank-value') || '';
		const tribe = img?.getAttribute('tribe-value') || '';
		const element = img?.getAttribute('element-value') || '';
		const inspirit = img?.getAttribute('inspirit-value') || '';
		const alliance = img?.getAttribute('alliance-value') || '';
		const rarity = img?.getAttribute('rarity-value') || '';
		const classic = img?.getAttribute('classic-value') || '';
		
		const fullText = `${name} ${tribe} ${rank} ${element} ${inspirit} ${alliance} ${rarity} ${classic}`.toLowerCase();
		const divText = div.textContent.toLowerCase();
		
		//console.debug(`${fullText}\n${divText}`);

		let match = 0;
		for (term of terms){
			if (term.includes(`"`)){
				if (!fullText.includes(term.replaceAll(`"`,``))  || divText.includes(term.replaceAll(`"`,``))){
					match=0;
					break;
				}
				match=1;
				continue;
			}
			else{
				if (fullText.includes(term) || divText.includes(term)) match=1;
			}
		}
		div.style.display = match ? 'flex' : 'none';
	});
}

const SearchInput = $("search-input");
let pathLocation = window.location.pathname;
let page = pathLocation.split("/").pop();
let originalOrder = [];
let localStorageWallpaper = localStorage.getItem('selected_wallpaper');
let localStorageLanguage = localStorage.getItem('selected_language');

if (localStorageWallpaper){
	changeTheme(localStorageWallpaper)
	$("wallpaper-select").value = localStorageWallpaper
}
else{
	changeTheme("Small_Cream_Soda")
}

if (localStorageLanguage) changeLanguage(localStorageLanguage);

const curDate = new Date();

if(curDate.getMonth() == 11){
	setBannerYokai("_December");
}
else{
	setBannerYokai('4');
}

console.log( page );

console.log('JS LOADED UP');

//addEventListener("DOMContentLoaded", (event) => { });