import  { useState } from "react";
import styles from "./signin.module.css";
import Button from "../../components/button/Button";
// import logo from "../../images/untact_logo.svg";
import visibilityIcon from "../../assets/visibility.svg";
import visibilityOffIcon from "../../assets/visibility_off.svg";
import useAuth from "../../hooks/useAuth";

export default function Signin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error, passError } = useAuth();

  function onSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div className={styles.container}>
      <form className={styles.contentBox} onSubmit={onSubmit}>
        {/* <img src={logo} alt="" /> */}
        <div
          className={styles.inputWrapper}
          style={error ? { border: "1px solid red" } : {}}
        >
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your mail id"
            type="email"
          />
        </div>
        <label className={styles.errorLabel}>{error}</label>
        <div
          className={styles.inputWrapper}
          style={passError ? { border: "1px solid red" } : {}}
        >
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            type={isPasswordVisible ? "text" : "password"}
          />
          <img
            src={isPasswordVisible ? visibilityOffIcon : visibilityIcon}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            alt=""
          />
        </div>
        <label className={styles.errorLabel}>{passError}</label>
        <Button
          className={"primaryBtn"}
          text={loading ? "Logging in..." : "Log in"}
        />
      </form>
    </div>
  );
}
