import React from "react";
import { Header } from "../components/Header";
import { Task } from "../components/Task";

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

export default Todo;
