// Import Modules_
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./REDUX/store";

// Import Styles_
import "./index.css";

// Import Components_
import App from "./App.jsx";

// Render SPA React App ------------------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // {/* </Provider> */}
);
