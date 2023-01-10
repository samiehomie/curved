'use client';

import styles from './NavBar.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

function toggle(on: boolean) {
  return classNames({
    [styles.NavItem]: true,
    [styles.on]: on,
  });
}

export default function NavBar() {
  const pathname = usePathname();
  return (
    <ul className={styles.NavList}>
      <Link href="/" className={toggle(pathname === '/')}>
        <li>ALL</li>
      </Link>
      <Link href="/life" className={toggle(pathname === '/life')}>
        <li>LIFE</li>
      </Link>
      <Link href="/dog" className={toggle(pathname === '/dog')}>
        <li>DOG</li>
      </Link>
      <Link href="/bird" className={toggle(pathname === '/bird')}>
        <li>BIRD</li>
      </Link>
    </ul>
  );
}
