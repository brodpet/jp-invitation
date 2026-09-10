import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="nf">
      <p className="eyebrow">Antonio &amp; Axzel</p>
      <h1 className="chapter-title">
        We couldn’t find <em>that invitation.</em>
      </h1>
      <p>
        The link may be incomplete or mistyped. Please open it again from the message you received, or
        reach out to the couple.
      </p>
      <Link className="btn btn-line" href="/">
        View the general invitation
      </Link>
    </main>
  );
}
