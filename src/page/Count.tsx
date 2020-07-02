import React, { useState } from "react";
import { Header } from "../component/Header";
import { Counter } from "../component/Counter";

const Count = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">Count</h1>
        <Counter />
        <Counter />
        <Counter />
      </div>
    </>
  );
};

export { Count };
