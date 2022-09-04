import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import MenteeDashBoard from "./Components/MenteeDashBoard";

function App() {
  const currUser = JSON.parse(window.localStorage.getItem("Mentree_user"));
  console.log(currUser);
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentee/:id" element={<MenteeDashBoard />} />
        <Route
          path={`/`}
          element={
            currUser.isLoggedIn && currUser.user !== {} ? (
              <MenteeDashBoard />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
