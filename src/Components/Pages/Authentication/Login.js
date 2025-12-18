import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "../../../UI/Card/Card";
import form_classes from "../../../UI/CSS/Form.module.css";
import { useAuthApi } from "../../Hooks/useAuthApi";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.idToken);

      console.log("Login success:", data);

      navigate("/UserProfile");
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      const safeMessage =
        err?.message || "An unexpected error occurred. Please try again.";

      setError(safeMessage);
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
