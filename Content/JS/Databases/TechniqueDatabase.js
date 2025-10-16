const techniques = [
  {
    Command: 'Absorb',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: 'Drain',
    ID: '0x00E763A4',
    Extra: ''
  },
  {
    Command: 'Blaze',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: 'Fire',
    ID: '0x8E2E8B6D',
    Extra: ''
  },
  {
    Command: 'Blizzard',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: 'Ice',
    ID: '0x09512F8F',
    Extra: ''
  },
  {
    Command: 'Drain',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: 'Drain',
    ID: '0x521688C3',
    Extra: ''
  },
  {
    Command: 'Fire',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: 'Fire',
    ID: '0x1727DAD7',
    Extra: ''
  },
  {
    Command: 'Frost',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: 'Ice',
    ID: '0x7E561F19',
    Extra: ''
  },
  {
    Command: 'Hail',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: 'Ice',
    ID: '0xE0328ABA',
    Extra: ''
  },
  {
    Command: 'Heal',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: null,
    ID: '0xBC18E9EF',
    Extra: ''
  },
  {
    Command: 'Incinerate',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: 'Fire',
    ID: '0xF929BBFB',
    Extra: ''
  },
  {
    Command: 'Lightning',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: 'Lightning',
    ID: '0x6EFB6273',
    Extra: ''
  },
  {
    Command: 'Meteor',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: 'Earth',
    ID: '0x9735BA2C',
    Extra: ''
  },
  {
    Command: 'Paradise',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: null,
    ID: '0x557B4CDA',
    Extra: ''
  },
  {
    Command: 'Pebble',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: 'Earth',
    ID: '0x793BDB00',
    Extra: ''
  },
  {
    Command: 'Rapids',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: 'Water',
    ID: '0x104A1ECE',
    Extra: ''
  },
  {
    Command: 'Reaper',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: 'Drain',
    ID: '0x2511B855',
    Extra: ''
  },
  {
    Command: 'Restore',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: null,
    ID: '0xCB1FD979',
    Extra: ''
  },
  {
    Command: 'Rockslide',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: 'Earth',
    ID: '0x0E3CEB96',
    Extra: ''
  },
  {
    Command: 'Shock',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: 'Lightning',
    ID: '0xFE447FE2',
    Extra: ''
  },
  {
    Command: 'Storm',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: 'Wind',
    ID: '0x77E05332',
    Extra: ''
  },
  {
    Command: 'Tornado',
    Lv1_power: '50',
    Lv10_power: '110',
    N_Hits: '1',
    Element: 'Wind',
    ID: '0xE75F4EA3',
    Extra: ''
  },
  {
    Command: 'Torrent',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: 'Water',
    ID: '0x674D2E58',
    Extra: ''
  },
  {
    Command: 'Voltage',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: 'Lightning',
    ID: '0x19FC52E5',
    Extra: ''
  },
  {
    Command: 'Waterfall',
    Lv1_power: '80',
    Lv10_power: '120',
    N_Hits: '1',
    Element: 'Water',
    ID: '0x89434F74',
    Extra: ''
  },
  {
    Command: 'Whirlwind',
    Lv1_power: '20',
    Lv10_power: '90',
    N_Hits: '1',
    Element: 'Wind',
    ID: '0x90587E35',
    Extra: ''
  }
]

function GetTechnique(GivenStats){ // Damage Calc Function
	for (technique of techniques){
		if (technique.ID == GivenStats){
			return technique
		}
	}
}
