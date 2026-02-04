import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
