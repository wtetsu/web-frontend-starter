import React, { useReducer, useEffect, FC } from "react";
import immer from "immer";
import localforage from "localforage";

type State = {
  newTask: string;
  tasks: Task[];
};

type Task = {
  key: number;
  name: string;
  desc: string;
};

type Action =
  | {
      type: "setNewTask";
      value: string;
    }
  | {
      type: "add";
      value: string;
    }
  | {
      type: "done";
      value: number;
    }
  | {
      type: "restore";
      value: [];
    };

const createTask = (input: string): Task => {
  const index = input.indexOf(" ");
  const name = index == -1 ? input : input.substring(0, index);
  const desc = index == -1 ? "" : input.substring(index + 1).trim();
  return { key: new Date().getTime(), name, desc };
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add":
      if (!action.value) {
        return state;
      }
      return immer(state, (d) => {
        d.tasks.push(createTask(action.value));
        d.newTask = "";
      });
    case "setNewTask":
      return immer(state, (d) => {
        d.newTask = action.value;
      });
    case "done":
      return immer(state, (d) => {
        d.tasks.splice(action.value, 1);
      });
    case "restore":
      return immer(state, (d) => {
        d.tasks = action.value;
      });
  }
  throw new Error("Unexpected action.type");
};

let reducerWrapper = reducer;

type TaskProps = {
  storage: string;
};

const Task: FC<TaskProps> = (props) => {
  const initialState: State = {
    newTask: "task4 lorem ipsum",
    tasks: [],
  };
  const [state, dispatch] = useReducer(reducerWrapper, initialState);

  useEffect(() => {
    var store = localforage.createInstance({
      name: props.storage,
    });
    // Re-define reducer
    reducerWrapper = (state: State, action: Action): State => {
      const newState = reducer(state, action);
      if (action.type === "add" || action.type === "done") {
        store.setItem("tasks", JSON.stringify(newState.tasks));
      }

      return newState;
    };

    const loadTasks = async () => {
      const tasksJson: string = await store.getItem("tasks");
      const tasks = tasksJson
        ? JSON.parse(tasksJson)
        : [
            { key: 1, name: "task1", desc: "lorem ipsum" },
            { key: 2, name: "task2", desc: "lorem ipsum" },
            { key: 3, name: "task3", desc: "lorem ipsum" },
          ];
      dispatch({ type: "restore", value: tasks });
    };
    loadTasks();
  }, []);

  return (
    <div className="is-large">
      <input
        className="input is-info"
        type="text"
        value={state.newTask}
        placeholder="Message"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "setNewTask", value: e.target.value })}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key == "Enter") {
            dispatch({ type: "add", value: state.newTask });
          }
        }}
      />

      <ol>
        {state.tasks.map((task, i) => (
          <li key={task.key}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch({ type: "done", value: i });
              }}
            >
              <input type="checkbox" />
              &nbsp;
              {task.name}
              {task.desc ? <span className="tag is-light is-link">{task.desc}</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export { Task };
