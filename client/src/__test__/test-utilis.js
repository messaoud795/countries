import { Provider } from "react-redux";
import { configureStore } from "../store/configureStore";
import { render } from "@testing-library/react";

function ReduxProvider({ children }) {
  return <Provider store={configureStore()}>{children}</Provider>;
}
const reduxRender = (ui, options) =>
  render(ui, { wrapper: ReduxProvider, ...options });
export * from "@testing-library/react";
export { reduxRender as render };
