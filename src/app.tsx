import ReactDOM from "react-dom";
import { router, listen } from "./router";

const render = async (locationPath: string) => {
  const element = await router.resolve(locationPath);
  ReactDOM.render(element, document.getElementById("app"));
};

render(location.pathname);

listen((location: Location, action: string) => {
  const path = `${location.pathname}${location.search}${location.hash}`;
  console.log(`The current URL is ${path}`);
  console.log(`The last navigation action was ${action}`);

  render(path);
});
