'use client';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import LogInOrOut from './LogInOrOut';
import Image from 'next/image';
import Logo from '../public/img/logo.jpg';
import category from '../lib/category';

function toggle(on: boolean) {
  return classNames({
    'font-bold text-2xl sm:text-3xl sm:hover:text-base-yellow leading-none':
      true,
    'text-base-yellow': on,
  });
}

export default function NavBar() {
  const path = usePathname();
  const pathname = path?.split('/')[1];

  return (
    <nav className="mb-10" id="header">
      <Link href="/">
        <Image
          src={Logo}
          width={510}
          className="mx-auto mb-[18px] px-1 sm:px-0 max-[291px]:px-0"
          alt="logo"
        />
      </Link>

      <ul
        className="flex flex-wrap justify-center content-center
      max-w-[230px] mx-auto sm:max-w-none"
      >
        {category.map((cate) => (
          <li key={cate} className="group">
            <Link className={toggle(pathname === `${cate}`)} href={`/${cate}`}>
              {cate.toUpperCase()}
            </Link>
            <span
              className="px-1 text-2xl sm:text-3xl font-bold leading-none group-[:nth-child(3)]:hidden
            sm:group-[:nth-child(3)]:inline-block group-last:hidden"
            >
              |
            </span>
          </li>
        ))}
      </ul>
      <LogInOrOut path={pathname!} />
    </nav>
  );
}
