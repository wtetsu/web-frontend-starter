import React from "react";
import { push } from "../router";

const link = (e) => {
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
      <a href="Count" onClick={link}>
        Count
      </a>
      &nbsp;|&nbsp;
      <a href="Form" onClick={link}>
        Form
      </a>
      &nbsp;|&nbsp;
      <a href="WIP" onClick={link}>
        WIP
      </a>
    </div>
  );
};

export { Header };
