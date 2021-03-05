import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// TODO When completed app => try to implement Redux
// import { createStore, applyMiddleware, compose } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";

import App from "./App";
// import rootReducer from "./store/reducers/authReducer";

// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

ReactDOM.render(
  // <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </Provider>,
  document.getElementById("root")
);
