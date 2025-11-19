import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Editor } from "./pages/Editor";
import { Viewer } from "./pages/Viewer";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/view/:content" element={<Viewer />} />
        </Routes>
      </Layout>
      <Toaster />
    </HashRouter>
  );
}

export default App;
