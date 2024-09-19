import Link from "next/link";
import styles from "./navbar.module.css"; // Ensure this file exists and has appropriate styles
import { useEffect, useState } from "react";

export default function Navbar() {
  // const router = useRouter();
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Safe to access document here
      setCurrentPage(window.location.pathname);
    }
  }, [])

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
          <Link key={index} href={route.path} passHref
          style={
            route.path === currentPage ? { backgroundColor: "white" } : {}
          }
          >
         
              {route.name}
 
          </Link>
        ))}
      </nav>
    </div>
  );
}
