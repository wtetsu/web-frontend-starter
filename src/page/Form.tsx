import React, { useState, useReducer } from "react";

import immer from "immer";

import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";

import { Header } from "../component/Header";

type State = {
  count: number;
  message: string;
  startDate: Date;
  endDate: Date;
  freeText: string;
};

type Action = {
  type: "message" | "startDate" | "endDate" | "freeText";
  value: any;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "message":
      return immer(state, (d) => {
        d.message = action.value;
      });
    case "startDate":
      return immer(state, (d) => {
        d.startDate = action.value;
      });
    case "endDate":
      return immer(state, (d) => {
        d.endDate = action.value;
      });
    case "freeText":
      return immer(state, (d) => {
        d.freeText = action.value;
      });
    default:
      throw new Error("Unexpected action.type:" + action.type);
  }
};

const Form = () => {
  const initialState: State = {
    count: 0,
    message: "Hello!",
    startDate: new Date(Date.now() - 864e5),
    endDate: new Date(),
    freeText: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  console.debug(JSON.stringify(state, undefined, 2));

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <Header />
      <h1>Form</h1>

      <div className="field">
        <div className="control">
          <Select options={options} />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input is-info"
            type="text"
            value={state.message}
            placeholder="Message"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "message", value: e.target.value })}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <DatePicker
            className="input is-info"
            selected={state.startDate}
            onChange={(date: Date) => dispatch({ type: "startDate", value: date })}
          />
          <DatePicker
            className="input is-info"
            selected={state.endDate}
            onChange={(date: Date) => dispatch({ type: "endDate", value: date })}
          />
        </div>
      </div>

      <hr />

      <textarea
        style={{ width: 600, height: 200 }}
        value={state.freeText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: "freeText", value: e.target.value })}
      ></textarea>
    </>
  );
};

export { Form };
