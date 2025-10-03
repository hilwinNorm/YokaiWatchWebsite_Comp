const skills = [
  {
    name: "Careless",
    description: "Prone to be dealt critical attacks.",
    ID: 1
  },
  {
    name: "Bladed Body",
    description: "Body deals damage to all foes who attack it.",
    ID: 2
  },
  {
    name: "Washed Out",
    description: "Stats decrease when negatively inspirited.",
    ID: 3
  },
  {
    name: "Hard Worker",
    description: "Receives more experience points.",
    ID: 4
  },
  {
    name: "Lie-in Wait",
    description: "Doesn't take an action for one to two turns.",
    ID: 5
  },
  {
    name: "Annoyance",
    description: "May attack an ally.",
    ID: 6
  },
  {
    name: "Sword Hunting",
    description: "Power increases each time a foe is defeated.",
    ID: 7
  },
  {
    name: "Soft Skin",
    description: "Increases own DEF if dealt critical damage.",
    ID: 8
  },
  {
    name: "Lickaway",
    description: "Purifies adjacent allies.",
    ID: 9
  },
  {
    name: "Rice and Dice",
    description: "Ups damage Yo-kai does to enemy's Oni.",
    ID: 10
  },
  {
    name: "Spirit Guard",
    description: "No elemental-weakness damage if guarding.",
    ID: 11
  },
  {
    name: "Sludge Grudge",
    description: "When defeated, takes revenge on enemy.",
    ID: 12
  },
  {
    name: "Gimme Twenty",
    description: "Boosts all adjacent Yo-kai's STR.",
    ID: 13
  },
  {
    name: "Blazing Spirit",
    description: "Power increases when an ally is defeated.",
    ID: 14
  },
  {
    name: "Courageous Spirit",
    description: "Power increases when an ally is defeated.",
    ID: 15
  },
  {
    name: "Shining Spirit",
    description: "Power increases when an ally is defeated.",
    ID: 16
  },
  {
    name: "Gambler",
    description: "High chance to give and take critical strikes.",
    ID: 17
  },
  {
    name: "Light Speed",
    description: "High chance to deal critical attacks.",
    ID: 18
  },
  {
    name: "Cursed Skin",
    description: "All stats will increase when inspirited by foe.",
    ID: 19
  },
  {
    name: "Guard Break",
    description: "Ignore foe's guard effect when attacking.",
    ID: 20
  },
  {
    name: "The Stand",
    description: "Will keep 1HP after a knockout blow once.",
    ID: 21
  },
  {
    name: "Too Serious",
    description: "Will never Loaf.",
    ID: 22
  },
  {
    name: "Intimidation",
    description: "No Yo-kai will Loaf around.",
    ID: 23
  },
  {
    name: "Sneaky Snacker",
    description: "Recovers HP after an enemy is defeated.",
    ID: 24
  },
  {
    name: "Soul Snacker",
    description: "Recovers HP after an enemy is defeated.",
    ID: 25
  },
  {
    name: "Gust O' Gusto",
    description: "When in the back, increases allies' SPD",
    ID: 26
  },
  {
    name: "Got Your Back",
    description: "When in back, slowly refills front row's HP.",
    ID: 27
  },
  {
    name: "Water Play",
    description: "Increases damage of own Water attacks.",
    ID: 28
  },
  {
    name: "Snow Play",
    description: "Increases damage of own Ice attacks.",
    ID: 29
  },
  {
    name: "Soothing Rhythm",
    description: "All foes will be prone to Loafing around.",
    ID: 30
  },
  {
    name: "Forgot to Guard",
    description: "No Yo-kai will guard in battle.",
    ID: 31
  },
  {
    name: "Prediction",
    description: "Decreases foe's Accuracy",
    ID: 32
  },
  {
    name: "Bony Bond",
    description: "Gives a DEF boost to all  Bony Spirits Yo-kai.",
    ID: 33
  },
  {
    name: "Hanging In",
    description: "Won't get bad effects of enemy Inspirits.",
    ID: 34
  },
  {
    name: "Caring",
    description: "Gradually recovers HP of adjacent Yo-kai.",
    ID: 35
  },
  {
    name: "Popularity",
    description: "Makes more foes befriend you.",
    ID: 36
  },
  {
    name: "Unpopularity",
    description: "Makes foes less likely to become your friend.",
    ID: 37
  },
  {
    name: "Make Amends",
    description: "Restores HP to allies while Yo-kai Loafs.",
    ID: 38
  },
  {
    name: "Magic Mist",
    description: "Helps recover adjacent Yo-kai's Soul Meters.",
    ID: 39
  },
  {
    name: "Lightning Play",
    description: "Increases damage of own Lightning attacks.",
    ID: 40
  },
  {
    name: "Long Lasting",
    description: "Good Inspirits will last longer.",
    ID: 41
  },
  {
    name: "Tasty Aroma",
    description: "All adjacent Yo-kai's HP is slowly refilled.",
    ID: 42
  },
  {
    name: "Electro Field",
    description: "Lightning damage triggers DEF boost.",
    ID: 43
  },
  {
    name: "Number One!",
    description: "SPD increases when front and center.",
    ID: 44
  },
  {
    name: "Mirror Body",
    description: "Sends 1/2 of Technique damage back at foe.",
    ID: 45
  },
  {
    name: "Brother's Vow",
    description: "Stat boosts for adjacent Yo-kai with same skill.",
    ID: 46
  },
  {
    name: "Wind Play",
    description: "Increases damage of own Wind attacks.",
    ID: 47
  },
  {
    name: "Fire Play",
    description: "Increases damage of own Fire attacks.",
    ID: 48
  },
  {
    name: "Penetrate",
    description: "Always deals elemental damage.",
    ID: 49
  },
  {
    name: "Sense of Smell",
    description: "Never misses attacks.",
    ID: 50
  },
  {
    name: "In a Flash",
    description: "Gets one preemptive attack.",
    ID: 51
  },
  {
    name: "Rest in Pieces",
    description: "Prevents all Yo-kai from being revived.",
    ID: 52
  },
  {
    name: "Glossy Skin",
    description: "Does not get dealt critical damage.",
    ID: 53
  },
  {
    name: "Bitter Rice",
    description: "May attack an ally.",
    ID: 54
  },
  {
    name: "Thick Crust",
    description: "DEF increases when front and center.",
    ID: 55
  },
  {
    name: "Digging In",
    description: "Takes less damage from Earth attacks.",
    ID: 56
  },
  {
    name: "Earth Cannon",
    description: "Normal attacks become Earth attacks.",
    ID: 57
  },
  {
    name: "Blocker",
    description: "Will be guarding when moving to the front.",
    ID: 58
  },
  {
    name: "Revenge",
    description: "Reflects some damage back to foe.",
    ID: 59
  },
  {
    name: "Me Too!",
    description: "Yo-kai mimics moves made by an ally in front.",
    ID: 60
  },
  {
    name: "Endurance",
    description: "Will keep 1HP after a knockout blow once.",
    ID: 61
  },
  {
    name: "Going Nowhere",
    description: "Will keep 1HP after a knockout blow twice.",
    ID: 62
  },
  {
    name: "Superconductor",
    description: "Blocks damage from all Lightning skill attacks.",
    ID: 63
  },
  {
    name: "Oily Mess",
    description: "Extends time allowed to spin the Yo-kai Wheel.",
    ID: 64
  },
  {
    name: "Bronze Guard",
    description: "Takes less Earth and Wind damage.",
    ID: 65
  },
  {
    name: "Silver Guard",
    description: "Takes less Fire and Ice damage.",
    ID: 66
  },
  {
    name: "Gold Guard",
    description: "Takes less Lightning and Water damage.",
    ID: 67
  },
  {
    name: "Platinum Guard",
    description: "Weakens Ice, Wind, and Water elemental hits.",
    ID: 68
  },
  {
    name: "Insulator",
    description: "Takes less damage from Lightning attacks.",
    ID: 69
  },
  {
    name: "Blessed Body",
    description: "When defeated, Yo-kai in the front recover HP.",
    ID: 70
  },
  {
    name: "Toadally Saved",
    description: "Protects allies on the verge of defeat.",
    ID: 71
  },
  {
    name: "Geckstra Safe",
    description: "Protects allies on the verge of defeat.",
    ID: 72
  },
  {
    name: "Great Legs",
    description: "When in the back, allies in front recover HP.",
    ID: 73
  },
  {
    name: "Modest",
    description: "Low chances of getting attacked by foes.",
    ID: 74
  },
  {
    name: "Eyesight A",
    description: "Never misses attacks.",
    ID: 75
  },
  {
    name: "Fire Watchout",
    description: "Takes less damage from Fire attacks.",
    ID: 76
  },
  {
    name: "Shuffle",
    description: "Shuffles all Yo-kai lineups.",
    ID: 77
  },
  {
    name: "Soulful Promise",
    description: "Gives a SPD boost to all Fleshy Souls Yo-kai.",
    ID: 78
  },
  {
    name: "Adrenaline",
    description: "Power increases each time a foe is defeated.",
    ID: 79
  },
  {
    name: "Spiky Guard",
    description: "Deals damage back to foe while guarding.",
    ID: 80
  },
  {
    name: "Pompadour",
    description: "Will dodge enemy headbutt attacks.",
    ID: 81
  },
  {
    name: "Skilled Loafer",
    description: "Will recover a little HP when Loafing around.",
    ID: 82
  },
  {
    name: "Alpha",
    description: "With an adjacent Omega Yo-kai, SPR increases.",
    ID: 83
  },
  {
    name: "Omega",
    description: "With an adjacent Alpha Yo-kai, STR increases.",
    ID: 84
  },
  {
    name: "Grip on You",
    description: "Amount of absorbed HP increased.",
    ID: 85
  },
  {
    name: "Good Fortune",
    description: "Will increase money at the end of a battle.",
    ID: 86
  },
  {
    name: "Downpour",
    description: "All Yo-kai recieve more Water damage.",
    ID: 87
  },
  {
    name: "Step Up",
    description: "Gets one preemptive attack.",
    ID: 88
  },
  {
    name: "Bear Care",
    description: "Can recover once when on low HP.",
    ID: 89
  },
  {
    name: "Cursed Skin",
    description: "All stats will increase when Inspirited by foe.",
    ID: 90
  },
  {
    name: "Use the Hose",
    description: "Dodges and returns every enemy attack.",
    ID: 91
  },
  {
    name: "Greed",
    description: "Foe will be more prone to drop items.",
    ID: 92
  },
  {
    name: "Snitch",
    description: "Absorbs foe's HP with regular attacks.",
    ID: 93
  },
  {
    name: "Wavy Body",
    description: "Dodges attacks like you wouldn't believe!",
    ID: 94
  },
  {
    name: "Seaweed Samba",
    description: "Boosts all adjacent Yo-kai's STR.",
    ID: 95
  },
  {
    name: "Starver",
    description: "Increases the effect of food on allies",
    ID: 96
  },
  {
    name: "Lick It Clean",
    description: "Yo-kai gets purified when healing allies.",
    ID: 97
  },
  {
    name: "Sand Still",
    description: "Will never Loaf.",
    ID: 98
  },
  {
    name: "Sun Shield",
    description: "Guards against and returns all enemy Techniques.",
    ID: 99
  },
  {
    name: "Stealing",
    description: "Will increase money at the end of a battle.",
    ID: 100
  },
  {
    name: "Acrobat",
    description: "Counterattacks right after dodging enemy.",
    ID: 101
  },
  {
    name: "Optimism Power",
    description: "Gradually recovers HP of adjacent Yo-kai.",
    ID: 102
  },
  {
    name: "Golden Touch",
    description: "Win more money after battles.",
    ID: 103
  },
  {
    name: "Miraculous Scales",
    description: "Does not get Inspirited by enemies.",
    ID: 104
  },
  {
    name: "Clairvoidance",
    description: "Improves ability to dodge enemy attacks.",
    ID: 105
  },
  {
    name: "Feel the Beat",
    description: "Boosts all stats.",
    ID: 106
  },
  {
    name: "Sunburn",
    description: "All Yo-kai recieve more Fire damage.",
    ID: 107
  },
  {
    name: "Insecure",
    description: "High chance to give and take critical strikes.",
    ID: 108
  },
  {
    name: "Strict",
    description: "All allies will Loaf around less.",
    ID: 109
  },
  {
    name: "Prayer",
    description: "Gradually recovers HP of adjacent Yo-kai.",
    ID: 110
  },
  {
    name: "Second Wind",
    description: "Restores a chunk of HP to allies in need.",
    ID: 111
  },
  {
    name: "Windshield",
    description: "Takes less damage from Wind attacks.",
    ID: 112
  },
  {
    name: "Extreme Critical",
    description: "Power of critical attacks is high.",
    ID: 113
  },
  {
    name: "Night Life",
    description: "All statuses recieve boosts at night.",
    ID: 114
  },
  {
    name: "Herbivaura",
    description: "All Yo-kai find it harder to attack.",
    ID: 115
  },
  {
    name: "Carnivaura",
    description: "All Yo-kai find it easier to attack.",
    ID: 116
  },
  {
    name: "Vampiric",
    description: "Absorbs foe's HP with regular attacks.",
    ID: 117
  },
  {
    name: "Secrecy",
    description: "Will not become target of attacks.",
    ID: 118
  },
  {
    name: "Suspicion",
    description: "May attack an ally.",
    ID: 119
  },
  {
    name: "Sticky Fingers",
    description: "Steals an item while attacking an enemy.",
    ID: 120
  },
  {
    name: "Me First!",
    description: "Gets one preemptive attack.",
    ID: 121
  },
  {
    name: "You First",
    description: "Another Yo-kai will fight for this one.",
    ID: 122
  },
  {
    name: "Zap Away",
    description: "Steals an item while attacking an enemy.",
    ID: 123
  },
  {
    name: "Dirty Rat",
    description: "May attack an ally.",
    ID: 124
  },
  {
    name: "Death Sphere",
    description: "All healing Techniques will be weaker.",
    ID: 125
  },
  {
    name: "Know Your Place",
    description: "Transfers a defeat to an ally and restores HP.",
    ID: 126
  },
  {
    name: "Triple-Header",
    description: "This Yo-kai's Technique will target all enemy Yo-kai.",
    ID: 127
  },
  {
    name: "Bloodsucker",
    description: "Steals HP from adjacent Yo-kai when attacking.",
    ID: 128
  },
  {
    name: "Too Afraid",
    description: "Loafs around a lot.",
    ID: 129
  },
  {
    name: "Eye See You",
    description: "Never misses attacks.",
    ID: 130
  },
  {
    name: "Mine",
    description: "Will take good Inspirits on allies for itself.",
    ID: 131
  },
  {
    name: "Ultimate Dark",
    description: "Inspirit will always succeed.",
    ID: 132
  },
  {
    name: "Moist Skin",
    description: "Takes less damage from Water attacks.",
    ID: 133
  },
  {
    name: "Stiff Skin",
    description: "Takes less damage from Ice attacks.",
    ID: 134
  },
  {
    name: "Noise Pollution",
    description: "All Yo-kai recieve more damage from Inspirits.",
    ID: 135
  },
  {
    name: "Mutt's Paradise",
    description: "Stat boosts for adjacent Yo-kai with same Skill.",
    ID: 136
  },
  {
    name: "Hairnet",
    description: "Does not get Inspirited by enemies.",
    ID: 137
  },
  {
    name: "Haiwax",
    description: "Returns all negative Inspirirting attacks.",
    ID: 138
  },
  {
    name: "Spin-no-rama",
    description: "When in frontn, enemies can't change positions.",
    ID: 139
  },
  {
    name: "Center Stage",
    description: "All stats increase when in front and center.",
    ID: 140
  },
  {
    name: "Dodge",
    description: "All Soultimate Moves will be dodged.",
    ID: 141
  },
  {
    name: "Gassy Sphere",
    description: "Decreases accuracy of enemies.",
    ID: 142
  },
  {
    name: "Curse Worsener",
    description: "Intensifies negative Inspirits on allies.",
    ID: 143
  },
  {
    name: "Pigskin",
    description: "Only receives half damage from an attack.",
    ID: 144
  },
  {
    name: "Oldeness Zone",
    description: "No Yo-kai will be able to dodge.",
    ID: 145
  },
  {
    name: "Highlander",
    description: "Attack power increases after beating enemies.",
    ID: 146
  },
  {
    name: "Rest Less",
    description: "All Yo-kai take damage while Loafing.",
    ID: 147
  },
  {
    name: "Summon",
    description: "Will make Wisps appear more often.",
    ID: 148
  },
  {
    name: "Hassle",
    description: "Makes it difficult for enemies to be purified.",
    ID: 149
  },
  {
    name: "Jar Guard",
    description: "Has extremely high chances to guard.",
    ID: 150
  },
  {
    name: "Waterproof",
    description: "Takes less damage from Water attacks.",
    ID: 151
  },
  {
    name: "Windbreaker",
    description: "Blocks damage from all Wind skill attacks.",
    ID: 152
  },
  {
    name: "Dragon Force",
    description: "Power will increase when in trouble.",
    ID: 153
  },
  {
    name: "Saintly Scales",
    description: "Does not get Inspirited by enemies.",
    ID: 154
  },
  {
    name: "Rubberneck",
    description: "Does not get dealt critical damage.",
    ID: 155
  },
  {
    name: "Loiterer",
    description: "Will recover a little HP when Loafing around.",
    ID: 156
  },
  {
    name: "Shark Skin",
    description: "Skin deals damage to attacking foes.",
    ID: 157
  },
  {
    name: "Matchless Shell",
    description: "Does not get Inspirited by enemies.",
    ID: 158
  },
  {
    name: "Just a Minute",
    description: "Doesn't take an action for one to two turns.",
    ID: 159
  },
  {
    name: "Waterworks",
    description: "Water attacks restore HP.",
    ID: 160
  },
  {
    name: "Venocharge",
    description: "Soul Meter charges faster.",
    ID: 161
  },
  {
    name: "Twinkle Toes",
    description: "Dodges and returns every enemy attack.",
    ID: 162
  },
  {
    name: "Biochemistry",
    description: "Removes elements from all Yo-kai attacks.",
    ID: 163
  },
  {
    name: "Tongue Twister",
    description: "Ignore foe's guard effect when attacking.",
    ID: 164
  },
  {
    name: "Linked Together",
    description: "Stat boosts for adjacent Yo-kai with same Skill.",
    ID: 165
  },
  {
    name: "Juicy Goodness",
    description: "When defeated, allies' Soul Meters are filled.",
    ID: 166
  },
  {
    name: "Polarity",
    description: "Builds STR as Soul Meter refills.",
    ID: 167
  },
  {
    name: "Healer Moon",
    description: "When in back, slowly refills front row's HP.",
    ID: 168
  },
  {
    name: "Purrsistence",
    description: "Retains 1 HP after a knockout blow twice.",
    ID: 169
  },
  {
    name: "Night Guard",
    description: "Dodges all Soultimate Moves.",
    ID: 170
  },
  {
    name: "Breaking Baaad",
    description: "May attack an ally.",
    ID: 171
  },
  {
    name: "Fast Asleep",
    description: "Doesn't take an action for one to two turns.",
    ID: 172
  },
  {
    name: "Killer Comeback",
    description: "Can immediately counterattack.",
    ID: 173
  },
  {
    name: "Sandbag",
    description: "Takes less damage from Earth attacks.",
    ID: 174
  },
  {
    name: "The Stand",
    description: "Will keep 1 HP after a knockout blow once.",
    ID: 175
  },
  {
    name: "Eruption",
    description: "Normal attacks become Fire attacks.",
    ID: 176
  },
  {
    name: "How Sweet",
    description: "Gradually recovers HP of adjacent Yo-kai.",
    ID: 177
  },
  {
    name: "He just Nose",
    description: "Inspirit will always succeed.",
    ID: 178
  },
  {
    name: "Born Winner",
    description: "Dodges attacks like you wouldn't believe.",
    ID: 179
  },
  {
    name: "Born Lucky",
    description: "Dodges and returns every enemy attack.",
    ID: 180
  },
  {
    name: "All or Nothing",
    description: "High chance to give and take critical strikes.",
    ID: 181
  },
  {
    name: "Firewall",
    description: "Blocks damage from all Fire skill attacks.",
    ID: 182
  },
  {
    name: "Darkness Falls",
    description: "Amount of absorbed HP increased.",
    ID: 183
  },
  {
    name: "Lord of Light",
    description: "All adjacent Yo-kai's HP is slowly reffiled.",
    ID: 184
  }
]

var GivenStats = localStorage.getItem('_skill_data');
var SavingStats = JSON.stringify(skills[GivenStats-1]);
SavingStats = btoa(SavingStats)
localStorage.setItem("_trans_skill_data", SavingStats);