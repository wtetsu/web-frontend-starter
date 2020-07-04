import React, { FC } from "react";
import { push } from "../router";

const link = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const url: string = e.currentTarget.getAttribute("href");
  push(url, {});
};

const Header = () => {
  const links = [
    { href: "/", text: "Home" },
    { href: "/count", text: "Count" },
    { href: "/form", text: "Form" },
    { href: "/grid", text: "Grid" },
    { href: "/chart", text: "Chart" },
    { href: "/todo", text: "ToDo" },
    { href: "/404", text: "404" },
  ];

  return (
    <div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} text={l.text} separator={i < links.length - 1}></Link>
      ))}
    </div>
  );
};

type LinkPropsType = {
  href: string;
  text: string;
  separator: boolean;
};
const Link: FC<LinkPropsType> = ({ href, text, separator }) => {
  const bar = <span style={{ marginLeft: 5, marginRight: 5 }}>l</span>;
  if (location.pathname == href) {
    return (
      <>
        <span>{text}</span>
        {separator ? bar : null}
      </>
    );
  }
  return (
    <>
      <a href={href} onClick={link}>
        <span>{text}</span>
      </a>
      {separator ? bar : null}
    </>
  );
};

export { Header };
