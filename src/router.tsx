import React from "react";
import UniversalRouter from "universal-router";
import { createBrowserHistory, Update, Listener } from "history";
import { Home } from "./page/Home";
import { Json } from "./page/Json";
import { Count } from "./page/Count";
import { Form } from "./page/Form";
import { Grid } from "./page/Grid";
import { Chart } from "./page/Chart";
import { Todo } from "./page/Todo";
import { NotFound } from "./page/NotFound";

const history = createBrowserHistory();

const routes = [
  {
    path: "/",
    action: () => <Home />,
  },
  {
    path: "/json",
    action: () => <Json />,
  },
  {
    path: "/count",
    action: () => <Count />,
  },
  {
    path: "/form",
    action: () => <Form />,
  },
  {
    path: "/grid",
    action: () => <Grid />,
  },
  {
    path: "/chart",
    action: () => <Chart />,
  },
  {
    path: "/todo",
    action: () => <Todo />,
  },
  {
    path: "(.*)",
    action: () => <NotFound />,
  },
];

const router = new UniversalRouter(routes);

const listen = (callback: Listener<Update>) => {
  history.listen(callback);
};

const push = (path: string, state: object) => {
  history.push(path, state);
};

export { router, listen, push };
