import ReactDOM from "react-dom";
import { router, listen } from "./router";

const render = async (location) => {
  const element = await router.resolve(location);
  ReactDOM.render(element, document.getElementById("app"));
};

render(location.pathname);

listen((location, action) => {
  const path = `${location.pathname}${location.search}${location.hash}`;
  console.log(`The current URL is ${path}`);
  console.log(`The last navigation action was ${action}`);

  render(path);
});
