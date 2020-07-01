import React, { useState } from "react";
import { Header } from "../component/Header";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Header />
      <h1 className="subtitle is-3">Web frontend starter</h1>
      <img src="img/home.png" width="400" height="334" />
      <div className="content">
        <ul>
          <li>React</li>
          <li>TypeScript</li>
          <li>Bulma</li>
          <li>Universal Router</li>
        </ul>
      </div>
    </>
  );
};

export { Home };
