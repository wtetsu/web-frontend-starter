import React, { FC } from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Link href="/">Home</Link>
      <span> | </span>
      <Link href="/json">Json</Link>
      <span> | </span>
      <Link href="/form">Form</Link>
      <span> | </span>
      <Link href="/grid">Grid</Link>
      <span> | </span>
      <Link href="/chart">Chart</Link>
      <span> | </span>
      <Link href="/todo">ToDo</Link>
      <span> | </span>
      <Link href="/404">404</Link>
    </div>
  );
};

export { Header };
