import React, { useState } from "react";
import { Header } from "../components/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="content">
        <h1 className="subtitle is-5">Not Found</h1>
        <div className="content">
          <img src="img/404.png" width="400" height="334" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
