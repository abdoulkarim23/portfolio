import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import { Toaster } from "./components/ui/toaster";
import { LanguageProvider } from "./i18n/LanguageContext";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL || ""}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </LanguageProvider>
    </div>
  );
}

export default App;
