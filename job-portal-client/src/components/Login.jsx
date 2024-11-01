import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import SignInwithGoogle from "./signInWIthGoogle";
import './Login.css';  // Import the CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="login-container " style={{ backgroundImage: `url()`}}>
      <form onSubmit={handleSubmit} className="login-form" style={{ backgroundImage: `url(data:image/jpeg;base64,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) ` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <h3 className="text-center text-white">Login</h3>

        <div className="mb-3 mt-3">
          <label className="mb-1 mt-3 text-white">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1 mt-1 text-white">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right text-white">
          New user <a href="/register">Register Here</a>
        </p>
        <SignInwithGoogle />
      </form>
    </div>
  );
}

export default Login;
