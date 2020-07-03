import React from "react";
import { push } from "../router";

const link = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const url: string = e.currentTarget.getAttribute("href");
  push(url, {});
};

const Header = () => {
  return (
    <div>
      <a href="/" onClick={link}>
        Home
      </a>
      &nbsp;|&nbsp;
      <a href="count" onClick={link}>
        Count
      </a>
      &nbsp;|&nbsp;
      <a href="form" onClick={link}>
        Form
      </a>
      &nbsp;|&nbsp;
      <a href="grid" onClick={link}>
        Grid
      </a>
      &nbsp;|&nbsp;
      <a href="chart" onClick={link}>
        Chart
      </a>
      &nbsp;|&nbsp;
      <a href="todo" onClick={link}>
        ToDo
      </a>
      &nbsp;|&nbsp;
      <a href="404" onClick={link}>
        404
      </a>
    </div>
  );
};

export { Header };
