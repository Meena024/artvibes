import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "../../../UI/Card/Card";
import form_classes from "../../../UI/CSS/Form.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

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
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBTQ2asMnlPUffJVn8EKwscBGedzGW_e9c`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to send reset email!");
      }

      setMessage("Password reset link has been sent!");
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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

        {/* Centered link button */}
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
