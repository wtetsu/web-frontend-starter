import React, { useReducer } from "react";
import immer from "immer";
import axios from "axios";
import { Header } from "../components/Header";
import { Table } from "../components/Table";

type State = {
  records: { [key: string]: Object }[];
  query: string;
};

type Action =
  | {
      type: "records";
      value: any;
    }
  | {
      type: "update";
      value: Record<string, any>;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "records":
      return immer(state, (d) => {
        d.records = action.value;
      });
    case "update":
      return immer(state, (d) => {
        Object.assign(d, action.value);
      });
  }
  throw new Error("Unexpected action.type");
};

const initialState: State = {
  records: [],
  query: "",
};

type Query = {
  q?: string;
};

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (query: string) => {
    const fetchRecords = async () => {
      let params = {} as Query;
      if (query) {
        params.q = query;
      }

      const response = await axios.get("/api/companies", { params });
      dispatch({ type: "records", value: response.data });
    };

    fetchRecords();
  };

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">Search</h1>

        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "update", value: { query: e.target.value } })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search(state.query);
                }
              }}
            />
          </div>
          <div className="control" onClick={() => search(state.query)}>
            <a className="button is-info">Search</a>
          </div>
        </div>

        <Table headers={["id", "name", "city", "slogan"]} records={state.records}></Table>
      </div>
    </>
  );
};

export default Search;
