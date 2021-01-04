import React, { useReducer, useEffect } from "react";
import immer from "immer";
import axios from "axios";
import { Header } from "../components/Header";
import { Table } from "../components/Table";

type State = {
  records: { [key: string]: Object }[];
  horizontal: boolean;
};

type Action =
  | {
      type: "records";
      value: any;
    }
  | {
      type: "switch";
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "records":
      return immer(state, (d) => {
        d.records = action.value;
      });
    case "switch":
      return immer(state, (d) => {
        d.horizontal = !state.horizontal;
      });
  }
  throw new Error("Unexpected action.type");
};

const initialState: State = {
  records: [],
  horizontal: false,
};

const Grid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get("data/chart.json");
      dispatch({ type: "records", value: response.data });
    };

    fetchRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">Grid</h1>

        <a onClick={() => dispatch({ type: "switch" })}>{state.horizontal ? "Horizontal" : "Vertical"}</a>

        <Table headers={["name", "value1", "value2"]} records={state.records} horizontal={state.horizontal}></Table>
      </div>
    </>
  );
};

export default Grid;
