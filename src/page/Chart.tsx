import React, { useReducer, useEffect } from "react";
import immer from "immer";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
} from "recharts";

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

const Chart = () => {
  const initialState: State = {
    records: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get("chart.json");
      dispatch({ type: "records", value: response.data });
    };

    fetchRecords();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">Chart</h1>
        <LineChart width={600} height={300} data={state.records} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>

        <BarChart
          width={600}
          height={300}
          data={state.records}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>

        <PieChart width={600} height={400}>
          <Pie dataKey="uv" isAnimationActive={false} data={state.records} outerRadius={120} label>
            {state.records.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </>
  );
};

export { Chart };
