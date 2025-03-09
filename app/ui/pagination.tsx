'use client';

import { GiArrowWings } from 'react-icons/gi';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="inline-flex pt-2 justify-center">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page) => {
            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  const isEllipsis = page === '...';
  const className = clsx(
    'flex h-10 w-10 m-1 items-center justify-center text-sm rounded-full',
    {
      'z-10 pb-1 underline border-blue-600 font-bold text-yellow-700 bg-slate-300': isActive,
      'hover:pb-1 hover:underline hover:shadow': !isActive && !isEllipsis,
      'z-10 pb-1': isEllipsis
    },
  );

  return isActive || isEllipsis ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-8 w-8 items-center justify-center rounded-full border p-1",
    {
      'pointer-events-none text-gray-400 border-gray-400': isDisabled,
      'hover:border-yellow-700 hover:text-yellow-700': !isDisabled,
      'border-black hover:shadow': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <GiArrowWings className="w-8 h-8 -rotate-135" />
    ) : (
      <GiArrowWings className="w-8 h-8 rotate-45" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 3 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    // If the current page is the first or last page,
    // show the first page, an ellipsis, and the last page.
    if (currentPage === 1 || currentPage === totalPages) {
      return [1, '...', totalPages];
    }
  
    // If the current page is somewhere in the middle,
    // show the first page, the current page and the last page.
    return [
      1,
      currentPage,
      totalPages,
    ];
  };