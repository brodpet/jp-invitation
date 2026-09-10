export const couple = {
  groom: { first: 'Antonio', last: 'Patalinghug III' },
  bride: { first: 'Axzel Rosel', last: 'Gallares' },
  short: 'Antonio & Axzel',
};

export const event = {
  dateLabel: 'Saturday, January 9, 2027',
  day: '9',
  month: 'January',
  year: '2027',
  city: 'Talisay City',
  province: 'Cebu',
  rsvpBy: 'December 9, 2026',
  startUtc: '20270109T060000Z', // 2:00 PM PHT
  endUtc: '20270109T130000Z', // 9:00 PM PHT
};

export const schedule = [
  {
    time: '2:00',
    meridiem: 'PM',
    label: 'Ceremony',
    venue: 'San Isidro Labrador Parish',
    address: 'Talisay City, Cebu',
    mapsQuery: 'San Isidro Labrador Parish Talisay City Cebu',
  },
  {
    time: '4:30',
    meridiem: 'PM',
    label: 'Reception',
    venue: 'Kishanta Clubhouse',
    address: 'Talisay City, Cebu',
    mapsQuery: 'Kishanta Clubhouse Talisay City Cebu',
  },
];

export const palette = [
  { name: 'Ink Green', hex: '#1c2e25' },
  { name: 'Moss', hex: '#3f5d4c' },
  { name: 'Terracotta', hex: '#b8583a' },
  { name: 'Ochre', hex: '#c2932e' },
  { name: 'Sand', hex: '#d9c7a7' },
  { name: 'Paper', hex: '#f4eee2', border: '#cfc5b0' },
];

export const parents = {
  bride: ['Jocelyn Londres', 'Ramil Samson'],
  groom: ['Glenda Dolores', 'Joel Dolores'],
};

export const roles: { title: string; names: string[]; lead?: boolean }[] = [
  { title: 'Matron of Honor', names: ['Marianne Fortaliza-Pajares'], lead: true },
  { title: 'Best Man', names: ['Paul Wilfred Honato'], lead: true },
  { title: 'Bridesmaids', names: ['Jibon Christine Tapere', 'Honey Quinn Ebarsabal'] },
  {
    title: 'Groomsmen',
    names: ['Argie Bentor', 'Franz Jason Dolores', 'Cedric Gonzalo', 'Vince Bailon', 'Clifford Anthony Buno'],
  },
  { title: 'Flower Girls', names: ['Rayleigh Venice Pajares', 'Cianna Catriel Pajares'] },
  { title: 'Flower Ladies', names: ['Elia Jane Abarrientos', 'Bea Bianca Dolores'] },
  { title: 'Bearers', names: ['Juan Alfonso Dolores', 'Yuri Cleofe'] },
];

export const principalSponsors: [string, string][] = [
  ['Bituin', 'Roger Villanueva'],
  ['Daisy', 'Jaynes Juree Abarrientos'],
  ['Marlene', 'Deolito Abilong'],
  ['Maricho', 'Roberto Delos Cientos Jr.'],
  ['Erlita', 'Emiliano Bulanon'],
  ['Emily', 'Jaynes James Abarrientos IV'],
  ['Jenelyn', 'Gerard Vincent Tuballa'],
  ['Machula', 'Rolando Sarangaya'],
  ['Mary Jane', 'Danny Dela Peña'],
  ['Luisa', 'Elmer Magbo-o'],
  ['Virgie', 'Edwin Cañete'],
  ['Mona Liza Delmendo', 'Mila Burlaos'],
  ['Ma. Victoria', 'Isidro Go Jr.'],
  ['Rhea Ybañez', 'Perlito Londres'],
  ['Rogelio Jr.', 'Pinky Arcueno'],
];

export const secondarySponsors = [
  { role: 'Candle', pair: ['Neil Clifford', 'Emelyn Dolores'] },
  { role: 'Veil & Cord', pair: ['Eric', 'Analyn Londres'] },
];

export const photos = [
  { src: '/gallery/photo-1.svg', alt: 'Antonio and Axzel walking hand in hand along a tree-lined path', wide: true },
  { src: '/gallery/photo-2.svg', alt: 'Axzel resting her head on Antonio’s shoulder' },
  { src: '/gallery/photo-3.svg', alt: 'Antonio and Axzel sharing a quiet moment in the garden' },
  { src: '/gallery/photo-4.svg', alt: 'The couple seated together at golden hour', wide: true },
  { src: '/gallery/photo-5.svg', alt: 'Portrait of Antonio and Axzel looking at each other' },
  { src: '/gallery/photo-6.svg', alt: 'Axzel’s hand with her engagement ring' },
];

export const heroPhoto = {
  src: '/gallery/hero.svg',
  alt: 'Antonio and Axzel laughing together during their engagement photoshoot',
  caption: 'Engagement, Cebu · 2026',
};
