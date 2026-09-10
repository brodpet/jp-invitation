import { Sprig } from './LeafDefs';

export default function Footer() {
  return (
    <footer className="foot">
      <Sprig className="sprig sprig-foot" />
      <p className="foot-names">
        Antonio <em>&amp;</em> Axzel
      </p>
      <p className="foot-date">July 25, 2026 · Talisay City, Cebu</p>
      <p className="foot-quote">
        “A family is a risky venture, because the greater the love, the greater the loss. But still, we
        persevere.”
      </p>
      <p className="foot-copy">© 2026 · By order of the Patalinghug family</p>
    </footer>
  );
}
