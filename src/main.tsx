import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./provider/authProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);
