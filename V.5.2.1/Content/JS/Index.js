
var side_bar = document.getElementById('side_bar')

var nav_tab = document.getElementById('nav-tab')

side_bar.innerHTML += `
<button class="side-button" id="medallium-btn">Strategy Medallium</button>
	<button class="side-button" id="tierSheet-btn">Tier Sheet</button>
	<button class="side-button" id="damageCalc-btn">Damage Calculator</button>
	<button class="side-button" id="equipment-btn">Equipment List</button>
	<button disabled class="side-button">Attacks, Techniques, Soultimates</button>
	<button disabled class="side-button">Yo-Kai Skills</button>
	
	<button class="side-button" id="TeamBuild-btn">Build Team</button>
	
`

nav_tab.innerHTML += `
	<div class="main-tabs">
			<div style="display: flex; gap: 10px;">
			<button class="nav-button" id="home-btn">Home</button>
			<button class="nav-button" id="about-btn">About Us</button>
			<button class="nav-button" id="contact-btn">Contact</button>
			<a href='https://discord.gg/wyWbEhhGwm'><button class="nav-button" style="height: 28px; background-color: #5972ff; color: white;">Discord <span style="height: 25px; width: 25px;" class="icon icon-discord"></span></button></a>
			</div>
			<div id="nav-wallpaper-change" class="nav-wallpaper-change">
			<label for="wallpaper-select">Wallpaper:  </label>
			<select id="wallpaper-select">
			<option value="Cool_Blue">Cool Blue</option>
			<option value="Antique_Blossoms">Antique Blossoms</option>
			<option value="Bamboo_Forest">Bamboo Forest</option>
			<option value="Merchant_Purple">Merchant Purple</option>
			<option value="Classic_Gold">Classic Gold</option>
			<option value="Up_All_Night">Up All Night</option>
			<option value="Galaxy_Cruise">Galaxy Cruise</option>
			<option value="Small_Cream_Soda">Small Cream Soda</option>
			</select>
			</div>
		</div>
		
        <a href="#" id='logo-js' class="nav-brand">
		<div id="banner-container" class="banner-container">
			<img src="Content/Graphics/LeftYokai2.png" class="left-char" alt="Left Character">
			
				<div id="Logo-Text" style="font-family: 'YokaiWatch_YokaiRoleFont'; font-size: 40px;">Yo-gon Academy</div>
			
			<img src="Content/Graphics/RightYokai.png" class="right-char" alt="Right Character">
		</div>
		</a>
`

/* Random Yokai Appearing Prototype
	<div id="banner-container" class="banner-container" style="overflow: hidden">
		<div class="yokai-side left-char">
		<img class="yokai-item left-yokai-1" alt="Yokai 1">
		<img class="yokai-item left-yokai-2" alt="Yokai 2">
		<img class="yokai-item left-yokai-3" alt="Yokai 3">
		<img class="yokai-item left-yokai-4" alt="Yokai 4">
	</div>

	<div class="yokai-side right-char">
		<img class="yokai-item right-yokai-1" alt="Yokai 1">
		<img class="yokai-item right-yokai-2" alt="Yokai 2">
		<img class="yokai-item right-yokai-3" alt="Yokai 3">
		<img class="yokai-item right-yokai-4" alt="Yokai 4">
	</div>
*/

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

var head = document.head

var faviconLink = document.createElement('link');

faviconLink.rel = 'icon';

faviconLink.href = 'Content/Graphics/Whisper.ico';

head.appendChild(faviconLink);

function changeTheme(wallpaper){
	/*
	let SlotInfo_Text = document.getElementsByClassName("SlotInfo-Text")
	let MiniYokaiInfo_div = document.getElementsByClassName("MiniYokaiInfo-div")
	switch (wallpaper) {
		case "Cool_Blue":
		
			logo_text_color = "#003c83"

			side_buttons_color = "#2879d3"
			
			nav_buttons_color = "#20a5d8"

			side_bg_color = "#255cce"
			
			nav_bg_color = "#2879d3"
			
			nav_text_color = "#000000"
			
			side_text_color = "#ffffff"
			break;
		case "Antique_Blossoms":
			logo_text_color = "#734b04"

			side_buttons_color = "#c68282"
			
			nav_buttons_color = "#f5e54c"

			side_bg_color = "#ce6a6a"
			
			nav_bg_color = "#dbce53"
			
			nav_text_color = "#48483e"
			
			side_text_color = "#251e20"
			break;
		case "Bamboo_Forest":
			logo_text_color = "#154624"

			side_buttons_color = "#4a854d"
			
			nav_buttons_color = "#4a854d"

			side_bg_color = "#33612b"
			
			nav_bg_color = "#33612b"
			
			nav_text_color = "#fcfcfc"
			
			side_text_color = "#fcfcfc"
			break;
			
		case "Merchant_Purple":
			logo_text_color = "#441a47"

			side_buttons_color = "#915673"
			
			nav_buttons_color = "#915673"

			side_bg_color = "#5a255e"
			
			nav_bg_color = "#5a255e"
			
			nav_text_color = "#ffe0ef"
			
			side_text_color = "#ffe0ef"
			break;
			
		case "Up_All_Night":
			logo_text_color = "#6680fb"

			side_buttons_color = "#202c64"
			
			nav_buttons_color = "#202c64"

			side_bg_color = "#0c1334"
			
			nav_bg_color = "#0c1334"
			
			nav_text_color = "#c6c0ff"
			
			side_text_color = "#c6c0ff"
			break;
			
		case "Small_Cream_Soda":
			logo_text_color = "#153831"

			side_buttons_color = "#148d67"
			
			nav_buttons_color = "#deb358"

			side_bg_color = "#1ba479"
			
			nav_bg_color = "#edc87a"
			
			nav_text_color = "#ffffff"
			
			side_text_color = "#ffffff"
			break;
			
		case "Galaxy_Cruise":
			logo_text_color = "#102521"

			side_buttons_color = "#2f73c0"
			
			nav_buttons_color = "#da2424"

			side_bg_color = "#24558d"
			
			nav_bg_color = "#d64c4c"
			
			nav_text_color = "#fff4f8"
			
			side_text_color = "#f7ffff"
			break;
		case "Classic_Gold":
			logo_text_color = "#ebba4d"

			side_buttons_color = "#936722"
			
			nav_buttons_color = "#936722"

			side_bg_color = "#614416"
			
			nav_bg_color = "#614416"
			
			nav_text_color = "#fff5de"
			
			side_text_color = "#fff5de"
			break;
	}
	Logo_Text.style.color = logo_text_color
	nav_tab.style.background = nav_bg_color
	nav_wallpaper_change.style.background = nav_buttons_color
	nav_wallpaper_change.style.color = nav_text_color
	side_bar.style.background = side_bg_color

	if (MiniYokaiInfo_div){
		for (i=0; i<MiniYokaiInfo_div.length; i++){
			MiniYokaiInfo_div[i].style.background = side_buttons_color
			MiniYokaiInfo_div[i].style.color = side_text_color
		}
	}
	if (SlotInfo_Text){
		for (i=0; i<SlotInfo_Text.length; i++){
			SlotInfo_Text[i].style.color = side_text_color
		}
	}
	for (i=0; i<disabled_side_buttons.length; i++){
		disabled_side_buttons[i].style.background = side_buttons_color
	}
	for (i=0; i<transparent_background.length; i++){
		transparent_background[i].style.background = side_bg_color + "b3"
	}
	for (i=0; i<nav_buttons.length; i++){
		nav_buttons[i].style.background = nav_buttons_color
		nav_buttons[i].style.color = nav_text_color
	}
	for (i=0; i<side_buttons.length; i++){
		side_buttons[i].style.background = side_buttons_color
		if (side_buttons[i].disabled == false){
		side_buttons[i].style.color = side_text_color
		}
	}
	*/
	wallpaper_change.value = wallpaper;
	
	banner_container.style.backgroundImage = `url("./Content/Graphics/Wallpapers/${wallpaper}.png")`
	body_element.style.backgroundImage = `url("./Content/Graphics/Wallpapers/${wallpaper}.png")`
	
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
	//pressing_button(home_btn)
	
	redirect("index")
});

about_btn.addEventListener('click', () => {
	//pressing_button(about_btn)
  
	redirect("about")
});

contact_btn.addEventListener('click', () => {
	//pressing_button(contact_btn)
	
	redirect("contact")
});


logo_js.addEventListener('click', () => {
	//pressing_button(home_btn)
	
	redirect("index")
});

medallium_btn.addEventListener('click', () => {
	//pressing_button(home_btn)
	
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

var SearchInput = document.getElementById("search-input")
var path_location = window.location.pathname;
var page = path_location.split("/").pop();

if (SearchInput){
	
	var Data_List = undefined;
	
	var Data_List_Len = undefined;
	
	SearchInput.addEventListener('search', function(){
		Data_List = document.getElementById("data-page")

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

// Common HTTP status codes data
const statusCodes = {
	'400': {
		message: 'Bad Request',
		description: 'The server cannot process the request due to a client error.',
	},
	'401': {
		message: 'Unauthorized',
		description: 'Authentication is required and has failed or not been provided.',
	},
	'403': {
		message: 'Forbidden',
		description: 'You do not have permission to access this resource.',
	},
	'404': {
		message: 'Not Found',
		description: 'The requested resource could not be found on this server.',
	},
	'405': {
		message: 'Method Not Allowed',
		description: 'The request method is not supported for the requested resource.',
	},
	'408': {
		message: 'Request Timeout',
		description: 'The server timed out waiting for the request.',
	},
	'429': {
		message: 'Too Many Requests',
		description: 'You have sent too many requests in a given amount of time.',
	},
	'500': {
		message: 'Internal Server Error',
		description: 'The server encountered an internal error and was unable to complete your request.',
	},
	'502': {
		message: 'Bad Gateway',
		description: 'The server received an invalid response from the upstream server.',
	},
	'503': {
		message: 'Service Unavailable',
		description: 'The server is currently unable to handle the request due to temporary maintenance.',
	},
	'504': {
		message: 'Gateway Timeout',
		description: 'The server did not receive a timely response from the upstream server.',
	}
};

// Function to display the status code
function displayStatusCode(code) {
	const loadingState = document.getElementById('loading-state');
	const errorState = document.getElementById('error-state');
	const statusData = statusCodes[code] || statusCodes['404'];
	
	// Hide loading, show error state
	loadingState.classList.add('hidden');
	errorState.classList.remove('hidden');
	
	// Update content
	document.getElementById('status-code').textContent = code;
	document.getElementById('status-message').textContent = statusData.message;
	document.getElementById('status-description').textContent = statusData.description;
	document.getElementById('error-image').src = statusData.image;
	
	// Update page title
	document.title = `${code} ${statusData.message}`;
}

// Method 1: Try to get status code from server using fetch
function detectStatusCode() {
	// First, try to get the current page's status code
	fetch(window.location.href, {
		method: 'HEAD',
		cache: 'no-cache'
	})
	.then(response => {
		// If we get a successful response, we're probably on a custom error page
		// but the actual error code might be in the URL or we need to check differently
		if (response.ok) {
			// Check if there's a status code in the URL
			const urlParams = new URLSearchParams(window.location.search);
			const codeFromUrl = urlParams.get('status') || urlParams.get('code') || urlParams.get('error');
			
			if (codeFromUrl && statusCodes[codeFromUrl]) {
				displayStatusCode(codeFromUrl);
			} else {
				// If no code in URL and response is OK, we might be on a custom error page
				// Try to get from referrer or other methods
				tryToFindStatusCode();
			}
		} else {
			// We got an actual error response
			displayStatusCode(response.status.toString());
		}
	})
	.catch(error => {
		// Network errors or other issues
		console.log('Fetch failed, trying alternative methods:', error);
		tryToFindStatusCode();
	});
}

console.log( page );

console.log('JS LOADED UP');

/*
document.addEventListener('DOMContentLoaded', () => {
    window.yokaiBanner = new YokaiBanner();
});
*/