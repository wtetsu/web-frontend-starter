import React, { useReducer, useEffect } from "react";
import Slider from "rc-slider";
import immer from "immer";
import "rc-slider/assets/index.css";

import {
  ComposedChart,
  Area,
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
import { Header } from "../components/Header";

type State = {
  records: Object[];
  rate: number;
};

type Action =
  | {
      type: "records";
      value: any;
    }
  | {
      type: "rate";
      value: number;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "records":
      return immer(state, (d) => {
        d.records = action.value;
      });
    case "rate":
      return immer(state, (d) => {
        d.rate = action.value;
      });
    default:
      throw new Error("Unexpected action.type:" + action.type);
  }
};

const Chart = () => {
  const initialState: State = {
    records: [],
    rate: 100,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get("/data/chart.json");
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

        <Slider value={state.rate} onChange={(value) => dispatch({ type: "rate", value })} />

        <LineChart width={730} height={300} data={state.records} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="value1" stroke="#8884d8" />
          <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, (dataMax) => (dataMax * state.rate) / 100]} />
          <Tooltip />
          <Legend />
        </LineChart>

        <BarChart
          width={730}
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
          <YAxis domain={[0, (dataMax) => (dataMax * state.rate) / 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value1" fill="#8884d8" />
          <Bar dataKey="value2" fill="#82ca9d" />
        </BarChart>

        <ComposedChart width={730} height={250} data={state.records}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, (dataMax) => (dataMax * state.rate) / 100]} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="value1" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="value2" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </>
  );
};

export default Chart;
