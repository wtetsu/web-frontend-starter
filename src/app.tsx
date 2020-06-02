import ReactDOM from "react-dom";
import { router } from "./router";

const render = async (location) => {
  const element = await router.resolve(location);
  ReactDOM.render(element, document.getElementById("app"));
};

render(location.pathname);
