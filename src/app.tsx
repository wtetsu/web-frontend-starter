import ReactDOM from "react-dom";
import { router, listen } from "./router";

const render = async (locationPath: string) => {
  const element = await router.resolve(locationPath);
  ReactDOM.render(element, document.getElementById("app"));
};

render(location.pathname);

listen(({ location }) => {
  const path = `${location.pathname}${location.search}${location.hash}`;
  render(path);
});
