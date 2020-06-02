import React from "react";

const link = (e) => {
  e.preventDefault();
  const url: string = e.currentTarget.getAttribute("href");
  history.pushState(null, null, url);
};

const Header = () => {
  return (
    <div>
      <a href="/" onClick={(e) => link(e)}>
        Home
      </a>
      &nbsp;
      <a href="WIP" onClick={(e) => link(e)}>
        WIP
      </a>
    </div>
  );
};

export { Header };
