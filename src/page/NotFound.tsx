import React, { useState } from "react";
import { Header } from "../component/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <h1>Not Found</h1>
      <img src="img/404.png" width="400" height="334" />
    </>
  );
};

export { NotFound };
