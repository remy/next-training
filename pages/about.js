import Link from 'next/link';

// title="About the app"
export default () => (
  <>
    <h1>About</h1>
    <p>This site will a conference schedule…eventually!</p>
    <p>
      <Link prefetch href="/contact">
        <a>Get in touch</a>
      </Link>
    </p>
  </>
);
