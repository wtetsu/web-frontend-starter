import React, { useState, useReducer } from "react";

import immer from "immer";

// @ts-ignore
import DatePicker from "react-datepicker";
// @ts-ignore
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";

import { Header } from "../component/Header";

type State = {
  flavour: string;
  message: string;
  startDate: Date;
  endDate: Date;
  freeText: string;
};

type Action = {
  type: "flavour" | "message" | "startDate" | "endDate" | "freeText";
  value: any;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "flavour":
      return immer(state, (d) => {
        d.flavour = action.value;
      });
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
    flavour: "",
    message: "Hello!",
    startDate: new Date(Date.now() - 864e5),
    endDate: new Date(),
    freeText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">Form</h1>

        <div className="field">
          <div className="control">
            <Select
              value={state.flavour}
              options={options}
              onChange={(e: any) => dispatch({ type: "flavour", value: e })}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-info"
              type="text"
              value={state.message}
              placeholder="Message"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "message", value: e.target.value })
              }
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

        <textarea
          style={{ width: 600, height: 100 }}
          value={state.freeText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({ type: "freeText", value: e.target.value })
          }
        ></textarea>
        <hr />
        <button
          type="button"
          className="button is-link"
          onClick={() => {
            swal(JSON.stringify(state, undefined, 2));
          }}
        >
          Show JSON
        </button>
      </div>
    </>
  );
};

export { Form };
