import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.scss";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./store/UserContext";
import { PostProvider } from "./store/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <UserProvider>
    <BrowserRouter>
      <PostProvider>
        <App />
      </PostProvider>
    </BrowserRouter>
  </UserProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
