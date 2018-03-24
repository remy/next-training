import Link from 'next/link';

export default ({ title, description, slug }) => (
  <div className="Session">
    <h2>
      <Link as={`/session/${slug}`} href={`/session?slug=${slug}`}>
        <a>{title}</a>
      </Link>
    </h2>
    <p>{description}</p>
  </div>
);
