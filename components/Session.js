import Link from 'next/link';
import Rating from './Rating';

export default ({ title, description, slug, rating = false }) => (
  <div className="Session">
    <h2>
      <Link
        as={`/session/${slug}?rating=4`}
        href={`/session?slug=${slug}&rating=4`}
      >
        <a>{title}</a>
      </Link>
    </h2>
    <p>{description}</p>
    {rating && <Rating value={rating} />}
  </div>
);
