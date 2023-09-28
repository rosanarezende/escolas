import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { JogosProvider } from "./contexts/jogosContext.jsx";
import { EstudiosProvider } from "./contexts/estudiosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <JogosProvider>
    <EstudiosProvider>
      <App />
    </EstudiosProvider>
  </JogosProvider>
);
