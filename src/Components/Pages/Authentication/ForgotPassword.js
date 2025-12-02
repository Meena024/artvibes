import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthApi } from "../../Hooks/useAuthApi";
import Card from "../../../UI/Card/Card";
import form_classes from "../../../UI/CSS/Form.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuthApi();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(null);

    try {
      await forgotPassword(email);

      setMessage("Password reset link has been sent!");
      setEmail("");
    } catch (err) {
      console.error("RESET PASSWORD ERROR:", err);

      const safeMessage =
        err?.message || "Something went wrong. Please try again.";

      setError(safeMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={form_classes.authFormCenter}>
      <Card>
        <h1 className={form_classes.title}>Forgot Password</h1>

        <form onSubmit={resetPasswordHandler} className={form_classes.form}>
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

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </form>

        {message && <p className={form_classes.successText}>{message}</p>}
        {error && <p className={form_classes.errorText}>{error}</p>}

        <div className={form_classes.linkContainer}>
          <button
            type="button"
            className={form_classes.linkBtn}
            onClick={() => navigate("/")}
          >
            Go back to Sign In?
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
