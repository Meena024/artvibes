import { useEffect } from "react";
import Main from "./Components/Main";
import WebFont from "webfontloader";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";
import store from "./Redux store/store";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Merriweather"],
      },
    });
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Main />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
