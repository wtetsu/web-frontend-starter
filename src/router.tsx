import React from "react";
import UniversalRouter from "universal-router";
import { createBrowserHistory } from "history";

import { Home } from "./page/Home";
import { NotFound } from "./page/NotFound";
import { Count } from "./page/Count";

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
    path: "(.*)",
    action: () => <NotFound />,
  },
];

const router = new UniversalRouter(routes);

const listen = (callback: Function) => {
  history.listen(callback);
};

const push = (path: string, state: object) => {
  history.push(path, state);
};

export { router, listen, push };
