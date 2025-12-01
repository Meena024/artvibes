import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "../../../UI/Card/Card";
import form_classes from "../../../UI/CSS/Form.module.css";
import { AuthAction } from "../../../Redux store/AuthSlice";
import { useDispatch } from "react-redux";
import { fetchAuthData } from "../../../Redux store/AuthActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTQ2asMnlPUffJVn8EKwscBGedzGW_e9c`,
        {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Login failed!");
      }

      localStorage.setItem("token", data.idToken);

      dispatch(AuthAction.userAuthenticated(true));
      dispatch(fetchAuthData(data.idToken));

      navigate("/UserProfile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={form_classes.authFormCenter}>
      <Card>
        <h1 className={form_classes.title}>Sign In</h1>

        <form onSubmit={loginHandler} className={form_classes.form}>
          <div className={form_classes.inputWrapper}>
            <input
              id="email"
              type="email"
              placeholder="E-Mail id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className={form_classes.inputWrapper}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className={form_classes.errorText}>{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
        <div className={form_classes.linkContainer}>
          <button
            type="button"
            className={form_classes.linkBtn}
            onClick={() => navigate("/ForgotPassword")}
          >
            Forgot Password?
          </button>

          <button
            type="button"
            className={form_classes.linkBtn}
            onClick={() => navigate("/SignUp")}
          >
            Create a new Account? <strong>SIGN UP</strong>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
