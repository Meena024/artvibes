import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../../UI/Card/Card";
import form_classes from "../../../UI/CSS/Form.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTQ2asMnlPUffJVn8EKwscBGedzGW_e9c`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Signup failed!");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  };

  return (
    <div className={form_classes.authFormCenter}>
      <Card>
        <h1 className={form_classes.title}>Sign Up</h1>

        <form onSubmit={signupHandler} className={form_classes.form}>
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
              autoComplete="new-password"
              required
            />
          </div>

          <div className={form_classes.inputWrapper}>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && <div className={form_classes.errorText}>{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <button
          type="button"
          className={form_classes.linkBtn}
          onClick={() => navigate("/")}
        >
          Already have an Account? <strong>SIGN IN</strong>
        </button>
      </Card>
    </div>
  );
};

export default SignUp;
