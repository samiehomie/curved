'use client';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import LogInOrOut from './LogInOrOut';
import category from '../lib/category';

function toggle(on: boolean) {
  return classNames({
    'font-bold text-3xl sm:hover:text-base-yellow leading-none': true,
    'text-base-yellow': on,
  });
}

export default function NavBar() {
  const path = usePathname();
  const pathname = path?.split('/')[1] || 'all';

  return (
    <nav className="mb-10" id="header">
      <ul className="flex justify-center">
        {category.map((cate) => (
          <li key={cate} className="group">
            <Link className={toggle(pathname === `${cate}`)} href={`/${cate}`}>
              {cate.toUpperCase()}
            </Link>
            <span className="px-1 text-3xl font-bold leading-none group-last:hidden">
              |
            </span>
          </li>
        ))}
      </ul>
      <LogInOrOut path={pathname!} />
    </nav>
  );
}
