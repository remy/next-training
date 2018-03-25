import { Fragment } from 'react';
import Link from 'next/link';
import Rating from './Rating';
import Notes from './Notes';
import './Session.css';

const Speaker = ({ speaker, twitter }) =>
  speaker ? (
    <p className="Speaker">
      {speaker} / <a href={`https://twitter.com/${twitter}`}>@{twitter}</a>
    </p>
  ) : null;

export default ({
  title,
  description,
  slug,
  rating = false,
  more = false,
  ...props
}) => {
  const More = more ? (
    <Fragment>
      <Notes url={`/session/${slug}`} />
      <Rating value={rating} />
    </Fragment>
  ) : null;

  return (
    <div className="Session">
      <h2 className="___Speaker">
        <Link
          as={`/session/${slug}?rating=4`}
          href={`/session?slug=${slug}&rating=4`}
        >
          <a>{title}</a>
        </Link>
      </h2>
      <p>{description}</p>
      {process.env.SHOW_SPEAKER && <Speaker {...props} />}
      {More}
    </div>
  );
};
