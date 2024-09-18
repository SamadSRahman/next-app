import { useState } from "react";
import styles from "../signin/signin.module.css";
import Button from "../../components/button/Button";
// import logo from "../../images/untact_logo.svg";
import visibilityIcon from "../../assets/visibility.svg";
import visibilityOffIcon from "../../assets/visibility_off.svg";
import useAuth from "../../hooks/useAuth";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleRegister, loading, error, passError } = useAuth();

  function onSubmit(e) {
    e.preventDefault();
    handleRegister(email, password, name, phone, confirmPassword);
  }

  return (
    <div className={styles.container}>
      <form className={styles.contentBox} onSubmit={onSubmit}>
        {/* <img src={logo} alt="" /> */}
  {/* NAme field */}
        <div
          className={styles.inputWrapper}
          style={error ? { border: "1px solid red" } : {}}
        >
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          type="text"
        />
        </div>

          {/* Email field */}

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
        {/* Number field */}
        <div
          className={styles.inputWrapper}
          style={error ? { border: "1px solid red" } : {}}
        >
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            type="number"
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
        <div
          className={styles.inputWrapper}
          style={passError ? { border: "1px solid red" } : {}}
        >
          <input
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type={isConfirmPasswordVisible ? "text" : "password"}
          />
          <img
            src={isConfirmPasswordVisible ? visibilityOffIcon : visibilityIcon}
            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            alt=""
          />
        </div>
        <label className={styles.errorLabel}>{passError}</label>
        <Button
          className={"primaryBtn"}
          text={loading ? "Registering..." : "Register"}
        />
      </form>
    </div>
  );
}
