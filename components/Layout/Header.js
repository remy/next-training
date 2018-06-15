import Link from 'next/link';

import './Header.css';

export default ({ user = {} }) => (
  <header className="Header">
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
      {user &&
        user.username && (
          <div className="UserNav">
            @{user.username} <img src={user.avatar} />
          </div>
        )}
    </nav>
  </header>
);
