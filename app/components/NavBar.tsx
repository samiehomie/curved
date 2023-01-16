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

const cateList = ['', ...category];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="mb-10">
      <ul className="flex justify-center">
        {cateList.map((cate) => (
          <li key={cate} className="group">
            <Link className={toggle(pathname === `/${cate}`)} href={`/${cate}`}>
              {cate ? cate.toUpperCase() : 'ALL'}
            </Link>
            <span className="px-1 text-3xl font-bold leading-none group-last:hidden">
              |
            </span>
          </li>
        ))}
      </ul>
      <LogInOrOut />
    </nav>
  );
}
