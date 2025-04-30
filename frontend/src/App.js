import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Dashboard/Home.jsx";
import Login from "./Auth/Login.jsx";
import SignUP from "./Auth/SignUp.jsx";
import Tasks from "./Dashboard/Tasks.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* authentication routes */}
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUP />} />
          </Route>
          <Route path="/tasks" element={<Tasks />} />
          {/* wild card route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
