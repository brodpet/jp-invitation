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
  startIso: '2027-01-09T06:00:00Z', // 2:00 PM PHT
  endIso: '2027-01-09T13:00:00Z', // 9:00 PM PHT
  startUtc: '20270109T060000Z',
  endUtc: '20270109T130000Z',
};

export type Stop = {
  time: string;
  meridiem: 'AM' | 'PM';
  label: string;
  venue?: string;
  address?: string;
  mapsQuery?: string;
  note?: string;
};

export const schedule: Stop[] = [
  {
    time: '1:30',
    meridiem: 'PM',
    label: 'Guests arrive',
    venue: 'San Isidro Labrador Parish',
    note: 'Please be seated by 1:50. The bride walks in at two.',
  },
  {
    time: '2:00',
    meridiem: 'PM',
    label: 'Ceremony',
    venue: 'San Isidro Labrador Parish',
    address: 'Talisay City, Cebu',
    mapsQuery: 'San Isidro Labrador Parish Talisay City Cebu',
  },
  {
    time: '3:15',
    meridiem: 'PM',
    label: 'Photos in the churchyard',
    note: 'Family first, then the entourage, then everyone.',
  },
  {
    time: '4:30',
    meridiem: 'PM',
    label: 'Cocktails in the garden',
    venue: 'Kishanta Clubhouse',
    address: 'Talisay City, Cebu',
    mapsQuery: 'Kishanta Clubhouse Talisay City Cebu',
  },
  { time: '5:30', meridiem: 'PM', label: 'Reception & dinner', venue: 'Kishanta Clubhouse' },
  { time: '7:00', meridiem: 'PM', label: 'Toasts, first dance & games' },
  { time: '8:00', meridiem: 'PM', label: 'Dancing until nine' },
];

export const venues = schedule.filter((s) => s.mapsQuery);

export const storyBeats = [
  {
    year: '2019',
    title: 'A borrowed umbrella',
    text: 'A sudden downpour in Cebu, one umbrella between two strangers, and a walk that went three blocks past where either of them was going.',
  },
  {
    year: '2020',
    title: 'The long way home',
    text: 'Long calls became a habit, then a comfort. When the world went quiet they learned each other in the details: how she takes her coffee, how he hums when he cooks.',
  },
  {
    year: '2023',
    title: 'A garden in the city',
    text: 'Their first apartment had a balcony the size of a doormat. They filled it with pots anyway. Everything grew.',
  },
  {
    year: '2026',
    title: 'The question',
    text: 'On an ordinary Sunday, under the same borrowed umbrella he had never returned, he asked. She said yes before he finished.',
  },
  {
    year: '2027',
    title: 'The garden, for real this time',
    text: 'On the ninth of January they will say it in front of the people who carried them here. This is the beginning of the best chapter yet.',
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

export const looks = [
  { src: '/attire/look-1.svg', alt: 'Linen suit in sand with a moss waistcoat', label: 'Linen & waistcoat' },
  { src: '/attire/look-2.svg', alt: 'Tea-length dress in terracotta', label: 'Tea-length, terracotta' },
  { src: '/attire/look-3.svg', alt: 'Flowing gown in moss green', label: 'Flowing, in moss' },
  { src: '/attire/look-4.svg', alt: 'Ochre shirt with ink-green trousers and a flat cap', label: 'Ochre & ink, flat cap' },
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
