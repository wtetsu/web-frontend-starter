import React, { useReducer } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import immer from "immer";
import swal from "sweetalert";
import dayjs from "dayjs";
import { Header } from "../components/Header";

type State = {
  flavour: FlavourOption;
  name: string;
  date: Date;
  time: Date;
  message: string;
};

type Action = {
  type: "flavour" | "name" | "date" | "time" | "message";
  value: any;
};

const reducer = (state: State, action: Action): State => {
  return immer(state, (d) => {
    d[action.type] = action.value;
  });
};

const initialState: State = {
  flavour: { value: "chocolate", label: "Chocolate" },
  name: "",
  date: dayjs().startOf("week").startOf("day").toDate(),
  time: dayjs().toDate(),
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

type FlavourOption = {
  value: string;
  label: string;
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const options: FlavourOption[] = [
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
          <label className="label">Flavour</label>
          <div className="control">
            <Select value={state.flavour} options={options} onChange={(value: any) => dispatch({ type: "flavour", value: value })} />
          </div>
        </div>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input is-info"
              type="text"
              value={state.name}
              placeholder="Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "name", value: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Date</label>
          <div className="control">
            <DatePicker className="input " selected={state.date} dateFormat="yyyy/MM/dd" onChange={(date: Date) => dispatch({ type: "date", value: date })} />
          </div>
        </div>
        <div className="field">
          <label className="label">Time</label>
          <div className="control">
            <DatePicker className="input " selected={state.time} showTimeSelect dateFormat="yyyy/MM/dd HH:mm:ss" onChange={(date: Date) => dispatch({ type: "time", value: date })} />
          </div>
        </div>

        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea
              className="input"
              style={{ width: 600, height: 100 }}
              value={state.message}
              placeholder="Message"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: "message", value: e.target.value })}
            ></textarea>
          </div>
        </div>

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

export default Form;
