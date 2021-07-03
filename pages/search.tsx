import React, { useReducer } from "react";
import immer from "immer";
import axios from "axios";
import { Button, Header } from "../components";
import { Table } from "../components/Table";

type State = {
  records: { [key: string]: Object }[];
  query: string;
  loading: boolean;
};

type Action =
  | {
      type: "records";
      value: any;
    }
  | {
      type: "update";
      value: Record<string, any>;
    }
  | {
      type: "loading";
      value: boolean;
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
    case "loading":
      return immer(state, (d) => {
        d.loading = action.value;
      });
  }
  throw new Error("Unexpected action.type");
};

const initialState: State = {
  records: [],
  query: "",
  loading: false,
};

type Query = {
  q?: string;
};

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRecords = async (query: string) => {
    let params = {} as Query;
    if (query) {
      params.q = query;
    }
    const response = await axios.get("/api/companies", { params });
    dispatch({ type: "records", value: response.data });
  };

  const search = async (query: string) => {
    try {
      dispatch({ type: "loading", value: true });
      await fetchRecords(query);
    } finally {
      dispatch({ type: "loading", value: false });
    }
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
          <Button onClick={() => search(state.query)} busy={state.loading}>
            Search
          </Button>
        </div>

        <Table headers={["id", "name", "city", "slogan"]} records={state.records}></Table>
      </div>
    </>
  );
};

export default Search;
