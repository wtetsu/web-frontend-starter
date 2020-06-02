import React from "react";
import UniversalRouter from "universal-router";

import { Main } from "./component/Main";
import { Header } from "./component/Header";

const routes = [
  {
    path: "/",
    action: () => (
      <>
        <Header />
        <Main />
      </>
    ),
  },
  {
    path: "/posts",
    action: () => console.log("checking child routes for /posts"),
    children: [
      {
        path: "", // optional, matches both "/posts" and "/posts/"
        action: () => <h1>Posts</h1>,
      },
      {
        path: "/:id",
        action: (context) => <h1>Post #${context.params.id}</h1>,
      },
    ],
  },
  {
    path: "(.*)",
    action: () => (
      <>
        <Header />
        <h1>Not Found</h1>
      </>
    ),
  },
];

const router = new UniversalRouter(routes);

export { router };
