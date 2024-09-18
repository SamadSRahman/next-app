import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";

export default function Navbar() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState("");
  
    useEffect(() => {
      setCurrentPage(location.pathname);
    }, [location]);
  

  const routes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "About us",
      path: "/about-us",
    },
    {
      name: "Contact us",
      path: "/contact-us",
    },
  ];
  return (
    <div>
      <nav className={styles.navbar}>
        {routes.map((route, index) => (
          <Link style={route.path===currentPage?{backgroundColor:"white"}:{}} key={index} to={route.path}>
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
