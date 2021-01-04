import React from "react";
import { Header } from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <h1 className="subtitle is-3">Web frontend starter</h1>
      <div className="content">
        <img src="img/home.png" alt="Welcome!" width="400" height="334" />
        <br />
        <a href="https://github.com/wtetsu/web-frontend-starter" target="_blank" rel="noopener noreferrer">
          <img src="img/github.png" alt="GitHub" width="32" height="32" />
        </a>
      </div>
    </>
  );
};

export default Home;
