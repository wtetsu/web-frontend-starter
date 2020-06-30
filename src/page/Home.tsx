import React, { useState } from "react";
import { Header } from "../component/Header";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  );
};

export { Home };
