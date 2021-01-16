import React, { useReducer, useEffect } from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import immer from "immer";

// @ts-ignore
import highlight from "highlight.js/lib/core";
// @ts-ignore
import json from "highlight.js/lib/languages/json";

import { Header, Message } from "../components";
import { fetcher } from "../lib/client/fetcher";

highlight.registerLanguage("json", json);

type State = {
  resource: ResourceOption;
  id: string;
  jsonData: string;
  errorMessage: string;
};

type Action =
  | {
      type: "resource";
      value: ResourceOption;
    }
  | {
      type: "id";
      value: string;
    }
  | {
      type: "jsonData";
      value: string;
    }
  | {
      type: "errorMessage";
      value: string;
    };

type ResourceOption = {
  value: string;
  label: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "resource":
      return immer(state, (d) => {
        d.resource = action.value;
      });
    case "id":
      return immer(state, (d) => {
        d.id = action.value;
      });
    case "jsonData":
      return immer(state, (d) => {
        d.jsonData = action.value;
      });
    case "errorMessage":
      return immer(state, (d) => {
        d.errorMessage = action.value;
      });
  }
  throw new Error("Unexpected action.type");
};

const resourceOptions: ResourceOption[] = [
  { value: "user", label: "User" },
  { value: "item", label: "Item" },
];

const initialState: State = {
  resource: resourceOptions[0],
  id: "1234",
  jsonData: "{}",
  errorMessage: "",
};

const Json = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    highlight.highlightBlock(document.getElementById("jsonData"));
  }, [state.jsonData]);

  const fetchData = async (resource: ResourceOption, id: string) => {
    if (resource.value === "user" || resource.value === "item") {
      try {
        const data = await fetcher.fetch(resource.value, id);
        return JSON.stringify(data, undefined, 2);
      } catch (ex) {
        dispatch({ type: "errorMessage", value: "" });
        dispatch({ type: "errorMessage", value: ex.toString() });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">JSON viewer</h1>

        <div className="field" style={{ width: 800 }}>
          <div className="columns">
            <div className="column" style={{ paddingRight: 1 }}>
              <div className="control">
                <Select
                  value={state.resource}
                  options={resourceOptions}
                  onChange={(value: ResourceOption) => dispatch({ type: "resource", value: value as ResourceOption })}
                  instanceId="selectResource"
                />
              </div>
            </div>
            <div className="column" style={{ paddingLeft: 1, paddingRight: 1 }}>
              <input
                type="text"
                className="input"
                value={state.id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "id", value: e.target.value })}
              />
            </div>
            <div className="column" style={{ paddingLeft: 1, paddingRight: 0 }}>
              <button
                type="button"
                className="button is-link"
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  dispatch({ type: "jsonData", value: await fetchData(state.resource, state.id) });
                }}
              >
                Fetch
              </button>
            </div>
          </div>
          <Message text={state.errorMessage}></Message>

          <pre>
            <code id="jsonData" className="json">
              {state.jsonData}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default Json;
