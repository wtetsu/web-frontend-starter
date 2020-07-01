import React, { useReducer } from "react";
import immer from "immer";
// @ts-ignore
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import axios from "axios";
import { Header } from "../component/Header";

type State = {
  records: Object[];
};

type Action = {
  type: "records";
  value: any;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "records":
      return immer(state, (d) => {
        d.records = action.value;
      });
    default:
      throw new Error("Unexpected action.type:" + action.type);
  }
};

const fetchRecords = async (dispatch: React.Dispatch<Action>) => {
  const response = await axios.get("chart.json");
  dispatch({ type: "records", value: response.data });
};

const Chart = () => {
  const initialState: State = {
    records: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  fetchRecords(dispatch);

  return (
    <>
      <Header />
      <h1>Chart</h1>
      <LineChart width={600} height={300} data={state.records} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  );
};

export { Chart };
