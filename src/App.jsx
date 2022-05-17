import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Pages/Home";
import SignUp from "./components/Pages/SignUp";
import Dashboard from "./components/Pages/Dashboard";
import NotFound from "./components/Pages/NotFound";
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
  const [isEmailError, setIsEmailError] = useState([false, ""]);
  const [isPasswordError, setIsPasswordError] = useState([false, ""]);
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
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setIsEmailError([true, "Valid email is required."]);
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setIsEmailError([true, "Email already in use."]);
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setIsPasswordError([true, "Incorrect password."]);
      }
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
        setIsEmailError[0](false);
        setIsPasswordError([false, ""]);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setIsEmailError([true, "Valid email is required."]);
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setIsEmailError([true, "Email already in use."]);
      }
      if (
        registerPassword.length < 6 ||
        error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setIsPasswordError([true, "Password must be at least 6 characters."]);
      }
      if (registerPassword.length >= 6) {
        setIsPasswordError[0](false);
      }
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
        isEmailError={isEmailError}
        isPasswordError={isPasswordError}
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
              isEmailError={isEmailError}
              isPasswordError={isPasswordError}
            />
          }
        />
        <Route
          path="dashboard"
          element={<Dashboard logout={logout} user={user} />}
        />
        <Route element={<NotFound />} path="*" />
      </Routes>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
