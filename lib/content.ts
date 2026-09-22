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
  city: 'Cataingan',
  province: 'Masbate',
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
    venue: 'San Vicente Ferrer Parish Church',
    note: 'Please be seated by 1:50. The bride walks in at two.',
  },
  {
    time: '2:00',
    meridiem: 'PM',
    label: 'Ceremony',
    venue: 'San Vicente Ferrer Parish Church',
    address: 'Poblacion, Cataingan, Masbate',
    mapsQuery: 'San Vicente Ferrer Parish Church Poblacion Cataingan Masbate',
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
  { name: 'Clay', hex: '#b3948a' },
  { name: 'Pale Blush', hex: '#e6d7d0' },
  { name: 'Gardenia', hex: '#efe7e0', border: '#dccfc6' },
  { name: 'Latte', hex: '#d4c2aa' },
  { name: 'Champagne', hex: '#c2a06b' },
  { name: 'Espresso', hex: '#3b2f2c' },
];

export const looks = [
  { src: '/attire/look-1.svg', alt: 'Linen suit in latte with a clay tie', label: 'Latte linen, clay tie' },
  { src: '/attire/look-2.svg', alt: 'Satin slip dress in pale blush', label: 'Slip dress, pale blush' },
  { src: '/attire/look-3.svg', alt: 'Flowing gown in dusty clay', label: 'Flowing, in clay' },
  { src: '/attire/look-4.svg', alt: 'Champagne shirt with espresso trousers', label: 'Champagne & espresso' },
];

export const parents = {
  bride: ['Mother of the Bride', 'Father of the Bride'],
  groom: ['Antonio Patalinghug Jr.', 'Marilyn Patalinghug'],
};

export const roles: { title: string; names: string[]; lead?: boolean }[] = [
  { title: 'Matron of Honor', names: ['Matron of Honor'], lead: true },
  { title: 'Best Man', names: ['Best Man'], lead: true },
  { title: 'Bridesmaids', names: ['Bridesmaid 1', 'Bridesmaid 2', 'Bridesmaid 3', 'Bridesmaid 4', 'Bridesmaid 5'] },
  { title: 'Groomsmen', names: ['Groomsman 1', 'Groomsman 2', 'Groomsman 3', 'Groomsman 4', 'Groomsman 5'] },
  { title: 'Flower Girls', names: ['Flower Girl 1', 'Flower Girl 2'] },
  { title: 'Flower Ladies', names: ['Flower Lady 1', 'Flower Lady 2'] },
  { title: 'Bearers', names: ['Ring Bearer', 'Coin Bearer'] },
];

export const principalSponsors: [string, string][] = Array.from({ length: 15 }, (_, i) => [
  `Ninang ${i + 1}`,
  `Ninong ${i + 1}`,
]);

export const secondarySponsors = [
  { role: 'Candle', pair: ['Candle Sponsor 1', 'Candle Sponsor 2'] },
  { role: 'Veil & Cord', pair: ['Veil & Cord Sponsor 1', 'Veil & Cord Sponsor 2'] },
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
