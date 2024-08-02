import React from 'react';
import { LinkItem } from '../atoms/link';

export const NavItem = ({ href, label }) => (
  <li className="mr-4">
    <LinkItem href={href}>{label}</LinkItem>
  </li>
);
