import React from "react";
import UniversalRouter from "universal-router";
// @ts-ignore
import { createBrowserHistory, Update, Listener } from "history";
import { Home } from "./page/Home";
import { Count } from "./page/Count";
import { Form } from "./page/Form";
import { Grid } from "./page/Grid";
import { Chart } from "./page/Chart";
import { NotFound } from "./page/NotFound";

const history = createBrowserHistory();

const routes = [
  {
    path: "/",
    action: () => <Home />,
  },
  {
    path: "/Count",
    action: () => <Count />,
  },
  {
    path: "/Form",
    action: () => <Form />,
  },
  {
    path: "/Grid",
    action: () => <Grid />,
  },
  {
    path: "/Chart",
    action: () => <Chart />,
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
