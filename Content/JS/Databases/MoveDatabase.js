const moves = [
  {
    Command: 'Batter',
    Lv1_power: '15',
    Lv10_power: '33',
    N_Hits: '3',
    Element: null,
    ID: '0x1B8F94AB',
    Extra: ''
  },
  {
    Command: 'Beat',
    Lv1_power: '40',
    Lv10_power: '88',
    N_Hits: '1',
    Element: null,
    ID: '0xCAAA97CF',
    Extra: ''
  },
  {
    Command: 'Bite',
    Lv1_power: '15',
    Lv10_power: '67',
    N_Hits: '1',
    Element: null,
    ID: '0xC0DA531C',
    Extra: ''
  },
  {
    Command: 'Body Bash',
    Lv1_power: '15',
    Lv10_power: '67',
    N_Hits: '1',
    Element: null,
    ID: '0x72FE5165',
    Extra: ''
  },
  {
    Command: 'Bone Crusher',
    Lv1_power: '100',
    Lv10_power: '150',
    N_Hits: '1',
    Element: null,
    ID: '0x9CF03049',
    Extra: ''
  },
  {
    Command: 'Bowshot',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: null,
    ID: '0xD4DC6297',
    Extra: ''
  },
  {
    Command: 'Chomp',
    Lv1_power: '45',
    Lv10_power: '99',
    N_Hits: '1',
    Element: null,
    ID: '0xB7DD638A',
    Extra: ''
  },
  {
    Command: 'Clobber',
    Lv1_power: '75',
    Lv10_power: '112',
    N_Hits: '1',
    Element: null,
    ID: '0x5A158A5E',
    Extra: ''
  },
  {
    Command: 'Double Slice',
    Lv1_power: '18',
    Lv10_power: '39',
    N_Hits: '2',
    Element: null,
    ID: '0x53A3C675',
    Extra: ''
  },
  {
    Command: 'Earthsplitter',
    Lv1_power: '95',
    Lv10_power: '142',
    N_Hits: '1',
    Element: null,
    ID: '0x05F961F3',
    Extra: ''
  },
  {
    Command: 'Flatten',
    Lv1_power: '30',
    Lv10_power: '66',
    N_Hits: '1',
    Element: null,
    ID: '0x0294A5EA',
    Extra: ''
  },
  {
    Command: 'Flip Kick',
    Lv1_power: '60',
    Lv10_power: '90',
    N_Hits: '1',
    Element: null,
    ID: '0x3E794F5A',
    Extra: ''
  },
  {
    Command: 'Fullswing',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: null,
    ID: '0x6BE56024',
    Extra: ''
  },
  {
    Command: 'Guns Blazing',
    Lv1_power: '15',
    Lv10_power: '33',
    N_Hits: '3',
    Element: null,
    ID: '0x15541C99',
    Extra: ''
  },
  {
    Command: 'Headbuster',
    Lv1_power: '130',
    Lv10_power: '195',
    N_Hits: '1',
    Element: null,
    ID: '0xF2EC319E',
    Extra: ''
  },
  {
    Command: 'Headbutt',
    Lv1_power: '55',
    Lv10_power: '121',
    N_Hits: '1',
    Element: null,
    ID: '0x9B9DF450',
    Extra: ''
  },
  {
    Command: 'Headsmack',
    Lv1_power: '15',
    Lv10_power: '67',
    N_Hits: '1',
    Element: null,
    ID: '0xEC9AC4C6',
    Extra: ''
  },
  {
    Command: 'Hit',
    Lv1_power: '10',
    Lv10_power: '45',
    N_Hits: '1',
    Element: null,
    ID: '0xBDADA759',
    Extra: ''
  },
  {
    Command: 'Kaboom!',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: null,
    ID: '0x4AB8F734',
    Extra: ''
  },
  {
    Command: 'Kick',
    Lv1_power: '15',
    Lv10_power: '67',
    N_Hits: '1',
    Element: null,
    ID: '0xAEC652CB',
    Extra: ''
  },
  {
    Command: 'Lightning Slash',
    Lv1_power: '20',
    Lv10_power: '44',
    N_Hits: '3',
    Element: null,
    ID: '0x24A4F6E3',
    Extra: ''
  },
  {
    Command: 'Maul',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: null,
    ID: '0x27627E1B',
    Extra: ''
  },
  {
    Command: 'Meteor Punch',
    Lv1_power: '20',
    Lv10_power: '30',
    N_Hits: '3',
    Element: null,
    ID: '0xD9C1625D',
    Extra: ''
  },
  {
    Command: 'Nasty Kick',
    Lv1_power: '100',
    Lv10_power: '150',
    N_Hits: '1',
    Element: null,
    ID: '0x497E7FCC',
    Extra: ''
  },
  {
    Command: 'Ninja Star',
    Lv1_power: '60',
    Lv10_power: '90',
    N_Hits: '1',
    Element: null,
    ID: '0x2D12BAC8',
    Extra: ''
  },
  {
    Command: 'One-Two Punch',
    Lv1_power: '15',
    Lv10_power: '33',
    N_Hits: '2',
    Element: null,
    ID: '0x40C833E7',
    Extra: ''
  },
  {
    Command: 'Palm Strike',
    Lv1_power: '60',
    Lv10_power: '90',
    N_Hits: '1',
    Element: null,
    ID: '0x3AD203BB',
    Extra: ''
  },
  {
    Command: 'Pesky Poke',
    Lv1_power: '15',
    Lv10_power: '67',
    N_Hits: '1',
    Element: null,
    ID: '0xB0B0A793',
    Extra: ''
  },
  {
    Command: 'Pinpoint Pierce',
    Lv1_power: '30',
    Lv10_power: '66',
    N_Hits: '1',
    Element: null,
    ID: '0xF581F587',
    Extra: ''
  },
  {
    Command: 'Pointy Pokes',
    Lv1_power: '12',
    Lv10_power: '26',
    N_Hits: '3',
    Element: null,
    ID: '0x2ED43230',
    Extra: ''
  },
  {
    Command: 'Power Punch',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: null,
    ID: '0xDEACA644',
    Extra: ''
  },
  {
    Command: 'Practiced Punch',
    Lv1_power: '90',
    Lv10_power: '135',
    N_Hits: '1',
    Element: null,
    ID: '0xA9AB96D2',
    Extra: ''
  },
  {
    Command: 'Punch',
    Lv1_power: '15',
    Lv10_power: '67',
    N_Hits: '1',
    Element: null,
    ID: '0x47A5F7FE',
    Extra: ''
  },
  {
    Command: 'Rocket Punch',
    Lv1_power: '100',
    Lv10_power: '150',
    N_Hits: '1',
    Element: null,
    ID: '0x4DD5332D',
    Extra: ''
  },
  {
    Command: 'Sharp Claws',
    Lv1_power: '10',
    Lv10_power: '45',
    N_Hits: '2',
    Element: null,
    ID: '0x23C932FA',
    Extra: ''
  },
  {
    Command: 'Shoot',
    Lv1_power: '10',
    Lv10_power: '45',
    N_Hits: '1',
    Element: null,
    ID: '0x85EB0108',
    Extra: ''
  },
  {
    Command: 'Slap',
    Lv1_power: '10',
    Lv10_power: '45',
    N_Hits: '1',
    Element: null,
    ID: '0x29B9F629',
    Extra: ''
  },
  {
    Command: 'Slurp',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: null,
    ID: '0x3DBFC7A2',
    Extra: ''
  },
  {
    Command: 'Smack Down',
    Lv1_power: '20',
    Lv10_power: '44',
    N_Hits: '2',
    Element: null,
    ID: '0x5EBEC6BF',
    Extra: ''
  },
  {
    Command: 'Spraygun',
    Lv1_power: '100',
    Lv10_power: '150',
    N_Hits: '1',
    Element: null,
    ID: '0xA3DB5201',
    Extra: ''
  },
  {
    Command: 'Squish',
    Lv1_power: '10',
    Lv10_power: '45',
    N_Hits: '1',
    Element: null,
    ID: '0x50654E8D',
    Extra: ''
  },
  {
    Command: 'Stab Storm',
    Lv1_power: '10',
    Lv10_power: '22',
    N_Hits: '5',
    Element: null,
    ID: '0x59D302A6',
    Extra: ''
  },
  {
    Command: 'Steamroll',
    Lv1_power: '60',
    Lv10_power: '90',
    N_Hits: '1',
    Element: null,
    ID: '0x7593957C',
    Extra: ''
  },
  {
    Command: 'Stepping Slice',
    Lv1_power: '15',
    Lv10_power: '67',
    N_Hits: '1',
    Element: null,
    ID: '0xCDC753D6',
    Extra: ''
  },
  {
    Command: 'Tackle',
    Lv1_power: '60',
    Lv10_power: '90',
    N_Hits: '1',
    Element: null,
    ID: '0xEBF700DF',
    Extra: ''
  },
  {
    Command: 'Tail Slap',
    Lv1_power: '100',
    Lv10_power: '150',
    N_Hits: '1',
    Element: null,
    ID: '0x7B481D4E',
    Extra: ''
  },
  {
    Command: 'Ventilator',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: null,
    ID: '0x8286C511',
    Extra: ''
  }
]

function GetMove(GivenStats){ // Damage Calc Function
	for (move of moves){
		if (move.ID == GivenStats){
			return move
		}
	}
}

