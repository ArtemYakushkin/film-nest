import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import { useUserStore } from "../store/userStore";

import { IoLogOutOutline } from "react-icons/io5";

const shortenName = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  const firstName = parts[0];
  const lastInitial = parts[1]?.[0]?.toUpperCase() || "";
  return `${firstName} ${lastInitial}.`;
};

const AuthButton = () => {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        name: shortenName(user.displayName),
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="auth-button">
      {user ? (
        <>
          <div className="auth-button-user">
            <img src={user.photo} alt={user.name} style={{ referrerPolicy: "no-referrer" }} />
            <p>{user.name}</p>
          </div>
          <button onClick={handleLogout}>
            <IoLogOutOutline size={28} color="var(--first-color)" />
          </button>
        </>
      ) : (
        <button className="auth-button-login" onClick={handleLogin}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default AuthButton;
