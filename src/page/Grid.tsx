import React, { useReducer, useEffect } from "react";
import immer from "immer";
import axios from "axios";
import { Header } from "../component/Header";
import { Table } from "../component/Table";

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

const Grid = () => {
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

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">Grid</h1>
        <Table headers={["name", "uv"]} records={state.records}></Table>
      </div>
    </>
  );
};

export { Grid };
