import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import Profile from "./pages/profile";
import Error404 from "./pages/404";
import SignUp from "./pages/signup";
import PrivateRoute from "./components/privateRoute";
import Quiz from "./pages/quiz";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route path="/quiz/:id" element={<PrivateRoute element={<Quiz />} />} />
          <Route path="profil" element={<Profile />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
