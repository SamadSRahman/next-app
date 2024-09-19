// src/components/Header.jsx
import Navbar from "../navbar/Navbar";
import styles from "./header.module.css";

const Header = () => {
 let name = "G"
 if (typeof window !== 'undefined')
   name = localStorage.getItem("userName") || "G";
 
  return (
    <header className={styles.headerContainer}>
      <h3>E-commerce</h3>
      <Navbar />
      <div className={styles.adminSection}>
        <div className={styles.popup}>{name[0]}</div>
      </div>
    </header>
  );
};

export default Header;
