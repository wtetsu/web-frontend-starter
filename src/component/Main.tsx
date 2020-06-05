import React, { useState } from "react";
import { Counter } from "./Counter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

axios.get("data.json").then((data) => {
  console.log(data);
});

const Main = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <h1>Home</h1>

      <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} />

      <Counter />
      <Counter />
      <Counter />
    </>
  );
};

export { Main };
