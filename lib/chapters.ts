export type Chapter = {
  slug: string;
  number: string;
  lead: string;
  em: string;
  blurb: string;
  nav: string;
  photo: string;
};

export const chapters: Chapter[] = [
  { slug: 'story', number: '01', lead: 'Our', em: 'Story', nav: 'Story', blurb: 'How a borrowed umbrella turned into a life.', photo: '/gallery/shoot/dsc09287.jpg' },
  { slug: 'details', number: '02', lead: 'The', em: 'Day', nav: 'The Day', blurb: 'Ceremony at two, garden reception to follow. Maps and the full timeline.', photo: '/gallery/shoot/dsc08436-edit.jpg' },
  { slug: 'attire', number: '03', lead: 'What to', em: 'Wear', nav: 'Attire', blurb: 'Soft formal in blush and neutrals, and the colours we love.', photo: '/gallery/shoot/dsc09079.jpg' },
  { slug: 'entourage', number: '04', lead: 'The', em: 'Entourage', nav: 'Entourage', blurb: 'Our parents, our party, and the sponsors who bless this union.', photo: '/gallery/shoot/dsc08259.jpg' },
  { slug: 'gallery', number: '06', lead: 'The', em: 'Photoshoot', nav: 'Gallery', blurb: 'A few frames from our engagement.', photo: '/gallery/shoot/dsc08319.jpg' },
  { slug: 'gifts', number: '07', lead: 'A Note', em: 'from Us', nav: 'Gifts', blurb: 'Your presence is the gift. A word on anything more.', photo: '/gallery/shoot/dsc09108.jpg' },
  { slug: 'rsvp', number: '08', lead: 'Will you', em: 'join us?', nav: 'RSVP', blurb: 'Kindly respond by December 9. Seats are reserved by name.', photo: '/gallery/shoot/dsc08697.jpg' },
];

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug) ?? null;
}

export function neighbours(slug: string) {
  const i = chapters.findIndex((c) => c.slug === slug);
  return { prev: i > 0 ? chapters[i - 1] : null, next: i >= 0 && i < chapters.length - 1 ? chapters[i + 1] : null };
}
