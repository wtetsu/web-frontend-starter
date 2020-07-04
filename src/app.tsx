import ReactDOM from "react-dom";
import { router, listen } from "./router";

const render = async (locationPath: string) => {
  const element = await router.resolve(locationPath);
  ReactDOM.render(element, document.getElementById("app"));
};

render(location.pathname);

listen((update: any) => {
  const location: Location = update.location;
  const action: string = update.action;
  const path = `${location.pathname}${location.search}${location.hash}`;
  console.debug(`The current URL is ${path}`);
  console.debug(`The last navigation action was ${action}`);

  render(path);
});
