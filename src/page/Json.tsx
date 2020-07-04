import React, { useReducer } from "react";
import { Header } from "../component/Header";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import immer from "immer";

import { Prism } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

type State = {
  resource: ResourceOption;
  id: number;
  jsonData: string;
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
        d.id = parseInt(action.value, 10);
      });
    case "jsonData":
      return immer(state, (d) => {
        d.jsonData = action.value;
      });
  }
  throw new Error("Unexpected action.type");
};

const resourceOptions: ResourceOption[] = [
  { value: "user", label: "User" },
  { value: "group", label: "Group" },
  { value: "item", label: "Item" },
  { value: "comment", label: "Comment" },
];

const initialState: State = {
  resource: resourceOptions[1],
  id: 1234,
  jsonData: "{}",
};

const sleep = async (time: number) => {
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, time);
  });
};
const fetch = async (resource: ResourceOption, id: number) => {
  // A real application fetches data from the server.
  await sleep(100);
  const data = {
    resource: resource.value,
    id,
    data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    timeStamp: new Date().getTime(),
  };
  return JSON.stringify(data, undefined, 2);
};

const Json = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
                  onChange={(value) => dispatch({ type: "resource", value: value as ResourceOption })}
                />
              </div>
            </div>
            <div className="column" style={{ paddingLeft: 1, paddingRight: 1 }}>
              <input
                type="number"
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
                  dispatch({ type: "jsonData", value: await fetch(state.resource, state.id) });
                }}
              >
                Fetch
              </button>
            </div>
          </div>
          <Prism language="json" style={tomorrow}>
            {state.jsonData}
          </Prism>
        </div>
      </div>
    </>
  );
};

export { Json };
