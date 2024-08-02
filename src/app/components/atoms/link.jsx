import React from 'react';
import Link from 'next/link';

export const LinkItem = ({ href, children }) => (
  <Link href={href} className="text-white hover:underline">
    {children}
  </Link>
);
