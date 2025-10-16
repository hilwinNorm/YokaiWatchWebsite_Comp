**YO-GON ACADEMY**

Version of the project: 1.1.0

**Purpose**
This website serves as a comprehensive resource for players offering: 
Advanced Yokai Information; 
Team Building Tool;
Damage Calculator;
Tiers.

**Competitive Focus**
Unlike other Yokai Watch resources, this website specifically targets competitive players with:

Data-Driven Analysis: Statistical breakdowns and performance metrics

Hidden Mechanics: Documentation of lesser-known game systems

Optimization Tools: Calculators and builders for min-maxing teams

Community Insights: Collective knowledge from top players


**Used tools**
HTML5, CSS3, JavaScript

**Project Structure**

├── index.html  # Main entry point

├── medallium.html # List of all yokai with some search options

├── contact.html # List of people who made this website (Or contributed to its creation) as well as their contacts

├── about.html # Web version of this README.md

├── tierSheet.html # Yo-Gon's tiers

├── TeamBuild.html # Team Builder

├── PageNotFound.html  # Page that is used in case of the 404 Error (Instead of giving out some basic one; Currently unused)

├── DamageCalc.html # Damage Calculator

├── equipment.html # Same as medallium.html but for equipment and soul gems

├── YoKaiInfoPage.html # Page used to show the info on a clicked yokai

├── YokaiData.html # Page that contains all of Yokai Attacks and Skills

├── Content/

│   ├── CSS/  # Stylesheets

│   ├── JS/  # JavaScript modules

│   │   ├── Databases/ # Holds all of databases that are used across the website

│   │   ├── DamageCalc.js # Has all of the main scripts for DamageCalc.html

│   │   ├── Index.js # Used across the pages for the basic page logic (e.g. Changing wallpaper or changing page)

│   │   ├── ShowStats.js # Used in YokaiInfoPage.html

│   │   ├── TeamBuild.js # Used in TeamBuild.html

│   │   ├── YokaiDataList.js # Used in YokaiData.html

│   │   └── TierSheet.js # Used to fill out tiers in tierSheet.html

│   ├── Graphics/  # Images and visual assets

│   ├── Fonts/  # Custom typography

│   │  └── Yokai_WatchFont/ # Main list of fonts that are used across the pages (Originate from games)

│   └── Libs/  # External libraries

└── README.md  # This file

**Access**
This is the first publicly accessible web version, available through any modern web browser.
You can also run this website locally just by downloading and opening any .html file (preferably index.html)

**Future Roadmap**
User accounts

Community tier voting system

Mobile app version

Multi-language support (?)

Page for hosting and storing datas on tourneys


This project welcomes any help from the community!
Built with ❤️ for the Yokai Watch competitive community
