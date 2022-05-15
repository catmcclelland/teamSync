import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Pages/Home";
import SignUp from "./components/Pages/SignUp";
import Dashboard from "./components/Pages/Dashboard";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

function App() {
  const [user, setUser] = useState({});
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUser(user);
      if (user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      if (user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar
        setLoginEmail={setLoginEmail}
        setLoginPassword={setLoginPassword}
        setUser={setUser}
        login={login}
        user={user}
        logout={logout}
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="sign-up"
          element={
            <SignUp
              setUser={setUser}
              setRegisterEmail={setRegisterEmail}
              setRegisterPassword={setRegisterPassword}
              register={register}
              user={user}
            />
          }
        />
        <Route
          path="dashboard"
          element={<Dashboard logout={logout} user={user} />}
        />
      </Routes>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
