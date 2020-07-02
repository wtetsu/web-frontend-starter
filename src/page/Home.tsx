import React, { useState } from "react";
import { Header } from "../component/Header";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Header />
      <h1 className="subtitle is-3">Web frontend starter</h1>
      <div className="content">
        <img src="img/home.png" alt="Welcome!" width="400" height="334" />
      </div>
    </>
  );
};

export { Home };
