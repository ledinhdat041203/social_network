import React, { useEffect, useState } from "react";
import logo from "../assets/images/Logo1.png";
import "../styles/style_login.css";
import { loginApi } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Login = () => {
  const { loginContext, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error("Email/password is required!");
      return;
    }

    try {
      const res = await loginApi(email, password);
      if (res && res.data && res.data.status === 200 && res.data.access_token) {
        loginContext(res.data.access_token);
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user.id && user.auth) {
      navigate("/");
    }
  }, [navigate, user.auth, user.id]);
  return (
    <>
      <div className="container">
        <div className="user-box">
          <div>
            <center>
              <img
                src={logo}
                alt="logo"
                height="64em"
                style={{ marginBottom: "2vh" }}
              />
              <h3>Log in to Network</h3>
              <br />
            </center>
          </div>

          <div className="form-group">
            <input
              className="form-control inp usrnm"
              type="text"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              className="form-control inp pswd"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="off"
            />
          </div>

          <center>
            <button
              className={`btn btn-primary ${email && password ? "active" : ""}`}
              style={{ marginTop: "10px", width: "95%" }}
              disabled={!email || !password}
              onClick={() => handleLogin()}
            >
              {loading && <i className="fa-solid fa-sync fa-spin"></i>} Login
            </button>
          </center>

          <div>
            <center>
              Don't have an account?&nbsp;&nbsp;
              <a href="/register">Sign Up</a>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
