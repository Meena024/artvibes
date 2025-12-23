import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Card from "../../../UI/Card/Card";
import form_classes from "../../../UI/CSS/Form.module.css";
import { dbApi } from "../../Hooks/DbApi";
import { useAuthApi } from "../../Hooks/useAuthApi";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuthApi();

  const signupHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanConfirm = confirmPassword.trim();

    if (cleanPassword !== cleanConfirm) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);

    try {
      const data = await signUp({
        email: cleanEmail,
        password: cleanPassword,
      });

      const role = location.pathname === "/SignUp" ? "user" : "seller";

      const userObj = {
        email: data.email ?? "",
        role,
      };

      await dbApi.put(`users/${data.localId}/userProfile`, userObj);

      navigate("/Login");
    } catch (err) {
      console.error("Signup Error:", err);

      const safeMessage =
        err?.message || "An unexpected error occurred. Please try again.";

      setError(safeMessage);
    } finally {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    }
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

          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <button type="button" onClick={() => navigate("/user/products")}>
              Cancel
            </button>
          </div>
        </form>

        <div className={form_classes.linkContainer}>
          {location.pathname === "/SellerSignUp" ? (
            <button
              type="button"
              className={form_classes.linkBtn}
              onClick={() => navigate("/SignUp")}
            >
              Create User Account?
            </button>
          ) : (
            <button
              type="button"
              className={form_classes.linkBtn}
              onClick={() => navigate("/SellerSignUp")}
            >
              Create Seller Account?
            </button>
          )}

          <button
            type="button"
            className={form_classes.linkBtn}
            onClick={() => navigate("/Login")}
          >
            Already have an Account? <strong>SIGN IN</strong>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
