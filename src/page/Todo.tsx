import React from "react";
import { Header } from "../component/Header";
import { Task } from "../component/Task";

const Todo = () => {
  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">ToDo</h1>
        <div className="content">
          <Task storage="tasks"></Task>
        </div>
      </div>
    </>
  );
};

export { Todo };
