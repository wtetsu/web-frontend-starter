import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Header } from "../component/Header";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Header />
      <h1>Home</h1>

      <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} />
    </>
  );
};

export { Home };
