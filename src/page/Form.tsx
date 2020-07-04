import React, { useReducer } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import immer from "immer";
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
  }
  throw new Error("Unexpected action.type:" + action.type);
};

const initialState: State = {
  flavour: "",
  message: "Hello!",
  startDate: new Date(Date.now() - 864e5),
  endDate: new Date(),
  freeText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

const Form = () => {
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
              onChange={(value: any) => dispatch({ type: "flavour", value: value })}
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
              className="input "
              selected={state.startDate}
              onChange={(date: Date) => dispatch({ type: "startDate", value: date })}
            />
            <DatePicker
              className="input "
              selected={state.endDate}
              onChange={(date: Date) => dispatch({ type: "endDate", value: date })}
            />
          </div>
        </div>

        <textarea
          className="input"
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
