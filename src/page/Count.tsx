import React, { useState } from "react";
import { Header } from "../component/Header";
import { Counter } from "../component/Counter";

const Count = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Header />
      <h1>Count</h1>
      <Counter />
      <Counter />
      <Counter />
    </>
  );
};

export { Count };
