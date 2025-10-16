
var side_bar = document.getElementById('side_bar')

var nav_tab = document.getElementById('nav-tab')

side_bar.innerHTML += `
<button class="side-button" id="medallium-btn">Strategy Medallium <span style="background-repeat: no-repeat;" class="icon icon-yokai"></span></button>
	<button class="side-button" id="tierSheet-btn">Tier Sheet</button>
	<button class="side-button" id="damageCalc-btn">Damage Calculator <span style="background-repeat: no-repeat;" class="icon icon-damage"></span></button>
	<button class="side-button" id="equipment-btn">Equipment List <span class="icon icon-equipment"></button>
	<button class="side-button" id="yokaiData-btn">Yo-Kai Data</button>
	
	<button class="side-button" id="TeamBuild-btn">Build Team <span style="background-repeat: no-repeat;" class="icon icon-dict"></span></button>
	
`

nav_tab.innerHTML += `
	<div class="main-tabs">
			<div style="display: flex; gap: 10px;">
			<button style="margin-left: 50px;"class="nav-button" id="home-btn">Home</button>
			<button class="nav-button" id="about-btn">About Us</button>
			<button class="nav-button" id="contact-btn">Contact</button>
			<a href='https://discord.gg/wyWbEhhGwm'><button class="nav-button" style="height: 28px; background-color: #5972ff; color: white;">Discord <span style="height: 25px; width: 25px;" class="icon icon-discord"></span></button></a>
			</div>
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
		
        <a href="#" id='logo-js' class="nav-brand">
		<div id="banner-container" class="banner-container">
			<img src="Content/Graphics/BannerYokai/LeftYokai3.png" class="left-char" alt="Left Character">
			
				<div id="Logo-Text" style="font-family: 'YokaiWatch_YokaiRoleFont'; font-size: 45px;">Yo-gon Academy</div>
			
			<img src="Content/Graphics/BannerYokai/RightYokai3.png" class="right-char" alt="Right Character">
		</div>
		</a>
`



var transparent_background = document.getElementsByClassName("transparent-background")

var nav_buttons = document.getElementsByClassName("nav-button")

var side_buttons = document.getElementsByClassName("side-button")

var disabled_side_buttons = document.getElementsByClassName("disabled-side-button")

var nav_wallpaper_change = document.getElementById("nav-wallpaper-change")

var wallpaper_change = document.getElementById("wallpaper-select")

var banner_container = document.getElementById('banner-container')

var body_element = document.body;

let Logo_Text = document.getElementById("Logo-Text")

var logo_text_color, side_buttons_color, nav_buttons_color, side_bg_color, nav_bg_color, nav_text_color, side_text_color

wallpaper_change.addEventListener('change', function(event){
	changeTheme(wallpaper_change.value)
})

var home_btn = document.getElementById('home-btn');

var about_btn = document.getElementById('about-btn');

var contact_btn = document.getElementById('contact-btn');

var logo_js = document.getElementById('logo-js');

var medallium_btn = document.getElementById('medallium-btn');

var damageCalc_btn = document.getElementById('damageCalc-btn')

var teamBuild_btn = document.getElementById('TeamBuild-btn')

var equipment_btn = document.getElementById("equipment-btn")

var tierSheet_btn = document.getElementById("tierSheet-btn")

var yokaiData_btn = document.getElementById("yokaiData-btn")

var head = document.head

var faviconLink = document.createElement('link');

faviconLink.rel = 'icon';

faviconLink.href = 'Content/Graphics/Whisper.ico';

head.appendChild(faviconLink);

function changeTheme(wallpaper){
	
	wallpaper_change.value = wallpaper;
	
	banner_container.style.backgroundImage = `url("./Content/Graphics/Wallpapers/${wallpaper}.png")`
	console.log(body_element.style)
	body_element.style.background = `url("./Content/Graphics/Wallpapers/${wallpaper}_Pattern.png") fixed, url("./Content/Graphics/Wallpapers/${wallpaper}.png") fixed`
	body_element.style.backgroundSize = `220px, cover`
	console.log(body_element)
	
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

home_btn.addEventListener('click', () => {
	redirect("index")
});

about_btn.addEventListener('click', () => {
	redirect("about")
});

contact_btn.addEventListener('click', () => {
	redirect("contact")
});


logo_js.addEventListener('click', () => {
	redirect("index")
});

medallium_btn.addEventListener('click', () => {
	redirect("medallium")
});

damageCalc_btn.addEventListener('click', () => {
	redirect("DamageCalc")
})

teamBuild_btn.addEventListener('click', () => {
	redirect("TeamBuild")
})

equipment_btn.addEventListener('click', () => {
	redirect("equipment")
})
tierSheet_btn.addEventListener('click', () => {
	redirect("tierSheet")
})
yokaiData_btn.addEventListener('click', () => {
	redirect("YokaiData")
})

var SearchInput = document.getElementById("search-input")
var path_location = window.location.pathname;
var page = path_location.split("/").pop();

if (SearchInput){
	
	var Data_List = undefined;
	
	var Data_List_Len = undefined;
	
	SearchInput.addEventListener('search', function(){
		Data_List = document.getElementById("data-page") || document.getElementById("yokaidata-page")

		const searchTerm = SearchInput.value.toLowerCase();
		Array.from(Data_List.children).forEach(div => {
		  const targetElementName = div.querySelector('#div-name');
		  const targetElementDesc = div.querySelector('#div-desc');
		  const isVisible = targetElementName?.textContent?.toLowerCase().includes(searchTerm) || targetElementDesc?.textContent?.toLowerCase().includes(searchTerm)
		  console.log(isVisible)
		  if (isVisible==false || isVisible==undefined){
			  div.style.display = "none"
		  }
		  else{
			  div.style.display = "flex"
		  }
		});
	})
	
}

var localStorage_Wallpaper = localStorage.getItem('selected_wallpaper');

if (localStorage_Wallpaper){
	changeTheme(localStorage_Wallpaper)
	wallpaper_change.value = localStorage_Wallpaper
}
else{
	changeTheme("Small_Cream_Soda")
}
console.log( page );

console.log('JS LOADED UP');
