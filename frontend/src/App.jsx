import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import AddEditForm from "./components/AddEditForm.jsx";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/create-post"
            element={<AddEditForm />}
          />

          <Route
            path="/update-post/:id"
            element={<AddEditForm />}
          />

          <Route
            path="*"
            element={
              <p className="notice">
                Page not found.
              </p>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}