import React, { useReducer, useEffect } from "react";
import Select from "react-select";
import immer from "immer";
import highlight from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import { Button, Header } from "../components";
import { fetcher } from "../lib/client/fetcher";
import { message } from "../lib/client/message";
import { sleep } from "../lib/util";

highlight.registerLanguage("json", json);

type State = {
  resource: ResourceOption;
  id: string;
  jsonData: string;
  errorMessage: string;
  loading: boolean;
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
    }
  | {
      type: "loading";
      value: boolean;
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
    case "loading":
      return immer(state, (d) => {
        d.loading = action.value;
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
  loading: false,
};

const Json = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    highlight.highlightBlock(document.getElementById("jsonData"));
  }, [state.jsonData]);

  const fetchData = async (resource: ResourceOption, id: string) => {
    if (resource.value === "user" || resource.value === "item") {
      try {
        dispatch({ type: "loading", value: true });
        await sleep(500);
        const data = await fetcher.fetch(resource.value, id);
        return JSON.stringify(data, undefined, 2);
      } catch (ex) {
        message.error(ex.toString());
      } finally {
        dispatch({ type: "loading", value: false });
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
              <Button
                onClick={async (e) => dispatch({ type: "jsonData", value: await fetchData(state.resource, state.id) })}
                busy={state.loading}
              >
                Fetch
              </Button>
            </div>
          </div>
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
