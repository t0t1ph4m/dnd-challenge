import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/tailwind.css";
import App from "./App";
import { graphqlService } from "./services";
import { ApolloProvider } from "@apollo/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={graphqlService}>
    <App />
  </ApolloProvider>
);
