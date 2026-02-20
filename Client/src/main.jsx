import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { ApolloProvider } from "@apollo/client/react";

import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import client from "./utils/graphql.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
